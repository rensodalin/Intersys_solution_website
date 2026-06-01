import { useEffect, useState, lazy, Suspense } from "react";
import { Wifi } from "lucide-react";
import type { CountryEntry } from "./types";

interface GlobalPresenceCardProps {
  countryDistribution: CountryEntry[];
}

const WorldMap = lazy(() =>
  import("react-svg-worldmap").then((mod) => ({
    default: mod.WorldMap || mod.default,
  }))
);

const COUNTRY_CODES: Record<string, string> = {
  cambodia: "kh",
  "south korea": "kr",
  korea: "kr",
  singapore: "sg",
  vietnam: "vn",
  japan: "jp",
  usa: "us",
  "united states": "us",
  "united kingdom": "gb",
  uk: "gb",
  germany: "de",
  france: "fr",
  china: "cn",
  india: "in",
  canada: "ca",
  australia: "au",
  thailand: "th",
  malaysia: "my",
  philippines: "ph",
  indonesia: "id",
  myanmar: "mm",
  laos: "la",
};

function getCountryCode(name: string): string {
  const cleanName = name.trim().toLowerCase();
  return COUNTRY_CODES[cleanName] || (cleanName.length === 2 ? cleanName : "us");
}

export function GlobalPresenceCard({ countryDistribution }: GlobalPresenceCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const countries = countryDistribution.length > 0
    ? countryDistribution.slice(0, 5)
    : [{ name: "No data yet", percentage: 100 }];

  const mapData = countryDistribution.length > 0
    ? countryDistribution.map((c) => ({
      country: getCountryCode(c.name) as any,
      value: c.percentage,
    }))
    : [{ country: "kh" as any, value: 0 }];

  const mapPlaceholder = (
    <svg width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
      <path d="M 20,40 Q 30,35 45,45 T 70,50 T 90,40 T 110,48 T 130,42 T 160,35 T 180,48 T 195,40" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M 10,70 Q 25,60 40,75 T 70,65 T 100,78 T 120,68 T 150,72 T 180,60" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
      <rect x="25" y="30" width="30" height="20" rx="5" fill="none" stroke="#334155" strokeWidth="0.5" />
      <rect x="75" y="25" width="40" height="30" rx="8" fill="none" stroke="#334155" strokeWidth="0.5" />
      <rect x="135" y="35" width="45" height="25" rx="6" fill="none" stroke="#334155" strokeWidth="0.5" />
      <rect x="40" y="65" width="25" height="25" rx="4" fill="none" stroke="#334155" strokeWidth="0.5" />
    </svg>
  );

  const stylingFunction = ({ countryValue }: any) => {
    if (countryValue && countryValue > 0) {
      return {
        fill: "#C3110C",
        fillOpacity: 0.9,
        stroke: "#040D1A",
        strokeWidth: 0.5,
        cursor: "pointer",
      };
    }
    return {
      fill: "#1A2E4C",
      fillOpacity: 0.8,
      stroke: "#0B1626",
      strokeWidth: 0.5,
      cursor: "default",
    };
  };

  return (
    <div className="bg-[#040D1A] text-white p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden group">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black  text-white">Global Presence</h2>

        </div>
        <p className="text-[13px] font-black text-sky-400 mt-1">Active Connection Hubs</p>

        <div className="w-full h-36 mt-4 relative flex items-center justify-center overflow-hidden [&_svg]:max-w-full [&_svg]:max-h-full [&_path]:transition-all [&_path]:duration-500 hover:[&_path]:opacity-80">
          {mounted ? (
            <Suspense fallback={mapPlaceholder}>
              <WorldMap
                color="#C3110C"
                backgroundColor="transparent"
                borderColor="#1E293B"
                valueSuffix="%"
                size="sm"
                data={mapData}
                title=""
                styleFunction={stylingFunction}
              />
            </Suspense>
          ) : (
            mapPlaceholder
          )}
        </div>
      </div>

      <div className="space-y-3 mt-4 text-[10px] font-bold">
        {countries.map((c, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-gray-400">
              <span>{c.name}</span>
              <span className="text-white">{c.percentage}%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#C3110C] rounded-full transition-all duration-1000" style={{ width: `${c.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
