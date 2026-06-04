import { QuoteRequest } from "./types";
import logoUrl from "../../assets/logo.avif";

function loadImageAsBase64(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function getQuoteRef(quote: QuoteRequest) {
  return `QR-${quote._id.substring(quote._id.length - 5).toUpperCase()}`;
}

const PRIMARY = [8, 31, 61] as const;
const PRIMARY_LIGHT = [237, 242, 247] as const;
const GRAY_DARK = [80, 80, 80] as const;
const GRAY_TEXT = [60, 60, 60] as const;
const GRAY_LIGHT = [120, 120, 120] as const;

export async function exportQuoteToPDF(quote: QuoteRequest) {
  const jsPDF = (await import("jspdf")).default;
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const logoBase64 = await loadImageAsBase64(logoUrl);

  // ── Header bar ──
  doc.setFillColor(...PRIMARY_LIGHT);
  doc.rect(0, 0, pageWidth, 40, "F");

  let headerY = 12;

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", margin, 7, 28, 14);
  }

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...PRIMARY);
  doc.text("Intersys Solution Co., Ltd.", pageWidth - margin, headerY + 1, {
    align: "right",
  });

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY_LIGHT);
  doc.text("Integrated Security Systems", pageWidth - margin, headerY + 6, {
    align: "right",
  });

  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.4);
  doc.line(margin, 40, pageWidth - margin, 40);

  // ── Title section ──
  let topY = 54;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...PRIMARY);
  doc.text("Bill of Quantities", pageWidth / 2, topY, { align: "center" });

  topY += 8;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY_LIGHT);
  doc.text("Request for quotation", pageWidth / 2, topY, { align: "center" });

  // ── Quote ref + Date box ──
  topY += 10;
  const boxX = margin;
  const boxY = topY;
  const boxW = contentWidth;
  const boxH = 14;

  doc.setFillColor(248, 249, 252);
  doc.setDrawColor(220, 220, 225);
  doc.roundedRect(boxX, boxY, boxW, boxH, 1.5, 1.5, "FD");

  const quoteRef = getQuoteRef(quote);
  const dateStr = new Date(quote.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...GRAY_DARK);
  doc.text("Quote reference:", boxX + 8, boxY + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...PRIMARY);
  doc.text(quoteRef, boxX + 38, boxY + 5.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...GRAY_DARK);
  doc.text("Date issued:", boxX + boxW / 2 + 8, boxY + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...PRIMARY);
  doc.text(dateStr, boxX + boxW / 2 + 32, boxY + 5.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...GRAY_DARK);
  doc.text("Status:", boxX + 8, boxY + 11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...PRIMARY);
  doc.text(quote.status, boxX + 24, boxY + 11);

  topY = boxY + boxH + 12;

  // ── Customer information ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...PRIMARY);
  doc.text("Customer information", margin, topY);

  topY += 3;
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.15);
  doc.line(margin, topY + 2, margin + 42, topY + 2);

  topY += 8;
  const lineH = 4.8;
  doc.setFontSize(8.5);

  const fields: [string, string][] = [
    ["Name", quote.name],
    ["Company", quote.company],
    ["Title / Role", quote.title],
    ["Email", quote.email],
    ["Phone", quote.phone],
    ["Address", quote.address],
  ];
  if (quote.city) fields.push(["City", quote.city]);
  if (quote.country) fields.push(["Country", quote.country]);
  if (quote.contactMethod) fields.push(["Preferred contact", quote.contactMethod]);

  const labelW = 30;
  fields.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GRAY_TEXT);
    doc.text(label, margin, topY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    const maxWidth = contentWidth - labelW - 4;
    const lines = doc.splitTextToSize(value || "—", maxWidth);
    doc.text(lines, margin + labelW, topY);
    topY += lineH * Math.max(1, lines.length);
  });

  topY += 4;

  // ── Categories and sections ──
  if (quote.solutionCategories.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GRAY_TEXT);
    doc.text("Categories", margin, topY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...PRIMARY);
    const catText = quote.solutionCategories.join(", ");
    const catLines = doc.splitTextToSize(catText, contentWidth - labelW - 4);
    doc.text(catLines, margin + labelW, topY);
    topY += lineH * catLines.length + 2;
  }

  if (quote.sections && quote.sections.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GRAY_TEXT);
    doc.text("Sections", margin, topY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...PRIMARY);
    const secText = quote.sections.join(", ");
    const secLines = doc.splitTextToSize(secText, contentWidth - labelW - 4);
    doc.text(secLines, margin + labelW, topY);
    topY += lineH * secLines.length + 2;
  }

  if (quote.otherBms) {
    topY += 1;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GRAY_TEXT);
    doc.text("Additional notes", margin, topY);
    topY += lineH;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    const notesLines = doc.splitTextToSize(quote.otherBms, contentWidth);
    doc.text(notesLines, margin, topY);
    topY += lineH * notesLines.length + 3;
  }

  topY += 4;

  // ── Products table ──
  const hasPrices = quote.products.some((p) => (p.price ?? 0) > 0);

  const tableColumns = hasPrices
    ? [
        { header: "#", dataKey: "idx" },
        { header: "Qty", dataKey: "qty" },
        { header: "Product No.", dataKey: "productNo" },
        { header: "Description", dataKey: "description" },
        { header: "Application", dataKey: "application" },
        { header: "Unit price", dataKey: "unitPrice" },
        { header: "Total", dataKey: "totalPrice" },
      ]
    : [
        { header: "#", dataKey: "idx" },
        { header: "Qty", dataKey: "qty" },
        { header: "Product No.", dataKey: "productNo" },
        { header: "Description", dataKey: "description" },
        { header: "Application", dataKey: "application" },
      ];

  const totalAmount = quote.products.reduce(
    (sum, p) => sum + (parseInt(p.qty) || 1) * (p.price ?? 0),
    0
  );

  const tableBody = quote.products.map((p, i) => {
    const qty = parseInt(p.qty) || 1;
    const price = p.price ?? 0;
    const row: Record<string, string> = {
      idx: String(i + 1),
      qty: p.qty,
      productNo: p.productNo,
      description: p.description,
      application: p.application,
    };
    if (hasPrices) {
      row.unitPrice = `$${price.toFixed(2)}`;
      row.totalPrice = `$${(qty * price).toFixed(2)}`;
    }
    return row;
  });

  const grandTotalRow: Record<string, string> = {
    idx: "",
    qty: "",
    productNo: "",
    description: "Grand Total",
    application: "",
  };
  if (hasPrices) {
    grandTotalRow.unitPrice = "";
    grandTotalRow.totalPrice = `$${totalAmount.toFixed(2)}`;
  }

  autoTable(doc, {
    startY: topY,
    columns: tableColumns,
    body: tableBody,
    foot: hasPrices ? [grandTotalRow] : undefined,
    theme: "grid",
    headStyles: {
      fillColor: [...PRIMARY],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "center",
      lineColor: [...PRIMARY],
      lineWidth: 0.15,
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [40, 40, 40],
      lineColor: [220, 220, 225],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    footStyles: {
      fillColor: [240, 242, 248],
      textColor: [...PRIMARY],
      fontStyle: "bold",
      fontSize: 8,
      halign: "right",
      lineColor: [200, 200, 210],
      lineWidth: 0.3,
    },
    columnStyles: hasPrices
      ? {
          idx: { cellWidth: 8, halign: "center" },
          qty: { cellWidth: 12, halign: "center" },
          productNo: { cellWidth: 30, fontStyle: "bold" },
          description: { cellWidth: "auto" },
          application: { cellWidth: 32 },
          unitPrice: { cellWidth: 22, halign: "right" },
          totalPrice: { cellWidth: 22, halign: "right" },
        }
      : {
          idx: { cellWidth: 8, halign: "center" },
          qty: { cellWidth: 12, halign: "center" },
          productNo: { cellWidth: 30, fontStyle: "bold" },
          description: { cellWidth: "auto" },
          application: { cellWidth: 32 },
        },
    margin: { left: margin, right: margin },
    tableLineWidth: 0.1,
    tableLineColor: [220, 220, 225],
  });

  // ── Footer ──
  const finalY = (doc as any).lastAutoTable.finalY + 12;

  if (finalY < pageHeight - 30) {
    doc.setDrawColor(210, 210, 215);
    doc.setLineWidth(0.2);
    doc.line(margin, finalY, pageWidth - margin, finalY);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY_LIGHT);
    doc.text(
      "This is a computer-generated document. No signature is required.",
      pageWidth / 2,
      finalY + 6,
      { align: "center" }
    );

    doc.setFont("helvetica", "italic");
    doc.text(
      "Intersys Solution Co., Ltd. — Integrated Security Systems",
      pageWidth / 2,
      finalY + 10.5,
      { align: "center" }
    );

    if (quote.companyType) {
      doc.setFont("helvetica", "normal");
      doc.text(
        `Company type: ${quote.companyType}`,
        pageWidth / 2,
        finalY + 15,
        { align: "center" }
      );
    }
  }

  doc.save(`BOQ_${quoteRef}.pdf`);
}
