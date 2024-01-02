import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { FaUpload } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";

type IProps = {
  acceptedFiles: File[]
  getRootProps: (props?: object) => DropzoneRootProps;
  getInputProps: (props?: object) => DropzoneInputProps;
}

const Upload = ({acceptedFiles, getRootProps, getInputProps} :IProps) => {
  
  return (
    <div className="mt-5">
      <div
        {...getRootProps({
          className:
            "dropzone flex justify-center text-sm my-2 rounded-xl  cursor-pointer border gap-3 rounded-10 p-2 py-5 shadow border-gradeEx-blue/20",
        })}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 && (
          <div className="grid place-items-center">
            <FaUpload size={30} />
            <div className="flex gap-2">
              <div>Click upload btn</div>
              <div>or drag and drop</div>
            </div>
            <div>SVG, PNG, JPG or GIF (max. 800x400px)</div>
          </div>
        )}
        {acceptedFiles.length !== 0 && (
          <div className="flex items-center gap-1">
            <GrStatusGood size="20" color="#00D8D8" /> {acceptedFiles[0].name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
