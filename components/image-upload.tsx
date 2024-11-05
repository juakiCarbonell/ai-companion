"use client";

import {CldUploadButton, CloudinaryUploadWidgetResults} from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (src: string) => void;
  value: string;
  disabled?: boolean;
}

export const ImageUpload = ({value, onChange}: ImageUploadProps) => {
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onSuccess={({info}: CloudinaryUploadWidgetResults) => {
          if (!info || typeof info === "string") return;
          onChange(info.secure_url);
        }}
        options={{maxFiles: 1}}
        uploadPreset="fxcd32sm"
      >
        <div className="p-4 border-4 border-dashed border-primary/30 rounded-lg hover:opacity-70 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="Upload"
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
