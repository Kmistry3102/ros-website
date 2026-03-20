"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  parsePhoneNumberFromString,
  getExampleNumber,
  CountryCode,
} from "libphonenumber-js/core";
import { isValidNumberForRegion } from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.full.json";
import examples from "libphonenumber-js/examples.mobile.json";
import type { MetadataJson } from "libphonenumber-js/core";

interface MobileNumberInputProps<T extends Record<string, any>> {
  name: Path<T>;
  countryCodeName: Path<T>;
  countryIsoName?: Path<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  label?: string;
}

type PhoneCountryData = {
  dialCode: string;
  countryCode: string;
};

export default function MobileNumberInput<T extends Record<string, any>>({
  name,
  countryCodeName,
  countryIsoName,
  register,
  setValue,
  watch,
  errors,
  placeholder,
  label,
}: MobileNumberInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const dialCode = watch(countryCodeName) || "+91";

  // Prefer ISO from form, fallback to derived
  const watchedIso = countryIsoName
    ? (watch(countryIsoName) as CountryCode | undefined)
    : undefined;

  const countryIso = watchedIso || getCountryIsoFromDialCode(dialCode);
  const phoneValue = watch(name) || "";
  // const countryIso = getCountryIsoFromDialCode(dialCode);
  const maxLen = getCountryMaxLength(countryIso);
  const minLen = getCountryMinLength(countryIso);

  // Update hasValue when phoneValue changes
  useEffect(() => {
    setHasValue(!!phoneValue);
  }, [phoneValue]);

  /** ✅ Get country-specific validation rules dynamically from libphonenumber-js */
  const getCountryRules = (
    countryIso?: CountryCode,
  ): {
    startDigits: string[];
    description: string;
  } | null => {
    if (!countryIso) return null;

    try {
      // Get example mobile number for the country
      const example = getExampleNumber(
        countryIso,
        examples as any,
        metadata as any,
      );
      if (!example) return null;

      const nationalNumber = example.nationalNumber.toString();
      const firstDigit = nationalNumber.charAt(0);

      // Get metadata for possible digit patterns (if available)
      const countryMetadata = (metadata as MetadataJson).countries[countryIso];

      if (countryMetadata && Array.isArray(countryMetadata)) {
        // Extract possible starting digits from metadata patterns
        const patterns = countryMetadata[2]; // Mobile patterns are typically at index 2

        if (patterns && typeof patterns === "object") {
          // For now, we'll use the example number's first digit as the primary indicator
          return {
            startDigits: [firstDigit],
            description: `must start with ${firstDigit}`,
          };
        }
      }

      // Fallback: use the example number's first digit
      return {
        startDigits: [firstDigit],
        description: `must start with ${firstDigit}`,
      };
    } catch {
      return null;
    }
  };

  /** ✅ Validate phone number using libphonenumber-js */
  const validatePhone = (value: string): true | string => {
    const clean = value.replace(/\D/g, "");

    // Check if empty
    if (!clean) {
      return "Phone number is required";
    }

    // Check if country is valid
    if (!countryIso) {
      return "Please select a valid country code";
    }

    const countryName = getCountryName(countryIso);

    // Basic length checks for better UX feedback
    if (minLen && clean.length < minLen) {
      return `${countryName} phone numbers must be at least ${minLen} digits`;
    }

    if (maxLen && clean.length > maxLen) {
      return `${countryName} phone numbers cannot exceed ${maxLen} digits`;
    }

    // Parse and validate using libphonenumber-js (the source of truth)
    try {
      const parsed = parsePhoneNumberFromString(
        clean,
        countryIso,
        metadata as any,
      );

      if (!parsed) {
        const rules = getCountryRules(countryIso);
        const hint = rules ? ` (${rules.description})` : "";
        return `Please enter a valid ${countryName} phone number${hint}`;
      }

      // Use libphonenumber's validation - it knows all country-specific rules
      if (
        !parsed.isValid() ||
        !isValidNumberForRegion(parsed.number, countryIso)
      ) {
        const rules = getCountryRules(countryIso);
        const hint = rules ? ` (${rules.description})` : "";
        return `Invalid ${countryName} phone number${hint}`;
      }
    } catch (error) {
      return `Invalid phone number format : ${error}`;
    }

    return true;
  };

  /** ✅ Handle input changes with real-time validation */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "");
    setHasInteracted(true);

    // Prevent exceeding max length
    if (maxLen && clean.length > maxLen) {
      return;
    }

    // Update form value
    setValue(name, clean as any, { shouldValidate: hasInteracted });

    // Show validation errors only after user has interacted
    if (hasInteracted && clean.length > 0) {
      const validation = validatePhone(clean);
      setErrorMsg(validation === true ? null : validation);
    } else {
      setErrorMsg(null);
    }
  };

  /** ✅ Handle country change and revalidate */
  useEffect(() => {
    if (hasInteracted && phoneValue) {
      const validation = validatePhone(phoneValue);
      setErrorMsg(validation === true ? null : validation);
    } else if (!phoneValue) {
      setErrorMsg(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryIso, phoneValue, hasInteracted]);

  const showError = (hasInteracted && errorMsg) || errors[name];
  const isFloated = isFocused || hasValue;

  return (
    <div className="relative w-full">
      <div className="flex items-start gap-2">
        {/* Country Code Box */}
        <div
          className={`relative border rounded-lg bg-transparent transition-colors duration-200 ${
            showError ? "border-red-500" : "border-neutral-300"
          }`}
        >
          <div className="flex items-center px-4 py-3.75">
            <PhoneInput
              country={countryIso ? countryIso.toLowerCase() : "in"}
              value={dialCode.replace("+", "")}
              onChange={(_, rawCountryData) => {
                if (!rawCountryData) return;

                const countryData = rawCountryData as PhoneCountryData;

                // existing behavior (DO NOT change)
                setValue(countryCodeName, ("+" + countryData.dialCode) as any, {
                  shouldDirty: true,
                });

                // new ISO value (only if prop provided)
                if (countryIsoName) {
                  setValue(
                    countryIsoName,
                    countryData.countryCode.toUpperCase() as any,
                    { shouldDirty: true },
                  );
                }
              }}
              inputProps={{
                readOnly: true,
                style: { display: "none" },
              }}
              disableCountryCode={false}
              disableDropdown={false}
              containerClass="!border-none"
              buttonClass="!bg-transparent !border-none"
            />
            <span className="ml-10 font-normal text-neutral-900 text-base">
              {dialCode}
            </span>
          </div>
        </div>

        {/* Phone Number Input Box */}
        <div className="flex-1 relative">
          <div
            className={`relative transition-colors duration-200 border rounded-lg bg-transparent ${
              showError
                ? "border-red-500"
                : isFocused
                  ? "border-black"
                  : "border-neutral-300"
            }`}
          >
            {/* Floating Label */}
            {label && (
              <label
                htmlFor={name}
                className={`absolute left-4 font-normal text-[#575757] pointer-events-none transition-all duration-200 ease-in-out ${
                  isFloated ? "top-2 text-xs" : "top-4 text-base"
                }`}
              >
                {label}
              </label>
            )}

            <input
              type="tel"
              id={name}
              {...register(name, {
                required: "Phone number is required",
                validate: validatePhone,
              })}
              value={phoneValue}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                setHasInteracted(true);
                if (phoneValue) {
                  const validation = validatePhone(phoneValue);
                  setErrorMsg(validation === true ? null : validation);
                }
              }}
              className="w-full pt-5 pb-2.5 pl-4 pr-4 text-base font-normal bg-transparent rounded-lg outline-none placeholder-neutral-400 text-neutral-900"
              placeholder={placeholder}
              inputMode="numeric"
              maxLength={maxLen || 15}
            />
          </div>
        </div>
      </div>

      {/* Error or Hint Message */}
      {showError ? (
        <p className="mt-1.5 text-sm text-red-500">
          {(errors[name] as any)?.message || errorMsg}
        </p>
      ) : isFocused && !phoneValue && countryIso ? (
        <p className="mt-1.5 text-sm text-neutral-400">
          Enter a {getCountryName(countryIso)} phone number
          {maxLen ? ` (${maxLen} digits)` : ""}
        </p>
      ) : null}
    </div>
  );
}

