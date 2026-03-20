"use client";
import { useState } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";
import {
  Controller,
  Control,
  FieldErrors,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { FiX } from "react-icons/fi";

export interface OptionType {
  label: string;
  value: string;
}

interface SelectInputProps<T extends Record<string, any>> {
  name: Path<T>;
  control?: Control<T>;
  errors?: FieldErrors<T>;
  options?: OptionType[];
  placeholder?: string;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  isSearchable?: boolean;
  isDisabled?: boolean;
  customStyles?: StylesConfig<OptionType, false>;
  className?: string;
}

export default function SelectInput<T extends Record<string, any>>({
  name,
  control,
  errors,
  options,
  placeholder,
  label,
  rules,
  isSearchable = false,
  isDisabled = false,
  customStyles,
  className,
}: SelectInputProps<T>) {
  const { clearErrors, watch, trigger } = useFormContext<T>();
  const [isFocused, setIsFocused] = useState(false);

  const fieldValue = watch(name);

  const hasValue = Boolean(fieldValue);

  const isFloated = isFocused || hasValue;
  const showError = Boolean((errors as any)[name]);

  const defaultStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      borderColor: showError
        ? "#ef4444"
        : state.isFocused
          ? "#000000"
          : "#d1d5db",
      borderRadius: "8px",
      boxShadow: "none",
      minHeight: "auto",
      fontSize: "16px",
      background: "transparent",
      padding: "0",
      paddingTop: label && isFloated ? "20px" : "20px",
      paddingBottom: "0.5rem",
      paddingLeft: "14px",
      paddingRight: "3.5rem",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#a1a1a1",
      fontWeight: 300,
    }),
    singleValue: (base) => ({
      ...base,
      color: "#171717",
      fontWeight: 400,
      fontSize: "16px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "200px",
      overflowY: "auto",
      padding: 0,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#000"
        : isFocused
          ? "#f2f2f2"
          : "transparent",
      color: isSelected ? "#fff" : "#111",
      fontWeight: 300,
      cursor: "pointer",
      padding: "14px 15px",
      "&:active": {
        backgroundColor: "#f3f4f6",
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#bdbdbd",
    }),
  };

  const mergedStyles = customStyles
    ? { ...defaultStyles, ...customStyles }
    : defaultStyles;

  return (
    <div className={`relative w-full ${className || ""}`}>
      <Controller
        name={name}
        control={control}
        rules={rules ?? undefined}
        render={({ field }) => (
          <div className="relative">
            {/* Floating Label */}
            {label && (
              <label
                htmlFor={String(name)}
                title={label}
                className={`absolute left-4 font-normal text-[#575757] pointer-events-none transition-all duration-200 ease-in-out pr-8 line-clamp-1 ${isFloated
                  ? "top-2 text-xs"
                  : "top-4 text-base"
                  }`}
              >
                {label}
              </label>
            )}

            <div className="relative">
              <Select<OptionType, false>
                {...field}
                inputId={String(name)}
                instanceId={String(name)}
                options={options}
                placeholder={placeholder || ""}
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                isClearable={false}
                value={options?.find((opt: OptionType) => opt.value === field.value) || null}
                onChange={(option: SingleValue<OptionType>) => {
                  field.onChange(option ? option.value : "");
                  if (option) clearErrors(name);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                styles={mergedStyles}
                classNamePrefix="react-select"
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                menuPosition="fixed"
              />

              {/* Clear button */}
              {hasValue && !isDisabled && (
                <button
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    field.onChange("");
                    // Trigger validation to show errors if field is required
                    await trigger(name);
                  }}
                  className="absolute right-9 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                  title="Clear selection"
                >
                  <FiX className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg text-lg p-0.5 transition-colors" />
                </button>
              )}
            </div>
          </div>
        )}
      />

      {(errors as any)[name] && (
        <p className="mt-1 text-sm text-red-500">
          {(((errors as any)[name]?.message) as string) || ""}
        </p>
      )}
    </div>
  );
}
