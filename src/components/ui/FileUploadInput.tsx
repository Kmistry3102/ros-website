"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Controller,
  Control,
  FieldErrors,
  Path,
  useFormContext,
} from "react-hook-form";
import { FiX } from "react-icons/fi";
 
interface FileUploadInputProps<T extends Record<string, any>> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  rules?: any;
  accept?: string;
  icon?: string;
  maxSizeMB?: number;
  uploadFn?: (file: File) => Promise<{ result?: { fileName?: string } }>;
  onUploadComplete?: (fileName: string) => void;
  onUploadError?: (error: any) => void;
}
 
export default function FileUploadInput<T extends Record<string, any>>({
  name,
  control,
  errors,
  label,
  rules,
  accept, // 👈 dynamic accept
  icon = "/upload-icon.svg",
  maxSizeMB = 5,
  uploadFn,
  onUploadComplete,
  onUploadError,
}: FileUploadInputProps<T>) {
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const { setError, clearErrors, watch } = useFormContext();
 
  const fieldValue = watch(name);
 
  useEffect(() => {
    setHasValue(!!fieldValue);
  }, [fieldValue]);
 
  const clearFile = (onChange: (value: any) => void) => {
    setFileName("");
    setHasValue(false);
    clearErrors(name);
    onChange("");
   
    // Reset the actual file input element
    const fileInput = document.getElementById(name) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };
 
  const extractAndUpload = async (file: File): Promise<string> => {
    if (!uploadFn) return "";
 
    try {
      const uploadResponse = await uploadFn(file);
      const uploadedFileName = uploadResponse?.result?.fileName || "";
     
      if (uploadedFileName && onUploadComplete) {
        onUploadComplete(uploadedFileName);
      }
     
      return uploadedFileName;
    } catch (error) {
      console.error("File upload failed:", error);
      if (onUploadError) {
        onUploadError(error);
      }
      throw error;
    }
  };
 
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
 
    const fileSizeMB = file.size / (1024 * 1024);
 
    // ❌ Too large → show error
    if (fileSizeMB > maxSizeMB) {
      setError(name, {
        type: "manual",
        message: `File size must be less than ${maxSizeMB} MB`,
      });
      setFileName("");
      return;
    }
 
    // ✅ Valid file
    clearErrors(name);
    setFileName(file.name);
    setHasValue(true);
 
    // If uploadFn is provided, upload immediately and store filename
    if (uploadFn) {
      setIsUploading(true);
      try {
        const uploadedFileName = await extractAndUpload(file);
        // Store the uploaded filename in the form
        onChange(uploadedFileName);
        setHasValue(true);
      } catch {
        setError(name, {
          type: "manual",
          message: "File upload failed. Please try again.",
        });
        setFileName("");
        setHasValue(false);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Legacy behavior: store FileList
      onChange(e.target.files);
      setHasValue(true);
    }
  };
 
  const isFloated = isFocused || hasValue;
  const showError = !!errors[name];
 
  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <input
              type="file"
              id={name}
              accept={accept || ".pdf,.jpeg,.jpg,.png"}
              className="hidden"
              onChange={(e) => handleFileChange(e, field.onChange)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isUploading}
            />
 
            <div
              className={`relative border border-dashed rounded-lg bg-transparent transition-colors duration-200 ${
                showError
                  ? "border-red-500"
                  : isFocused
                  ? "border-black"
                  : "border-neutral-300"
              }`}
            >
              {/* Floating Label */}
              <label
                htmlFor={name}
                title={label}
                className={`absolute left-4  pr-10 line-clamp-1 font-normal text-[#575757] pointer-events-none transition-all duration-200 ease-in-out ${
                  isFloated
                    ? "top-2 text-xs"
                    : "top-4 text-base"
                }`}
              >
                {label}
              </label>
 
              {/* Clickable area */}
              <label
                htmlFor={name}
                className={`flex items-center justify-between w-full px-4  ${ isFloated ? "pt-5.5" : "pt-6.5"} pb-2 font-normal text-base bg-transparent cursor-pointer transition-colors duration-200 ${
                  isUploading
                    ? "cursor-wait opacity-60"
                    : "cursor-pointer"
                } ${
                  hasValue
                    ? "text-neutral-900"
                    : "text-neutral-400"
                }`}
              >
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {isUploading
                    ? "Uploading..."
                    : fileName || ""}
                </span>
 
                <div className="flex items-center gap-1 ml-2">
                  {fileName && !isUploading && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        clearFile(field.onChange);
                      }}
                      className="cursor-pointer"
                      title="Clear file"
                    >
                      <FiX className="text-gray-500 relative -top-1.5 hover:bg-gray-100 rounded-lg text-base p-0.5"/>
                    </button>
                  )}
                  <Image className="relative -top-1.5" src={icon} alt="Upload" width={20} height={20} />
                </div>
              </label>
            </div>
 
            {errors[name] && (
              <div className="mt-1 text-sm text-red-500">
                {(errors[name]?.message as string) || ""}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}