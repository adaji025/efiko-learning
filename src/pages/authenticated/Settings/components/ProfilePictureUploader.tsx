import React, { useState, ChangeEvent, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type IProps = {
  profileImage: string | undefined;
  setFiles: React.Dispatch<React.SetStateAction<File | null>>
};

const ProfilePictureUploader: React.FC<IProps> = ({ profileImage, setFiles:setSelectedFile }) => {
  const [previewSource, setPreviewSource] = useState<string>("");
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewSource(reader.result);
      }
    };
  };

  return (
    <div>
      <div className="relative h-[100px] w-[100px] mx-auto">
        <img
          src={previewSource ? previewSource : profileImage}
          alt=""
          className="rounded-full h-[100px] w-[100px]"
        />

        <div
          className="h-6 w-6 flex justify-center items-center rounded-full border-2 bg-green-300 border-gray-500 absolute right-0 bottom-4 z-30"
          onClick={handleUpload}
        >
          <AiOutlinePlus />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        hidden
        ref={uploadRef}
      />
      {/* {previewSource && (
        <img
          src={previewSource}
          alt="Preview"
          style={{ height: "200px", width: "200px" }}
        />
      )} */}
    </div>
  );
};

export default ProfilePictureUploader;
