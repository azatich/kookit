"use client";

import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";

type RatingProps = {
  value: number;
  onChange?: (next: number) => void;
  max?: number;
  size?: number;
  className?: string;
  readOnly?: boolean;
  ariaLabel?: string;
};

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = 16,
  className = "",
  readOnly = false,
  ariaLabel = "Rating",
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const safeValue = useMemo(() => clamp(Math.floor(value || 0), 0, max), [value, max]);

  const handleSelect = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || !onChange) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(clamp(safeValue + 1, 0, max));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(clamp(safeValue - 1, 0, max));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  const activeCount = hoverIndex !== null ? hoverIndex + 1 : safeValue;

  return (
    <div
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={safeValue}
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-1 text-yellow-400 ${className}`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const filled = index < activeCount;
        return (
          <button
            key={index}
            type="button"
            aria-label={`Rate ${index + 1} out of ${max}`}
            disabled={readOnly}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onFocus={() => setHoverIndex(index)}
            onBlur={() => setHoverIndex(null)}
            onClick={() => handleSelect(index)}
            className={`p-0 m-0 bg-transparent border-0 cursor-${readOnly ? "default" : "pointer"}`}
          >
            <Star
              size={size}
              className={filled ? "fill-yellow-400" : ""}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;


