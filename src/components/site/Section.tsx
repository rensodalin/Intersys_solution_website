import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  id,
  className,
  innerClassName,
  children,
  dark,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-24 md:py-32", dark && "bg-navy-deep text-white dark", className)}
    >
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("max-w-3xl mb-14", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] mb-4",
            invert ? "text-brand-red" : "text-brand-red",
          )}
        >
          <span className="h-px w-8 bg-brand-red" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]",
          invert ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            invert ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

