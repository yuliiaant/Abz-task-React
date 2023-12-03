import "./FileDrop.scss";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { MdClear } from "react-icons/md";

type Props = {
  // register: UseFormRegister<FieldValues>,
  uploadingPhoto: any,
}

export const FileDrop: React.FC<Props> = ({ uploadingPhoto }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = [...selectedFiles];
      setFiles(newFiles);
    }
    console.log(typeof selectedFiles)
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles(newFiles);
      uploadingPhoto(newFiles[0])
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const inputRef = useRef();
  const handleInputClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    inputRef.current.click();
  };

  useEffect(() => {
    setFiles(files);
  }, [files, setFiles]);

  return (
    <section className="drag-drop">
      <div
        className={`document-uploader ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <input
          // {...register("photo")}
            ref={inputRef}
            type="file"
            id="browse"
            onChange={handleFileChange}
            accept=".jpg,.jpeg"
            multiple
          />
          <button
            className="input-button"
            onClick={(event) => handleInputClick(event)}
          >
            Upload
          </button>
        </>
        <>
          <input
          // {...register("photo")}
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".jpg,.jpeg"
            multiple
          />
          {!files.length && (
            <label htmlFor="browse" className="browse-btn">
              Upload your photo
            </label>
          )}
        </>

        {files.length > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="file-info">
                    <p>{file.name}</p>
                    <div className="file-actions">
                      <MdClear onClick={() => handleRemoveFile(index)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
