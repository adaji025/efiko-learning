import { useEffect, useRef } from "react";
import { Avatar } from "@mantine/core";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";

type IProps = {
  files: any;
  setFiles: React.Dispatch<React.SetStateAction<never[]>>;
};
const ImageDropzone = ({files, setFiles}: IProps) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div className="h-[100px] w-[100px] rounded-full" key={file.name}>
      <Avatar
        ref={uploadRef}
        src={file.preview}
        className="h-[100px] w-[100px] rounded-full"
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  return (
    <div className="relative h-[100px] w-[100px] mx-auto">
      <Avatar
        src={null}
        {...getRootProps({ className: "dropzone" })}
        className="cursor-pointer h-[100px] w-[100px] mx-auto relative z-10"
      >
        <input {...getInputProps()} ref={uploadRef} />
        {files.length === 0 ? <Avatar /> : thumbs}
      </Avatar>
      <div
        className="h-6 w-6 flex justify-center items-center rounded-full border-2 border-gray-500 absolute right-0 bottom-4 z-30"
        onClick={handleUpload}
      >
        <AiOutlinePlus />
      </div>
    </div>
  );
};

export default ImageDropzone;
