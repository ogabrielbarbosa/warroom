"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Input OTP ───────────────────────────────────────────── */

interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

function InputOTP({
  length = 6,
  value = "",
  onChange,
  className,
}: InputOTPProps) {
  const [values, setValues] = React.useState<string[]>(
    value.split("").concat(Array(length - value.length).fill(""))
  );
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, newValue: string) => {
    if (!/^\d*$/.test(newValue)) return;

    const nextValues = [...values];
    nextValues[index] = newValue.slice(-1);
    setValues(nextValues);
    onChange?.(nextValues.join(""));

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      data-slot="input-otp"
      className={cn("flex items-center gap-2", className)}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "flex size-10 items-center justify-center border border-border bg-background text-center font-mono text-sm text-foreground transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          )}
        />
      ))}
    </div>
  );
}

/* ── Input OTP Group ─────────────────────────────────────── */

interface InputOTPGroupProps {
  label?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function InputOTPGroup({
  label,
  description,
  children,
  className,
}: InputOTPGroupProps) {
  return (
    <div data-slot="input-otp-group" className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium font-mono text-foreground">
          {label}
        </label>
      )}
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { InputOTP, InputOTPGroup };
export type { InputOTPProps, InputOTPGroupProps };
