import "./FileDrop.scss";
import React, { useEffect, useRef, useState } from "react";
import { MdClear } from "react-icons/md";

export const FileDrop = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles(newFiles);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles(newFiles);
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
            ref={inputRef}
            type="file"
            id="browse"
            onChange={handleFileChange}
            accept=".pdf,.docx,.pptx,.txt,.xlsx"
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
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".pdf,.docx,.pptx,.txt,.xlsx"
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
