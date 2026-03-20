export type RequestStatus = "idle" | "loading" | "success" | "failed";

export interface OptionTypes {
  label: string;
  value: string;
}

export type ErrorTypes = string | null;

export const projectDocPath = "https://d1d09q7vt7sqxk.cloudfront.net/projects/documents/"

export const displayName = (user: Record<string, unknown>) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || null;

export const mobileText = (user: Record<string, unknown>) =>
  [user.countryCode, user.phoneNumber].filter(Boolean).join(" ").trim() || "N/A";

export const createdAtText = (createdAt: string | Date) => {
  if (!createdAt) return "N/A";
  return new Date(createdAt as string).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export interface CommonFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber?: string;
  countryCodeName?: string;
}