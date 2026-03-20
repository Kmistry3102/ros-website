"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";

interface TextInputProps<T extends Record<string, any>> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password" | "url" | "textarea" | "date";
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  validation?: any;
  trigger?: UseFormTrigger<T>;
  maxLength?: number;
  onBlurTrim?: boolean;
  rows?: number;
  onInputChange?: () => void;
  onClick?: () => void;
  readOnly?: boolean;
  watch?: (name: Path<T>) => any;
  min?:string;
  max?:string;
}

export default function TextInput<T extends Record<string, any>>({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errors,
  validation,
  trigger,
  maxLength,
  onBlurTrim = true,
  rows = 1,
  onInputChange,
  onClick,
  readOnly = false,
  watch,
  min,max
}: TextInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const { ref, onChange, onBlur, name: fieldName } = register(name, validation);

  // Watch the form value if watch function is provided (for programmatic updates)
  const watchedValue = watch ? watch(name) : undefined;

  // Combine refs
  const combinedRef = (node: HTMLInputElement | HTMLTextAreaElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as any).current = node;
    }
  };

  // Check initial value and update on change
  useEffect(() => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  }, []);

  // Update hasValue when watched value changes (for programmatic updates)
  useEffect(() => {
    if (watch && watchedValue !== undefined) {
      queueMicrotask(() => {
        setHasValue(!!watchedValue);
      });
    }
  }, [watchedValue, watch]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    if (onBlurTrim && e.target.value !== undefined) {
      e.target.value = e.target.value.trim();
    }
    onChange(e as any);
    onBlur(e as any);
    if (trigger) trigger(name);
    setHasValue(!!e.target.value);
  };

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHasValue(
      !!(e.currentTarget as HTMLInputElement | HTMLTextAreaElement).value
    );
    onChange(e as any);
    if (trigger) trigger(name);
  };

  const isFloated = isFocused || hasValue || type === 'date';

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className={`absolute left-4 line-clamp-1 pr-3 font-normal text-[#575757] pointer-events-none transition-all duration-200 ease-in-out ${
            isFloated && type !== "textarea"
              ? "top-2 text-xs"
              : type === "textarea" && isFloated
              ? "top-2 text-xs bg-white w-[90%]"
              : "top-4 text-base"
          }`}
        >
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          id={name}
          name={fieldName}
          ref={combinedRef as any}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          className={`font-normal w-full border bg-transparent px-4 pt-5 pb-2 rounded-lg text-base text-neutral-900 placeholder-neutral-400 outline-none transition-colors duration-200
            ${
              errors?.[name]
                ? "border-red-500"
                : "border-neutral-300 focus:border-black"
            }`}
        />
      ) : (
        <input
          id={name}
          name={fieldName}
          type={type}
          ref={combinedRef as any}
          maxLength={maxLength}
          min={min}
          max={max}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onClick={onClick}
          onChange={onInputChange}
          className={`shadow-none font-normal w-full border bg-transparent px-4 pt-5 pb-2 rounded-lg text-base text-neutral-900 placeholder-neutral-400 outline-none transition-colors duration-200 ${
            readOnly ? "cursor-pointer" : ""
          }
          ${
            errors?.[name]
              ? "border-red-500"
              : "border-neutral-300 focus:border-black"
          }`}
        />
      )}

      {errors?.[name] && (
        <div className="mt-1 text-sm text-red-500">
          {(errors?.[name]?.message as string) || ""}
        </div>
      )}
    </div>
  );
}