function getCountryIsoFromDialCode(dialCode: string): CountryCode | undefined {
  try {
    const dial = dialCode.replace("+", "");
    const allCodes = (metadata as any).country_calling_codes;
    const found = Object.entries(allCodes).find(([code]) => code === dial);
    if (found && Array.isArray(found[1]) && found[1][0]) {
      return (found[1][0] as string).toUpperCase() as CountryCode;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function getCountryMaxLength(countryIso?: CountryCode): number | undefined {
  if (!countryIso) return undefined;
  try {
    const example = getExampleNumber(
      countryIso,
      examples as any,
      metadata as any,
    );
    if (example) return example.nationalNumber.toString().length;
  } catch {
    return undefined;
  }
  return undefined;
}

function getCountryMinLength(countryIso?: CountryCode): number | undefined {
  if (!countryIso) return undefined;

  try {
    // Dynamically derive minimum length from example number
    const example = getExampleNumber(
      countryIso,
      examples as any,
      metadata as any,
    );
    if (example) {
      const length = example.nationalNumber.toString().length;
      // Use example length as minimum, or subtract 1-2 digits for flexibility
      return Math.max(length - 1, 7); // At least 7 digits minimum
    }
  } catch {
    return 7; // Default fallback
  }

  return 7; // Default minimum of 7 digits for countries without examples
}

function getCountryName(iso?: string): string {
  if (!iso) return "Phone numbers";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(iso) || iso;
  } catch {
    return iso;
  }
}
