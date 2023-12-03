import { File } from "buffer";
import "./FileDrop.scss";
import React, { useEffect, useRef, useState } from "react";
import { MdClear } from "react-icons/md";
import classNames from "classnames";

type Props = {
  uploadingPhoto: (arg: File) => void;
  files: any;
  setFiles: (arg: any) => void;
  isRed: boolean;
};

export const FileDrop: React.FC<Props> = ({
  uploadingPhoto,
  files,
  setFiles,
  isRed,
}) => {
  // const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = [...selectedFiles];
      setFiles(newFiles);
    }
    console.log(typeof selectedFiles);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles(newFiles);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadingPhoto(newFiles[0]);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    inputRef.current.click();
  };

  useEffect(() => {
    setFiles(files);
  }, [files, setFiles]);

  return (
    <section
      className={classNames("drag-drop", {
        "input-red": isRed,
      })}
    >
      <div
        className={`document-uploader ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <input
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={inputRef}
            type="file"
            id="browse"
            onChange={handleFileChange}
            accept=".jpg,.jpeg"
            multiple
          />
          <button
            type="button"
            className={classNames("input-button", {
              "input-red": isRed,
            })}
            onClick={(event) => handleInputClick(event)}
          >
            Upload
          </button>
        </>
        <>
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
