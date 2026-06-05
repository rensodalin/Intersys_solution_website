import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowCustom?: boolean;
}

export function Combobox({ value, onChange, options, placeholder = "Select...", disabled, className, allowCustom = true }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showDropdown = open && (filtered.length > 0 || (allowCustom && inputValue && !options.includes(inputValue)));

  useEffect(() => {
    if (!showDropdown) setFocusedIndex(-1);
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.parentElement?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (opt: string) => {
    onChange(opt);
    setInputValue(opt);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setFocusedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && filtered[focusedIndex]) {
        selectOption(filtered[focusedIndex]);
      } else if (allowCustom && inputValue.trim()) {
        onChange(inputValue.trim());
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleChange = (val: string) => {
    setInputValue(val);
    setOpen(true);
    if (!allowCustom && options.includes(val)) {
      onChange(val);
    } else if (allowCustom) {
      onChange(val);
    }
  };

  const clearValue = () => {
    onChange("");
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition pr-14",
            disabled && "opacity-50 cursor-not-allowed bg-gray-50"
          )}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
          {value && (
            <button type="button" onClick={clearValue}
              className="p-0.5 text-gray-300 hover:text-gray-500 transition cursor-pointer">
              <X size={14} />
            </button>
          )}
          <button type="button" onClick={() => setOpen(!open)}
            className="p-0.5 text-gray-400 hover:text-gray-600 transition cursor-pointer">
            <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
          </button>
        </div>
      </div>

      {showDropdown && (
        <div
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
        >
          {filtered.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onMouseDown={() => selectOption(opt)}
              onMouseEnter={() => setFocusedIndex(i)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm transition cursor-pointer",
                i === focusedIndex ? "bg-[#C3110C]/10 text-[#C3110C] font-medium" : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {opt}
            </button>
          ))}
          {allowCustom && inputValue && !options.includes(inputValue) && (
            <div className="px-3 py-2 text-xs text-gray-400 border-t border-gray-100 italic">
              Custom: press Enter to use "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
