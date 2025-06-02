const DEFAULT_IMAGES = {
  landing: "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345809/girl_hhqylb.png",
  live: "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345811/live_muepdq.png",
  organizations: [
    "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345807/base_ad5an0.png",
    "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345807/solana_lbprwc.png",
    "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345810/lukso_ytxf1e.png"
  ],
  available: "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345808/avatar_zmxvul.png"
};

const isDefaultImage = (url: string): boolean => {
  return Object.values(DEFAULT_IMAGES).some((value) => {
    if (Array.isArray(value)) {
      return value.includes(url);
    }
    return value === url;
  });
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  console.log("Starting Cloudinary upload...", {
    fileName: file.name,
    fileType: file.type,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`
  });
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary upload failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.error ?? "Upload failed");
    }

    const data = await response.json();
    console.log("Cloudinary upload successful:", {
      secureUrl: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      bytes: data.bytes
    });
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error("Failed to upload image to Cloudinary");
  }
};

export const removeFromCloudinary = async (url: string): Promise<void> => {
  if (isDefaultImage(url)) {
    return;
  }
  try {
    const publicId = url.split("/").slice(-1)[0].split(".")[0];
    const response = await fetch("/api/cloudinary/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ public_id: publicId })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? "Failed to remove image");
    }
  } catch (error) {
    console.error("Cloudinary removal error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error("Failed to remove image from Cloudinary");
  }
};
