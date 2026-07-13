import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";
import ProductOption from "./model/productOption.js";
import ProductDocument from "./model/productDocument.js";
import Category from "./model/category.js";

dotenv.config();

function generateAIR41Options() {
  const lcdMap = { "0": "Concealed", "1": "Viewable" };
  const ledMap = { "0": "Concealed", "1": "Viewable" };
  const sensorMap = {
    T2:  "100 Ω Platinum RTD, IEC 751, 385 Alpha, thin film",
    T5:  "1801 Ω, NTC Thermistor, ±0.2°C",
    T6:  "3000 Ω, NTC Thermistor, ±0.2°C",
    T7:  "10,000 Ω, type 3, NTC Thermistor, ±0.2°C",
    T8:  "2.252K Ω, NTC Thermistor, ±0.2°C",
    T12: "1000 Ω, Platinum RTD, IEC 751, 385 Alpha, thin film",
    T13: "1000 Ω, Nickel RTD, Class B, DIN 43760",
    T14: "10K Ω, type 3, NTC Thermistor, ±0.2°C c/w 11K shunt resistor",
    T20: "20,000 Ω, NTC Thermistor, ±0.2°C",
    T24: "10,000 Ω, type 2, NTC Thermistor, ±0.2°C",
    T59: "10,000 Ω, 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const optMap = { S: "Pushbutton momentary switch - N.O.", R: "Relay output" };
  const result = [];
  for (const lcd of ["0", "1"]) {
    for (const led of ["0", "1"]) {
      for (const [sCode, sDesc] of Object.entries(sensorMap)) {
        for (const [oCode, oDesc] of Object.entries(optMap)) {
          result.push({
            partCode: `AIR41-${lcd}-${led}-${sCode}-${oCode}`,
            specification: `AIR41 Room Air Quality Monitor, 0-2000ppm CO2 Equivalent. LCD: ${lcdMap[lcd]}, LED: ${ledMap[led]}, Sensor: ${sDesc}, Option: ${oDesc}.`,
            price: 0,
            qty: 0
          });
        }
      }
    }
  }
  return result;
}

function generateAQDTOptions() {
  const enclosureMap = {
    B: "Polycarbonate with hinged and gasketed cover",
    F: "Same as B, with thread adapter & cable gland fitting"
  };
  const sensorMap = {
    "00": "None",
    "02": "100 Ω Platinum RTD, IEC 751, 385 Alpha, thin film",
    "05": "1801 Ω NTC Thermistor, ±0.2°C",
    "06": "3000 Ω NTC Thermistor, ±0.2°C",
    "07": "10,000 Ω Type 3, NTC Thermistor, ±0.2°C",
    "08": "2.252K Ω NTC Thermistor, ±0.2°C",
    "12": "1000 Ω Platinum RTD, IEC 751, 385 Alpha, thin film",
    "13": "1000 Ω Nickel RTD, Class B, DIN 43760",
    "14": "10,000 Ω Type 3, NTC Thermistor, ±0.2°C c/w 11,000 shunt resistor",
    "20": "20,000 Ω NTC Thermistor, ±0.2°C",
    "24": "10,000 Ω Type 2, NTC Thermistor, ±0.2°C",
    "59": "10,000 Ω, 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const result = [];
  for (const [eCode, eDesc] of Object.entries(enclosureMap)) {
    for (const [sCode, sDesc] of Object.entries(sensorMap)) {
      result.push({
        partCode: `AQDT-${eCode}-${sCode}`,
        specification: `AQDT Duct Air Quality Transmitter. Enclosure: ${eDesc}. Sensor: ${sDesc}.`,
        price: 0,
        qty: 0
      });
    }
  }
  return result;
}

function generateAVDTOptions() {
  const displayMap = { X: "None", M: "Metric (m/s, °C)", I: "Imperial (fpm, °F)" };
  const relayMap = { X: "None", R: "Adjustable relay (requires LCD)" };
  const result = [];
  for (const [dCode, dDesc] of Object.entries(displayMap)) {
    for (const [rCode, rDesc] of Object.entries(relayMap)) {
      if (rCode === "R" && dCode === "X") continue;
      result.push({
        partCode: `AVDT-${dCode}-${rCode}`,
        specification: `AVDT Duct Air Velocity Transmitter. Display: ${dDesc}. Relay: ${rDesc}.`,
        price: 0,
        qty: 0
      });
    }
  }
  return result;
}

function generateCDD3Options() {
  const modelMap = {
    A: "Room Carbon Dioxide Sensor w/ BACnet\u00AE Communications",
    B: "Room Carbon Dioxide Sensor, w/ Modbus Communications"
  };
  const dispMap = { "0": "Concealed", "1": "Viewable" };
  const cfgMap = { "-": "CO2 Only", T: "CO2 & Temperature", RH: "CO2, Humidity & Temperature" };
  const optList = ["P", "S", "R"];
  const optDesc = {
    P: "Setpoint control, 2 button up/down",
    S: "Exposed push button momentary switch - N.O.",
    R: "Relay Output"
  };
  const result = [];
  for (const [mC, mD] of Object.entries(modelMap)) {
    for (const [dC, dD] of Object.entries(dispMap)) {
      for (const [cC, cD] of Object.entries(cfgMap)) {
        for (let mask = 0; mask < (1 << optList.length); mask++) {
          let optCode = "";
          let optParts = [];
          for (let i = 0; i < optList.length; i++) {
            if (mask & (1 << i)) {
              optCode += optList[i];
              optParts.push(optDesc[optList[i]]);
            }
          }
          const partCode = `CDD3${mC}10${dC}${cC}${optCode}`;
          const optStr = optParts.length ? `, ${optParts.join(", ")}` : "";
          const spec = `${mD}, ${dD}, ${cD}${optStr}`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateHTRCOptions() {
  const rhMap = { "2": "2%", "3": "3%", "5": "5%" };
  const lcdMap = { N: "Concealed", L: "Viewable" };
  const outMap = { I: "4-20 mA", V: "0-5 Vdc or 0-10 Vdc (menu selectable)" };
  const optMap = { "": "", S: " with override switch" };
  const result = [];
  for (const [rhC, rhD] of Object.entries(rhMap)) {
    for (const [lcdC, lcdD] of Object.entries(lcdMap)) {
      for (const [outC, outD] of Object.entries(outMap)) {
        for (const [optC, optD] of Object.entries(optMap)) {
          const partCode = `HTRC${rhC}${lcdC}${outC}${optC}`;
          const spec = `HTRC Room Humidity/Temperature Transmitter, RH accuracy ${rhD}, ${lcdD} LCD display, ${outD} output${optD}.`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateLPOptions() {
  const encMap = {
    B: "Polycarbonate with hinged and gasketed cover",
    F: "Same as B, with thread adapter & cable gland fitting"
  };
  const outMap = {
    "00": "±4\", ±2\", ±1\", 0-4\", 0-2\", 0-1\" WC",
    "01": "±8\", ±5\", ±3\", 0-8\", 0-5\", 0-3\" WC",
    "02": "±12\", ±10\", ±6\", 0-12\", 0-10\", 0-6\" WC",
    "03": "±20\", ±15\", ±10\", 0-20\", 0-15\", 0-10\" WC",
    "04": "±1000 Pa, ±500 Pa, ±250 Pa, 0-1000 Pa, 0-500 Pa, 0-250 Pa",
    "05": "±2000 Pa, ±1000 Pa, ±500 Pa, 0-2000 Pa, 0-1000 Pa, 0-500 Pa",
    "06": "±40\", 30\", 10\", 0-40\", 0-30\", 0-10\" WC"
  };
  const prbMap = { X: "No Probe", S: "Static Probe" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [oC, oD] of Object.entries(outMap)) {
      for (const [pC, pD] of Object.entries(prbMap)) {
        const partCode = `LP${eC}${oC}${pC}`;
        const spec = `LP Series Low Pressure Transmitter, Enclosure ${eC} - ${eD}, Output ${oC} - ${oD}, Probe ${pC} - ${pD}.`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateTE200ASOptions() {
  const sensorMap = {
    "2": "100 Ω Platinum, IEC 751, 385 Alpha, thin film",
    "5": "1801 Ω NTC Thermistor, ±0.2°C",
    "6": "3000 Ω NTC Thermistor, ±0.2°C",
    "7": "10,000 Ω Type 3, NTC Thermistor, ±0.2°C",
    "8": "2.252K Ω NTC Thermistor, ±0.2°C",
    "12": "1000 Ω Platinum, IEC 751, 385 Alpha, thin film",
    "13": "1000 Ω Nickel, Class B, DIN 43760",
    "14": "10,000 Ω Type 3, NTC Thermistor, ±0.2°C c/w 11K shunt resistor",
    "20": "20,000 Ω NTC Thermistor, ±0.2°C",
    "24": "10,000 Ω Type 2, NTC Thermistor, ±0.2°C",
    "59": "10,000 Ω @ 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const optMap = {
    BS: "Exposed push button momentary switch - N.O.",
    GB: "Grayhill exposed push button - N.O., SPST, 3A",
    LY: "Yellow LED",
    LR: "Red LED",
    LG: "Green LED",
    CJ: "3.5mm Phono jack for remote system access",
    TP: "Tamperproof screws"
  };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [oC, oD] of Object.entries(optMap)) {
      const partCode = `TE200AS${sC}${oC}`;
      const spec = `TE200AS Stainless Steel Surface Temperature Sensor, Sensor: ${sD}, Option: ${oD}.`;
      result.push({ partCode, specification: spec });
    }
  }
  return result;
}

function generateCD2DTOptions() {
  const sensorMap = {
    XX: "No temperature sensor",
    "02": "100 ohm Platinum",
    "05": "1801 ohm Thermistor",
    "06": "3000 ohm Thermistor",
    "07": "10,000 ohm, T3 Thermistor",
    "08": "2.252 Kohm Thermistor",
    "12": "1000 ohm Platinum",
    "13": "1000 ohm Nickel",
    "14": "10,000 ohm, T3 Thermistor w/ 11K shunt resistor",
    "20": "20,000 ohm Thermistor",
    "24": "10,000 ohm, T2 Thermistor",
    "59": "10,000 ohm Thermistor"
  };
  const encMap = {
    B: "1/2 NPT",
    F: "1/2 NPT-M16 & Cable Gland"
  };
  const relMap = { X: "", R: ", Relay" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      for (const [rC, rD] of Object.entries(relMap)) {
        const partCode = `CD2DT${eC}${sC}${rC}`;
        const sensorPart = sC === "XX" ? "" : `, ${sD}`;
        const spec = `Carbon Dioxide Transmitter, Duct, ${eD}${sensorPart}${rD}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCD2OSOptions() {
  const sensorMap = {
    XX: "No temperature sensor",
    "02": "100 ohm Platinum",
    "05": "1801 ohm NTC Thermistor",
    "06": "3000 ohm NTC Thermistor",
    "07": "10,000 ohm Type 3 NTC Thermistor",
    "08": "2.252K ohm NTC Thermistor",
    "12": "1000 ohm Platinum",
    "13": "1000 ohm Nickel",
    "14": "10,000 ohm Type 3 NTC Thermistor c/w 11K shunt resistor",
    "20": "20,000 ohm NTC Thermistor",
    "24": "10,000 ohm Type 2 NTC Thermistor",
    "59": "10,000 ohm Thermistor"
  };
  const encMap = {
    H: "Outside, Weatherproof, Heated",
    N: "Outside, Weatherproof, Unheated"
  };
  const relMap = { X: "", R: ", Relay" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      for (const [rC, rD] of Object.entries(relMap)) {
        const partCode = `CD2OS${eC}${sC}${rC}`;
        const sensorPart = sC === "XX" ? "" : `, ${sD}`;
        const spec = `Carbon Dioxide Transmitter, ${eD}${sensorPart}${rD}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCD2RMCOptions() {
  const sensorMap = {
    XX: "No temperature sensor",
    "02": "100 ohm Platinum",
    "05": "1801 ohm Thermistor",
    "06": "3000 ohm Thermistor",
    "07": "10,000 ohm, T3 Thermistor",
    "08": "2.252 Kohm Thermistor",
    "12": "1000 ohm Platinum",
    "13": "1000 ohm Nickel",
    "14": "10,000 ohm, T3, Thermistor w/ 11K shunt resistor",
    "20": "20,000 ohm Thermistor",
    "24": "10,000 ohm, T2 Thermistor",
    "59": "10,000 ohm Thermistor"
  };
  const dispMap = { C: "Concealed LCD", V: "Viewable LCD" };
  const result = [];
  for (const [dC, dD] of Object.entries(dispMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      for (const rC of ["X", "R"]) {
        for (const oC of ["X", "S"]) {
          const partCode = `CD2RMC${dC}${sC}${rC}${oC}XXX`;
          let spec = `Carbon Dioxide Detector, Room, ${dD}`;
          if (sC !== "XX") spec += `, ${sD}`;
          if (rC === "R") spec += `, Relay`;
          if (oC === "S") spec += `, Override`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateCDD4A1Options() {
  const sensorMap = {
    "": "No temperature sensor",
    T2: "100 Ω Platinum, IEC 751, 385 Alpha, thin film",
    T5: "1801 Ω NTC Thermistor, ±0.2°C",
    T6: "3000 Ω NTC Thermistor, ±0.2°C",
    T7: "10,000 Ω Type 3, NTC Thermistor, ±0.2°C",
    T8: "2.252K Ω NTC Thermistor, ±0.2°C",
    T12: "1000 Ω Platinum, IEC 751, 385 Alpha, thin film",
    T13: "1000 Ω Nickel, Class B, DIN 43760",
    T14: "10,000 Ω Type 3, NTC Thermistor, ±0.2°C c/w 11,000 shunt resistor",
    T20: "20,000 Ω NTC Thermistor, ±0.2°C",
    T24: "10,000 Ω Type 2, NTC Thermistor, ±0.2°C",
    T59: "10,000 Ω, 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const dispMap = { "00": "Concealed LCD", "01": "Viewable LCD" };
  const result = [];
  for (const [dC, dD] of Object.entries(dispMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      for (const rC of ["", "R"]) {
        for (const oC of ["", "S"]) {
          const partCode = `CDD4A1${dC}${sC}${rC}${oC}`;
          let spec = `Carbon Dioxide Detector, Room, ${dD}`;
          if (sC) spec += `, ${sD}`;
          if (rC) spec += `, Adjustable Relay`;
          if (oC) spec += `, Override Switch`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateCDD4B1Options() {
  const sensorMap = {
    "-": "No temperature sensor",
    T2: "100 Ω Platinum, IEC 751, 385 Alpha, thin film",
    T5: "1801 Ω NTC Thermistor, ±0.2°C",
    T6: "3000 Ω NTC Thermistor, ±0.2°C",
    T7: "10,000 Ω Type 3, NTC Thermistor, ±0.2°C",
    T8: "2.252K Ω NTC Thermistor, ±0.2°C",
    T12: "1000 Ω Platinum, IEC 751, 385 Alpha, thin film",
    T13: "1000 Ω Nickel, Class B, DIN 43760",
    T14: "10,000 Ω Type 3, NTC Thermistor, ±0.2°C c/w 11,000 shunt resistor",
    T20: "20,000 Ω NTC Thermistor, ±0.2°C",
    T24: "10,000 Ω Type 2, NTC Thermistor, ±0.2°C",
    T59: "10,000 Ω, 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const dispMap = { "00": "Concealed LCD", "01": "Viewable LCD" };
  const result = [];
  for (const [dC, dD] of Object.entries(dispMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      for (const rC of ["-", "R"]) {
        for (const oC of ["-", "S"]) {
          const partCode = `CDD4B1${dC}${sC}${rC}${oC}`;
          let spec = `Carbon Dioxide Detector, Room, ${dD}`;
          if (sC !== "-") spec += `, ${sD}`;
          if (rC === "R") spec += `, Adjustable Relay`;
          if (oC === "S") spec += `, Override Switch`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateCDD4Options() {
  const modelMap = {
    A: "Room Carbon Dioxide Sensor, 0-2000 ppm",
    B: "Room Carbon Dioxide Sensor, 0-20,000 ppm"
  };
  const dispMap = { "0": "Concealed", "1": "Viewable" };
  const sensorMap = {
    "": "No temperature sensor",
    "2": "100 Ω Platinum, IEC 751, 385 Alpha, thin film, 3 wire",
    "5": "1801 Ω NTC Thermistor, ±0.2°C",
    "6": "3000 Ω, NTC Thermistor, ±0.2°C",
    "7": "10,000 Ω, Type 3, NTC Thermistor, ±0.2°C",
    "8": "2.252K Ω, NTC Thermistor, ±0.2°C",
    "12": "1000 Ω Platinum, IEC 751, 385 Alpha, thin film",
    "13": "1000 Ω Nickel, Class B, DIN 43760",
    "14": "10,000 Ω, Type 3, NTC Thermistor, ±0.2°C c/w 11K shunt resistor",
    "20": "20,000 Ω, NTC Thermistor, ±0.2°C",
    "24": "10,000 Ω, Type 2, NTC Thermistor, ±0.2°C",
    "59": "10,000 Ω @ 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const optList = ["P", "S", "R"];
  const optDesc = {
    P: "Linear slide pot for set point control",
    S: "Exposed push button momentary switch - N.O.",
    R: "Relay Output"
  };
  const result = [];
  for (const [mC, mD] of Object.entries(modelMap)) {
    for (const [dC, dD] of Object.entries(dispMap)) {
      for (const [sC, sD] of Object.entries(sensorMap)) {
        for (let mask = 0; mask < (1 << optList.length); mask++) {
          let optCode = "";
          let optParts = [];
          for (let i = 0; i < optList.length; i++) {
            if (mask & (1 << i)) {
              optCode += optList[i];
              optParts.push(optDesc[optList[i]]);
            }
          }
          const partCode = `CDD4${mC}10${dC}${sC}${optCode}`;
          let spec = `${mD}, ${dD}`;
          if (sC) spec += `, ${sD}`;
          if (optParts.length) spec += `, ${optParts.join(", ")}`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateCDD5Options() {
  const prodMap = {
    A: "Room Carbon Dioxide Detector, 0-2000ppm, Temp. & Humidity, 4-20 mA",
    B: "Room Carbon Dioxide Detector, 0-2000ppm, Temp. & Humidity, 0-5 or 0-10 Vdc",
    C: "Room Carbon Dioxide Detector, 0-20,000ppm, Temp. & Humidity, 4-20 mA",
    D: "Room Carbon Dioxide Detector, 0-20,000ppm, Temp. & Humidity, 0-5 or 0-10 Vdc"
  };
  const dispMap = { "0": "Concealed", "1": "Viewable" };
  const optMap = [
    ["P", "Setpoint control, 2 button up/down"],
    ["S", "Exposed push button momentary switch - N.O."],
    ["R", "Relay output"]
  ];
  const result = [];
  for (const [pC, pD] of Object.entries(prodMap)) {
    for (const [dC, dD] of Object.entries(dispMap)) {
      for (let mask = 0; mask < (1 << optMap.length); mask++) {
        let optCode = "";
        let optParts = [];
        for (let i = 0; i < optMap.length; i++) {
          if (mask & (1 << i)) {
            optCode += optMap[i][0];
            optParts.push(optMap[i][1]);
          }
        }
        const partCode = `CDD5${pC}10${dC}${optCode}`;
        const optStr = optParts.length ? `, ${optParts.join(", ")}` : "";
        const spec = `${pD}, ${dD}${optStr}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCDD5RoomOptions() {
  const prodMap = {
    A: "Room Carbon Dioxide Detector, 0-2000 ppm, Temperature & Humidity, 4-20 mA",
    B: "Room Carbon Dioxide Detector, 0-2000 ppm, Temperature & Humidity, 0-5 or 0-10 Vdc",
    C: "Room Carbon Dioxide Detector, 0-20,000 ppm, Temperature & Humidity, 4-20 mA",
    D: "Room Carbon Dioxide Detector, 0-20,000 ppm, Temperature & Humidity, 0-5 or 0-10 Vdc"
  };
  const dispMap = { "0": "Concealed", "1": "Viewable" };
  const optMap = [
    ["P", "Linear slide pot for set point control"],
    ["S", "Exposed push button momentary switch - N.O."],
    ["R", "Relay Output"]
  ];
  const result = [];
  for (const [pC, pD] of Object.entries(prodMap)) {
    for (const [dC, dD] of Object.entries(dispMap)) {
      for (let mask = 0; mask < (1 << optMap.length); mask++) {
        let optCode = "";
        let optParts = [];
        for (let i = 0; i < optMap.length; i++) {
          if (mask & (1 << i)) {
            optCode += optMap[i][0];
            optParts.push(optMap[i][1]);
          }
        }
        const partCode = `CDD5${pC}10${dC}${optCode}`;
        const optStr = optParts.length ? `, ${optParts.join(", ")}` : "";
        const spec = `${pD}, ${dD}${optStr}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCDD4OutsideOptions() {
  const encMap = { "300": "Heated", "400": "Unheated" };
  const sensorMap = {
    "": "No temperature sensor",
    T2: "100Ω Platinum, IEC 751, 385 Alpha, thin film, 3 wire",
    T5: "1801Ω NTC Thermistor, ±0.2°C",
    T6: "3000Ω NTC Thermistor, ±0.2°C",
    T7: "10,000Ω Type 3, NTC Thermistor, ±0.2°C",
    T8: "2.252KΩ NTC Thermistor, ±0.2°C",
    T12: "1000Ω Platinum, IEC 751, 385 Alpha, thin film",
    T13: "1000Ω Nickel, Class B, DIN 43760",
    T14: "10,000Ω Type 3, NTC Thermistor, ±0.2°C c/w 11,000 shunt resistor",
    T20: "20,000Ω NTC Thermistor, ±0.2°C",
    T24: "10,000Ω Type 2, NTC Thermistor, ±0.2°C",
    T59: "10,000Ω @ 25°C, ±1%, B = 3435 ±1% (25/85)"
  };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      for (const rC of ["", "R"]) {
        const partCode = `CDD4B${eC}${sC}${rC}`;
        let spec = `Carbon Dioxide Detector, Outside, ${eD}`;
        if (sC) spec += `, ${sD}`;
        if (rC) spec += `, Relay Output`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCDDTOptions() {
  const base = "Duct CO2 Transmitter, Dual Channel NDIR, diffusion sampling, 0-20,000 ppm adjustable";
  const sensorMap = {
    "00": "",
    "02": ", 100 Ohm Platinum RTD",
    "05": ", 1801 Ohm NTC Thermistor",
    "06": ", 3000 Ohm NTC Thermistor",
    "07": ", 10,000 Ohm, Type 3, NTC Thermistor",
    "08": ", 2.25K Ohm NTC Thermistor",
    "12": ", 1000 Ohm Platinum RTD",
    "13": ", 1000 Ohm Nickel RTD",
    "14": ", 10,000 Ohm, Type 3, NTC Thermistor c/w 11K shunt resistor",
    "20": ", 20,000 Ohm NTC Thermistor",
    "24": ", 10,000 Ohm, Type 2, NTC Thermistor"
  };
  const result = [];
  for (const enc of ["B", "F"]) {
    for (const rel of ["X", "R"]) {
      for (const [sC, sD] of Object.entries(sensorMap)) {
        const partCode = `CDDT${enc}2${rel}${sC}`;
        const relayPart = rel === "R" ? ", Relay" : "";
        const encPart = enc === "F" ? ", M16 thread adapter & cable gland" : "";
        const spec = base + relayPart + sD + encPart;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCEDTOptions() {
  const base = "Duct CO2 Transmitter, 0-2000 pmm, Analog Output";
  const sensorMap = {
    "00": "",
    "02": ", 100 Ohm Platinum RTD",
    "05": ", 1801 Ohm Thermistor",
    "06": ", 3000 Ohm Thermistor",
    "07": ", 10,000 Ohm Type 3 Thermistor",
    "08": ", 1801 Ohm Thermistor",
    "12": ", 1000 Ohm Platinum RTD",
    "13": ", 1000 Ohm Nickel RTD",
    "14": ", 10,000 Ohm Type 3 Thermistor with 11K Shunt resistor",
    "20": ", 20,000 Ohm Thermistor",
    "24": ", 10,000 Ohm Type 2 Thermistor"
  };
  const result = [];
  for (const enc of ["B", "F"]) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      const partCode = `CEDT${enc}${sC}`;
      const encSuffix = enc === "F" ? ", M16 thread adapter and cable gland fitting" : "";
      const spec = base + sD + encSuffix;
      result.push({ partCode, specification: spec });
    }
  }
  return result;
}

function generateCERMCOptions() {
  const base = "Room CO2 Transmitter, 0-2000 pmm, Analog Output";
  const sensorMap = {
    "00": "",
    "02": ", 100 Ohm Platinum RTD",
    "05": ", 1801 Ohm Thermistor",
    "06": ", 3000 Ohm Thermistor",
    "07": ", 10,000 Ohm Type 3 Thermistor",
    "08": ", 1801 Ohm Thermistor",
    "12": ", 1000 Ohm Platinum RTD",
    "13": ", 1000 Ohm Nickel RTD",
    "14": ", 10,000 Ohm Type 3 Thermistor with 11K Shunt resistor",
    "20": ", 20,000 Ohm Thermistor",
    "24": ", 10,000 Ohm Type 2 Thermistor"
  };
  return Object.entries(sensorMap).map(([sC, sD]) => ({
    partCode: `CERMC${sC}`,
    specification: base + sD
  }));
}

function generateCHTDTOptions() {
  const base = "Duct CO2, Humidity & Temperature Transmitter, Single Channel NDIR, diffusion sampling, 0-2000 ppm";
  const outDesc = {
    I: "Current 4-20mA",
    V: "Voltage 0-5 Vdc, 0-10 Vdc, field selectable",
    B: "BACnet\u00AE Communications",
    M: "Modbus Communications"
  };
  const result = [];
  for (const enc of ["B", "F"]) {
    for (const [out, oD] of Object.entries(outDesc)) {
      for (const rel of ["X", "R"]) {
        const partCode = `CHTDT${enc}1${out}${rel}`;
        const relayPart = rel === "R" ? "Relay, " : "";
        const encPart = enc === "F" ? ", M16 thread adapter & cable gland" : "";
        const spec = `${base}, ${relayPart}${oD}${encPart}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateCMD5B1Options() {
  const base = "CO detector, 5% electrochemical, Room, 0-300 PPM range";
  const combos = [
    { relay: "000", output: "", spec: base + " 4-20mA output" },
    { relay: "000", output: "010", spec: base + " 0-10 Vdc output" },
    { relay: "000", output: "-MOD", spec: base + ", Modbus communications" },
    { relay: "100", output: "", spec: base + " 4-20mA & relay output." },
    { relay: "100", output: "010", spec: base + " 0-10 Vdc & relay output" }
  ];
  return combos.map(c => ({
    partCode: `CMD5B1${c.relay}${c.output}`,
    specification: c.spec
  }));
}

function generateCMD5B5Options() {
  const relayMap = { "000": "", "100": ", relay", "110": ", two relays" };
  const commMap = {
    "": " and status LED.",
    "BAC": ", status LED and BACnet communications.",
    "MOD": ", status LED and Modbus communications."
  };
  const base = "CO detector, 5% electrochemical, Duct, selectable Ranges and outputs, LCD display, test switch";
  const result = [];
  for (const [rC, rD] of Object.entries(relayMap)) {
    for (const [cC, cD] of Object.entries(commMap)) {
      const partCode = `CMD5B5${rC}${cC ? `-${cC}` : ""}`;
      const spec = base + rD + cD;
      result.push({ partCode, specification: spec });
    }
  }
  return result;
}

function generateCMD5B1TempOptions() {
  const relayMap = { "000": "No Relay", "100": "With Relay" };
  const sensorMap = {
    T2: "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film, 3 wire",
    T5: "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C",
    T6: "3000 \u03A9, NTC Thermistor, \u00B10.2\u00B0C",
    T7: "10,000 \u03A9, Type 3, NTC Thermistor, \u00B10.2\u00B0C",
    T8: "2.252K \u03A9, NTC Thermistor, \u00B10.2\u00B0C",
    T12: "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film",
    T13: "1000 \u03A9 Nickel, Class B, DIN 43760",
    T14: "10,000 \u03A9, Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor",
    T20: "20,000 \u03A9, NTC Thermistor, \u00B10.2\u00B0C",
    T24: "10,000 \u03A9, Type 2, NTC Thermistor, \u00B10.2\u00B0C"
  };
  const base = "CMD5B1 Wall/Surface Mount Carbon Monoxide Detector";
  const result = [];
  for (const [rC, rD] of Object.entries(relayMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      const partCode = `CMD5B1${rC}${sC}`;
      const spec = `${base}, ${rD}, ${sD}`;
      result.push({ partCode, specification: spec });
    }
  }
  return result;
}

function generateWLDCOptions() {
  const base = "WLDC Water Detector with Conductivity Cable";
  const relayMap = { "1": "1 Relay", "2": "2 Relay" };
  const leaderMap = { "00": "No Leader Cable", "02": "2m (6.5') Leader Cable", "05": "5m (16.4') Leader Cable", "10": "10m (32.8') Leader Cable" };
  const condMap = { C002: "2m (6.5') Conductivity Cable", C003: "3m (9.8') Conductivity Cable", C005: "5m (16.4') Conductivity Cable", C010: "10m (32.8') Conductivity Cable", C015: "15m (49.2') Conductivity Cable", C020: "20m (65.6') Conductivity Cable", C050: "50m (164') Conductivity Cable" };
  const result = [];
  for (const [rC, rD] of Object.entries(relayMap)) {
    for (const [lC, lD] of Object.entries(leaderMap)) {
      for (const [cC, cD] of Object.entries(condMap)) {
        const partCode = `WLDC${rC}${lC}${cC}`;
        const spec = `${base}, ${rD}, ${lD}, ${cD}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateWLD2SOptions() {
  const base = "WLD2S Water Detector, Dual Channel, Spot";
  const ch2Map = { R: { label: "Remote Spot", cables: { "00": "None", "02": "2m (6.5') Remote Cable", "05": "5m (16.4') Remote Cable", "10": "10m (32.8') Remote Cable" }, condSuffix: "" }, C: { label: "Conductivity Cable", cables: { "00": "No Leader Cable", "02": "2m (6.5') Leader Cable", "05": "5m (16.4') Leader Cable", "10": "10m (32.8') Leader Cable" }, condSuffix: ", {condDesc}" } };
  const condMap = { C000: "", C002: "2m (6.5') Conductivity Cable", C003: "3m (9.8') Conductivity Cable", C005: "5m (16.4') Conductivity Cable", C010: "10m (32.8') Conductivity Cable", C015: "15m (49.2') Conductivity Cable", C020: "20m (65.6') Conductivity Cable", C050: "50m (164') Conductivity Cable" };
  const result = [];
  for (const [chC, chD] of Object.entries(ch2Map)) {
    for (const [cblC, cblD] of Object.entries(chD.cables)) {
      for (const [condC, condD] of Object.entries(condMap)) {
        if (chC === "R" && condC !== "C000") continue;
        if (chC === "C" && condC === "C000") continue;
        const partCode = `WLD2S${chC}${cblC}${condC}`;
        const condPart = condD ? `, ${condD}` : "";
        const spec = `${base}, ${chD.label}, ${cblD}${condPart}`;
        result.push({ partCode, specification: spec });
      }
    }
  }
  return result;
}

function generateWLD2ROptions() {
  const base = "WLD2R Water Detector, Dual Channel, Remote Spot";
  const cableMap = { "00": "No Cable (Remote Sensor Probes Only)", "02": "2 m (6.5')", "05": "5 m (16.4')", "10": "10 m (32.8')" };
  const leaderMap = { "00": "No Cable (Remote Spot includes Sensing Probes Only)", "02": "2m (6.5') Leader Cable", "05": "5m (16.4') Leader Cable", "10": "10m (32.8') Leader Cable" };
  const condMap = { C000: "", C002: "2m (6.5') Conductivity Cable", C003: "3m (9.8') Conductivity Cable", C005: "5m (16.4') Conductivity Cable", C010: "10m (32.8') Conductivity Cable", C015: "15m (49.2') Conductivity Cable", C020: "20m (65.6') Conductivity Cable", C050: "50m (164') Conductivity Cable" };
  const result = [];
  for (const [c1C, c1D] of Object.entries(cableMap)) {
    for (const ch2 of ["R", "C"]) {
      if (ch2 === "R") {
        for (const [c2C, c2D] of Object.entries(cableMap)) {
          const partCode = `WLD2R${c1C}R${c2C}C000`;
          const spec = `${base}, Channel 1: ${c1D}, Channel 2: Remote Spot, ${c2D}`;
          result.push({ partCode, specification: spec });
        }
      } else {
        for (const [lC, lD] of Object.entries(leaderMap)) {
          for (const [condC, condD] of Object.entries(condMap)) {
            if (condC === "C000") continue;
            const partCode = `WLD2R${c1C}C${lC}${condC}`;
            const spec = `${base}, Channel 1: ${c1D}, Channel 2: Conductivity, ${lD}, ${condD}`;
            result.push({ partCode, specification: spec });
          }
        }
      }
    }
  }
  return result;
}

function generateWLD2COptions() {
  const base = "WLD2C Water Detector, 2 Channel, Conductivity Cable";
  const leaderDesc = { "00": "No Leader Cable", "02": "2m (6.5') Leader Cable", "05": "5m (16.4') Leader Cable", "10": "10m (32.8') Leader Cable" };
  const condDesc = { C002: "2m (6.5') Conductivity Cable", C003: "3m (9.8') Conductivity Cable", C005: "5m (16.4') Conductivity Cable", C010: "10m (32.8') Conductivity Cable", C015: "15m (49.2') Conductivity Cable", C020: "20m (65.6') Conductivity Cable", C050: "50m (164') Conductivity Cable" };
  const result = [];
  for (const [l1C, l1D] of Object.entries(leaderDesc)) {
    for (const [c1C, c1D] of Object.entries(condDesc)) {
      for (const [l2C, l2D] of Object.entries(leaderDesc)) {
        const l2Code = `L${l2C}`;
        for (const [c2C, c2D] of Object.entries(condDesc)) {
          const partCode = `WLD2C${l1C}${c1C}${l2Code}${c2C}`;
          const spec = `${base}, Channel 1: ${l1D}, ${c1D}, Channel 2: ${l2D}, ${c2D}`;
          result.push({ partCode, specification: spec });
        }
      }
    }
  }
  return result;
}

function generateTXSOOptions() {
  return [
    { partCode: "TXSOA12XA001", specification: "S/S Clamp Strap-on Temperature Transmitter, 50 mm (2\"), 0-35C, 4-20 mA" },
    { partCode: "TXSOA12XA002", specification: "S/S Clamp Strap-on Temperature Transmitter, 50 mm (2\"), 0-50C, 4-20 mA" },
    { partCode: "TXSOA12XA003", specification: "S/S Clamp Strap-on Temperature Transmitter, 50 mm (2\"), 0-100C, 4-20 mA" }
  ];
}

function generateTXRCOptions() {
  const outMap = { A: "4-20 mA", D: "0-5 Vdc", E: "0-10 Vdc" };
  const rangeMap = { "1": "0 to 35\u00B0C (32 to 95\u00B0F)", "2": "0 to 50\u00B0C (32 to 122\u00B0F)" };
  const result = [];
  for (const [oC, oD] of Object.entries(outMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TXRC12${oC}${rC}`, specification: `Room Temperature Transmitter, 1000 \u03A9 Platinum RTD, ${oD} Output, ${rD} Range` });
    }
  }
  return result;
}

function generateTXRCLOptions() {
  const outMap = { A: "4-20 mA", D: "0-5 Vdc", E: "0-10 Vdc" };
  const result = [];
  for (const [oC, oD] of Object.entries(outMap)) {
    result.push({ partCode: `TXRCL${oC}`, specification: `Room Temperature Transmitter with LCD Display, ${oD} Output, no option` });
    result.push({ partCode: `TXRCL${oC}S`, specification: `Room Temperature Transmitter with LCD Display, ${oD} Output, Exposed push button switch (N.O.)` });
  }
  return result;
}

function generateTXOSOptions() {
  return [
    { partCode: "TXOSA12XA002", specification: "Outside Temperature Transmitter, 0-50 C, 4-20 mA" },
    { partCode: "TXOSA12XA006", specification: "Outside Temperature Transmitter, -50-50 C, 4-20 mA" }
  ];
}

function generateTXOBOptions() {
  const encMap = {
    A: "Outside Temperature Transmitter, Sun/Wind Shield, Bracket",
    E: "Outside Temperature Transmitter, Sun/Wind Shield, Bracket, Cable Gland"
  };
  const outMap = { A: "4-20mA", D: "0-5VDC", E: "0-10VDC" };
  const rangeMap = { "001": "0/35C (32/95F)", "002": "0/50C (32/122F)", "006": "-50/50C (-58/122F)" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [oC, oD] of Object.entries(outMap)) {
      for (const [rC, rD] of Object.entries(rangeMap)) {
        result.push({ partCode: `TXOB${eC}12X${oC}${rC}`, specification: `${eD}, ${oD}, ${rD}` });
      }
    }
  }
  return result;
}

function generateTXGLOptions() {
  return [
    { partCode: "TXGLA12XA002", specification: "Glass Temperature Transmitter, 0-50C, 4-20 mA" }
  ];
}

function generateTXFLOptions() {
  return [
    { partCode: "TXFLA12XA001", specification: "Flying Lead Strap-on Temperature Transmitter, 50 mm (2\"), 0-100C, 4-20 mA" }
  ];
}

function generateTXDROptions() {
  const probeMap = { F: "450 mm (18\")", G: "600 mm (24\")", H: "900 mm (36\")" };
  const rangeMap = { "001": "0-35C", "002": "0-50C", "003": "0-100C" };
  const result = [];
  for (const [pC, pD] of Object.entries(probeMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TXDRA12${pC}A${rC}`, specification: `Rigid Duct Average Temperature Transmitter, ${pD}, ${rD}, 4-20 mA` });
    }
  }
  return result;
}

function generateTXDFOptions() {
  const probeMap = { I: "1800 mm (6')", J: "3600 mm (12')", K: "6100 mm (20')", L: "7300 mm (24')" };
  const rangeMap = { "001": "0-35C", "002": "0-50C", "003": "0-100C" };
  const result = [];
  for (const [pC, pD] of Object.entries(probeMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TXDFA12${pC}A${rC}`, specification: `Flex Duct Average Temperature Transmitter, ${pD}, ${rD}, 4-20 mA` });
    }
  }
  return result;
}

function generateTXDCOptions() {
  const probeMap = { I: "1800 mm (6')", J: "3600 mm (12')", K: "6100 mm (20')", L: "7300 mm (24')" };
  const rangeMap = { "001": "0-35C", "002": "0-50C", "003": "0-100C" };
  const result = [];
  for (const [pC, pD] of Object.entries(probeMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TXDCA12${pC}A${rC}`, specification: `Copper Duct Average Temperature Transmitter, ${pD}, ${rD}, 4-20 mA` });
    }
  }
  return result;
}

function generateTXAPOptions() {
  const probeMap = { A: "50 mm (2\")", B: "100 mm (4\")", C: "150 mm (6\")", D: "200 mm (8\")", E: "300 mm (12\")", F: "450 mm (18\")" };
  const outMap = { A: "4-20 mA", D: "0-5 Vdc", E: "0-10 Vdc" };
  const rangeMap = { "001": "0-35C", "002": "0-50C", "003": "0-100C" };
  const result = [];
  for (const [pC, pD] of Object.entries(probeMap)) {
    for (const [oC, oD] of Object.entries(outMap)) {
      for (const [rC, rD] of Object.entries(rangeMap)) {
        result.push({ partCode: `TXAPA12${pC}${oC}${rC}`, specification: `Duct/Immersion Temperature Transmitter, ${pD}, ${rD}, ${oD}` });
      }
    }
  }
  return result;
}

function generateTSSOOptions() {
  return [
    { partCode: "TSSOA02X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 100 ohm Platinum RTD" },
    { partCode: "TSSOA05X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 1801 ohm Thermistor" },
    { partCode: "TSSOA06X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 3000 ohm Thermistor" },
    { partCode: "TSSOA07X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 10K Type 3 Thermistor" },
    { partCode: "TSSOA08X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 2.252K Thermistor" },
    { partCode: "TSSOA12X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 1000 ohm Platinum RTD" },
    { partCode: "TSSOA13X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 1000 ohm Nickel" },
    { partCode: "TSSOA14X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 10K Type 3 Thermistor c/w 11K Shunt Resistor" },
    { partCode: "TSSOA20X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 20K Thermistor" },
    { partCode: "TSSOA24X", specification: "Strap-on Temperature Sensor, 10\" S/S Clamp, 10K Type 2 Thermistor" }
  ];
}

function generateTSSLOptions() {
  const sensorMap = { "02": "100 Ohm Plat", "05": "1801 Ohm Ther", "06": "3K Ohm Ther", "07": "10K Ohm, T3 Ther", "08": "2.252K Ohm Ther", "12": "1000 Ohm Plat", "13": "1000 Ohm Nick", "14": "10K Ohm, T3 Ther, 11K Shunt", "20": "20K Ohm Ther", "24": "10K Ohm, T2 Ther", "59": "10K Ohm Ther" };
  const wireMap = { ZW: "PVC Zip Wire - 22 AWG", FT: "Plenum rated FT-6 - 22 AWG", MP: "Moisture Proof Burial - 20 AWG", MS: "Moisture Proof Submersible - 20 AWG" };
  const lenMap = { "001": "1m (3.3')", "003": "3 m (9.8')", "005": "5 m (16.4')", "010": "10 m (32.8')", "020": "20 m (65.6')", "030": "30 m (98.5')" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [wC, wD] of Object.entries(wireMap)) {
      if (sC === "02" && wC === "ZW") continue;
      for (const [lC, lD] of Object.entries(lenMap)) {
        result.push({ partCode: `TSSLX${sC}${wC}${lC}`, specification: `Temperature Sensor, Slab, ${sD}, ${wD}, ${lD}` });
      }
    }
  }
  return result;
}

function generateTSRPOptions() {
  const sensorMap = { "02": "100 ohm Platinum RTD", "05": "1801 ohm Thermistor", "06": "3000 ohm Thermistor", "07": "10K Type 3 Thermistor", "08": "2.252K Thermistor", "12": "1000 ohm Platinum RTD", "13": "1000 ohm Nickel", "14": "10K Type 3 Thermistor c/w 11K Shunt Resistor", "20": "20K Thermistor", "24": "10K Type 2 Thermistor" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    result.push({ partCode: `TSRPA${sC}A`, specification: `Remote Probe Strap-on Temperature Sensor, 2\" S/S, 5' Cable, ${sD}` });
  }
  return result;
}

function generateTSRCOptions() {
  const sensorMap = { "2": "100 ohm RTD", "5": "1800 ohm thermistor", "6": "3000 ohm thermistor", "7": "10,000 ohm type 3 thermistor", "8": "2.252K ohm thermistor", "12": "1000 ohm RTD", "13": "1000 ohm nickel RTD", "14": "10,000 ohm type 3 thermistor with 11K shunt resistor", "20": "20,000 ohm thermistor", "24": "10,000 ohm type 2 thermistor" };
  const optMap = { "": "", C: ", c/w LCD", CP: ", c/w LCD and slide pot", CPS: ", c/w LCD, slide pot & override button", E: ", c/w communication jack.", EPS: ", c/w slide pot & override button & communication jack.", ES: ", c/w override button & communication jack.", P: ", c/w slide pot.", PS: ", c/w slide pot & override button.", S: ", c/w override button." };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [oC, oD] of Object.entries(optMap)) {
      result.push({ partCode: `TSRC${sC}${oC}`, specification: `Room Temperature Sensor, ${sD}${oD}` });
    }
  }
  return result;
}

function generateTSPCOptions() {
  const sensorDescs = { "2": "100 ohm platinum RTD", "5": "1801 ohm thermistor", "6": "3000 ohm thermistor", "7": "10K type 3 thermistor", "8": "2.252K ohm thermistor", "12": "1000 ohm platinum RTD", "13": "1000 ohm nickel RTD", "14": "10K type 3 thermistor c/w 11K shunt resistor", "20": "20,000 ohm thermistor", "24": "10K type 2 thermistor" };
  const stdSetpoint = "0 - 10,000 ohms (20 steps between 16C-26C or 60F-80F)";
  const specialSetpoint = "8000.7 ohms - 3107.3 ohms (20 steps between 16C-26C or 60F-80F)";
  const optDesc = { "": ".", S: " with exposed override switch.", E: " with external jack for communications.", ES: " with external jack for communications and exposed override switch.", EF: " with fan speed switch, and external jack for communications.", EFS: " with external jack for communications, exposed override switch and fan speed switch.", FS: " with fan speed switch and exposed override switch." };
  const sensorOpts = { "2": ["", "S", "E", "ES"], "5": ["", "S", "E", "ES", "FS"], "6": ["", "S", "E", "ES"], "7": ["", "S", "E", "ES", "EF"], "8": ["", "S", "E", "ES"], "12": ["", "S", "E", "ES"], "13": ["", "S", "E", "ES"], "14": ["", "S", "E", "ES"], "20": ["", "S", "E", "ES"], "24": ["", "S", "E", "ES", "EFS"] };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorDescs)) {
    const sp = sC === "20" ? specialSetpoint : stdSetpoint;
    const baseCode = sC === "20" ? "P6" : "P";
    for (const opt of sensorOpts[sC]) {
      result.push({ partCode: `TSPC${sC}${baseCode}${opt}`, specification: `Microprocessor based Temperature Sensor with LCD display, ${sD}, setpoint resistance to be ${sp}${optDesc[opt]}` });
    }
  }
  return result;
}

function generateTSOSOptions() {
  const sensorMap = { "02": "100 ohm Platinum RTD", "05": "1801 ohm Thermistor", "06": "3000 ohm Thermistor", "07": "10K Type 3 Thermistor", "08": "2.252K Thermistor", "12": "1000 ohm Platinum RTD", "13": "1000 ohm Nickel", "14": "10K Type 3 Thermistor c/w 11K Shunt Resistor", "20": "20K Thermistor", "24": "10K Type 2 Thermistor" };
  return Object.entries(sensorMap).map(([sC, sD]) => ({ partCode: `TSOSA${sC}X`, specification: `Outside Temperature Sensor, ${sD}` }));
}

function generateTSOBOptions() {
  const encMap = { A: "Polycarbonate, with hinged and gasketed cover", C: "Same as A, with terminal block", E: "Same as C, with cable gland fitting" };
  const sensorMap = { "02X": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05X": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06X": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07X": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08X": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12X": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13X": "1000 \u03A9 Nickel, Class B, DIN 43760", "14X": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20X": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24X": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C", "59X": "10,000 \u03A9, 25\u00B0C, \u00B11%, B = 3435 \u00B11% (25/85)" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [sC, sD] of Object.entries(sensorMap)) {
      result.push({ partCode: `TSOB${eC}${sC}`, specification: `Outside Temperature Sensor, ${eD}, ${sD}` });
    }
  }
  return result;
}

function generateTSGLOptions() {
  const sensorMap = { "02X": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05X": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06X": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07X": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08X": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12X": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13X": "1000 \u03A9 Nickel, Class B, DIN 43760", "14X": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20X": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24X": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C", "59X": "10,000 \u03A9, 25\u00B0C, \u00B11%, B = 3435 \u00B11% (25/85)" };
  return Object.entries(sensorMap).map(([sC, sD]) => ({ partCode: `TSGLX${sC}`, specification: `Glass Temperature Sensor, ${sD}` }));
}

function generateTSFLOptions() {
  const sensorMap = { "02X": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05X": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06X": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07X": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08X": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12X": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13X": "1000 \u03A9 Nickel, Class B, DIN 43760", "14X": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20X": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24X": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C", "59X": "10,000 \u03A9, 25\u00B0C, \u00B11%, B = 3435 \u00B11% (25/85)" };
  return Object.entries(sensorMap).map(([sC, sD]) => ({ partCode: `TSFLX${sC}`, specification: `Flying Lead Temperature Sensor, ${sD}` }));
}

function generateTSDROptions() {
  const sensorMap = { "02": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13": "1000 \u03A9 Nickel, Class B, DIN 43760", "14": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C" };
  const lenMap = { F: "18\"", G: "24\"", H: "36\"" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      result.push({ partCode: `TSDRA${sC}${lC}`, specification: `Rigid Duct Average Temperature Sensor, ${lD} S/S, ${sD}` });
    }
  }
  return result;
}

function generateTSDFOptions() {
  const sensorMap = { "02": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13": "1000 \u03A9 Nickel, Class B, DIN 43760", "14": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C" };
  const lenMap = { I: "6'", J: "12'", K: "20'", L: "24'" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      result.push({ partCode: `TSDFA${sC}${lC}`, specification: `Flex Duct Average Temperature Sensor, ${lD} FT-6, ${sD}` });
    }
  }
  return result;
}

function generateTSDCOptions() {
  const sensorMap = { "02": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13": "1000 \u03A9 Nickel, Class B, DIN 43760", "14": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C" };
  const lenMap = { I: "6'", J: "12'", K: "20'", L: "24'" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      result.push({ partCode: `TSDCA${sC}${lC}`, specification: `Duct Average Temperature Sensor, ${lD} Copper, ${sD}` });
    }
  }
  return result;
}

function generateTSBTAOptions() {
  const sensorMap = { "02": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13": "1000 \u03A9 Nickel, Class B, DIN 43760", "14": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C", "59": "10,000 \u03A9, 25\u00B0C, \u00B11%, B = 3435 \u00B11% (25/85)" };
  const wireLenMap = { ZW15: "PVC Zip Wire, 1.5 m (5')", FT30: "Plenum rated FT-6, 3 m (10')" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [wC, wD] of Object.entries(wireLenMap)) {
      result.push({ partCode: `TSBTA${sC}${wC}`, specification: `Button Temperature Sensor, White Plastic, ${sD}, ${wD}` });
    }
  }
  return result;
}

function generateTSAPOptions() {
  const sensorMap = { "02": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "05": "1801 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "06": "3000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "07": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C", "08": "2.252K \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "12": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film", "13": "1000 \u03A9 Nickel, Class B, DIN 43760", "14": "10,000 \u03A9 Type 3, NTC Thermistor, \u00B10.2\u00B0C c/w 11K shunt resistor", "20": "20,000 \u03A9 NTC Thermistor, \u00B10.2\u00B0C", "24": "10,000 \u03A9 Type 2, NTC Thermistor, \u00B10.2\u00B0C" };
  const lenMap = { A: "2\"", B: "4\"", C: "6\"", D: "8\"", E: "12\"", F: "18\"" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      result.push({ partCode: `TSAPA${sC}${lC}`, specification: `Duct/Immersion Temperature Sensor, ${lD}, ${sD}` });
    }
  }
  return result;
}

function generateTNROptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const protoMap = { AB: "BACnet", AM: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    const specBase = eC === "A" ? "Network Temperature Remote Probe Strap-on, 50 mm (2\")" : "Network Temperature Remote Probe Strap-on, 50 mm (2\"), 1/2 NPT - M16 Adapter and Cable Gland";
    for (const [pC, pD] of Object.entries(protoMap)) {
      result.push({ partCode: `TNRP${eC}20${pC}`, specification: `${specBase}, ${pD}` });
    }
  }
  return result;
}

function generateTNOSOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with cable gland fitting" };
  const protoMap = { XB: "BACnet", XM: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    const specBase = eC === "A" ? "Network Temperature Outside" : "Network Temperature Outside, Cable Gland";
    for (const [pC, pD] of Object.entries(protoMap)) {
      result.push({ partCode: `TNOS${eC}20${pC}`, specification: `${specBase}, ${pD}` });
    }
  }
  return result;
}

function generateTNOBOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with cable gland fitting" };
  const protoMap = { XB: "BACnet", XM: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    const specBase = eC === "A" ? "Network Outside Temperature, Sun/Wind Shield, Bracket" : "Network Outside Temperature, Sun/Wind Shield, Bracket, Cable Gland";
    for (const [pC, pD] of Object.entries(protoMap)) {
      result.push({ partCode: `TNOB${eC}20${pC}`, specification: `${specBase}, ${pD}` });
    }
  }
  return result;
}

function generateTNGLOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const protoMap = { XB: "BACnet", XM: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    const specBase = eC === "A" ? "Network Temperature Glass" : "Network Temperature Glass, 1/2 NPT - M16 Adapter and Cable Gland";
    for (const [pC, pD] of Object.entries(protoMap)) {
      result.push({ partCode: `TNGL${eC}20${pC}`, specification: `${specBase}, ${pD}` });
    }
  }
  return result;
}

function generateTNFLOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const protoMap = { XB: "BACnet", XM: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    const specBase = eC === "A" ? "Network Temperature Flying Lead" : "Network Temperature Flying Lead, 1/2 NPT - M16 Adapter and Cable Gland";
    for (const [pC, pD] of Object.entries(protoMap)) {
      result.push({ partCode: `TNFL${eC}20${pC}`, specification: `${specBase}, ${pD}` });
    }
  }
  return result;
}

function generateTNDROptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const lenMap = { F: "450 mm (18\")", G: "600 mm (24\")", H: "900 mm (36\")" };
  const protoMap = { B: "BACnet", M: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      const specBase = eC === "A" ? `Network Temperature Duct Average, Rigid S/S, ${lD}` : `Network Temperature Duct Average, Rigid S/S, ${lD}, 1/2 NPT - M16 Adapter and Cable Gland`;
      for (const [pC, pD] of Object.entries(protoMap)) {
        result.push({ partCode: `TNDR${eC}20${lC}${pC}`, specification: `${specBase}, ${pD}` });
      }
    }
  }
  return result;
}

function generateTNDFOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const lenMap = { I: "1800 mm (6')", J: "3600 mm (12')", K: "6100 mm (20')", L: "7300 mm (24')" };
  const protoMap = { B: "BACnet", M: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      const specBase = eC === "A" ? `Network Temperature Duct Average, Flexible cable, ${lD}` : `Network Temperature Duct Average, Flexible cable, 1/2 NPT - M16 Adapter and Cable Gland, ${lD}`;
      for (const [pC, pD] of Object.entries(protoMap)) {
        result.push({ partCode: `TNDF${eC}20${lC}${pC}`, specification: `${specBase}, ${pD}` });
      }
    }
  }
  return result;
}

function generateTNDCOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const lenMap = { I: "1800 mm (6')", J: "3600 mm (12')", K: "6100 mm (20')", L: "7300 mm (24')" };
  const protoMap = { B: "BACnet", M: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      const specBase = eC === "A" ? `Network Temperature Duct Average, Copper, ${lD}` : `Network Temperature Duct Average, Copper, ${lD}, 1/2 NPT - M16 Adapter and Cable Gland`;
      for (const [pC, pD] of Object.entries(protoMap)) {
        result.push({ partCode: `TNDC${eC}20${lC}${pC}`, specification: `${specBase}, ${pD}` });
      }
    }
  }
  return result;
}

function generateTNAPOptions() {
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const lenMap = { A: "50 mm (2\")", B: "100 mm (4\")", C: "150 mm (6\")", D: "200 mm (8\")", E: "300 mm (12\")", F: "450 mm (18\")" };
  const protoMap = { B: "BACnet", M: "Modbus" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      const specBase = eC === "A" ? `Network Temperature All Purpose Duct/Immersion, ${lD}` : `Network Temperature All Purpose Duct/Immersion, ${lD}, 1/2 NPT - M16 Adapter and Cable Gland`;
      for (const [pC, pD] of Object.entries(protoMap)) {
        result.push({ partCode: `TNAP${eC}20${lC}${pC}`, specification: `${specBase}, ${pD}` });
      }
    }
  }
  return result;
}

function generateTLSOOptions() {
  const encMap = { B: "Polycarbonate, with hinged and gasketed cover", F: "Same as B, with M16 thread adapter and cable gland fitting" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TLSO${eC}24X${rC}`, specification: `Strap-on Low Limit Thermostat, 254 mm (10\") S/S Clamp, ${rD}` + (eC === "F" ? ", M16 thread adapter and cable gland fitting" : "") });
    }
  }
  return result;
}

function generateTLRPOptions() {
  const encMap = { B: "Polycarbonate, with hinged and gasketed cover", F: "Same as B, with M16 thread adapter and cable gland fitting" };
  const lenMap = { A: "50 mm (2\")", B: "100 mm (4\")", C: "150 mm (6\")", D: "200 mm (8\")" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      for (const [rC, rD] of Object.entries(rangeMap)) {
        const extra = eC === "F" ? ", M16 thread adapter and cable gland fitting" : "";
        result.push({ partCode: `TLRP${eC}24${lC}${rC}`, specification: `Remote Probe High Limit Thermostat, ${lD} S/S Probe, ${rD}${extra}` });
      }
    }
  }
  return result;
}

function generateTLOSOptions() {
  const encMap = { B: "Polycarbonate, with hinged and gasketed cover, integrated sun and wind shield", F: "Same as B, with M16 thread adapter and cable gland fitting" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TLOS${eC}24X${rC}`, specification: `Outside Low Limit Thermostat, ${rD}` + (eC === "F" ? ", M16 thread adapter and cable gland fitting" : "") });
    }
  }
  return result;
}

function generateTLOBOptions() {
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  return Object.entries(rangeMap).map(([rC, rD]) => ({ partCode: `TLOBB24X${rC}`, specification: `Outside Low Limit Thermostat, Sun/Wind Shield, Bracket, ${rD}` }));
}

function generateTLGLOptions() {
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  return [
    ...Object.entries(rangeMap).map(([rC, rD]) => ({ partCode: `TLGLB24X${rC}`, specification: `Glass Low Limit Thermostat, ${rD}` })),
    ...Object.entries(rangeMap).map(([rC, rD]) => ({ partCode: `TLGLF24X${rC}`, specification: `Glass Low Limit Thermostat, ${rD}, M16 thread adapter and cable gland fitting` }))
  ];
}

function generateTLFLOptions() {
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  return [
    ...Object.entries(rangeMap).map(([rC, rD]) => ({ partCode: `TLFLB24X${rC}`, specification: `Flying Lead Low Limit Thermostat, ${rD}` })),
    ...Object.entries(rangeMap).map(([rC, rD]) => ({ partCode: `TLFLF24X${rC}`, specification: `Flying Lead Low Limit Thermostat, ${rD}, M16 thread adapter and cable gland fitting` }))
  ];
}

function generateTLDROptions() {
  const lenMap = { F: "450 mm (18\") Rigid S/S Probe", G: "600 mm (24\") Rigid S/S Probe", H: "900 mm (36\") Rigid S/S Probe" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC] of Object.entries(rangeMap)) {
      result.push({ partCode: `TLDRB24${lC}${rC}`, specification: `Duct Average Low Limit Thermostat, ${lD}, ${rangeMap["01"]}` });
      result.push({ partCode: `TLDRF24${lC}${rC}`, specification: `Duct Average Low Limit Thermostat, ${lD}, ${rangeMap["01"]}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTLOFOptions() {
  const lenMap = { I: "1800 mm (6') Flexible FT-6 Cable", J: "3600 mm (12') Flexible FT-6 Cable", K: "6100 mm (20') Flexible FT-6 Cable", L: "7300 mm (24') Flexible FT-6 Cable" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC] of Object.entries(rangeMap)) {
      result.push({ partCode: `TLDFB24${lC}${rC}`, specification: `Duct Average Low Limit Thermostat, ${lD}, ${rangeMap["01"]}` });
      result.push({ partCode: `TLDFF24${lC}${rC}`, specification: `Duct Average Low Limit Thermostat, ${lD}, ${rangeMap["01"]}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTLDCOptions() {
  const lenMap = { I: "1800 mm (6') Copper Probe", J: "3600 mm (12') Copper Probe", K: "6100 mm (20') Copper Probe", L: "7300 mm (24') Copper Probe" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC] of Object.entries(rangeMap)) {
      result.push({ partCode: `TLDCB24${lC}${rC}`, specification: `Duct Average Low Limit Thermostat, ${lD}, ${rangeMap["01"]}` });
      result.push({ partCode: `TLDCF24${lC}${rC}`, specification: `Duct Average Low Limit Thermostat, ${lD}, ${rangeMap["01"]}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTLAPOptions() {
  const lenMap = { A: "50 mm (2\") S/S Probe", B: "100 mm (4\") S/S Probe", C: "150 mm (6\") S/S Probe", D: "200 mm (8\") S/S Probe", E: "300 mm (12\") S/S Probe" };
  const rangeMap = { "01": "-4 to 10\u00B0C (25 to 50\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC] of Object.entries(rangeMap)) {
      result.push({ partCode: `TLAPB24${lC}${rC}`, specification: `All Purpose (Duct/Immersion) Low Limit Thermostat, ${lD}, ${rangeMap["01"]}` });
      result.push({ partCode: `TLAPF24${lC}${rC}`, specification: `All Purpose (Duct/Immersion) Low Limit Thermostat, ${lD}, ${rangeMap["01"]}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTHSOOptions() {
  const rangeMap = { "01": "38-104\u00B0C (100-220\u00B0F)", "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [rC, rD] of Object.entries(rangeMap)) {
    result.push({ partCode: `THSOB24X${rC}`, specification: `Strap-on High Limit Thermostat, 254 mm (10") S/S Clamp, ${rD}` });
    result.push({ partCode: `THSOF24X${rC}`, specification: `Strap-on High Limit Thermostat, 254 mm (10") S/S Clamp, ${rD}, M16 thread adapter and cable gland fitting` });
  }
  return result;
}

function generateTHOSOptions() {
  return [{ partCode: "THOSB24X02", specification: "Outside High Limit Thermostat, 38-60\u00B0C (100-140\u00B0F)" }];
}

function generateTHOBOptions() {
  return [{ partCode: "THOBB24X02", specification: "Outside High Limit Thermostat, Sun/Wind Shield, Bracket, 38-60\u00B0C (100-140\u00B0F)" }];
}

function generateTHGLOptions() {
  const rangeMap = { "01": "38-104\u00B0C (100-220\u00B0F)", "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [rC, rD] of Object.entries(rangeMap)) {
    result.push({ partCode: `THGLB24X${rC}`, specification: `Glass High Limit Thermostat, ${rD}` });
    result.push({ partCode: `THGLF24X${rC}`, specification: `Glass High Limit Thermostat, ${rD}, M16 thread adapter and cable gland fitting` });
  }
  return result;
}

function generateTHFLOptions() {
  const rangeMap = { "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [rC, rD] of Object.entries(rangeMap)) {
    result.push({ partCode: `THFLB24X${rC}`, specification: `Flying Lead High Limit Thermostat, ${rD}` });
    result.push({ partCode: `THFLF24X${rC}`, specification: `Flying Lead High Limit Thermostat, ${rD}, M16 thread adapter and cable gland fitting` });
  }
  return result;
}

function generateTHDROptions() {
  const lenMap = { F: "450 mm (18\") Rigid S/S Probe", G: "600 mm (24\") Rigid S/S Probe", H: "900 mm (36\") Rigid S/S Probe" };
  const rangeMap = { "01": "38-104\u00B0C (100-220\u00B0F)", "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `THDRB24${lC}${rC}`, specification: `Duct Average High Limit Thermostat, ${lD}, ${rD}` });
      result.push({ partCode: `THDRF24${lC}${rC}`, specification: `Duct Average High Limit Thermostat, ${lD}, ${rD}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTHDFOptions() {
  const lenMap = { I: "1800 mm (6') Flexible FT-6 Cable", J: "3600 mm (12') Flexible FT-6 Cable", K: "6100 mm (20') Flexible FT-6 Cable", L: "7300 mm (24') Flexible FT-6 Cable" };
  const rangeMap = { "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `THDFB24${lC}${rC}`, specification: `Duct Average High Limit Thermostat, ${lD}, ${rD}` });
      result.push({ partCode: `THDFF24${lC}${rC}`, specification: `Duct Average High Limit Thermostat, ${lD}, ${rD}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTHDCOptions() {
  const lenMap = { I: "1800 mm (6') Copper Probe", J: "3600 mm (12') Copper Probe", K: "6100 mm (20') Copper Probe", L: "7300 mm (24') Copper Probe" };
  const rangeMap = { "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `THDCB24${lC}${rC}`, specification: `Duct Average High Limit Thermostat, ${lD}, ${rD}` });
      result.push({ partCode: `THDCF24${lC}${rC}`, specification: `Duct Average High Limit Thermostat, ${lD}, ${rD}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTHAPOptions() {
  const lenMap = { A: "50 mm (2\") S/S Probe", B: "100 mm (4\") S/S Probe", C: "150 mm (6\") S/S Probe", D: "200 mm (8\") S/S Probe", E: "300 mm (12\") S/S Probe", F: "450 mm (18\") S/S Probe" };
  const rangeMap = { "01": "38-104\u00B0C (100-220\u00B0F)", "02": "38-60\u00B0C (100-140\u00B0F)" };
  const result = [];
  for (const [lC, lD] of Object.entries(lenMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `THAPB24${lC}${rC}`, specification: `All Purpose (Duct/Immersion) High Limit Thermostat, ${lD}, ${rD}` });
      result.push({ partCode: `THAPF24${lC}${rC}`, specification: `All Purpose (Duct/Immersion) High Limit Thermostat, ${lD}, ${rD}, M16 thread adapter and cable gland fitting` });
    }
  }
  return result;
}

function generateTE500SLOptions() {
  const base = "TE500SL Slab Temperature Transmitter";
  const encArr = [
    { code: "", desc: "ABS enclosure, standard" },
    { code: "M", desc: "Metal utility box" },
    { code: "E", desc: "Round ABS c/w gasket cover" },
    { code: "W", desc: "Aluminum weatherproof box" },
  ];
  const sensorMap = {
    "2": "100 \u03A9 Platinum, IEC 751, 385 Alpha, thin film",
    "12": "1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film",
  };
  const wireMap = { ZW: "PVC Zip Wire - 22 AWG", FT: "Plenum rated FT-6 - 22 AWG", MP: "Moisture Proof Burial - 20 AWG" };
  const lenMap = { "5": "1.5m (5')", "10": "3m (10')", "25": "7.6m (25')", "50": "15.25m (50')", "100": "30.5m (100')" };
  const outMap = { "1A": "4-20 mA", "1C": "0-5 Vdc", "1E": "0-10 Vdc" };
  const rangeMap = { "1": "0 to 35\u00B0C (32 to 95\u00B0F)", "2": "0 to 50\u00B0C (32 to 122\u00B0F)" };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    const wireEntries = Object.entries(wireMap).filter(([wC]) => !(sC === "2" && wC === "ZW"));
    for (const [wC, wD] of wireEntries) {
      for (const [lC, lD] of Object.entries(lenMap)) {
        for (const [oC, oD] of Object.entries(outMap)) {
          for (const [rC, rD] of Object.entries(rangeMap)) {
            for (const enc of encArr) {
              const partCode = `TE500SL${enc.code}${sC}${wC}${lC}${oC}${rC}`;
              const spec = `${base}, ${enc.desc}, ${sD}, ${wD}, ${lD}, ${oD}, ${rD}`;
              result.push({ partCode, specification: spec });
            }
          }
        }
      }
    }
  }
  return result;
}

function generateTE500HOptions() {
  const base = "Stack transmitter";
  const sensorCodes = ["4", "28"];
  const lenMap = { D: "200mm (8\")", E: "300mm (12\")", F: "450mm (18\")" };
  const outMap = { A: "4-20mA", D: "0-5VDC", E: "0-10VDC" };
  const rangeMap = { "7N": "0-1000C", "9H": "0-600C" };
  const result = [];
  for (const sC of sensorCodes) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      for (const [oC, oD] of Object.entries(outMap)) {
        for (const [rC, rD] of Object.entries(rangeMap)) {
          result.push({ partCode: `TE500H${sC}${lC}21${oC}${rC}`, specification: `${base} ${lD}, c/w Stack assembly, 24 Vac/dc supply, Weatherproof enclosure, ${oD} output and ${rD} range.` });
        }
      }
    }
  }
  return result;
}

function generateTE500ASOptions() {
  const base = "Stainless plate/surface transmitter";
  const outMap = { A: "4-20mA", D: "0-5VDC", E: "0-10VDC" };
  const rangeMap = { "1": "0-35C (32-95\u00B0F)", "2": "0-50C (32-122\u00B0F)" };
  const tpOptions = ["", "TP"];
  const result = [];
  for (const [oC, oD] of Object.entries(outMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      for (const tp of tpOptions) {
        const tpDesc = tp === "TP" ? ", tamperproof screws" : "";
        result.push({ partCode: `TE500AS121${oC}${rC}${tp}`, specification: `${base}, c/w 24 Vac/dc supply${tpDesc}, ${oD} output and ${rD} range.` });
      }
    }
  }
  return result;
}

function generateTE500ADOptions() {
  const base = "Designer Room transmitter";
  const outMap = { A: "4-20mA", D: "0-5VDC", E: "0-10VDC" };
  const rangeMap = { "1": "0-35C (32-95\u00B0F)", "2": "0-50C (32-122\u00B0F)" };
  const result = [];
  for (const [oC, oD] of Object.entries(outMap)) {
    for (const [rC, rD] of Object.entries(rangeMap)) {
      result.push({ partCode: `TE500AD121${oC}${rC}`, specification: `${base}, c/w 24 Vac/dc supply, ${oD} output and ${rD} range.` });
    }
  }
  return result;
}

function generateTE200HCOptions() {
  return [
    { partCode: "TE200HC2", specification: "Temperature Sensor with Mounting Clip, 100\u03A9 Platinum RTD, IEC 751, 385 Alpha, Thin Film Sensor" },
    { partCode: "TE200HC5", specification: "Temperature Sensor with Mounting Clip, 1801\u03A9 NTC Thermistor, \u00B10.2\u00B0C Accuracy" },
    { partCode: "TE200HC6", specification: "Temperature Sensor with Mounting Clip, 3000\u03A9 NTC Thermistor, \u00B10.2\u00B0C Accuracy" },
    { partCode: "TE200HC7", specification: "Temperature Sensor with Mounting Clip, 10,000\u03A9 Type 3 NTC Thermistor, \u00B10.2\u00B0C Accuracy" },
    { partCode: "TE200HC8", specification: "Temperature Sensor with Mounting Clip, 2.252k\u03A9 NTC Thermistor, \u00B10.2\u00B0C Accuracy" },
    { partCode: "TE200HC12", specification: "Temperature Sensor with Mounting Clip, 1000\u03A9 Platinum RTD, IEC 751, 385 Alpha, Thin Film Sensor" },
    { partCode: "TE200HC13", specification: "Temperature Sensor with Mounting Clip, 1000\u03A9 Nickel RTD, Class B, DIN 43760" },
    { partCode: "TE200HC14", specification: "Temperature Sensor with Mounting Clip, 10,000\u03A9 Type 3 NTC Thermistor with 11k\u03A9 Shunt Resistor, \u00B10.2\u00B0C Accuracy" },
    { partCode: "TE200HC20", specification: "Temperature Sensor with Mounting Clip, 20,000\u03A9 NTC Thermistor, \u00B10.2\u00B0C Accuracy" },
    { partCode: "TE200HC24", specification: "Temperature Sensor with Mounting Clip, 10,000\u03A9 Type 2 NTC Thermistor, \u00B10.2\u00B0C Accuracy" },
  ];
}

function generateTE200BBOptions() {
  const sensorMap = {
    "2": "100 ohm RTD",
    "5": "1800 ohm thermistor",
    "6": "3000 ohm thermistor",
    "7": "10K ohm type 3 thermistor",
    "8": "2.252K ohm thermistor",
    "12": "1000 ohm RTD",
    "13": "1000 ohm nickel RTD",
    "14": "10K ohm type 3 thermistor w/ 11K shunt resistor",
    "20": "20,000 ohm thermistor",
    "24": "10K ohm type 2 thermistor",
  };
  const lenMap = { B: '100mm (4")', C: '150mm (6")', D: '200mm (8")', E: '300mm (12")', F: '450mm (18")' };
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const [lC, lD] of Object.entries(lenMap)) {
      result.push({ partCode: `TE200BB${sC}${lC}2`, specification: `Duct ${lD}, mounting bracket, c/w ${sD} and 1500mm (5') plenum rated cable` });
    }
  }
  return result;
}

function generateTE200AOptions() {
  const sensorMap = {
    "2": "100 ohm RTD",
    "5": "1800 ohm thermistor",
    "6": "3000 ohm thermistor",
    "7": "10K ohm type 3 thermistor",
    "8": "2.252K ohm thermistor",
    "12": "1000 ohm RTD",
    "13": "1000 ohm nickel RTD",
    "14": "10K ohm type 3 thermistor w/ 11K shunt resistor",
    "20": "20,000 ohm thermistor",
    "24": "10K ohm type 2 thermistor",
  };
  return Object.entries(sensorMap).map(([sC, sD]) => ({ partCode: `TE200A${sC}`, specification: `Micro Room temperature sensor, ${sD}, options not available` }));
}

function generateTE200ASOptions() {
  const sensorMap = {
    "2": "100 ohm RTD",
    "5": "1800 ohm thermistor",
    "6": "3000 ohm thermistor",
    "7": "10,000 ohm type 3 thermistor",
    "8": "2.252K ohm thermistor",
    "12": "1000 ohm RTD",
    "13": "1000 ohm nickel RTD",
    "14": "10,000 ohm type 3 thermistor with 11K ohm shunt resistor",
    "20": "20,000 ohm thermistor",
    "24": "10,000 ohm type 2 thermistor",
  };
  const suffixMap = [
    { code: "", desc: "" },
    { code: "TP", desc: " c/w tamper proof screws" },
    { code: "BS", desc: " c/w override button" },
    { code: "BSTP", desc: " c/w override button and tamper proof screws" },
    { code: "GB", desc: " c/w greyhill override button" },
    { code: "GBTP", desc: " c/w greyhill override button and tamper proof screws" },
  ];
  const result = [];
  for (const [sC, sD] of Object.entries(sensorMap)) {
    for (const sfx of suffixMap) {
      result.push({ partCode: `TE200AS${sC}${sfx.code}`, specification: `Stainless plate / surface, ${sD}${sfx.desc}` });
    }
  }
  return result;
}

function generateTE200ADOptions() {
  const options = [];
  const add = (code, spec) => options.push({ partCode: `TE200AD${code}`, specification: spec });
  add("2", "Designer Room, , PT100 OHM Platinum");
  add("2BS", "Designer Room, , PT100 OHM Platinum c/w override button");
  add("2AP", "Designer Room, , PT100 OHM Platinum c/w slide pot");
  add("2AS", "Designer Room, , PT100 OHM Platinum c/w concealed override button");
  add("2ASAP", "Designer Room, , PT100 OHM Platinum c/w slide pot & concealed override button");
  add("2BSAP", "Designer Room, , PT100 OHM Platinum c/w slide pot & override button");
  add("5", "Designer Room, 1800 ohm thermistor");
  add("5BS", "Designer Room, 1800 ohm thermistor c/w override button");
  add("5AP", "Designer Room, 1800 ohm thermistor c/w slide pot.");
  add("5AS", "Designer Room, 1800 ohm thermistor c/w concealed override button");
  add("5ASAP", "Designer Room, 1800 ohm thermistor c/w slide pot & concealed override button.");
  add("5BSAP", "Designer Room, 1800 ohm thermistor c/w slide pot & override button.");
  add("6", "Designer Room, 3000 ohm thermistor");
  add("6BS", "Designer Room, 3000 ohm thermistor c/w override button");
  add("6AP", "Designer Room, 3000 ohm thermistor c/w slide pot.");
  add("6AS", "Designer Room, 3000 ohm thermistor c/w concealed override button");
  add("6ASAP", "Designer Room, 3000 ohm thermistor c/w slide pot & concealed override button.");
  add("6BSAP", "Designer Room, 3000 ohm thermistor c/w slide pot & override button.");
  add("7", "Designer Room, 10K ohm type 3 thermistor");
  add("7BS", "Designer Room, 10K ohm type 3 thermistor c/w override button");
  add("7AP", "Designer Room, 10K ohm type 3 thermistor c/w slide pot.");
  add("7AS", "Designer Room, 10K ohm type 3 thermistor c/w concealed override button");
  add("7ASAP", "Designer Room, 10K ohm type 3 thermistor c/w slide pot & concealed override button.");
  add("7BSAP", "Designer Room, 10K ohm type 3 thermistor c/w slide pot & override button.");
  add("8", "Designer Room, 2.252K ohm thermistor");
  add("8BS", "Designer Room, 2.252K ohm thermistor c/w override button");
  add("8AP", "Designer Room, 2.252K ohm thermistor c/w slide pot.");
  add("8AS", "Designer Room, 2.252K ohm thermistor c/w concealed override button");
  add("8ASAP", "Designer Room, 2.252K ohm thermistor c/w slide pot & concealed override button.");
  add("8BSAP", "Designer Room, 2.252K ohm thermistor c/w slide pot & override button.");
  add("12", "Designer Room, PT1000 OHM Platinum");
  add("12BS", "Designer Room, PT1000 OHM Platinum c/w override button.");
  add("12AP", "Designer Room, PT1000 OHM Platinum c/w slide pot");
  add("12AS", "Designer Room, PT1000 OHM Platinum c/w concealed override button.");
  add("12ASAP", "Designer Room, PT1000 OHM Platinum c/w slide pot & concealed override button");
  add("12BSAP", "Designer Room, PT1000 OHM Platinum c/w slide pot & override button");
  add("13", "Designer Room, PT1000 OHM Nickel");
  add("13BS", "Designer Room, PT1000 OHM Nickel c/w override button.");
  add("13AP", "Designer Room, PT1000 OHM Nickel c/w slide pot");
  add("13AS", "Designer Room, PT1000 OHM Nickel c/w concealed override button.");
  add("13ASAP", "Designer Room, PT1000 OHM Nickel c/w slide pot & concealed override button");
  add("13BSAP", "Designer Room, PT1000 OHM Nickel c/w slide pot & override button");
  add("14", "Designer Room, 10,000 ohm type 3 thermistor c/w 11K shunt resistor");
  add("14BS", "Designer Room, 10,000 ohm type 3 thermistor c/w 11K shunt resistor c/w override button.");
  add("14AP", "Designer Room, 10,000 ohm type 3 thermistor c/w 11K shunt resistor c/w slide pot");
  add("14AS", "Designer Room, 10,000 ohm type 3 thermistor c/w 11K shunt resistor c/w concealed override button.");
  add("14ASAP", "Designer Room, 10,000 ohm type 3 thermistor c/w 11K shunt resistor c/w slide pot & concealed override button");
  add("14BSAP", "Designer Room, 10,000 ohm type 3 thermistor c/w 11K shunt resistor c/w slide pot & override button");
  add("20", "Designer Room, 20K Thermistor.");
  add("20BS", "Designer Room, 20K Thermistor c/w override button");
  add("20AP", "Designer Room, 20K Thermistor c/w slide pot.");
  add("20AS", "Designer Room, 20K Thermistor c/w concealed override button");
  add("20ASAP", "Designer Room, 20K Thermistor c/w slide pot & concealed override button.");
  add("20BSAP", "Designer Room, 20K Thermistor c/w slide pot & override button.");
  add("24", "Designer Room, 10K ohm type 2 thermistor");
  add("24BS", "Designer Room, 10K ohm type 2 thermistor c/w override button");
  add("24AP", "Designer Room, 10K ohm type 2 thermistor c/w slide pot.");
  add("24AS", "Designer Room, 10K ohm type 2 thermistor c/w concealed override button");
  add("24ASAP", "Designer Room, 10K ohm type 2 thermistor c/w slide pot & concealed override button.");
  add("24BSAP", "Designer Room, 10K ohm type 2 thermistor c/w slide pot & override button.");
  return options;
}

function generateTDSOOptions() {
  const base = "Strap-on Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const outputs = {
    XA: "4-20 mA 2 or 3 wire",
    XD: "0-5 VDC 3 wire",
    XE: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
    "003": "0 C to 100 C (32 F to 212 F)",
  };
  const probeLen = "12";
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [oCode, oDesc] of Object.entries(outputs)) {
      for (const [rCode, rDesc] of Object.entries(ranges)) {
        result.push({
          partCode: `TDSO${eCode}${probeLen}${oCode}${rCode}`,
          specification: `${base}, ${eData.display}, 254 mm (10") S/S Clamp, ${oDesc}, ${rDesc}${eData.suffix}`,
        });
      }
    }
  }
  return result;
}

function generateTDDFOptions() {
  const base = "Duct Average Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const cables = {
    I: "1800 mm (6') Flexible FT-6 Cable",
    J: "3600 mm (12') Flexible FT-6 Cable",
    K: "6100 mm (20') Flexible FT-6 Cable",
    L: "7300 mm (24') Flexible FT-6 Cable",
  };
  const outputs = {
    A: "4-20 mA 2 or 3 wire",
    D: "0-5 VDC 3 wire",
    E: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
    "003": "0 C to 100 C (32 F to 212 F)",
    "006": "-50 C to 50 C (-58 F to 122 F)",
  };
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [cCode, cDesc] of Object.entries(cables)) {
      for (const [oCode, oDesc] of Object.entries(outputs)) {
        for (const [rCode, rDesc] of Object.entries(ranges)) {
          result.push({
            partCode: `TDDF${eCode}12${cCode}${oCode}${rCode}`,
            specification: `${base}, ${eData.display}, ${cDesc}, ${oDesc}, ${rDesc}${eData.suffix}`,
          });
        }
      }
    }
  }
  return result;
}

function generateTDDROptions() {
  const base = "Duct Average Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const probes = {
    F: "450 mm (18\") Rigid S/S Probe",
    G: "600 mm (24\") Rigid S/S Probe",
    H: "900 mm (36\") Rigid S/S Probe",
  };
  const outputs = {
    A: "4-20 mA 2 or 3 wire",
    D: "0-5 VDC 3 wire",
    E: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
    "003": "0 C to 100 C (32 F to 212 F)",
    "006": "-50 C to 50 C (-58 F to 122 F)",
  };
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [pCode, pDesc] of Object.entries(probes)) {
      for (const [oCode, oDesc] of Object.entries(outputs)) {
        for (const [rCode, rDesc] of Object.entries(ranges)) {
          result.push({
            partCode: `TDDR${eCode}12${pCode}${oCode}${rCode}`,
            specification: `${base}, ${eData.display}, ${pDesc}, ${oDesc}, ${rDesc}${eData.suffix}`,
          });
        }
      }
    }
  }
  return result;
}

function generateTDFLOptions() {
  const base = "Flying Lead Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const outputs = {
    XA: "4-20 mA 2 or 3 wire",
    XD: "0-5 VDC 3 wire",
    XE: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
    "003": "0 C to 100 C (32 F to 212 F)",
    "006": "-50 C to 50 C (-58 F to 122 F)",
  };
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [oCode, oDesc] of Object.entries(outputs)) {
      for (const [rCode, rDesc] of Object.entries(ranges)) {
        result.push({
          partCode: `TDFL${eCode}12${oCode}${rCode}`,
          specification: `${base}, ${eData.display}, ${oDesc}, ${rDesc}${eData.suffix}`,
        });
      }
    }
  }
  return result;
}

function generateTDGLOptions() {
  const base = "Glass Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const outputs = {
    XA: "4-20 mA 2 or 3 wire",
    XD: "0-5 VDC 3 wire",
    XE: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
    "003": "0 C to 100 C (32 F to 212 F)",
    "006": "-50 C to 50 C (-58 F to 122 F)",
  };
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [oCode, oDesc] of Object.entries(outputs)) {
      for (const [rCode, rDesc] of Object.entries(ranges)) {
        result.push({
          partCode: `TDGL${eCode}12${oCode}${rCode}`,
          specification: `${base}, ${eData.display}, ${oDesc}, ${rDesc}${eData.suffix}`,
        });
      }
    }
  }
  return result;
}

function generateTDHROptions() {
  const base = "Heavy Duty Room Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const outputs = {
    XA: "4-20 mA 2 or 3 wire",
    XD: "0-5 VDC 3 wire",
    XE: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
  };
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [oCode, oDesc] of Object.entries(outputs)) {
      for (const [rCode, rDesc] of Object.entries(ranges)) {
        result.push({
          partCode: `TDHR${eCode}12${oCode}${rCode}`,
          specification: `${base}, ${eData.display}, ${oDesc}, ${rDesc}${eData.suffix}`,
        });
      }
    }
  }
  return result;
}

function generateTDRPOptions() {
  const base = "Remote Probe Temperature Transmitter with LCD";
  const enclosures = {
    BC: { display: "Celsius", suffix: "" },
    BF: { display: "Fahrenheit", suffix: "" },
    FC: { display: "Celsius", suffix: ", M16 thread adapter and cable gland fitting" },
    FF: { display: "Fahrenheit", suffix: ", M16 thread adapter and cable gland fitting" },
  };
  const probes = {
    A: "50 mm (2\") S/S Probe",
    B: "100 mm (4\") S/S Probe",
    C: "150 mm (6\") S/S Probe",
    D: "200 mm (8\") S/S Probe",
  };
  const outputs = {
    A: "4-20 mA 2 or 3 wire",
    D: "0-5 VDC 3 wire",
    E: "0-10 VDC 3 wire",
  };
  const ranges = {
    "001": "0 C to 35 C (32 F to 95 F)",
    "002": "0 C to 50 C (32 F to122 F)",
    "003": "0 C to 100 C (32 F to 212 F)",
    "006": "-50 C to 50 C (-58 F to 122 F)",
  };
  const result = [];
  for (const [eCode, eData] of Object.entries(enclosures)) {
    for (const [pCode, pDesc] of Object.entries(probes)) {
      for (const [oCode, oDesc] of Object.entries(outputs)) {
        for (const [rCode, rDesc] of Object.entries(ranges)) {
          result.push({
            partCode: `TDRP${eCode}12${pCode}${oCode}${rCode}`,
            specification: `${base}, ${eData.display}, ${pDesc}, ${oDesc}, ${rDesc}${eData.suffix}`,
          });
        }
      }
    }
  }
  return result;
}

function generateTXSLOptions() {
  const base = "TXSL Slab Temperature Transmitter";
  const encMap = { A: "ABS, with hinged and gasketed cover", E: "Same as A, with thread adapter (1/2\" NPT to M16) and cable gland fitting" };
  const wireMap = { ZW: "PVC Zip Wire - 22 AWG", FT: "Plenum Rated FT-6 - 22 AWG", MP: "EPC Moisture Proof Burial - 20 AWG", MS: "EPC Moisture Proof Submersible - 20AWG" };
  const lenMap = { "001": "1m (3.3')", "003": "3m (9.8')", "005": "5m (16.4')", "010": "10m (32.8')", "020": "20m (65.6')", "030": "30m (98.5')", "***": "Custom length" };
  const outMap = { A: "4-20 mA", D: "0-5 Vdc", E: "0-10 Vdc" };
  const rangeMap = { "001": "0 to 35\u00B0C (32 to 95\u00B0F)", "002": "0 to 50\u00B0C (32 to 122\u00B0F)", "***": "Custom range" };
  const result = [];
  for (const [eC, eD] of Object.entries(encMap)) {
    for (const [wC, wD] of Object.entries(wireMap)) {
      for (const [lC, lD] of Object.entries(lenMap)) {
        for (const [oC, oD] of Object.entries(outMap)) {
          for (const [rC, rD] of Object.entries(rangeMap)) {
            const partCode = `TXSL${eC}12${wC}${lC}${oC}${rC}`;
            const spec = `${base}, ${eD}, 1000 \u03A9 Platinum, IEC 751, 385 Alpha, thin film, ${wD}, ${lD}, ${oD}, ${rD}`;
            result.push({ partCode, specification: spec });
          }
        }
      }
    }
  }
  return result;
}

function generateTXRPOptions() {
  return [
    { partCode: "TXRPA12AA001", specification: "Remote Probe Strap-on Temperature Transmitter, 50 mm (2\"), 0-35C, 4-20 mA" },
    { partCode: "TXRPA12AA002", specification: "Remote Probe Strap-on Temperature Transmitter, 50 mm (2\"), 0-50C, 4-20 mA" },
    { partCode: "TXRPA12AA003", specification: "Remote Probe Strap-on Temperature Transmitter, 50 mm (2\"), 0-100C, 4-20 mA" }
  ];
}

const MOCK_PRODUCTS = [
    {
        "productId": "WEB-8000",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "Honeywell WEB-8000 Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The WEB-8000 is a compact embedded IoT controller and server platform designed for building automation and system integration. It connects multiple devices and subsystems with integrated control, supervision, data logging, alarming, scheduling, and network management. Powered by the Niagara Framework (WEBs-N4), it enables secure web-based monitoring and control through Ethernet or Wi-Fi. The controller supports flexible expansion with RS-485, RS-232, LON, and remote I/O modules, making it suitable for both small and large-scale automation systems.",
        _options: [
            {
                "partCode": "WEB-8000",
                "specification": "Base unit includes two isolated RS485 ports, two 10/100MB Ethernet ports, USB Backup & Restore and Wi-Fi connectivity.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-8000-DEMO",
                "specification": "Base unit includes two isolated RS485 ports, two 10/100MB Ethernet ports, USB Backup & Restore, Wi-Fi connectivity, all available Tridium drivers and a 500 device license. Hardware accessories purchased separately.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8005",
                "specification": "Up to 5 devices / 250 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8010",
                "specification": "Up to 10 devices / 500 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8025",
                "specification": "Up to 25 devices / 1,250 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8100",
                "specification": "Up to 100 devices / 5,000 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-8200",
                "specification": "Up to 200 devices / 10,000 point core.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-10",
                "specification": "Up to 10 devices / 500 point upgrade (can be purchased during initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-25",
                "specification": "Up to 25 devices / 1,250 point upgrade (can be purchased during initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-50",
                "specification": "Up to 50 devices / 2,500 point upgrade (can be purchased during initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-UP-10",
                "specification": "Up to 10 devices / 500 point upgrade (can be purchased post initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-UP-25",
                "specification": "Up to 25 devices / 1,250 point upgrade (can be purchased post initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DEVICE-UP-50",
                "specification": "Up to 50 devices / 2,500 point upgrade (can be purchased post initial licensing).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-8000-AX",
                "specification": "Enables WEB-8000 controller to run Webs-AX (3.8U). 3.8U build with JACE 8000 controller support.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-2X-485",
                "specification": "WEB-8000 controller add-on dual port RS-485 module.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-LON",
                "specification": "WEB-8000 controller add-on single port LON FTT10A module.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-232",
                "specification": "WEB-8000 controller add-on single port RS-232 module.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WPM-8000",
                "specification": "Universal power supply for WEB-8000 controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "T-IO-16-485",
                "specification": "Remote IO module compatible with WEB-8000 controller. Communication using RS485. Maximum IO supported: IO-16-REM-H modules: 16.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-PWR-H",
                "specification": "24V power supply for IO-16-REM-H.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-PWR-UN-H",
                "specification": "Universal power supply for IO-16-REM-H.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IQ4NC",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4NC Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The IQ4NC enables networks on different media including Ethernet, current loop, and MS/TP, allowing multiple networks to be interconnected in flexible configurations. It provides virtual CNCs for Ethernet-based supervisors and tools to access the system. It supports BACnet over IP and MS/TP, alarm forwarding, and web-based configuration. The controller integrates devices such as IQeco and can extend communication between different network types. Some models include I/O channels and can be expanded using external I/O modules up to 32 channels.",
        _options: [
            {
                "partCode": "IQ4NC/00/230",
                "specification": "Controller with 0 I/O channels, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/12/230",
                "specification": "Controller with 12 I/O channels, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/00/24VAC",
                "specification": "Controller with 0 I/O channels, 24 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/12/24VAC",
                "specification": "Controller with 12 I/O channels, 24 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/230",
                "specification": "Controller with 16 I/O channels, XNC functionality, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/230",
                "specification": "Controller with 16 I/O channels expandable to 32, XNC functionality, 230 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/24VAC",
                "specification": "Controller with 16 I/O channels, XNC functionality, 24 VAC supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/24VAC",
                "specification": "Controller with 16 I/O channels expandable to 32, XNC functionality, 24 VAC supply.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IQ4-XNC",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4/.../XNC/... interface",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The IQ4 XNC functionality provides an interface between the Trend system and third-party systems using standard IQ strategy modules and Trend Custom Language (TCL). It allows external system data to be presented as if it were native to an IQ controller and enables parameter adjustment from Trend supervisors and software tools. It supports communication over RS232, RS485, and Ethernet, and integrates BACnet over IP and MS/TP. Some models include I/O channels and can be expanded using external modules up to higher channel counts depending on the model.",
        _options: [
            {
                "partCode": "IQ422/12/XNC/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/12/XNC/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/12/XNC/LAN/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/12/XNC/LAN/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, 6 universal inputs, and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/LAN/BAC/24VAC",
                "specification": "IQ422 controller with 24 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ422/00/XNC/LAN/BAC/230",
                "specification": "IQ422 controller with 230 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, no I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/BAC/230",
                "specification": "IQ4E controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/LAN/BAC/230",
                "specification": "IQ4E controller with 230 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/BAC/24VAC",
                "specification": "IQ4E controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/XNC/LAN/BAC/24VAC",
                "specification": "IQ4E controller with 24 VAC supply, XNC functionality, Ethernet, Trend current loop LAN, BACnet over IP, expandable up to 96 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/230",
                "specification": "IQ4NC controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, 10 universal inputs and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/230",
                "specification": "IQ4NC controller with 230 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 32 I/O channels.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/16/XNC/24VAC",
                "specification": "IQ4NC controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, 10 universal inputs and 6 analogue voltage outputs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4NC/32/XNC/24VAC",
                "specification": "IQ4NC controller with 24 VAC supply, XNC functionality, Ethernet, BACnet over IP, expandable up to 32 I/O channels.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TONN-8",
        "category": "Building Management",
        "brand": "Trend",
        "title": "TONN-8 Open Network Node",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "Network Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/network-controller",
        "longDescription": "The TONN-8 is a Trend Open Network Node designed to enable integration between Trend systems and third-party systems using the Niagara 4 Framework. It supports bidirectional data exchange, allowing reading and writing of information between HVAC and non-HVAC systems such as lighting and security. It also enables third-party systems to access Trend logged data, alarms, and scheduling functions. The device supports multiple communication protocols including BACnet, LonWorks, M-Bus, Modbus, and KNX, and provides flexible expansion through RS-232, RS-485, LON, and Wi-Fi connectivity options.",
        _options: [
            {
                "partCode": "TONN-8100-24",
                "specification": "TONN-8 with 100 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-8250-24",
                "specification": "TONN-8 with 250 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-8500-24",
                "specification": "TONN-8 with 500 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-81250-24",
                "specification": "TONN-8 with 1250 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-85000-24",
                "specification": "TONN-8 with 5000 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-810000-24",
                "specification": "TONN-8 with 10000 Proxy Points license and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-8100-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 100 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-8250-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 250 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-8500-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 500 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-81250-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 1250 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-85000-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 5000 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TONN-W02-810000-24",
                "specification": "TONN-8 with WiFi Zone 2 module, 10000 Proxy Points license, and 1-year software update agreement.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "PUC-IO-EXTENSION",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "PUC SERIES IO EXTENSION MODULE",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The PUC IO Extension Module is part of the Honeywell PUC Series programmable unitary controller system supporting Ethernet BACnet IP communication. It allows expansion of controller I/O points using RS-485 communication and enables connection of up to two extension modules per controller. The module supports integration with HVAC applications, providing flexible control through fully programmable Niagara-based tools. It includes secure communication, DIN-rail installation, and supports various input and output types including analog and digital signals.",
        _options: [
            {
                "partCode": "PUC5533-EM2",
                "specification": "I/O extension module with UI x5, DI x5, AO x3, DO x3.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PUC6002-EM2",
                "specification": "I/O extension module with UI x6, DO x2.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "HON-9000",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "HON-9000 CONTROLLER",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The HON-9000 is a high-performance IoT controller designed for building automation and system integration. It supports web-based control, data logging, alarming, scheduling, and network management over Ethernet and wireless connectivity. Built on the Niagara Framework, it enables scalable multi-site control, real-time data processing, and integration with HVAC and non-HVAC systems. It features quad-core processing, dual Ethernet ports, RS-485 communication, expandable I/O modules, optional wireless capability, and scalable licensing for devices and points.",
        _options: [
            {
                "partCode": "HON-9000",
                "specification": "Individual HON-9000 controller with microSD card, branding clip, dual 10/100/1000 Mbps Ethernet ports, and dual RS-485 serial ports. Requires NC-9XXX core software and SMA-9XXX maintenance.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-CSE-003",
                "specification": "Case pack of 15 units. Branding clip and microSD card not included. WLAN disabled configuration. Must be ordered in multiples of 15 units.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-DEMO",
                "specification": "Demo controller with 500-device license microSD card, full Optimizer drivers, dual Ethernet and RS-485 ports. Requires Optimizer Supervisor N4.13u2 or higher.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-BRAND",
                "specification": "Replacement branding clip for HON-9000 controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-HW",
                "specification": "Replacement hardware unit only. Excludes microSD card and software license. Branding clip included if requested.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-SD-HW",
                "specification": "Replacement 8GB microSD card for HON-9000 controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HON-9000-USD-CSE",
                "specification": "Case pack of 15 microSD cards. Must be ordered in multiples of 15.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9000-EC",
                "specification": "Equipment controller base license with 0 devices and 0 points. Requires capacity licensing.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9005",
                "specification": "Core license supporting up to 5 devices or 250 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9010",
                "specification": "Core license supporting up to 10 devices or 500 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9025",
                "specification": "Core license supporting up to 25 devices or 1250 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9100",
                "specification": "Core license supporting up to 100 devices or 5000 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9200",
                "specification": "Core license supporting up to 200 devices or 10000 points with standard drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NC-9XXX-DEMO",
                "specification": "Demo license for 500 devices for non-production use. Includes all Optimizer drivers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IO-R-16",
                "specification": "16-point RS-485 I/O module with 8 universal inputs, 4 relay outputs, and 4 analog outputs (0–10 VDC).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IO-R-34",
                "specification": "34-point RS-485 I/O module with 16 universal inputs, 10 relay outputs, and 8 analog outputs (0–10 VDC).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-2X-485",
                "specification": "Dual RS-485 expansion module for WEB-8000 and HON-9000 controllers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-232",
                "specification": "RS-232 expansion module for WEB-8000 and HON-9000 controllers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "NPB-8000-LON",
                "specification": "LON FTT10A expansion module for WEB-8000 and HON-9000 controllers.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-1YR",
                "specification": "1-year maintenance agreement for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-3YR",
                "specification": "3-year maintenance agreement for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9005-5YR",
                "specification": "5-year maintenance agreement for NC-9005 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-1YR",
                "specification": "1-year maintenance agreement for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-3YR",
                "specification": "3-year maintenance agreement for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9010-5YR",
                "specification": "5-year maintenance agreement for NC-9010 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-1YR",
                "specification": "1-year maintenance agreement for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-3YR",
                "specification": "3-year maintenance agreement for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9025-5YR",
                "specification": "5-year maintenance agreement for NC-9025 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-1YR",
                "specification": "1-year maintenance agreement for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-3YR",
                "specification": "3-year maintenance agreement for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9100-5YR",
                "specification": "5-year maintenance agreement for NC-9100 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-1YR",
                "specification": "1-year maintenance agreement for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-1YR-INIT",
                "specification": "Initial 18-month maintenance for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-3YR",
                "specification": "3-year maintenance agreement for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SMA-9200-5YR",
                "specification": "5-year maintenance agreement for NC-9200 license level.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WPM-8000",
                "specification": "Universal 100–240 VAC wall adapter for WEB-8000 and HON-9000 controllers. Includes US, EU, UK, and AU plug types.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "EDGE-10",
        "category": "Building Management",
        "brand": "Tridium",
        "title": "NIAGARA EDGE 10",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The Niagara Edge 10 is an IP-based field equipment controller powered by the Niagara Framework®. It is designed for applications such as zone temperature control, fan coil units, single-stage air handling units, and water-source heat pumps. The controller features 10 onboard I/O points, supports one IO-R-34 expansion module, dual Ethernet ports for daisy-chain networking, one RS-485 serial port, and Niagara N4 licensing supporting up to 3 devices or 50 points. It includes BACnet, Modbus, and SNMP drivers and provides lifetime software updates for Niagara N4 commercial releases.",
        _options: [
            {
                "partCode": "EDGE-10",
                "specification": "Niagara Edge 10 field controller with 10 onboard I/O points, 1 RS-485 serial port, 2 × 10/100 Mbps Ethernet ports, supports one IO-R-34 expansion module, includes Niagara N4 with BACnet, Modbus, and SNMP drivers, supports up to 3 devices or 50 points, and includes lifetime Niagara N4 commercial software updates.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "WEB-C3036",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "CIPer Model 30 Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The CIPer Model 30 is an IP-based programmable field equipment controller powered by the Niagara 4 Framework. It is designed for VAV, unitary, equipment, and plant applications, featuring 12 onboard I/O, a 4-port Gigabit Ethernet switch, support for BACnet/IP and FOXS communication, and expansion up to 312 I/O points using compatible expansion modules.",
        _options: [
            {
                "partCode": "WEB-C3036EPUBNH",
                "specification": "CIPer IP Unitary Controller, 150 Point / 4-Device Niagara 4 License, SMA.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-C3036EPVBNH",
                "specification": "CIPer IP VAV Controller, 150 Point / 4-Device Niagara 4 License, SMA.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-O9056H",
                "specification": "CIPer IP Large Expansion Module, 50-Point Niagara 4 License, 20 I/O (9 UI, 6 BO, 5 UIO).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-O3022H",
                "specification": "CIPer Small Expansion Module, 50-Point Niagara 4 License, 7 I/O (3 UI, 2 BO, 2 UIO).",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IO-R",
        "category": "Building Management",
        "brand": "Tridium",
        "title": "JACE 8000 IO R Modules",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "IO R is part of Tridium’s portfolio of hardware, software and tools designed for remote monitoring and control applications that enables end-to-end automation and device-to-enterprise integration. IO R allows the JACE® 8000 to interface directly with simple non-intelligent inputs and outputs remotely located up to 4,000 feet from the JACE. The connection is established via an industry-standard RS 485 multi-drop communications bus. Multiple IO R devices can be utilized on a single JACE, providing 250+ IO points on a single JACE. IO R modules support Niagara 4.3 or later and Niagara AX 3.8u3 or later, with agency certifications including UL 916, C-UL, CE, RCM, FCC Part 15 Class B, RoHS2, REACH, and WEEE. Operating temperature range is -20–60°C with MTTF of 10+ years. Modules support DIN-rail EN50022 or panel mounting.",
        _options: [
            {
                "partCode": "IO-R-16",
                "specification": "16 Point IO Module: 8 Universal inputs (Type 3 thermistors, 0-100K ohm, 0-10VDC, 0-20 mA), 4 Relay outputs (Form A, 24VAC @ .5A), 4 Analog outputs (0-10VDC). Powered by IO-R-34. Connected to JACE 8000 remotely over RS485.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IO-R-34",
                "specification": "34 Point IO Module: 16 Universal inputs (Type 3 thermistors, 0-100K ohm, 0-10VDC, 0-20 mA), 10 Relay outputs (Form A, 24VAC @ .5A), 8 Analog outputs (0-10VDC). Powered by 24VAC/DC. Can power up to 4 IO-R-16 modules. Connected to JACE 8000 remotely over RS485.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "IQ4/10",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4/IO Expansion Modules",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The IQ 4/10 range of DIN rail mounted I/O expansion modules are designed for use with IQ4E and IQ4NC/32/XNC controllers, offering additional input and output channel connection points. They are also compatible with IQ3XCITE/96 and IQ3XCITE/128 controllers (v3.10 firmware onwards) and XCITE/IO modules.",
        _options: [
            {
                "partCode": "IQ4/10/16DI",
                "specification": "I/O Module with 16 digital input channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8DO",
                "specification": "I/O Module with 8 digital/relay output channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/4DO",
                "specification": "I/O Module with 4 digital/relay output channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8UIO",
                "specification": "I/O Module with 8 universal input/output channels",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8DI",
                "specification": "I/O Module with 8 digital inputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8UI",
                "specification": "I/O Module with 8 universal inputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/8AO",
                "specification": "I/O Module with 8 analogue outputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4/10/4UIO",
                "specification": "I/O Module with 4 universal inputs/outputs",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "PUC Series",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "Programmable Unitary Controller PUC Series",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "Honeywell PUC Series PUC8445 programmable unitary controller supports Ethernet BACNet IP communication. The controller supports numerous network topologies allowing flexible networking and wiring. The controller is programmable and can be widely used to control different building equipment. Supports embedded programmable tool under Niagara platform.",
        _options: [
            {
                "partCode": "PUC8445-PB1",
                "specification": "Programmable unitary controller with UI, DI, AO, DO configuration. Supports Ethernet BACNet IP communication, dual Ethernet ports supporting star, daisy chain, and ring connection (optional RSTP switch required). Built-in input/output ports with RS-485 expansion support.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "PEC8445-PB1",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "Programmable Enhanced Unitary Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The PEC8445-PB1 Programmable Enhanced Unitary Controller is an IP-based BACnet control platform designed for advanced building automation and HVAC applications. Built on the Niagara 4 framework, it provides a flexible and scalable control solution for unitary equipment such as fan coil units, VAV systems, air handling units, and other mechanical plant systems. The controller combines onboard input/output capabilities with a modular expansion architecture, allowing integration of field devices through EM communication modules and external networks. It supports scalable system design using EM modules (PUC5533-EM2 and PUC6002-EM2), enabling expansion of I/O capacity depending on system requirements. Designed for Ethernet-based BACnet IP communication, the controller enables integration with supervisory systems and building management platforms. It provides core automation functions including scheduling, alarm handling, and device communication management, making it suitable for standalone or networked control applications. The PEC8445-PB1 is available in two functional variants (SM and SO), allowing either EM-only expansion or extended integration with Modbus RTU devices for third-party system connectivity. Overall, the PEC8445-PB1 serves as a flexible, scalable, and programmable controller platform for modern HVAC and building automation systems requiring IP connectivity and multi-protocol integration.",
        _options: [
            {
                "partCode": "PEC8445-PB1-SM",
                "specification": "Programmable Enhanced BACnet IP Controller. Supports 8 Universal Inputs, 4 Binary Inputs, 4 Modulating Outputs, 5 Binary Relay Outputs. Supports up to 8 EM modules (PUC5533-EM2 / PUC6002-EM2). Onboard I/O and expansion via EM bus. B-AAC profile. Supports BACnet scheduling and alarms.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PEC8445-PB1-SO",
                "specification": "Programmable Enhanced BACnet IP Controller. Supports 8 Universal Inputs, 4 Binary Inputs, 4 Modulating Outputs, 5 Binary Relay Outputs. Supports up to 8 EM modules and third-party Modbus RTU devices. Total integrated up to 128 Modbus RTU points. B-AAC profile. Supports BACnet scheduling and alarms.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "CIPer-EXTRA-PARTS",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "CIPer MODEL 50 CONTROLLER",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "Extra parts for CIPer Model 50 controller system used for terminal connection, signal distribution, signal conversion, grounding, and mechanical mounting accessories.",
        _options: [
            {
                "partCode": "XS830",
                "specification": "Set of ten terminals. Each package consists of two groups of nine internally connected push-in terminals, for distributing signals / power.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "XS831",
                "specification": "Set of ten terminals. Each package consists of two groups of four pairs of push-in terminals (each with a 499 Ω resistor), for converting 0…20 mA signals into 0…10 VDC signals, and one push-in ground terminal per group.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TPU-11-01",
                "specification": "Removable terminal plugs, push-in type; complete set of 3 plugs (for terminals 1, 2, 24-32); for the WEB-EAGLENX26.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "TPU-45-01",
                "specification": "Removable terminal plugs, push-in type; complete set of 9 plugs (for terminals 1 - 47); for the WEB-EAGLENX26.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "MVC-80-AC1",
                "specification": "Terminal cover (color: RAL9011); package of ten.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "MVC-80-AC2",
                "specification": "Front door mounting accessory (color: RAL9011); package of ten.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "MVC-40-AC3",
                "specification": "Strain relief; package of ten.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQ4E-CONTROLLER",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQ4E Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The IQ4E controller is a flexible building automation controller with 10 universal inputs, 6 analogue outputs, and expandability up to 192 I/O channels depending on variant. It supports Ethernet TCP/IP networking, BACnet over IP, optional Trend current loop LAN, embedded XML web services, RS232/USB engineering ports, and Wallbus room display integration. It is designed for scalable HVAC and building management applications.",
        _options: [
            {
                "partCode": "IQ4E/16/BAC/230",
                "specification": "IQ4E controller with 16 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/BAC/230",
                "specification": "IQ4E controller expandable to 32 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/BAC/230",
                "specification": "IQ4E controller expandable to 64 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/BAC/230",
                "specification": "IQ4E controller expandable to 96 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/BAC/230",
                "specification": "IQ4E controller expandable to 128 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/BAC/230",
                "specification": "IQ4E controller expandable to 160 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/BAC/230",
                "specification": "IQ4E controller expandable to 192 I/O channels, BACnet IP support, 230 Vac power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/16/BAC/24VAC",
                "specification": "IQ4E controller with 16 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/BAC/24VAC",
                "specification": "IQ4E controller expandable to 32 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/BAC/24VAC",
                "specification": "IQ4E controller expandable to 64 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/BAC/24VAC",
                "specification": "IQ4E controller expandable to 96 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/BAC/24VAC",
                "specification": "IQ4E controller expandable to 128 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/BAC/24VAC",
                "specification": "IQ4E controller expandable to 160 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/BAC/24VAC",
                "specification": "IQ4E controller expandable to 192 I/O channels, BACnet IP support, 24 Vac / 48 Vdc power supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/16/LAN/BAC/230",
                "specification": "IQ4E controller with Trend LAN + BACnet IP, 16 I/O channels, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 32 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 64 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 96 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 128 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 160 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/LAN/BAC/230",
                "specification": "IQ4E controller expandable to 192 I/O channels, Trend LAN + BACnet IP, 230 Vac supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/16/LAN/BAC/24VAC",
                "specification": "IQ4E controller with Trend LAN + BACnet IP, 16 I/O channels, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/32/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 32 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/64/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 64 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/96/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 96 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/128/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 128 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/160/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 160 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQ4E/192/LAN/BAC/24VAC",
                "specification": "IQ4E controller expandable to 192 I/O channels, Trend LAN + BACnet IP, 24 Vac / 48 Vdc supply.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "HONEYWELL-CIPER-MODEL-10",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "CIPer Model 10 Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "DDC Controller",
        "brandSubCategoryLink": "/products/building-management/bms-controller/ddc-controller",
        "longDescription": "The Honeywell CIPer Model 10 is an IP-based field equipment controller powered by the Niagara Framework. It is designed for HVAC and building automation applications such as fan coil units, zone temperature control, and single-stage air handling units. The controller includes 10 onboard I/O points and supports IO-R-34 expansion. It operates on Niagara 4 (WEBs-N4.7 or later) and supports BACnet/IP, Modbus, and SNMP communication protocols over IP and RS-485 networks.",
        _options: [
            {
                "partCode": "EDGE-10",
                "specification": "CIPer Model 10 controller with 10 points of onboard IO, 1 RS-485 serial port, and 2 10/100 Ethernet ports. Supports 1 IO-R-34. Includes WEBs-N4 and drivers for BACnet, Modbus and SNMP. Supports up to 3 devices or 50 points. Includes all software updates released for commercial use by Honeywell for the life of N4, but not for any later versions.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "HONEYWELL-WEBS-N4-SUPERVISOR",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "WEBs-N4 Supervisor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Management Software",
        "brandSubCategoryLink": "/products/building-management/bms-management-software",
        "longDescription": "WEBs-N4 Supervisor is a Niagara-based building automation software platform used for enterprise management, monitoring, alarming, scheduling, data logging, and integration across multiple Niagara controllers and IP devices.",
        _options: [
            {
                "partCode": "WEB-S-0-N4",
                "specification": "No Niagara network – Devices only (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-0-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-1-N4",
                "specification": "1 Niagara network connection (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-1-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-2-N4",
                "specification": "2 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-2-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-3-N4",
                "specification": "3 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-3-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-10-N4",
                "specification": "10 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-10-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-100-N4",
                "specification": "100 Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-100-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "WEB-S-UNL-N4",
                "specification": "Unlimited Niagara network connections (18mo SMA req)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UNL-SMA-INIT",
                "specification": "18mo initial SMA (3YR or 5YR can be substituted)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEMO",
                "specification": "Niagara 4 Supervisor demo",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UP-1",
                "specification": "Adds one additional Niagara connection to Supervisor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UP-100",
                "specification": "Upgrades Supervisor 100 to unlimited Niagara connections",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-UP-UNL",
                "specification": "Upgrades Supervisor 100 to unlimited Niagara connections",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-10",
                "specification": "10 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-25",
                "specification": "25 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-50",
                "specification": "50 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-100",
                "specification": "100 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-DEVICE-200",
                "specification": "200 device core (STD drivers included)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-AX",
                "specification": "Enables Supervisor to run Niagara AX (v3.8)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "SUP-[0-UNL]-SMA [1,3,5]YR",
                "specification": "Supervisor [0-UNL] Maintenance – [1,3,5] YR extensions",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQVISION-SUPERVISOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQVISION Supervisor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Management Software",
        "brandSubCategoryLink": "/products/building-management/bms-management-software",
        "longDescription": "IQVISION is a building monitoring and management platform built on the Niagara 4 framework. It integrates Trend controllers and third-party devices using open protocols such as BACnet, Modbus, KNX, M-Bus, SNMP, and OPC, providing enterprise-level supervision, data logging, alarming, scheduling, reporting, and energy management.",
        _options: [
            {
                "partCode": "IQV-500",
                "specification": "IQVISION starter kit including Trend native driver and 500 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-2500",
                "specification": "IQVISION starter kit including Trend native driver and 2500 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-5000",
                "specification": "IQVISION starter kit including Trend native driver and 5000 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-15000",
                "specification": "IQVISION starter kit including Trend native driver and 15000 point database size",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-100EXT",
                "specification": "IQVISION additional 100 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-500EXT",
                "specification": "IQVISION additional 500 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-2500EXT",
                "specification": "IQVISION additional 2500 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-5000EXT",
                "specification": "IQVISION additional 5000 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-15000EXT",
                "specification": "IQVISION additional 15000 Trend database points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-500-OPEN",
                "specification": "Extend base license with additional 500 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-2500-OPEN",
                "specification": "Extend base license with additional 2500 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-5000-OPEN",
                "specification": "Extend base license with additional 5000 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-10000-OPEN",
                "specification": "Extend base license with additional 10000 Open protocol points",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-1-N",
                "specification": "Add connectivity for 1 TONN device",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-10-N",
                "specification": "Add connectivity for 10 TONN devices",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-MNT1",
                "specification": "IQVISION maintenance upgrade additional 1 year",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-MNT3",
                "specification": "IQVISION maintenance upgrade additional 3 years",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-MNT5",
                "specification": "IQVISION maintenance upgrade additional 5 years",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-ALM-PORTAL",
                "specification": "License for Alarm Portal on a remote PC",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-OPC",
                "specification": "Extend open protocol points with OPC client connectivity",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-DB-CSV",
                "specification": "Extend the capability to interact with microsoft excel",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQV-DB-SQL",
                "specification": "Extended the capability for IQVISION to communicate SQL",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQVIEW4",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQView4",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The IQView4 is a touch screen display which provides an interface to an IQ controller. It enables the user to view and adjust operating times, monitor alarms, make adjustments to controller parameters, and display graphs of logged data.",
        _options: [
            {
                "partCode": "IQVIEW4/24",
                "specification": "IQView4 including 3 m (9' 10\") RJ11 to RJ11 RS232 cable.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-RS-WMB-RD-WMB",
        "category": "Building Management",
        "brand": "Trend",
        "title": "RS-WMB, RD-WMB",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The RS-WMB and RD-WMB series of room sensors and displays are designed for mounting on a standard electrical back box. They include a temperature sensor with versions which also include humidity and CO₂ sensors. The RD-WMB has a monochrome backlit LCD display with setpoint, override, and fan speed control.",
        _options: [
            {
                "partCode": "RS-WMB-T",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RS-WMB-TH",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, and dew point output.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RS-WMB-TC",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor and local CO₂ concentration sensor.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RS-WMB-THC",
                "specification": "Room Sensor for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, local CO₂ concentration sensor, and dew point output.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-T",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-TH",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-TC",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local CO₂ concentration sensor, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RD-WMB-THC",
                "specification": "Room Display for use with IQ4 or IQeco with a wallbus connection. It has local temperature sensor, local humidity sensor, local CO₂ concentration sensor, dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-IQVIEW8",
        "category": "Building Management",
        "brand": "Trend",
        "title": "IQVIEW8 Touch Screen Display",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The IQVIEW8 is a touch screen display that provides an interactive user interface to the Trend system. It enables the user to view/adjust operating times, monitor alarms, make adjustments to controller parameters, display graphs of logged data, and interact with customized graphical schematics.",
        _options: [
            {
                "partCode": "IQVIEW8/24",
                "specification": "IQVIEW8 including 2GB memory card.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQVIEW8 SURFACE MOUNTING BOX",
                "specification": "Kit for mounting IQVIEW8 on a flat surface, or UK or USA double-gang back box.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "IQVIEW8 DRY PARTITION WALL BOX",
                "specification": "Kit for mounting IQVIEW8 embedded in an dry partition wall.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "CABLE/EJ105046",
                "specification": "RJ11 plug to RJ11 plug with crossover to connect to IQ4, IQ3, IQ2xx, and IQ1xx controller’s with RJ11 local supervisor port connector.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "CABLE/EJ105651",
                "specification": "RJ11 to 25 way D type male to connect to IQ1xx controller’s with RJ11 local supervisor port connector and to a CNC.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "CABLE/78-1172",
                "specification": "25 way D type female to 5 in line socket adapter to connect to IQ1xx controller’s with 5 in-line local supervisor port connector. Should be used in conjunction with CABLE/EJ105651).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/24VAC",
                "specification": "230/24 Vac, 36 VA, transformer for IQVIEW8 with surface mounting lugs, and through earth (ground) connection.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-RV-WMB-ROOM-VIEW-DISPLAY",
        "category": "Building Management",
        "brand": "Trend",
        "title": "Room View Display",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The RV-WMB Room View Display is designed for mounting on a standard electrical back box. It includes temperature and humidity sensors and features a high definition colour backlit LCD touch screen display with occupation override, setpoint, and fan speed control. It is designed to operate with Trend IQ4 and IQeco controllers and connects to the controller by a two wire polarity independent wall bus which carries both data and power.\n\nFeatures:\n- Single power/data connection to controller reduces wiring\n- Temperature and humidity sensing\n- Calculated dew point output\n- Operates in either °C or °F\n- Portrait or landscape orientation\n- High definition colour backlit touch screen LCD display\n- Setpoint, fan speed, and occupancy override controls\n- Display of CO₂ concentration and Outside Air Temperature values from controller\n- Function key options (lights, blinds etc)\n- Backup/Transfer of configuration details using micro SD card",
        _options: [
            {
                "partCode": "RV-WMB-TH",
                "specification": "Room Display (complete with dust cover). Compatible with IQ4 or IQeco with a wallbus connection. It has a temperature sensor, humidity sensor, calculated dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RV-WMB-TH-BX",
                "specification": "Room Display without bezel (complete with dust cover) for use RV-BW-A paintable bezel. Compatible with IQ4 or IQeco with a wallbus connection. It has a temperature sensor, humidity sensor, calculated dew point output, setpoint control, occupation override, occupation status display, and fan speed control. It also has the ability to display CO₂ concentration and outside temperature values from the controller.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "RV-BW-A",
                "specification": "Paintable bezel for use with RV-WMB-TH-BX.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-HT-D-DUCT-HUMIDITY-TEMPERATURE-SENSORS",
        "category": "Building Management",
        "brand": "Trend",
        "title": "Duct Humidity and Temperature Sensors",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The HT/D Duct Humidity and Temperature Sensors are duct mounted relative humidity and temperature sensors for HVAC applications. The certified ±2% high accuracy (/2%) and standard ±3% versions offer excellent linearity and stability over a wide humidity range (10 to 90%RH). Features: Precalibrated for ease of commissioning, IP65, operates over 0 to 100%RH non-condensing, ±2% and 3% accuracy versions, 2 part connectors for ease of installation, humidity sensor element protected by replaceable filter, capacitive humidity sensing element provides excellent long term stability, adjustable depth duct mounting flange option.",
        _options: [
            {
                "partCode": "HT/D/2%",
                "specification": "Duct humidity and PRT temperature sensor with ±2% humidity accuracy over 0 to 90%RH and calibration certificate.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HT/D",
                "specification": "Duct humidity and thermistor temperature sensor, ±3% humidity accuracy over 10 to 90%RH.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/FLANGE/12MM/5",
                "specification": "Optional, adjustable depth, duct mounting flange pack of 5.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/HTD/FILTER",
                "specification": "Replacement PTFE membrane filter for duct sensor - pack of 5.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-HT-O-OUTSIDE-HUMIDITY-TEMPERATURE-SENSORS",
        "category": "Building Management",
        "brand": "Trend",
        "title": "HT/O",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The HT/O Outside Humidity and Temperature Sensors are designed for outside air measurement applications, providing high quality humidity sensing combined with temperature monitoring. The HT/O offers excellent linearity and stability over a wide humidity range (0 to 100%RH). This sensor is fitted with a radiation shield to avoid solar, rain and wind effects. Electronics are mounted in an IP65 (NEMA4) housing with M20 conduit entry with M16 cable gland. Features: Passive thermistor and active 4 to 20 mA temperature outputs, 4 to 20 mA humidity output, IP65 housing, operates over 0 to 100%RH non-condensing, humidity element protected by replaceable filter, capacitive humidity sensing element provides excellent long term stability, radiation shield reduces solar, rain, and wind effects.",
        _options: [
            {
                "partCode": "HT/O",
                "specification": "Outside humidity and temperature sensor with radiation shield including mounting bracket, screws, and wall plugs.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "ACC/HTO/FILTER",
                "specification": "Replacement metal grid filter for HT/O (pack of 5 filters).",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-HT-S-SPACE-HUMIDITY-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "Space Humidity and Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The HT/S Space Humidity and Temperature Sensor is designed for wall mounted relative humidity measurement combined with temperature measurement. The certified 2% high accuracy (HT/S/2%) and standard 3% (HT/S) versions offer excellent linearity and stability over a wide humidity range. Features: Precalibrated for ease of commissioning, operates over 0 to 100%RH non-condensing, ±2% and 3% accuracy versions, 2 part connectors for ease of installation, capacitive humidity sensing element provides excellent long term stability.",
        _options: [
            {
                "partCode": "HT/S/2%",
                "specification": "Space humidity and PRT temperature sensor with ±2% humidity accuracy over 30 to 70%RH and ±3% over 20 to 90%RH. Complete with calibration certificate.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "HT/S",
                "specification": "Space humidity and thermistor temperature sensor, ±3% humidity accuracy over 30 to 75%RH, and ±4.5% over 20 to 95%RH.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "AFS-SERIES-ADJUSTABLE-DIFFERENTIAL-PRESSURE-SWITCH",
        "category": "Building Management",
        "brand": "Honeywell",
        "title": "AFS Series",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The AFS Series Adjustable Differential Pressure Switch is designed for air pressure sensing applications. The plated housing contains a diaphragm, a calibration spring and a snap-acting SPDT switch. The sample connections located on each side of the diaphragm accept 6.35 mm (0.25\") OD tubing via the integral compression ferrule and nut or barbed fitting. An enclosure cover guards against accidental contact with the live switch terminal screws and the set point adjusting screw. The enclosure cover will accept a 12.7 mm (0.5\") conduit connection. Features: Air sample media, diaphragm mounting in any vertical plane, adjustable differential pressure switch, ferrule and nut compression or 1/4\" OD barbed sample line connections, screw top terminals with cup washers, automatic or manual reset depending on model, SPDT or SPDT-NC switch configuration depending on model, UL, FM, CSA and CE approvals depending on model.",
        _options: [
            {
                "partCode": "AFS-222-316",
                "specification": "0.05 ± 0.02” W.C. to 12.0” W.C. with Ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-222-112-316",
                "specification": "0.05 ± 0.02” W.C. to 12.0” W.C. with 1/4” OD barbed connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-262-316",
                "specification": "0.05 ± 0.02” W.C. to 2.0” W.C. with Ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-262-112-316",
                "specification": "0.05 ± 0.02” W.C. to 2.0” W.C. with 1/4” OD barbed connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-460",
                "specification": "0.40 ± 0.06” W.C. to 12.0” W.C. with Ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-460-112",
                "specification": "0.40 ± 0.06” W.C. to 12.0” W.C. with 1/4” OD barbed connections.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-S563-EV564-INNTOUCH-DND-MUR-CONTROLS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM S563 / EV564 INNtouch DND and MUR Controls",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The INNCOM INNtouch guestroom annunciation system is a two-component solution that provides guests with a convenient way to communicate privacy and room service preferences. The system includes the EV564 Guestroom Annunciator and DND/MUR Control and the S563 Corridor Annunciator and Doorbell Control. Together they provide Do Not Disturb (Privacy), Make Up Room indication, and doorbell functionality while supporting integration with the INNCOM Integrated Room Automation System.",
        _options: [
            {
                "partCode": "EV564",
                "specification": "Guestroom Annunciator and DND / MUR Control",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "S563",
                "specification": "Corridor Annunciator and Doorbell Control",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "GS564",
                "specification": "Corridor Annunciator and Doorbell Control",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "GS564",
                "specification": "Guestroom Annunciator and DND / MUR Control",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-DD1",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "DD15 Daikin VRV Interface Module",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "Honeywell INNCOM DD15 interface module providing direct digital integration between INNCOM room automation systems and Daikin VRV indoor units.",
        _options: [
            {
                "partCode": "62-1465",
                "specification": "",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "32315379",
                "specification": "",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-MINI-PIR-MOTION-SENSOR",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Mini PIR Motion Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM Mini Passive Infrared (PIR) Motion Sensor is a recessed ceiling-mounted occupancy sensor designed to enhance guestroom energy management. Used with a door contact device, room controller, and communication network, it accurately detects room occupancy to improve HVAC efficiency, lighting control, security, and overall guest comfort.",
        _options: [
            {
                "partCode": "04-1068.MI",
                "specification": "Mini PIR Motion Sensor | Recessed ceiling-mounted occupancy sensor | Part Number: PIR2036.EP | 8-16VDC operating voltage (12VDC nominal) | Typical current consumption 15mA @ 12VDC | Detection range 0.5-12m (1.64-40ft) | Maximum coverage 8 × 8m (26 × 26ft) | 120° detection angle | Quad-element pyro-sensor | Spectral detection 6-14µm | Alternate polarity signal processing | Power-up delay 2 minutes | Sensor output time 3 seconds | Selectable N.C. or N.O. dry relay contact with 10Ω current limiting resistor | Output rating 50VDC / 0.5A maximum | Operating temperature 10°C to 55°C | Relative humidity 95% non-condensing | Dimensions 54 × 40mm | Weight 30g | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-MOTION-SENSORS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Motion Sensors",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "Honeywell INNCOM Motion Sensors are passive infrared (PIR) occupancy sensors designed to provide intelligent occupancy detection for INNCOM Energy Management Systems (EMS). Available in wired and wireless models with wall-mounted, flush ceiling-mounted, recessed ceiling-mounted, and battery-powered options, these sensors help maximize guestroom energy savings, improve HVAC efficiency, enhance lighting control, and integrate with the INNCOM Deep Mesh Network and INNcontrol EMS software.",
        _options: [
            {
                "partCode": "K04-1067.H",
                "specification": "K594W Wall Mounted Motion Sensor | Wired PIR occupancy sensor | Dimensions: 105 × 61 × 44 mm | Input voltage: 9-15VDC | Alarm indication LED: 2.4 seconds | Selectable event counter: 2 or 4 pulse | Normally-closed tamper contacts rated ≤100mA, 25VDC, 2.5W | Operating temperature: 0°C to 49°C | RFI immunity",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1068.MI",
                "specification": "Mini PIR Motion Sensor (Recessed Ceiling Mounted) | Dimensions: 54 × 40 mm | Operating voltage: 8-16VDC (12VDC nominal) | Current consumption: 15mA typical @12VDC | Lens: 36 beams, 120° coverage, maximum coverage 8 × 8 m | Quad-element pyro sensor | Spectral detection: 6-14 µm | Alternate polarity signal processing | Detection range: 8 m @25°C | Selectable single or dual polarity pulse counting | Sensor output time: 3 seconds | Selectable N.C. or N.O. relay dry contact with 10Ω current limiting resistor | Output contact rating: 50VDC, 0.5A maximum | Walk-test LED after power-up delay | Operating temperature: 10°C to 55°C | Relative humidity: 95% non-condensing | Weight: 30 g",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PIR2036.EP",
                "specification": "Mini PIR Motion Sensor | Alternate model designation for the recessed ceiling-mounted Mini PIR | Same specifications as part number 04-1068.MI",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-WHUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | White | Mounts in a single US gang box | Dimensions: 119 × 74 × 7.4 mm | RF data rate: 250 kbps | SMT antenna | Indoor range: 21 m (70 ft) | Outdoor line-of-sight range: 165 m (540 ft) | Transmit power: 1mW (+0dBm) | Receive sensitivity: -94.6dBm | 2.4GHz | AES-128 encryption | IEEE 802.15.4 | Channels 11-26 | FCC and CE Mark",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-BKUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | Black | Same specifications as 201-595-WHUS.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-LAUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | Light Almond | Same specifications as 201-595-WHUS.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-595-XXUS.P",
                "specification": "K595.RF Battery Powered Motion Sensor | Custom finish | Same specifications as 201-595-WHUS.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1068.AEI",
                "specification": "K594C Flush Ceiling Mounted Motion Sensor | Wired PIR occupancy sensor | Dimensions: 25 × 86 mm | Input voltage: 8-16VDC | Maximum current drain: 15mA | Lens: 24 Fresnel beams, 24 + 14 curtain beams | Maximum coverage: 11 × 11 m (36 × 36 ft), 113° | Relay contact: 28VDC, 0.1A | Event counter: Normal response or 2 pulse within 10 seconds | Normally-closed tamper contacts rated 50mA @12VDC | Operating temperature: -10°C to 55°C | Storage temperature: -20°C to 60°C",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFWH.P",
                "specification": "K594.RF Battery Powered Motion Sensor | White | Dimensions: 89 × 89 × 64 mm | RF data rate: 250 kbps | SMT antenna | Indoor range: 21 m (70 ft) | Outdoor line-of-sight range: 165 m (540 ft) | Transmit power: 1mW (+0dBm) | Receive sensitivity: -94.6dBm | 2.4GHz | AES-128 encryption | IEEE 802.15.4 | Input voltage: 9-16VDC | Maximum current drain: 9mA @12VDC | FCC Part 15B Listed",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFBK.P",
                "specification": "K594.RF Battery Powered Motion Sensor | Black | Same specifications as 01-9912-RFWH.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFLA.P",
                "specification": "K594.RF Battery Powered Motion Sensor | Light Almond | Same specifications as 01-9912-RFWH.P",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "01-9912-RFXX.P",
                "specification": "K594.RF Battery Powered Motion Sensor | Custom finish | Same specifications as 01-9912-RFWH.P",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-PC50X-DALI-MODULE",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM PC50X DALI Module",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM PC50X DALI Module is a Digital Addressable Lighting Interface (DALI) controller designed for hospitality applications. It provides granular lighting control, tunable white color temperature (DALI Type 8 Tc), scene management, energy-saving automation, and integration with the INNCOM INNcontrol™ Energy Management System (EMS). The module supports wired and wireless installation, Zigbee®, Bluetooth® Low Energy, Deep Mesh networking, and DALI lighting systems for centralized monitoring and intelligent guestroom lighting control.",
        _options: [
            {
                "partCode": "PC50X",
                "specification": "DALI Lighting Control Module | DALI Type 8 Tc (Tunable White Color Temperature) | Supports up to 16 lighting scenes and groups | Auto-on when guests enter and auto-off when room is empty | Restores previous lighting state after guest return or power outage | Very low dimming below 10% (driver/ballast dependent) | Supports incandescent, fluorescent, and LED lighting | Wired or wireless installation | Supports daisy-chain wiring | Zigbee® and Bluetooth® Low Energy configuration | DALI connector: 2-pin terminal block | DALI data rate: 1200bps | Isolation: 1500VDC (DALI-SELV) | INNCOM S5Bus: 2550bps, 50ft range, 20 nodes maximum | Zigbee RF: 100ft range, 19dBm (FCC), 9dBm (CE), -95.6dBm receive sensitivity, 2.4GHz IEEE 802.15.4, channels 11-26 | Bluetooth® Low Energy 5.0: 50ft range, 8dBm max output power, receive sensitivity -95dBm (1 Mbps), -92dBm (2 Mbps), -103dBm (125 kbps) | RS485: 250kbps Deep Mesh protocol, A/B/Ground, supports Multi-Point, Daisy-Chain, Tree and Star topologies, maximum 32 devices | I/O: 2 software-configurable digital TTL inputs/outputs and 1 open-collector relay output | Power input: 12VDC | Maximum current: 100mA | Operating temperature: 0°C to 50°C | Storage temperature: -20°C to 70°C | Humidity: 10-90% RH non-condensing | Indoor use only | Certifications: IEC 61347-2-11, EN 61547, EN 55015, EN 301489, EN 300328",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-B578-R-EDGE-ROUTER",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM B578.R Edge Router",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM B578.R Edge Router provides secure RF-to-Ethernet communication between INNCOM RF Room Gateway devices installed in guestrooms and the INNCOM Deep Mesh Server. Designed for hospitality applications, the B578.R supports Deep Mesh networking, end-to-end AES-128 encrypted communication, UDP packet transport, and Power over Ethernet (PoE) applications. It is optimized for buildings where RF communication is limited, such as concrete construction, and integrates with the INNCOM Room Automation System and INNcontrol 3 software.",
        _options: [
            {
                "partCode": "B578.R",
                "specification": "Edge Router | RF-to-Ethernet protocol converter | Deep Mesh Network gateway | Supports one router per guestroom | Wall, ceiling, standard 2-gang ring, or DIN rail mounting | Supports Power over Ethernet (PoE) applications | RF data rate: 250kbps | Indoor RF range: 100 ft | Transmit power: 50mW (+17dBm) | Receive sensitivity: -94.6dBm | Frequency band: 2.4GHz | AES-128 encryption | IEEE 802.15.4 protocol | Zigbee channels 11-26 (preferred: 15, 20, 25, 26) | Supports up to 50 in-room devices | Supply voltage: 12VDC | Current consumption: 200mA peak, 100mA RMS | Operating temperature: 0°C to 40°C | Dimensions: 4.75 × 4.9 × 0.8 in | Network connection: 10/100 Mbps Ethernet | Supported IP protocols: UDP, ICMP, DHCP | FCC Part 15, CE Mark ETSI, RoHS | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-CHM-S-ELECTRONIC-DOOR-CHIME",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM CHM-S Electronic Door Chime",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM CHM-S Electronic Door Chime is part of the Integrated Room Automation System (IRAS). It works with INNCOM System-5 (S5 bus) guestroom controls to provide an audible doorbell notification for hospitality guestrooms.",
        _options: [
            {
                "partCode": "04-1038",
                "specification": "Electronic Door Chime | Input voltage: 12VDC | Speaker: 1.0W, 8 Ohms | Dimensions: 70 × 119 × 54 mm (2.75 × 4.68 × 2.125 in) | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-D454-F-2-CHANNEL-AC-FET-DIMMER",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM D454-F 2-Channel AC FET Dimmer",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM D454-F is a 2-channel AC FET dimmer designed for the INNCOM In-Room Automation System (IRAS). It provides intelligent dimming control for incandescent, halogen, LED, and CFL lighting while integrating with INNCOM MODEVA, EVORA, Elements, and Designer Series room automation platforms. The D454-F also supports occupancy sensing, third-party switch interfaces, lighting scenes, and S5bus communication for seamless guestroom lighting automation.",
        _options: [
            {
                "partCode": "D454-F",
                "specification": "2-Channel AC FET Dimmer | Input voltage: 100-240VAC | Current consumption: Typical 100mA | S5bus communication | 2 open-collector digital outputs | 3 dry-contact digital inputs (0-5VDC) | Diagnostic and channel status LEDs | Dimensions: 157.2 × 86.6 × 57 mm | 35 mm DIN rail mountable | Operating temperature: 0°C to 40°C | Humidity: 0-90% RH non-condensing | Supports incandescent, halogen, LED, CFL, resistive, and electronic ballast loads | Dual 800W total output or 550W single-channel dimming | FCC, UL, CE, RoHS compliant | Indoor use only",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E7-THERMOSTAT",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E7 Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM e7 Thermostat is a smart guestroom thermostat designed for hospitality applications. It provides temperature and humidity control, built-in occupancy detection, and serves as the central hub for the INNCOM room automation platform. The e7 supports standalone or networked energy management, integrates with INNcontrol software and third-party hotel systems, and is compatible with a wide range of HVAC configurations.",
        _options: [
            {
                "partCode": "201-528-24-BK*",
                "specification": "24VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-24-WH*",
                "specification": "24VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-BK*",
                "specification": "100-277VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-WH*",
                "specification": "100-277VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-100-BK",
                "specification": "100-277VAC Thermostat Installation Kit | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-100-WH",
                "specification": "100-277VAC Thermostat Installation Kit | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-24-BK",
                "specification": "24VAC Thermostat Installation Kit | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-528-24-WH",
                "specification": "24VAC Thermostat Installation Kit | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "32324212-001",
                "specification": "Thermostat Screw Kit Assembly",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1464.R",
                "specification": "Thermostat 24VAC Harness",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1096.FL",
                "specification": "e7 Remote Thermistor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-503",
                "specification": "PC-503 Configuration Tool for engINN",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-250",
                "specification": "RS485 DM485 Communication Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1455",
                "specification": "Thermostat 100-277VAC Harness",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E7W-WIRELESS-EMS-THERMOSTAT",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E7W Wireless EMS Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The Honeywell INNCOM e7w Wireless EMS Thermostat is a battery-powered thermostat designed for hospitality energy management systems. It provides wireless temperature and humidity control, built-in occupancy detection, and seamless integration with the INNCOM Integrated Room Automation System (IRAS). The e7w supports standalone or networked EMS applications and works with INNcontrol software to optimize guest comfort and energy efficiency.",
        _options: [
            {
                "partCode": "201-528-6V-BK**",
                "specification": "6V Wireless Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-6V-WH**",
                "specification": "6V Wireless Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-24-BK",
                "specification": "24VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-24-WH",
                "specification": "24VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-BK",
                "specification": "100-277VAC Thermostat | Black Onyx",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-528-100-WH",
                "specification": "100-277VAC Thermostat | Ice White",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PC502***",
                "specification": "Protocol Converter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47.L.P",
                "specification": "24VAC Relay Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47.H.P",
                "specification": "100-277VAC Relay Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "S541.RF",
                "specification": "Wireless Door Switch / Transmitter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1096.FL",
                "specification": "Remote Thermistor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-503",
                "specification": "PC-503 Configuration Tool for engINN",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-250",
                "specification": "RS485 DM485 Communication Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "32324212-001",
                "specification": "Thermostat Screw Kit Assembly",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1455",
                "specification": "Thermostat 100-277VAC Harness",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "62-1464",
                "specification": "Thermostat 24VAC Harness",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E528-E529-EMS-THERMOSTATS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E528 & E529 EMS Thermostats",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The INNCOM e528 and e529 are e-Series hospitality EMS thermostats designed for scalable guestroom automation and energy management. The e528 supports line-voltage or low-voltage operation with built-in relays, while the e529 is a battery-powered wireless version. Both models function as standalone thermostats, in-room EMS devices, or networked IoT hubs integrated with INNCOM INNcontrol. They support optional occupancy sensing, RF communication, humidity sensing, ecoMODE energy-saving control, and integration with door locks and third-party systems for advanced energy optimization and guest comfort control.",
        _options: [
            {
                "partCode": "e528",
                "specification": "EMS Thermostat (Line Voltage / Low Voltage / Built-in Relay Versions)",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "e529",
                "specification": "Battery Powered Wireless EMS Thermostat (4x AA batteries)",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-L510-LAMP-CONTROLLER",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM L510 Lamp Controller",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "RF DeepMesh lamp controller designed for hospitality applications supporting incandescent, CFL, and LED loads with relay, TRIAC, or FET dimming control. Supports integration with INNCOM EMS and room automation systems.",
        _options: [
            {
                "partCode": "201-7050",
                "specification": "Relay Actuator RF Lamp Controller | 120-240VAC | 500W tungsten/ELV | 250VA electronic ballast | 1/10 HP motor | 4.1A resistive/general purpose load | IEEE 802.15.4 DeepMesh RF | 2405-2480MHz | 120-240VAC power input",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-7051",
                "specification": "TRIAC Dimmer RF Lamp Controller | 120VAC | 650W tungsten/ELV | 250VA electronic ballast | 1/10 HP motor | 2.9A resistive/general purpose load | IEEE 802.15.4 DeepMesh RF | 2405-2480MHz | dimming control for incandescent, CFL, LED lamps",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-7052",
                "specification": "FET Dimmer RF Lamp Controller | 120VAC | 350W tungsten/ELV | 250VA electronic ballast | 2.9A resistive/general purpose load | IEEE 802.15.4 DeepMesh RF | 2405-2480MHz | smooth dimming control for LED, CFL, incandescent lamps",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-PC-503-COMMISSIONING-TOOL",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM PC-503 Commissioning Tool",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "USB-based RF commissioning tool used with INNTOOL/EngINN application for installation and configuration of INNCOM devices. Provides RF-only communication and USB power interface with Tx/Rx LED indicators.",
        _options: [
            {
                "partCode": "201.503",
                "specification": "PC-503 Commissioning Tool | RF-only device | 2.4GHz IEEE 802.15.4 | 250kbps data rate | 70ft indoor range | +5dBm transmit power | -95dBm receive sensitivity | AES-128 encryption | USB 5V input power | Tx/Rx LED status indicators | 0–40°C operating temperature",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-POWER-SUPPLIES",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Power Supplies",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "Power supplies for INNCOM room automation and EMS systems.",
        _options: [
            {
                "partCode": "PS563",
                "specification": "40VA NEMA transformer that powers 24V–277VAC circuits in HVAC systems",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS564.DIN",
                "specification": "Universal input, 12VDC 1A output, DIN rail mountable enclosure with three (3) S5Bus connectors",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS564 SMPS",
                "specification": "Compact, universal input 12VDC output power supply",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS565",
                "specification": "Universal input 12VDC, 1A SMPS. This power supply uses a standard 110V outlet and provides two (2) 12VDC outputs",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS567 MEANWELL DR-30-12",
                "specification": "Meanwell DR-30-12 power supply used for applications which require up to 2A DC output. DIN rail mountable enclosure",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "PS576",
                "specification": "12 VDC, 4 amp power supply for the B576",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-RELAYS-CONTROLLERS",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM Relays & Controllers",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "INNCOM relays and controllers extend the Integrated Room Automation System (IRAS) by activating HVAC, lighting, drapes, and IoT devices.",
        _options: [
            {
                "partCode": "X05R",
                "specification": "Equipped with eight 15A relays to switch motor, pump, heater, tungsten, incandescent and fluorescent loads. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X05W",
                "specification": "Controls Williams FCU from INNCOM thermostat by modulating cooling, heating and fan motors. Includes switched relay output for heat. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X06",
                "specification": "Provides 1–5 relay outputs for HVAC, PTAC, FCU, lighting and drape control. Includes 12VDC 400mA power supply and S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X06.DIN",
                "specification": "DIN rail mountable universal relay pack for HVAC, PTAC, FCU, lighting and drape control applications. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X45RA",
                "specification": "Integrates lighting and guest room controls including 0–10V fluorescent ballasts, LED lights, occupancy detection and guest annunciation. Wired S5 bus communication",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47",
                "specification": "Provides 5 relay outputs for FCU and light-duty applications. Supports S5 bus or RF (with PC502). Available in 24VAC or 100–277VAC models",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "INNCOM-E527-THERMOSTAT",
        "category": "Room Control Unit(RCU)",
        "brand": "Honeywell",
        "title": "INNCOM E527 Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "INNCOM(Controller + Sensor)",
        "brandSubCategoryLink": "/products/room-control-unit-rcu/inncom-controller-+-sensor",
        "longDescription": "The INNCOM E527 is a low-voltage EMS thermostat designed for hospitality energy management systems. It provides intelligent HVAC control with optional PIR occupancy detection, door/window sensor integration, and humidity sensing. The E527 optimizes guestroom comfort while reducing HVAC energy consumption through occupancy-based setback control and integration with INNCOM INNcontrol software and Deep Mesh networking.",
        _options: [
            {
                "partCode": "PC502",
                "specification": "Protocol Converter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "X47.L.P",
                "specification": "24VAC Relay Module",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "S541.RF",
                "specification": "Wireless Door Switch / Transmitter",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "04-1096",
                "specification": "Remote Thermistor",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "201-503",
                "specification": "PC-503 Configuration Tool used with engINN",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "203-250",
                "specification": "RS485 DM485 Communication Module",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-DSD-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone DSD Series Duct Smoke Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "description": "Photoelectric duct smoke detector for HVAC duct systems with low-flow technology.",
        "longDescription": "Photoelectric duct smoke detector for HVAC duct systems with low-flow technology. Supports 24 VAC/DC or 120/240 VAC operation, operates in air velocities from 100 to 4000 FPM, and includes two SPDT Form-C relay contacts for reliable smoke detection.",
        _options: [
            {
                "partCode": "DSD120",
                "specification": "Duct smoke detector with dual-voltage power supply supporting 120 VAC and 24 VAC/VDC operation.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DSD240",
                "specification": "Duct smoke detector with dual-voltage power supply supporting 240 VAC and 24 VAC/VDC operation.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DST-1.0",
                "specification": "Metal duct sampling tube for duct widths up to 305 mm (12 in).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DST-1.5",
                "specification": "Metal duct sampling tube for duct widths from 305 mm to 610 mm (12–24 in).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DST-3.0",
                "specification": "Metal duct sampling tube for duct widths from 610 mm to 1200 mm (24–48 in).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DST-5.0",
                "specification": "Metal duct sampling tube for duct widths from 1200 mm to 2400 mm (48–96 in).",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "DST-10.0",
                "specification": "Metal duct sampling tube for duct widths from 2400 mm to 3700 mm (96–144 in).",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-AA-1-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone AA-1 Series Remote Audible Alarm",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "Remote audible alarm designed to provide audible indication at locations remote from the monitored equipment. Operates from 9–48 VDC with adjustable sound output up to 95 dB and is supplied on a stainless steel wall plate for single-gang electrical box or wall mounting.",
        _options: [
            {
                "partCode": "AA-1",
                "specification": "Remote audible alarm with 9–48 VDC operating voltage, adjustable sound level up to 95 dB(A), medium loud beep tone, NEMA 4X (IP65) enclosure, stainless steel mounting plate, and operating temperature range of -20°C to 65°C.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-AFS-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone AFS Series Differential Pressure Switch",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone AFS Series Differential Pressure Switch is designed to monitor differential air pressure and airflow in HVAC and building automation systems. It is commonly used to prove fan operation, detect clogged filters, verify airflow, and monitor pressure conditions in ducts and air handling equipment. The switch features a snap-acting SPDT contact, adjustable pressure set points, and supports both automatic and manual reset models. Its durable plated housing, wide operating temperature range, and multiple pressure range options make it suitable for commercial and industrial HVAC applications. Available with either ferrule and nut compression fittings or 1/4-inch OD barbed connectors for flexible tubing installation.",
        _options: [
            {
                "partCode": "AFS-222-316",
                "specification": "Adjustable differential pressure switch with set point range of 0.05 ± 0.02 in. W.C. to 12.0 in. W.C. and ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-222-112-316",
                "specification": "Adjustable differential pressure switch with set point range of 0.05 ± 0.02 in. W.C. to 12.0 in. W.C. and 1/4 in. OD barbed connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-262-316",
                "specification": "Adjustable differential pressure switch with set point range of 0.05 ± 0.02 in. W.C. to 2.0 in. W.C. and ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-262-112-316",
                "specification": "Adjustable differential pressure switch with set point range of 0.05 ± 0.02 in. W.C. to 2.0 in. W.C. and 1/4 in. OD barbed connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-460",
                "specification": "Adjustable differential pressure switch with set point range of 0.40 ± 0.06 in. W.C. to 12.0 in. W.C. and ferrule and nut compression connections.",
                "price": 0,
                "qty": 0
            },
            {
                "partCode": "AFS-460-112",
                "specification": "Adjustable differential pressure switch with set point range of 0.40 ± 0.06 in. W.C. to 12.0 in. W.C. and 1/4 in. OD barbed connections.",
                "price": 0,
                "qty": 0
            }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-AIR41-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone AIR41 Room Air Quality Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone AIR41 Series Room Air Quality Transmitter uses an advanced MEMS metal oxide semiconductor VOC sensor to detect poor indoor air quality. It provides selectable 0-5 VDC or 0-10 VDC linear output and a stepped 0-10 VDC output for building automation systems. The AIR41 supports optional LCD display, tri-color LED indicator, temperature sensors, pushbutton override switch, and relay output.",
        _options: generateAIR41Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-AQDT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone AQDT Duct Air Quality Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone AQDT Series Duct Air Quality Transmitter uses an advanced MEMS metal oxide semiconductor VOC sensor to detect poor indoor air quality. The sensor detects a broad range of volatile organic compounds (VOCs) including smoke, cooking odors, bio-effluence, outdoor pollutants, and emissions from human activities. The AQDT provides selectable 0-5 VDC or 0-10 VDC linear output and stepped 0-10 VDC output for building automation systems. It is supplied in a weatherproof polycarbonate enclosure suitable for duct installation with optional temperature sensor configurations.",
        _options: generateAQDTOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-AVDT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone AVDT Duct Air Velocity Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone AVDT Series Duct Air Velocity Transmitter is engineered for HVAC/R building automation applications. It measures air velocity and temperature with field selectable ranges and output options in a single device. The transmitter features a duct mount probe with adjustable collar suitable for round or rectangular ducts. Optional configurations include a backlit LCD display in Metric or Imperial units and an adjustable relay output.",
        _options: generateAVDTOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDD3-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CDD3 Series Room Carbon Dioxide Detector with BACnet or Modbus Communications",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CDD3 Series room carbon dioxide detector uses a highly accurate Non-dispersive Infrared (NDIR) sensor combined with digital linearization and temperature compensated circuitry in a low-profile enclosure for monitoring indoor CO2 levels. It provides BACnet MS/TP or Modbus communication through RS-485 for direct integration with Building Automation Systems (BAS). The detector supports optional temperature, humidity, setpoint adjustment, manual override, LCD display, and adjustable relay output. It is designed for commercial buildings, offices, classrooms, hospitals, and other indoor air quality monitoring applications.",
        _options: generateCDD3Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-ELP-X-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone ELP-X Series Low Pressure Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone ELP-X Series Low Pressure Transmitter is designed to measure positive, negative, and differential pressure in HVAC and industrial applications. The transmitter uses a piezoresistive sensor suitable for monitoring air or other clean inert gases. Typical applications include filter differential pressure monitoring and VAV system applications. The unit features a weatherproof polycarbonate enclosure for electrical connections and easy installation, with selectable output signals and pushbutton auto-zero adjustment.",
        _options: [
            {
                partCode: "ELPB2500PX",
                specification: "Low pressure transmitter with ±1% F.S.O. accuracy, differential (single port), static, velocity, and total pressure measurement capability. Response time of 250 ms, stability less than ±1% F.S.O. per year, compensated temperature range from 0°C to 50°C (32°F to 122°F), proof pressure of 40\" W.C., burst pressure of 120\" W.C., operating conditions of 0 to 50°C with 5 to 95% RH non-condensing. Powered by 20 to 28 Vac/dc supply with maximum current consumption of 20 mA. Provides selectable 4-20 mA (2-wire) and 0-10 Vdc (3-wire) output signals, reverse voltage protection, pushbutton auto-zero adjustment, screw terminal wiring connections, 5 mm (0.170\" ID) barbed pressure ports, 1/2\" NPT conduit connection, grey polycarbonate UL-94-V0 IP65 (NEMA 4X) enclosure, CE and RoHS approvals, manufactured in Canada."
            }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-GFS-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "GFS Series - DIFFERENTIAL PRESSURE SWITCH",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone GFS Series Adjustable Differential Pressure Switch with Setpoint Indication is designed for differential pressure monitoring and control applications. The switch provides adjustable pressure ranges with setpoint indication and includes a diaphragm, snap-acting SPDT switch, and range adjustment knob.",
        _options: [
            {
                partCode: "GFS-80-U-NPIKG",
                specification: "Adjustable Differential Pressure Switch with Setpoint Indication, range 20 to 300 Pa (0.08\" to 1.20\" WC), switch differential 10 Pa (0.04\" WC), ETL & CE, 1/2\" NPT & duct install kit, Greystone branded."
            },
            {
                partCode: "GFS-80-C-NPIKN",
                specification: "Adjustable Differential Pressure Switch with Setpoint Indication, range 20 to 300 Pa (0.08\" to 1.20\" WC), switch differential 10 Pa (0.04\" WC), CE only, 1/2\" NPT & duct install kit, Non-branded."
            },
            {
                partCode: "GFS-83-U-NPIKG",
                specification: "Adjustable Differential Pressure Switch with Setpoint Indication, range 50 to 500 Pa (0.2\" to 2.00\" WC), switch differential 20 Pa (0.08\" WC), ETL & CE, 1/2\" NPT & duct install kit, Greystone branded."
            },
            {
                partCode: "GFS-83-C-NPIKN",
                specification: "Adjustable Differential Pressure Switch with Setpoint Indication, range 50 to 500 Pa (0.2\" to 2.00\" WC), switch differential 20 Pa (0.08\" WC), CE only, 1/2\" NPT & duct install kit, Non-branded."
            },
            {
                partCode: "GFS-86-U-NPIKG",
                specification: "Adjustable Differential Pressure Switch with Setpoint Indication, range 500 to 2500 Pa (2.00\" to 10.00\" WC), switch differential 150 Pa (0.60\" WC), ETL & CE, 1/2\" NPT & duct install kit, Greystone branded."
            },
            {
                partCode: "GFS-86-C-NPIKN",
                specification: "Adjustable Differential Pressure Switch with Setpoint Indication, range 500 to 2500 Pa (2.00\" to 10.00\" WC), switch differential 150 Pa (0.60\" WC), CE only, 1/2\" NPT & duct install kit, Non-branded."
            }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-HTRC-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone HTRC Room Humidity/Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone HTRC Room Humidity/Temperature Transmitter combines humidity and temperature sensing in a single wall mount enclosure for environmental monitoring and control applications. It uses a field-proven RH sensor and curve-matched thermistor to provide accurate humidity and temperature measurement with selectable analog outputs, optional LCD display, and override switch options.",
        _options: generateHTRCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-LP-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "LP Series Low Pressure Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone LP Series Low Pressure Transmitter is designed to measure positive, negative, or differential pressure for HVAC applications. It uses a piezoresistive differential pressure sensor for monitoring air or clean inert gas pressure, with applications including filter differential pressure and VAV systems. The transmitter includes an integrated static pressure probe option, selectable output ranges, and a hinged gasketed polycarbonate enclosure for easy installation and electrical connections.",
        _options: generateLPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE200AS-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE200AS Series Stainless Steel Surface Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TE200AS Series Stainless Steel Surface Temperature Sensor is a single gang blank stainless steel wall plate incorporating a precision temperature sensor for monitoring room temperatures where additional security is required. The sensor supports various thermistor and RTD options with additional manual override and accessory options.",
        _options: generateTE200ASOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE200AD-DESIGNER-ROOM-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE200AD Series - Designer Room Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE200AD series is an attractive, low profile enclosure that incorporates a precision temperature sensor used to monitor room temperatures. Additional options are available that include setpoint adjustment & manual override.",
        _options: generateTE200ADOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDDF-FLEXIBLE-CABLE-DUCT-AVERAGE-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDDF Series - Flexible Cable Duct Average Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The flex-duct averaging temperature transmitter incorporates numerous precision platinum RTD's encapsulated at equal distances along a FT-6 plenum rated cable and is available in various lengths (see ordering chart). The sensing cable is constructed to provide excellent heat transfer and fast response. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response for measurement of duct temperatures. A weatherproof Polycarbonate enclosure is provided for ease of installation. An LCD is provided in either Â°C or Â°F.",
        _options: generateTDDFOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDDR-RIGID-DUCT-AVERAGE-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDDR Series - Rigid Duct Average Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi-point rigid duct average temperature transmitter incorporates four precision platinum RTD's encapsulated in a 6 mm (0.236\") OD, 304 stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resist moisture penetration. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response is available with various ranges. A weatherproof Polycarbonate enclosure is included for ease of installation. An LCD is provided in either Â°C or Â°F (see ordering chart).",
        _options: generateTDDROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDFL-FLYING-LEAD-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDFL Series - Flying Lead Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point flying lead temperature transmitter incorporates a precision platinum RTD encapsulated in a 50.8 x 6 mm (2\" x 0.236\") OD, 304 stainless steel probe. The probe provides excellent heat transfer, fast response and resist moisture penetration. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response for measurement of pipe temperatures. A weatherproof Polycarbonate enclosure is provided for ease of installation. An LCD is provided in either °C or °F.",
        _options: generateTDFLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDGL-GLASS-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDGL Series - Glass Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point glass temperature sensor utilizes a precision sensor encapsulated in a 31.75mm L x 9.525mm W x 9.525 mm H (1.25\" x .375\" x .375\") Aluminum probe. Standard wire length is 600 mm (24\"). The probe is constructed to provide excellent heat transfer, fast response and is potted to resist moisture penetration. The transmitter provides a high accuracy signal with excellent long term stability, low hysteresis and fast response and is available with various ranges. (see ordering chart). A weatherproof Polycarbonate enclosure is included for ease of installation. An LCD is provided in either °C or °F.",
        _options: generateTDGLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDSO-STRAP-ON-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDSO Series - Strap-On Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature transmitter incorporates a precision platinum RTD encapsulated in a 6 mm (0.236\") OD, 304 stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resist moisture penetration. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response for measurement of pipe temperatures. A weatherproof Polycarbonate enclosure is included for ease of installation. An LCD is provided in either Â°C or Â°F.",
        _options: generateTDSOOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDHR-HEAVY-DUTY-ROOM-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDHR Series - Heavy Duty Room Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The heavy duty room temperature transmitter incorporates a precision platinum RTD in a weatherproof enclosure with a sun and wind shield to monitor outside temperature levels. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response is available with various ranges. A weatherproof polycarbonate enclosure with a hinged and gasketed cover is provided for ease of installation. An LCD is provided in either °C or °F.",
        _options: generateTDHROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TDRP-REMOTE-PROBE-STRAP-ON-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TDRP Series - Remote Probe Strap-On Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature transmitter incorporates a precision platinum RTD encapsulated in a 6 mm (0.236\") OD, 304 stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resist moisture penetration. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response for measurement of pipe temperatures. A weatherproof Polycarbonate enclosure is included for ease of installation. An LCD is provided in either °C or °F.",
        _options: generateTDRPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CD2DT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CD2DT Duct Carbon Dioxide Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The duct CO2 device uses a highly accurate and reliable non-dispersive infrared (NDIR) sensor in an attractive enclosure with a gasketed, hinged cover for duct applications to monitor CO2 levels. The sensor uses dual wavelength optics and LTA (long term adjustment) signal processing technology to deliver industry leading long term accuracy and reliability. These features ensure optimum measurement stability for continual monitoring of either supply or return air measuring. Optional features include a resistive temperature sensor output (with LCD display of temperature in either °C or °F), a control relay with programmable setpoint, hysteresis and time delay, and either a conduit or cable gland connection point.",
        _options: generateCD2DTOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CD2OS-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CD2OS Series Outside Carbon Dioxide Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The outside CO2 transmitter device uses a highly accurate and reliable non-dispersive infrared (NDIR) sensor in a vented, weatherproof enclosure to monitor outside CO2 levels. The sensor uses dual-wavelength optics and LTA (long-term adjustment) signal processing technology to deliver industry-leading long-term accuracy and reliability. Standard features include a field selectable output signal of either 4-20 mA, 0-5 Vdc, or 0-10 Vdc for the highest versatility, programmable CO2 measurement span, a backlit alpha-numeric LCD, and easy menu operation for configuration. Optional features include a resistive temperature sensor output and a control relay with programmable setpoint, hysteresis, and time delay.",
        _options: generateCD2OSOptions(),
        _documents: []
    },
    {
        "productId": "CD2RMC-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CD2RMC Series Room Carbon Dioxide Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The CD2RMC Series uses a highly accurate and reliable dual wavelength Non-Dispersive Infrared (NDIR) sensor in an attractive, low-profile enclosure for room applications to monitor carbon dioxide (CO₂) levels. A field-selectable linear analog output of 4-20 mA, 0-5 Vdc, or 0-10 Vdc is provided for connection to building automation systems. Optional features include a resistive temperature sensor, adjustable relay output, manual override switch, and setpoint adjustment for enhanced environmental monitoring and control.",
        _options: generateCD2RMCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDD4A1-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CDD4A1 Series Room Carbon Dioxide Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The CDD4A1 Series room carbon dioxide transmitter uses a highly accurate dual wavelength non-dispersive infrared (NDIR) sensor with LTA (Long Term Adjustment) signal processing technology to provide reliable long-term CO2 monitoring in indoor environments. Designed for classrooms, hospitals, offices, and commercial buildings, the transmitter features a low-profile enclosure, programmable CO2 measurement span, and selectable analog outputs of 4-20 mA, 0-5 Vdc, or 0-10 Vdc. Standard models include a backlit LCD with menu-driven configuration, while optional features include a resistive temperature sensor, adjustable relay, and override switch for enhanced building automation applications.",
        _options: generateCDD4A1Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDD4B1-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CDD4B1 Series Room Carbon Dioxide Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The CDD4B1 Series room carbon dioxide detector uses a highly accurate and reliable Non-dispersive Infrared (NDIR) sensor housed in a low-profile enclosure for monitoring indoor CO2 levels. It provides a field-selectable analog output of 4-20 mA, 0-5 Vdc, or 0-10 Vdc for seamless integration with Building Automation Systems (BAS). The detector offers a programmable measurement span up to 20,000 ppm, altitude correction, and optional LCD display. Available options include a resistive temperature sensor, adjustable relay output, and manual override switch, making it suitable for commercial buildings, classrooms, offices, hospitals, and other indoor air quality applications.",
        _options: generateCDD4B1Options(),
        _documents: []
    },
    {
        "productId": "CDD4-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CDD4 Series Room Carbon Dioxide Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CDD4 Series room carbon dioxide detector uses a highly accurate and reliable Non-dispersive Infrared (NDIR) sensor in a low-profile enclosure for monitoring indoor CO2 levels. It provides a linear analog output signal of 4-20 mA, 0-5 Vdc, or 0-10 Vdc for connection to Building Automation Systems (BAS). The CDD4A model is designed for standard indoor air quality monitoring with a measurement range of 0-2000 ppm, while the CDD4B model uses dual-channel NDIR technology with a programmable measurement span up to 20,000 ppm. The detector supports optional temperature sensors, setpoint adjustment, manual override switch, relay output, and LCD display options. It is suitable for classrooms, offices, hospitals, commercial buildings, and other HVAC ventilation control applications requiring accurate CO2 monitoring.",
        _options: generateCDD4Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDD4-OUTSIDE-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone CDD4 Series Outside Carbon Dioxide Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CDD4 Series Outside Carbon Dioxide Detector uses a highly accurate Dual Channel Non-dispersive Infrared (NDIR) sensor combined with advanced digital linearization and temperature compensated circuitry in a weatherproof enclosure to monitor outdoor CO2 levels. It provides a field-selectable analog output of 4-20 mA, 0-5 Vdc, or 0-10 Vdc for connection to Building Automation Systems (BAS). The detector supports optional temperature sensing and adjustable relay output, making it suitable for outdoor air quality monitoring and ventilation control applications in commercial buildings and HVAC systems.",
        _options: generateCDD4OutsideOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDD5-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone CDD5 Series Room Carbon Dioxide Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CDD5 Series room carbon dioxide detector combines a highly accurate Non-dispersive Infrared (NDIR) CO2 sensor, precision thermistor temperature sensor, and thermoset polymer-based capacitive humidity sensor in a low-profile enclosure. It provides three analog outputs for CO2, temperature, and humidity monitoring and is designed for integration with Building Automation Systems (BAS). The series supports multiple CO2 measurement ranges, including 0-2000 ppm and 0-20000 ppm, with optional LCD display, relay output, manual override switch, and setpoint control. It is suitable for classrooms, offices, hospitals, commercial buildings, and indoor air quality monitoring applications.",
        _options: generateCDD5Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDD5-SERIES-ROOM-CO2-TEMPERATURE-HUMIDITY-DETECTOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CDD5 Series Room CO2, Temperature & Humidity Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CDD5 Series Room CO2, Temperature and Humidity Detector combines a highly accurate Non-dispersive Infrared (NDIR) CO2 sensor, precision thermistor temperature sensor, and thermoset polymer-based capacitive humidity sensor in a low-profile enclosure for indoor air quality monitoring applications. The device provides three analog outputs for CO2, temperature, and humidity measurements and supports optional features including setpoint control, manual override switch, adjustable relay output, and LCD display. It is designed for integration with Building Automation Systems (BAS) in commercial buildings, offices, classrooms, hospitals, and other HVAC control applications.",
        _options: generateCDD5RoomOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CDDT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CDDT Series - Duct Carbon Dioxide Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CDDT Series duct carbon dioxide transmitter uses advanced infrared technology with a dual-channel Non-dispersive Infrared (NDIR) sensor to accurately monitor CO2 levels in HVAC duct systems. It provides a linear analog output of 4-20 mA or 0-5/0-10 Vdc for connection to Building Automation Systems (BAS). The transmitter features a rugged IP65 enclosure, optional relay output, optional temperature sensor, and a back-lit LCD display with user menu for simplified installation and configuration. It is designed for commercial buildings, offices, hospitals, and other HVAC applications requiring reliable duct air quality monitoring.",
        _options: generateCDDTOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CEDT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CEDT Series - Duct Carbon Dioxide Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CEDT Series duct carbon dioxide transmitter uses a highly accurate dual-channel Non-Dispersive Infrared (NDIR) sensor in a duct mount enclosure to monitor return air CO2 levels for indoor air quality applications. The compact dual wavelength CO2 sensor provides high accuracy, low power consumption, and stable long-term operation. It offers selectable analog outputs of 4-20 mA, 0-5 Vdc, or 0-10 Vdc for easy integration with Building Automation Systems (BAS). The transmitter features a durable polycarbonate enclosure with a hinged and gasketed cover, optional temperature sensor input, and self-calibration technology to maintain sensor accuracy over time.",
        _options: generateCEDTOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CERMC-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CERMC Series - Room Carbon Dioxide Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CERMC Series room carbon dioxide transmitter uses a highly accurate dual-channel Non-Dispersive Infrared (NDIR) sensor in a low-profile enclosure to monitor ambient CO2 levels for indoor air quality applications. The compact dual wavelength CO2 sensor provides excellent accuracy, low power consumption, and stable long-term operation. It features selectable analog outputs of 4-20 mA, 0-5 Vdc, or 0-10 Vdc for seamless integration with Building Automation Systems (BAS). The transmitter includes self-calibration technology to correct sensor drift and supports optional resistive temperature sensor input for enhanced environmental monitoring.",
        _options: generateCERMCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CHTDT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CHTDT Series - CO2/Temp/Humidity Transmitter - Analog, BACnet\u00AE or Modbus",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CHTDT Series duct carbon dioxide, humidity, and temperature transmitter combines three environmental sensors in one duct mount enclosure for efficient HVAC monitoring and control. It uses a single-channel Non-Dispersive Infrared (NDIR) sensor with diffusion sampling to measure CO2 levels, a high-performance humidity sensor, and a precision thermistor to measure temperature. The transmitter supports analog outputs of 4-20 mA, 0-5 Vdc, 0-10 Vdc, BACnet MS/TP, or Modbus MS/TP communication for seamless integration with Building Automation Systems (BAS). It features a durable polycarbonate IP65 enclosure with a hinged and gasketed cover, optional relay output, and M16 thread adapter with cable gland on F enclosure options.",
        _options: generateCHTDTOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CMD5B1-SERIES-WALL-CARBON-MONOXIDE-DETECTOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CMD5B1 Series - Carbon Monoxide Monitor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CMD5B1 Series Wall Carbon Monoxide Detector uses an electrochemical sensor to monitor carbon monoxide (CO) levels and provides a factory calibrated 4-20 mA, 0-10 Vdc, or Modbus output signal for integration with Building Automation Systems. The detector is designed for wall or surface mounting applications and provides reliable indoor air quality monitoring. Optional relay output configuration is available for alarm control applications.",
        _options: generateCMD5B1Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CMD5B5-SERIES-DUCT-CARBON-MONOXIDE-DETECTOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CMD5B5 Series - Duct Carbon Monoxide Monitor with Analog or BACnet/Modbus",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CMD5B5 Series Duct Carbon Monoxide Detector uses an electrochemical sensor to monitor carbon monoxide (CO) levels in duct applications. It provides a field-selectable 4-20 mA or voltage output signal with selectable 0-5 Vdc or 0-10 Vdc ranges. The detector supports adjustable sensing ranges from 100 to 500 ppm and includes a front panel LCD display, backlight, status indicators, test switch, and buzzer alarm for easy configuration and operation. Optional relay outputs and BACnet or Modbus communications are available for integration with Building Automation Systems.",
        _options: generateCMD5B5Options(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-CMD5B1-SERIES-CARBON-MONOXIDE-DETECTOR-WITH-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "CMD5B1 Series Carbon Monoxide Detector with Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone CMD5B1 Series Carbon Monoxide Detector with Temperature Sensor combines a high-performance electrochemical carbon monoxide sensor with an integrated temperature sensor for comprehensive indoor air quality monitoring. The detector provides a standard 4-20 mA analog output in a 2-wire loop-powered configuration, with an optional 3-wire sourcing output and alarm relay. Designed for wall or surface mounting, it is ideal for parking garages, mechanical rooms, commercial buildings, and other indoor applications requiring reliable carbon monoxide detection and temperature monitoring.",
        _options: generateCMD5B1TempOptions(),
        _documents: []
    },
    {
        "productId": "TREND-TPS-PRT-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "T/PS PRT Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Trend T/PS PRT Temperature Sensor is a room temperature sensor designed to provide accurate and reliable temperature measurement for Building Management Systems (BMS). It features a precision Pt100 sensing element housed in a low-profile, well-ventilated enclosure for fast thermal response. The sensor provides a 4-20 mA analog output and is factory pre-calibrated for simple commissioning and seamless integration into HVAC and environmental control applications.",
        _options: [
            {
                partCode: "T/PS",
                specification: "PRT Space Temperature Sensor"
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-TPO-PRT-OUTSIDE-AIR-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "PRT Outside Air Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Trend T/PO PRT Outside Air Temperature Sensor is designed for accurate outdoor temperature measurement in HVAC and Building Management Systems (BMS). It features a precision PT100 sensing element with a 4-20 mA analog output, providing reliable and stable temperature monitoring over a wide operating range. The sensor is housed in an IP67 (NEMA 6) rated enclosure with a brass probe, M20 conduit entry, and M16 cable gland, making it suitable for demanding outdoor environments.",
        _options: [
            {
                partCode: "T/PO/-40",
                specification: "Outside Air PRT Temperature Sensor, -40°C to +50°C (-40°F to +122°F)"
            }
        ],
        _documents: []
    },
    {
        "productId": "TREND-TPI-PRT-INSERTION-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "PRT Insertion Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Trend T/PI PRT Insertion Temperature Sensor is designed for accurate temperature measurement in duct and immersion applications. It features a precision PT100 sensing element with a 4-20 mA analog output and head-mounted electronics for easy integration with Building Management Systems (BMS). The sensor is available with short (150 mm) and long (400 mm) stainless steel probes and supports multiple temperature ranges. Its IP67-rated enclosure, M20 conduit entry, and optional adjustable depth flange, universal fitting kit, and immersion pockets make it suitable for both new installations and retrofit applications.",
        _options: [
            { partCode: "T/PI-S/110", specification: "PRT100 Insertion Sensor, 150 mm Probe, -10\u00B0C to +110\u00B0C (14\u00B0F to 230\u00B0F)" },
            { partCode: "T/PI-S/40", specification: "PRT100 Insertion Sensor, 150 mm Probe, -10\u00B0C to +40\u00B0C (14\u00B0F to 104\u00B0F)" },
            { partCode: "T/PI-S/-40", specification: "PRT100 Insertion Sensor, 150 mm Probe, -40\u00B0C to +50\u00B0C (-40\u00B0F to 122\u00B0F), Refrigeration" },
            { partCode: "T/PI-L/40", specification: "PRT100 Insertion Sensor, 400 mm Probe, -10\u00B0C to +40\u00B0C (14\u00B0F to 104\u00B0F)" },
            { partCode: "ACC/DF", specification: "Adjustable Depth Flange for Duct Applications" },
            { partCode: "ACC/UF", specification: "Universal Fitting Kit for Retrofit Immersion Applications" },
            { partCode: "WS150", specification: "6 mm Stainless Steel Immersion Pocket" },
            { partCode: "WB150", specification: "6 mm Brass Immersion Pocket" }
        ],
        _documents: []
    },
    {
        "productId": "TREND-TPC-PRT-CONTACT-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "PRT Contact Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Trend T/PC PRT Contact Temperature Sensor is designed for accurate surface and pipe temperature measurement in HVAC and industrial applications. It features a precision PT100 sensing element, factory-calibrated 4-20 mA output, stainless steel contact probe, and an IP67-rated enclosure with junction box-mounted electronics. Supplied with a quick-fit jubilee clip, it is suitable for pipe diameters up to 203 mm (8 inches) and is ideal for retrofit installations.",
        _options: [
            { partCode: "T/PC/-40", specification: "PRT Contact Sensor with Jubilee Clip, (-40\u00B0C to +50\u00B0C, -40\u00B0F to +122\u00B0F)" },
            { partCode: "T/PC/40", specification: "PRT Contact Sensor with Jubilee Clip, (-10\u00B0C to +40\u00B0C, +14\u00B0F to +104\u00B0F)" },
            { partCode: "T/PC/110", specification: "PRT Contact Sensor with Jubilee Clip, (-10\u00B0C to +110\u00B0C, +14\u00B0F to +230\u00B0F)" },
            { partCode: "T/PC/160", specification: "PRT Contact Sensor with Jubilee Clip, (-10\u00B0C to +160\u00B0C, +14\u00B0F to +320\u00B0F)" }
        ],
        _documents: []
    },
    {
        "productId": "TREND-TBTS-THERMISTOR-ROOM-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Trend",
        "title": "TB/TS Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Trend TB/TS Thermistor Room Temperature Sensor is a wall-mounted thermistor room temperature sensor housed in a low-profile enclosure designed for good thermal response. It is available with several optional features including a low-profile adjustment knob for setpoint trim, a pushbutton for occupancy override, two status LEDs for occupancy indication, and a five-position fan control switch. The sensor can be surface mounted or mounted on a standard electrical back box, making it suitable for HVAC and Building Management System (BMS) applications.",
        _options: [
            { partCode: "TB/TS", specification: "Thermistor Temperature Sensor Only" },
            { partCode: "TB/TS/K", specification: "1 to 11 k\u03A9 Adjustment Knob (e.g. Setpoint Trim)" },
            { partCode: "TB/TS/O", specification: "Pushbutton (e.g. Occupancy Override); Open Circuits Knob Wiring" },
            { partCode: "TB/TS/E", specification: "Pushbutton (e.g. Occupancy Override); Volt Free Contact Closure" },
            { partCode: "TB/TS/S", specification: "Status LEDs - Two LEDs (e.g. Indicating Occupied/Unoccupied)" },
            { partCode: "TB/TS/F", specification: "Fan Speed Select Input to Give Off, Low Speed, Medium Speed, High Speed, or Automatic, Either by Stepped Voltage or Switched Resistance Values" }
        ],
        _documents: []
    },
    {
        "productId": "TREND-TBTC-TBTI-TBTO-THERMISTOR-TEMPERATURE-SENSORS",
        "category": "Building Management",
        "brand": "Trend",
        "title": "TB/TC, /TI, /TO Temperature Sensors",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Trend TB/TC, TB/TI, and TB/TO Thermistor Temperature Sensors are a range of low-cost thermistor sensors available in clamp-on, insertion, and outside air versions. The insertion sensor is suitable for both duct and immersion applications and features a 6 mm brass probe with a foam gasket for easy installation. The range includes an IP67-rated housing with a quick-release lid, M20 conduit entry with cable gland, high-quality thermistors, and optional accessories including immersion pockets, a universal fitting kit, and an adjustable depth flange for retrofit and duct applications.",
        _options: [
            { partCode: "TB/TC", specification: "Clamp-on Thermistor Temperature Sensor supplied with jubilee clip" },
            { partCode: "TB/TI/L", specification: "Insertion Thermistor Temperature Sensor for duct use with foam gasket fitted, 400 mm (15.75 in) probe" },
            { partCode: "TB/TI/S", specification: "Insertion Thermistor Temperature Sensor for duct or immersion use with foam gasket fitted, 150 mm (5.91 in) probe" },
            { partCode: "TB/TI/ES", specification: "Insertion Thermistor Temperature Sensor for duct or immersion use with foam gasket fitted, 70 mm (2.76 in) probe" },
            { partCode: "TB/TO", specification: "Outside Air Thermistor Temperature Sensor" },
            { partCode: "WS150", specification: "Stainless Steel Pocket for TB/TI (Immersion Use)" },
            { partCode: "WB150", specification: "Brass Pocket for TB/TI (Immersion Use)" },
            { partCode: "WS50", specification: "Stainless Steel Pocket for TB/TI (Immersion Use)" },
            { partCode: "WB50", specification: "Brass Pocket for TB/TI (Immersion Use)" },
            { partCode: "ACC/UF", specification: "Universal Fitting Kit for TB/TI Retrofit Immersion Application" },
            { partCode: "ACC/DF", specification: "Adjustable Depth Flange for TB/TI (duct use)" },
            { partCode: "TB/TI-S/BOX12", specification: "Pack of 12 TB/TI/S" },
            { partCode: "TB/TI-L/BOX12", specification: "Pack of 12 TB/TI/L" },
            { partCode: "TB/TI-ES/BOX12", specification: "Pack of 12 TB/TI/ES" }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-PICK-UP-PORT-SERIES",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Outside Air Pick-Up Port",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone Pick-Up Port Series is designed for pressure sensing applications used with low pressure transmitters in HVAC and Building Automation Systems. The series includes outside air, wall-mounted, ceiling-mounted, and stainless steel plate pick-up ports for measuring atmospheric or room pressure. Available in polycarbonate, ABS, and stainless steel enclosures, these pick-up ports provide reliable pneumatic connections for monitoring building static pressure and room pressure in commercial and industrial environments.",
        _options: [
            { partCode: "OPVR", specification: "Outside Pick-up Port, Rear Entry" },
            { partCode: "OPVT", specification: "Outside Pick-up Port, Top Entry" },
            { partCode: "RPV", specification: "Stainless Steel Plate Pick-up Port" },
            { partCode: "CPV", specification: "Continental ABS Pick-up Port" },
            { partCode: "SPV", specification: "Stainless Steel Ceiling Pick-up Port" }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-WATER-DETECTOR-SPOT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WLDS Series - Water Detector, Spot",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone Water Detector, Spot is designed to detect the presence of water or other conductive liquids in commercial and industrial environments. It features an IP65-rated enclosure with adjustable sensing probe height and is available with one or two Form C relay outputs. The detector can signal alarms when water is detected, power is lost, or an internal fault occurs, making it suitable for leak detection applications in HVAC, mechanical rooms, data centers, and other critical facilities.",
        _options: [
            { partCode: "WLDS1", specification: "Water Detector, Spot with 1 Relay" },
            { partCode: "WLDS2", specification: "Water Detector, Spot with 2 Relays" }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-WATER-DETECTOR-REMOTE-SPOT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WLDR Series - Water Detector, Remote Spot",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone Water Detector, Remote Spot is designed to detect the presence of water or conductive liquids using remote sensing probes connected by a plenum-rated cable. It is available with one or two Form C relay outputs and provides alarm indication when water is detected, power is lost, or an internal failure occurs. The IP65-rated enclosure features adjustable mounting legs, LED status indication, and multiple remote cable length options for flexible installation in HVAC, mechanical rooms, and critical monitoring areas.",
        _options: [
            { partCode: "WLDR100", specification: "Water Detector, Remote Spot with 1 Relay and No Cable (Remote Sensor Probes Only)" },
            { partCode: "WLDR102", specification: "Water Detector, Remote Spot with 1 Relay and 2m (6.5') Remote Cable" },
            { partCode: "WLDR105", specification: "Water Detector, Remote Spot with 1 Relay and 5m (16.4') Remote Cable" },
            { partCode: "WLDR110", specification: "Water Detector, Remote Spot with 1 Relay and 10m (32.8') Remote Cable" },
            { partCode: "WLDR200", specification: "Water Detector, Remote Spot with 2 Relays and No Cable (Remote Sensor Probes Only)" },
            { partCode: "WLDR202", specification: "Water Detector, Remote Spot with 2 Relays and 2m (6.5') Remote Cable" },
            { partCode: "WLDR205", specification: "Water Detector, Remote Spot with 2 Relays and 5m (16.4') Remote Cable" },
            { partCode: "WLDR210", specification: "Water Detector, Remote Spot with 2 Relays and 10m (32.8') Remote Cable" }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-WATER-DETECTOR-CONDUCTIVITY-CABLE",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WLDC Series - Water Detector, Conductivity Cable",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone Water Detector with Conductivity Cable is designed to detect the presence of water or conductive liquids using a sensing cable system. It is available with one or two Form C relay outputs and provides alarm indication when water is detected, power is lost, or an internal failure occurs. The detector features an IP65-rated ABS enclosure with adjustable mounting legs, tri-color LED status indication, optional leader cable lengths, and multiple conductivity cable length options for flexible water leak detection applications in commercial and industrial environments.",
        _options: generateWLDCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-WATER-DETECTOR-DUAL-CHANNEL-SPOT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WLD2S Series - Water Detector, Dual Channel, Spot",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone Water Detector, Dual Channel, Spot is designed to detect the presence of water or conductive liquids using two independent detection channels. Channel 1 provides spot detection with built-in sensing probes, while Channel 2 supports either remote spot sensing or conductivity cable detection with multiple cable length options. Each channel has an independent relay output for alarm signaling when water is detected, power is lost, or an internal failure occurs. The IP65-rated ABS enclosure includes adjustable mounting legs and tri-color LED status indication for reliable water leak monitoring applications.",
        _options: generateWLD2SOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-WATER-DETECTOR-DUAL-CHANNEL-REMOTE-SPOT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WLD2R Series - Water Detector, Dual Channel, Remote Spot",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone Water Detector, Dual Channel, Remote Spot is designed to detect the presence of water or conductive liquids using two independent sensing channels. Channel 1 provides remote spot detection with remote sensing probes and selectable cable lengths, while Channel 2 can be configured as either a secondary remote spot detector or a conductivity cable detector. Each channel provides independent relay outputs for alarm signaling when water is detected, power is lost, or an internal failure occurs. The IP65-rated ABS enclosure includes adjustable mounting legs and tri-color LED status indication for reliable water leak monitoring applications.",
        _options: generateWLD2ROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-WLD2C-DUAL-CHANNEL-CONDUCTIVITY-CABLE-WATER-DETECTOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WLD2C Series - Water Detector, Dual Channel Conductivity Cable",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone WLD2C Dual Channel Conductivity Cable Water Detector is designed to detect the presence of water or conductive liquids using two independent conductivity sensing cables. Each sensing cable has an independent relay output and provides alarm notification when water is detected, power is lost, or an internal failure occurs. The detector is housed in an IP65-rated ABS enclosure with adjustable mounting legs and a tri-color LED status indicator. It supports optional leader cables and multiple conductivity cable lengths for flexible water leak monitoring applications in commercial and industrial environments.",
        _options: generateWLD2COptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-WD100-WATER-DETECTOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "WD-100 Series Water Detector",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone WD-100 Series Water Detector is a microchip-based water detection device that uses gold-plated sensing probes to detect the presence of water or other conductive liquids. It operates from a 14-30 Vac/dc power source and provides Form C relay contacts for connection to monitoring systems or direct control applications. The WD-100 features adjustable sensing height, an IP65-rated enclosure, and reliable alarm detection for water presence, power loss, or internal failure conditions. The series includes standalone, remote probe, and conductivity cable versions available in different cable lengths.",
        _options: [
            { partCode: "WD100", specification: "Stand alone" },
            { partCode: "WD-102", specification: "Remote Probe (5')" },
            { partCode: "WD-100-5", specification: "c/w 5' conductivity cable" },
            { partCode: "WD-100-10", specification: "c/w 10' conductivity cable" },
            { partCode: "WD-100-25", specification: "c/w 25' conductivity cable" },
            { partCode: "WD-100-50", specification: "c/w 50' conductivity cable" },
            { partCode: "WD-100-100", specification: "c/w 100' conductivity cable" }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-UP-ULTRA-LOW-PRESSURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "UP Series Ultra Low Pressure Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone UP Series Ultra Low Pressure Transmitter is used to measure differential pressure up to 1\" WC or 250 Pa and transmit via Analog and BACnet\u00AE Communications. It combines precision high sensitivity silicon sensing technology and ASIC technology to reduce offset errors caused by temperature changes, warm-up stability, long-term instability, and position sensitivity. The transmitter features bidirectional pressure measurement, an on-board auto-zero function, backlight LCD display, adjustable alarm relay, and field configuration through the local menu or BACnet\u00AE connection. It is designed for monitoring air or other clean inert gas in HVAC and Building Automation Systems.",
        _options: [
            { partCode: "UPB1AR", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, Analog, Relay" },
            { partCode: "UPB1AX", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, Analog" },
            { partCode: "UPB1BR", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, BACnet\u00AE Communications, Relay" },
            { partCode: "UPB1BX", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, BACnet\u00AE Communications" },
            { partCode: "UPB2AR", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, Analog, Relay" },
            { partCode: "UPB2AX", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, Analog" },
            { partCode: "UPB2BR", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, BACnet\u00AE Communications, Relay" },
            { partCode: "UPB2BX", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, BACnet\u00AE Communications" },
            { partCode: "UPF1AR", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, Analog, Relay, thread adapter and cable gland fitting" },
            { partCode: "UPF1AX", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, Analog, thread adapter and cable gland fitting" },
            { partCode: "UPF1BR", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, BACnet\u00AE Communications, Relay, thread adapter and cable gland fitting" },
            { partCode: "UPF1BX", specification: "Ultra Low Pressure Transmitter, \u00B11\" WC, \u00B10.5\" WC, \u00B1250 Pa, \u00B1125 Pa, BACnet\u00AE Communications, thread adapter and cable gland fitting" },
            { partCode: "UPF2AR", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, Analog, Relay, thread adapter and cable gland fitting" },
            { partCode: "UPF2AX", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, Analog, thread adapter and cable gland fitting" },
            { partCode: "UPF2BR", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, BACnet\u00AE Communications, Relay, thread adapter and cable gland fitting" },
            { partCode: "UPF2BX", specification: "Ultra Low Pressure Transmitter, \u00B10.25\" WC, \u00B10.125\" WC, \u00B160 Pa, \u00B130 Pa, BACnet\u00AE Communications, thread adapter and cable gland fitting" }
        ],
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXSO-STRAP-ON-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXSO Series - Strap-on Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXSO Strap-on Temperature Transmitter is designed for accurate pipe surface temperature measurement using a precision 1000 \u03A9 platinum RTD bonded to a machined aluminum heat sink. The transmitter provides fast response, excellent heat transfer, and long-term stability. It includes a 25.4 cm (10 inch) stainless steel pipe clamp for secure installation on various pipe sizes. Available with multiple analog output options including 4-20 mA, 0-5 Vdc, and 0-10 Vdc, with factory-configured temperature ranges. The enclosure options include a weatherproof ABS housing or an enclosure with thread adapter and cable gland fitting for HVAC and Building Automation System applications.",
        _options: generateTXSOOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXSL-SLAB-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXSL Series Slab Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXSL Slab Temperature Transmitter is designed to measure concrete slab temperature using a precision 1000 \u03A9 platinum RTD sensor. The sensor is encapsulated in a thermal conductive coating or stainless steel probe depending on the selected sensor type, providing excellent heat transfer, fast response, and long-term stability. The transmitter supports multiple wire types, lengths, enclosure options, and analog outputs including 4-20 mA, 0-5 Vdc, and 0-10 Vdc. It is suitable for embedded concrete slab temperature monitoring applications in HVAC and Building Automation Systems.",
        _options: generateTXSLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXRP-REMOTE-PROBE-STRAP-ON-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXRP Series - Strap-on Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXRP Remote Probe Strap-on Temperature Transmitter is a single point temperature transmitter that uses a precision 1000 \u03A9 platinum RTD encapsulated in a 6 mm (0.236\") OD 304 stainless steel probe. It is designed for accurate pipe temperature measurement with excellent heat transfer, fast response, and moisture resistance. The transmitter provides a high accuracy analog signal with excellent long-term stability, low hysteresis, and fast response. It supports multiple probe lengths, output signals, and temperature ranges, with ABS or weatherproof enclosure options suitable for HVAC and building automation applications.",
        _options: generateTXRPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXRC-ROOM-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXRC Room Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXRC Series Room Temperature Transmitter is a low-profile room temperature sensor that combines a precision 1000 \u03A9 platinum RTD with a high accuracy transmitter for Building Automation Systems. It provides excellent long-term stability, low hysteresis, and fast response for room temperature measurement. The TXRC series supports multiple analog outputs, temperature ranges, and optional features including setpoint adjustment, manual override, status LEDs, external communication jack, and fan speed control.",
        _options: generateTXRCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXRCL-ROOM-TEMPERATURE-TRANSMITTER-LCD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "Greystone TXRCL Room Temperature Transmitter with LCD",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXRCL Series Room Temperature Transmitter with LCD Display is a low-profile room temperature transmitter that incorporates a precision temperature sensor and transmitter for accurate room temperature measurement in Building Automation Systems. It provides high accuracy, excellent long-term stability, low hysteresis, and fast response. The LCD display provides local temperature indication with programmable temperature range, units, offset, and backlight settings. An optional manual override push button with occupied input is available.",
        _options: generateTXRCLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXOS-OUTSIDE-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXOS Series - Outside Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXOS Series Outside Temperature Transmitter utilizes a precision platinum RTD sensor designed for accurate outdoor temperature measurement in Building Automation Systems. The sensor provides excellent heat transfer, fast response, and moisture resistance. It is housed in a weatherproof Polycarbonate enclosure and provides a high accuracy analog signal with excellent long-term stability, low hysteresis, and fast response.",
        _options: generateTXOSOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXOB-OUTSIDE-TEMPERATURE-TRANSMITTER-SUN-WIND-SHIELD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXOB  Series - Outside Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXOB Series Outside Temperature Transmitter with Sun and Wind Shield utilizes a precision platinum RTD sensor for accurate outdoor temperature measurement. The integrated sun and wind shield protects the sensor from direct sunlight while maintaining excellent airflow. It is housed in a weatherproof Polycarbonate enclosure and provides a high accuracy analog signal with excellent long-term stability, low hysteresis, and fast response for Building Automation Systems.",
        _options: generateTXOBOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXGL-GLASS-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXGL Series - Glass Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXGL Series Glass Temperature Transmitter utilizes a precision platinum RTD sensor encapsulated in an aluminum probe designed for glass surface temperature measurement. The probe provides excellent heat transfer, fast response, and moisture resistance. It is available with multiple enclosure options and analog output configurations for Building Automation Systems.",
        _options: generateTXGLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXFL-FLYING-LEAD-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXFL Series - Flying Lead Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXFL Series Flying Lead Temperature Transmitter utilizes a precision platinum RTD sensor encapsulated in a 304 series stainless steel probe. The probe provides excellent heat transfer, fast response, and moisture resistance. It includes a standard 3.05m (10 ft) FT-6 rated plenum cable and provides a high precision analog signal with excellent long-term stability, low hysteresis, and fast response for Building Automation Systems.",
        _options: generateTXFLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXDR-RIGID-DUCT-AVERAGE-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXDR Series - Rigid Duct Average Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TXDR Series Rigid Duct Average Temperature Transmitter is a multi-point temperature transmitter that uses multiple precision platinum RTDs installed at equal distances inside a 304 stainless steel probe. It is designed to measure average duct air temperature with excellent heat transfer, fast response, and moisture resistance. Available in multiple probe lengths, enclosure options, analog outputs, and temperature ranges.",
        _options: generateTXDROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXDF-FLEX-DUCT-AVERAGE-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXDF Series - Flex-Duct Average Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The flexible, multi-point duct averaging mounted temperature transmitter is available with a selection of platinum RTD sensors and a transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response. They are available with various scaled ranges. The sensing cable is constructed to provide excellent heat transfer, fast response time, and is available in several lengths and quantity of sensing elements.",
        _options: generateTXDFOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXDC-COPPER-DUCT-AVERAGE-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXDC Series - Duct Average Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point duct average temperature transmitter incorporates numerous precision platinum RTD's at equal distances and encapsulated in a 7.94 mm (0.3125\") OD, soft copper probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resist moisture penetration. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response is available with various ranges. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTXDCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TXAP-ALL-PURPOSE-DUCT-IMMERSION-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TXAP Series - All Purpose Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point temperature transmitter utilizes a precision sensor encapsulated in a 6.00 mm (0.236\") OD, 304 series stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resistance to moisture penetration. The TXAP comes with an 1/2\" NPT fitting and lock nut and 5' (1.524 m) of cable for connection to the Building Automation System. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTXAPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSSO-STRAP-ON-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSSO Series - Strap-On Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature sensor has a precision sensor bonded to a 38 mm x 38 mm (1.5\"x 1.5\") aluminum plate and adhered to a 38 mm x 25.4 mm (1.5 x 1\") compressible foam. A 254 mm (10\") S/S Pipe clamp is provided to secure the assembly to various sizes of pipe. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTSSOOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSSL-SLAB-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSSL Series - Slab Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TSSL single point slab temperature sensor utilizes a precision sensor encapsulated in a thermal conductive coating (ZW, FT & MP) and used to measure the temperature of a concrete slab. The MS is encapsulated and potted in a 12.7 mm (0.5\")D X 101.5 mm (4\")L double walled, S/S probe that allows for total liquid submersion. They are available with various sensor types, wire types and lengths. All probes are constructed to provide excellent heat transfer, fast response and to resist moisture penetration.",
        _options: generateTSSLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSRP-REMOTE-PROBE-STRAP-ON-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSRP Series - Remote Probe Strap-on Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature sensor utilizes a precision sensor encapsulated in a 6 mm (0.236\") OD, 304 stainless steel probe and is available in various lengths (see ordering chart). Standard wire length is 1.5 m (5'). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTSRPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSRC-ROOM-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSRC Series - Room Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TSRC series is an attractive, low profile enclosure that incorporates a precision temperature sensor used to monitor room temperatures. Additional options are available which include LCD, setpoint adjustment, manual override, and fan speed selector.",
        _options: generateTSRCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSPC-ROOM-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSPC Series - Room Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSPC Series Room Temperature Sensor with Resistive Setpoint Control is a wall-mounted temperature sensor designed for Building Automation Systems. It supports various curve-matched thermistors and RTD sensors, programmable resistive setpoint adjustment, back-lit LCD display, occupancy indication, optional override switch, fan speed switch, and communication jack. The low profile enclosure can be mounted directly to a wall or single gang electrical box.",
        _options: generateTSPCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSOS-OUTSIDE-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSOS Series - Outside Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside air temperature sensor utilizes a precision sensor. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A sun and wind shield is integrated into a weatherproof compact Polycarbonate enclosure with a hinged and gasketed cover for ease of installation.",
        _options: generateTSOSOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSOB-OUTSIDE-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSOB Series - Outside Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSOB Series Outside Temperature Sensor is a single point outdoor air temperature sensor designed with an integrated sun and wind shield inside a weatherproof polycarbonate enclosure. It uses precision thermistor or RTD sensing elements to provide excellent heat transfer, fast response, and moisture resistance. The hinged and gasketed enclosure supports easy outdoor installation for Building Automation Systems.",
        _options: generateTSOBOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSGL-GLASS-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSGL Series - Glass Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSGL Series Glass Temperature Sensor is a single point temperature sensor designed for monitoring glass surface temperatures. It uses a precision thermistor or RTD sensing element encapsulated in a compact aluminum probe measuring 31.75mm x 9.525mm x 9.525mm. The probe provides excellent heat transfer, fast response, and moisture resistance with a standard 1.524m (5 ft) wire length.",
        _options: generateTSGLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSFL-FLYING-LEAD-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSFL Series - Flying Lead Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSFL Series Flying Lead Temperature Sensor is a single point temperature sensor designed for duct and air stream temperature monitoring applications. It uses a precision thermistor or RTD sensing element encapsulated in a 6mm diameter x 50mm long 304 stainless steel probe. The probe provides excellent heat transfer, fast response, and moisture resistance with a standard 3.05m (10 ft) FT-6 rated plenum cable.",
        _options: generateTSFLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSDR-RIGID-DUCT-AVERAGE-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSDR Series - Rigid Duct Average Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSDR Series Rigid Duct Average Temperature Sensor is a multi-point temperature sensor designed to measure average duct air temperature. It uses multiple precision thermistor or RTD sensing elements spaced at equal distances inside a 6mm diameter 304 stainless steel probe. The probe provides excellent heat transfer, fast response, and moisture resistance. Available in multiple probe lengths and enclosure options for Building Automation Systems.",
        _options: generateTSDROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSDF-FLEXIBLE-CABLE-DUCT-AVERAGE-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSDF Series - Flexible Cable Duct Average Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSDF Series Flexible Cable Duct Average Temperature Sensor is a multi-point duct temperature sensor that uses several precision thermistor or RTD sensing elements evenly spaced along an FT-6 rated plenum cable. Designed for measuring average air temperature in HVAC ducts, it provides excellent heat transfer, fast response, and reliable long-term performance. Available in multiple cable lengths, enclosure types, and sensor options.",
        _options: generateTSDFOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSDC-FLEXIBLE-COPPER-DUCT-AVERAGE-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSDC Series - Flexible Copper Duct Average Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSDC Series Flexible Copper Duct Average Temperature Sensor is a multi-point duct averaging temperature sensor that utilizes several precision sensors spaced at equal distances and encapsulated in a 7.94 mm (0.3125\") OD soft copper probe. It is available in various lengths. All probes provide excellent heat transfer, fast response and resistance to moisture penetration. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTSDCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSBTA-BUTTON-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSBTA Series - Button Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TSBTA is a button style flush-mount Thermistor and RTD wall sensor that provides precision room temperature sensing for building automation systems. The TSBTA Series drastically decreases the footprint of the traditional box sensor so that it becomes virtually invisible once it is painted to match the decor. The active sensing element is made of a highly stable, precision thermistor material or platinum RTD. This design is intended for interior use only and is bonded to a plastic paintable housing.",
        _options: generateTSBTAOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TSAP-ALL-PURPOSE-DUCT-IMMERSION-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TSAP Series - All Purpose Duct/Immersion Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TSAP Series All Purpose Duct/Immersion Temperature Sensor is a single-point temperature sensor designed for HVAC duct and immersion applications. It features a precision thermistor or RTD sensing element encapsulated in a 6 mm (0.236 in.) 304 stainless steel probe, providing excellent heat transfer, fast response, and long-term resistance to moisture. The sensor is available in multiple probe lengths, enclosure styles, and sensing elements, making it suitable for duct air temperature monitoring or immersion measurement when installed with a compatible thermowell.",
        _options: generateTSAPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNRP-REMOTE-PROBE-STRAP-ON-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNRP Series - Remote Probe Strap-On Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The Greystone TNRP Series Remote Probe Strap-On Network Temperature Sensor is designed for accurate pipe temperature measurement in building automation systems. It utilizes a precision NTC thermistor encapsulated in a 6 mm (0.236 in.) 304 stainless steel probe and communicates directly over BACnet MS/TP or Modbus RTU via an RS-485 network. The weatherproof IP65 ABS enclosure makes it suitable for indoor and outdoor HVAC piping applications, while multiple probe lengths and enclosure options provide installation flexibility.",
        _options: generateTNROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNOS-OUTSIDE-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNOS Series - Outside Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside network temperature transmitter sensor incorporates a precision sensor housed in a protective sun/wind shield. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. The transmitter provides a BACnet or Modbus signal for network connection. A compact, weatherproof ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNOSOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNOB-OUTSIDE-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNOB Series - Outside Network Temperature Sensor with Sun and Windshield",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside network temperature transmitter sensor incorporates a precision sensor housed in a protective sun/wind shield. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. The transmitter provides a BACnet or Modbus signal for network connection. A compact, weatherproof ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNOBOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNGL-GLASS-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNGL Series - Glass Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point glass network temperature sensor incorporates a precision sensor encapsulated in a 31.75 mm L x 9.525 mm W x 9.525 mm H (1.25\" x .375\" x .375\") Aluminum probe. Standard wire length is 1.5 m (5'). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. It is available with a variety of enclosures. The transmitter provides a BACnet or Modbus signal for network connection. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNGLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNFL-FLYING-LEAD-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNFL Series - Flying Lead Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point flying lead network temperature sensor incorporates a precision sensor encapsulated in a 6 mm (0.236\") OD X 50 mm (2\"), 304 series stainless steel probe. Standard wire length is 1.83 m (6'). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. The transmitter provides a BACnet or Modbus signal for network connection. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNFLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNDR-RIGID-DUCT-AVERAGE-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNDR Series - Rigid Duct Average Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point rigid duct average network temperature sensor incorporates numerous precision sensors at equal distances and encapsulated in a 6 mm (0.236\") OD, 304 series stainless steel probe and is available in various lengths. All probes provide excellent heat transfer, fast response and resist moisture penetration. The transmitter provides a BACnet or Modbus signal for network connection. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNDROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNDF-FLEX-DUCT-AVERAGE-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNDF Series - Flex-Duct Average Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The flexible, multi-point duct averaging mounted network temperature sensor is available with a selection of platinum RTD sensors and a transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response. They are available with various scaled ranges. The sensing cable is constructed to provide excellent heat transfer, fast response time and is available in several lengths and quantity of sensing elements. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNDFOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNDC-FLEXIBLE-COPPER-NETWORK-DUCT-AVERAGE-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNDC Series - Flexible Copper Network Duct Average Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point duct average network temperature sensor incorporates numerous precision sensors at equal distances and encapsulated in a 7.94 mm (0.3125\") OD, soft copper probe and available in various lengths. All probes provide excellent heat transfer, fast response and resist moisture penetration. The transmitter provides a BACnet or Modbus signal for network connection. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNDCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TNAP-ALL-PURPOSE-NETWORK-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TNAP Series - All Purpose Network Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The all purpose single point network temperature sensor utilizes a precision sensor encapsulated in a 6 mm (0.236\") OD, 304 series stainless steel probe and is available in various lengths. All probes provide excellent heat transfer, fast response and resistance to moisture penetration. The transmitter provides a BACnet or Modbus signal for network connection. A compact ABS enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTNAPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLSO-STRAP-ON-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLSO Series - Strap-On Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated to a 38 mm x 38 mm (1.5\" x 1.5\") aluminum plate and adhered to a 38 mm x 25.4 mm (1.5 x 1\") compressible foam. A 254 mm (10\") S/S Pipe clamp is provided to secure the assembly to various sizes of pipe. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTLSOOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLRP-REMOTE-PROBE-STRAP-ON-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLRP Series - Remote Probe Strap-On Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 6 mm (0.236\") OD, 304 stainless steel probe and is available in various lengths. Standard wire length is 5' (1.5 m). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTLRPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLOS-OUTSIDE-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLOS Series - Outside Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside air temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A sun and wind shield is integrated into a weatherproof Polycarbonate enclosure.",
        _options: generateTLOSOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLOB-OUTSIDE-LOW-LIMIT-THERMOSTAT-SUN-WINDSHIELD",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLOB Series - Outside Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside air low limit thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A sun and windshield is integrated into a hinged and gasketed weatherproof Polycarbonate enclosure for ease of installation.",
        _options: generateTLOBOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLGL-GLASS-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLGL Series - Glass Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point glass temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 31.75mm L x 9.525mm W x 9.525 mm H (1.25\" x .375\" x .375\") Aluminum probe. Standard wire length is 600 mm (24\"). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTLGLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLFL-FLYING-LEAD-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLFL Series - Flying Lead Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point flying lead temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 6 mm (0.236\") OD X 50 mm (2\"), 304 series stainless steal probe. Standard wire length is 1.83m (6'). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTLFLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLDR-RIGID-DUCT-AVERAGE-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLDR Series - Rigid Duct Average Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point rigid duct average temperature thermostat incorporates several precision thermistor temperature sensors and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in 6 mm (0.236\") OD, 304 series stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resistance to moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTLDROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLDF-FLEXIBLE-CABLE-DUCT-AVERAGE-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLDF Series - Flexible Cable Duct Average High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The flexible, multi-point duct averaging temperature thermostat incorporates several precision thermistor temperature sensors and provides a Form C relay output (NO/NC) with an adjustable setpoint. The probe is FT-6 plenum rated cable and is available in various lengths (see ordering chart). All probes are constructed to provide excellent heat transfer and a fast response. A weatherproof Polycarbonate enclosure is provided for ease of installation.",
        _options: generateTLOFOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLDC-FLEXIBLE-COPPER-DUCT-AVERAGE-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLDC Series - Flexible Copper Duct Average Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point duct average temperature thermostat incorporates several precision thermistor temperature sensors and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 7.94 mm (0.3125\") OD, soft copper probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resistance to moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTLDCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TLAP-ALL-PURPOSE-DUCT-IMMERSION-LOW-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TLAP Series - All Purpose Low Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point duct/immersion low limit thermostat incorporates a precision thermistor sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 6mm (0.236\") OD, 304 stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resist moisture penetration. A weatherproof, Polycarbonate enclosure is provided for electrical connections.",
        _options: generateTLAPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THSO-STRAP-ON-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THSO Series - Strap-on High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point strap-on temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated to a 38 mm x 38 mm (1.5\"x 1.5\") aluminum plate and adhered to a 38 mm x 25.4 mm (1.5 x 1\") compressible foam. A 254 mm (10\") S/S Pipe clamp is provided to secure the assembly to various sizes of pipe. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTHSOOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THOS-OUTSIDE-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THOS Series - Outside High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside air temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A sun and wind shield is integrated into a weatherproof Polycarbonate enclosure.",
        _options: generateTHOSOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THOB-OUTSIDE-AIR-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THOB Series - Outside High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point outside air high limit thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A sun and windshield is integrated into a hinged and gasketed weatherproof Polycarbonate enclosure is provided for ease of installation.",
        _options: generateTHOBOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THGL-GLASS-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THGL Series - Glass High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point glass temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 31.75mm L x 9.525mm W x 9.525 mm H (1.25\" x .375\" x .375\") Aluminum probe. Standard wire length is 600 mm (24\"). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is included for ease of installation.",
        _options: generateTHGLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THFL-FLYING-LEAD-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THFL Series - Flying Lead High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point flying lead temperature thermostat incorporates a precision thermistor temperature sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 6 mm (0.236\") OD X 50 mm (2\"), 304 series stainless steal probe. Standard wire length is 1.83m (6'). All probes are constructed to provide excellent heat transfer, fast response and are potted to resist moisture penetration. A weatherproof Polycarbonate enclosure is provided for ease of installation.",
        _options: generateTHFLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THDR-RIGID-DUCT-AVERAGE-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THDR Series - Rigid Duct Average High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point rigid duct average temperature thermostat incorporates several precision thermistor temperature sensors and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in 6 mm (0.236\") OD, 304 series stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resistance to moisture penetration. A Polycarbonate enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTHDROptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THDF-FLEXIBLE-CABLE-DUCT-AVERAGE-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THDF Series - Flexible Cable Duct Average High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The flexible, multi-point duct averaging temperature thermostat incorporates several precision thermistor temperature sensors and provides a Form C relay output (NO/NC) with an adjustable setpoint. The probe is FT-6 plenum rated cable and is available in various lengths (see ordering chart). All probes are constructed to provide excellent heat transfer and a fast response. A weatherproof Polycarbonate enclosure with a hinged and gasketed cover is included for ease of installation.",
        _options: generateTHDFOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THDC-FLEXIBLE-COPPER-DUCT-AVERAGE-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THDC Series - Flexible Copper Duct Average High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The multi point duct average temperature thermostat incorporates several precision thermistor temperature sensors and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 7.94 mm (0.3125\") OD, soft copper probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resistance to moisture penetration. A weatherproof Polycarbonate enclosure with a hinged and gasketed cover is provided for ease of installation.",
        _options: generateTHDCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-THAP-ALL-PURPOSE-HIGH-LIMIT-THERMOSTAT",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "THAP Series - All Purpose High Limit Thermostat",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The single point duct/immersion high limit thermostat incorporates a precision thermistor sensor and provides a Form C relay output (NO/NC) with an adjustable setpoint. The sensor is encapsulated in a 6mm (0.236\") OD, 304 stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resist moisture penetration. A weatherproof, polycarbonate enclosure is provided for ease of installation.",
        _options: generateTHAPOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE500SL-SLAB-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE500SL Series - Slab Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE500SL single point slab temperature transmitter utilizes a precision sensor encapsulated in a thermal conductive coating and a transmitter that provides a high precision signal with excellent long term stability, low hysteresis and fast response is provided. The TE500SL is used to measure the temperature of a concrete slab. They are available with various wire types and lengths. All probes are constructed to provide excellent heat transfer, fast response and resist moisture penetration.",
        _options: generateTE500SLOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE500H-STACK-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE500H Series - Stack Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE500H series single point rigid stack temperature transmitter utilizes a precision, high temperature rated platinum RTD sensor that is encapsulated in 6.35 mm (0.25\") OD, 304 series stainless steel probe and is available in various lengths. All probes provide excellent heat transfer, fast response and resistance to moisture penetration. An integrated mounting flange and a weatherproof enclosure for wire termination are provided. A transmitter that provides a high accuracy signal with excellent long term stability, low hysteresis and fast response is provided.",
        _options: generateTE500HOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE500AS-STAINLESS-STEEL-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE500AS Series - Stainless Steel Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE500AS series is a single gang, blank stainless steel wall plate that incorporates a precision platinum RTD and a transmitter that provides a high accuracy signal with excellent long-term stability, low hysteresis and fast response for measurement of room temperatures.",
        _options: generateTE500ASOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE500AD-DESIGNER-ROOM-TEMPERATURE-TRANSMITTER",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE500AD Series - Designer Room Temperature Transmitter",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE500AD series is an attractive, low profile enclosure that incorporates a precision platinum RTD and a transmitter that provides a high accuracy signal with excellent long-term stability, low hysteresis and fast response for measurement of room temperatures.",
        _options: generateTE500ADOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE200HC-TEMPERATURE-SENSOR-WITH-MOUNTING-CLIP",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE200HC Series - Temperature Sensor with Mounting Clip",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE200HC series incorporates a precision temperature sensor used to monitor temperatures in a variety of applications. It comes with a self adhesive mounting clip which can be secured to almost any surface.",
        _options: generateTE200HCOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE200BB-DUCT-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE200BB Series - Duct Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE200BB single point duct temperature sensor utilizes a precision sensor encapsulated in a 6.35 mm (0.25\") OD, 304 series stainless steel probe and is available in various lengths (see ordering chart). All probes provide excellent heat transfer, fast response and resistance to moisture penetration. The TE200BB comes with an integrated mounting bracket and 10' (3.05 m) of plenum rated cable for connection to the Building Automation System.",
        _options: generateTE200BBOptions(),
        _documents: []
    },
    {
        "productId": "GREYSTONE-TE200A-MICRO-ROOM-TEMPERATURE-SENSOR",
        "category": "Building Management",
        "brand": "Greystone",
        "title": "TE200A Series - Micro Room Temperature Sensor",
        "mainImage": "",
        "thumbnails": [],
        "brandSubCategory": "BMS Field Device",
        "brandSubCategoryLink": "/products/building-management/bms-field-device",
        "longDescription": "The TE200 series of room temperature sensors incorporate a precision platinum RTD or NTC thermistor in an attractive wall mount enclosure for the most efficient environmental monitoring and control systems.",
        _options: generateTE200AOptions(),
        _documents: []
    }
];

async function seedTaxonomy() {
  const existing = await Category.countDocuments({ parent: null });
  if (existing > 0) {
    console.log("Taxonomy already seeded, skipping...");
    return;
  }

  const taxData = [
    {
        "name": "Building Management",
        "children": [
            {
                "name": "BMS Controller",
                "children": [
                    {
                        "name": "DDC Controller"
                    },
                    {
                        "name": "Network Controller"
                    }
                ]
            },
            {
                "name": "BMS Field Device"
            },
            {
                "name": "BMS Management Software"
            }
        ]
    },
    {
        "name": "Room Control Unit(RCU)",
        "children": [
            {
                "name": "INNCOM(Controller + Sensor)",
                "label": "INNCOM (Controller + Sensor)"
            }
        ]
    }
];

  for (const root of taxData) {
    const { children, ...rootData } = root;
    const parent = await Category.create(rootData);
    for (const child of (children || [])) {
      const { children: grandChildren, ...childData } = child;
      const childDoc = await Category.create({ ...childData, parent: parent._id });
      for (const gc of (grandChildren || [])) {
        await Category.create({ ...gc, parent: childDoc._id });
      }
    }
  }
  console.log("Taxonomy seeded successfully.");
}

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("MongoDB Connected for seeding Products...");

        await seedTaxonomy();

        for (const item of MOCK_PRODUCTS) {
            const { _options, _documents, ...productData } = item;

            // Upsert by productId to preserve admin-uploaded images and options/documents
            const existing = await Product.findOne({ productId: productData.productId });
            if (existing) {
                // Only update fields that came from the seed, preserve images and existing options/documents
                const updateData = { ...productData };
                if (existing.mainImage) delete updateData.mainImage;
                if (existing.thumbnails && existing.thumbnails.length > 0) delete updateData.thumbnails;
                await Product.updateOne(
                    { productId: productData.productId },
                    { $set: updateData }
                );
                console.log(`Updated existing product: ${productData.productId} (preserved image & options)`);

                // Do NOT replace options or documents for existing products
            } else {
                const product = await Product.create(productData);

                if (_options && _options.length > 0) {
                    const opts = _options.map(opt => ({
                        productId: product._id,
                        partCode: opt.partCode,
                        specification: opt.specification,
                        price: opt.price || 0,
                        qty: opt.qty || 0
                    }));
                    const saved = await ProductOption.insertMany(opts);
                    product.options = saved.map(o => o._id);
                }

                if (_documents && _documents.length > 0) {
                    const docs = _documents.map(d => ({
                        productId: product._id,
                        name: d.name,
                        url: d.url
                    }));
                    const saved = await ProductDocument.insertMany(docs);
                    product.documents = saved.map(d => d._id);
                }

                await product.save();
                console.log(`Created new product: ${productData.productId}`);
            }
        }

        console.log(`Products seeded successfully!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedDB();
