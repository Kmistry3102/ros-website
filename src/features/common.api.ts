import { apiRequest } from "@/api/request";

interface UploadFileParams {
  file: File;
  type: "documents" | "images" | "videos" | string;
  root: "jobseeker" | "career" | "growth-partner" | string;
}

export const uploadFileApi = ({
  file,
  type,
  root,
}: UploadFileParams) => {
  const formData = new FormData();

  formData.append("upload_file", file);
  formData.append("type", type);
  formData.append("root", root);

  return apiRequest({
    method: "POST",
    url: "/common/upload-files",
    data: formData,
  });
};
