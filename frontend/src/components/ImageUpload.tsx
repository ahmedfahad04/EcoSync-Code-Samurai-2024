import { ChangeEvent, FC, useRef, useState } from "react";

import Button from "@/ui/Button";
import placeHolder from "../../public/avatar.png";

interface ImageUploadProps {
  name: string;
  maxSize?: number;
  onUpload: (data: { name: string; image: File }) => void;
}

const ImageUpload: FC<ImageUploadProps> = (props: ImageUploadProps) => {
  const { name, maxSize = 524288, onUpload } = props;
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target;

    if (target.files) {
      const selectedFile = target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        if (selectedFile.size <= maxSize) {
          setImage(selectedFile);
          onUpload({ name, image: selectedFile });
          setErrorMessage("");
        } else {
          const imageSize = (selectedFile.size / 1024 / 1024).toFixed(2);
          console.error(
            "File Size must be <= 0.5 mb",
            selectedFile.size / 1024 / 1024
          );
          setErrorMessage(
            `File size must be less than ${(maxSize / 1024 / 1024).toFixed(
              2
            )} MB. '${selectedFile.name}' size is ${imageSize} MB`
          );
        }
      } else {
        console.error("Invalid file type. Please drop an image file.");
        setErrorMessage("Invalid file type. Please drop an image.");
      }
    }
  };

  const handleUploadedImage = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative w-24 h-24 rounded-full flex justify-center ${
          !image ? "border-2 border-dashed" : ""
        }`}
      >
        <img
          src={image ? URL.createObjectURL(image) : placeHolder}
          alt="Uploaded image"
          className="rounded-full object-cover"
        />
        <input
          type="file"
          id={`upload-image-${name}`}
          name={`upload-image-${name}`}
          ref={inputRef}
          onChange={handleChangeImage}
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <Button
        customClass="mt-3 h-6 !px-3 py-2 text-xs !bg-[#D2FBE7] !text-black rounded-xl"
        onClick={handleUploadedImage}
      >
        Select Photo
      </Button>
      {errorMessage && (
        <span className="mt-2 text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default ImageUpload;
