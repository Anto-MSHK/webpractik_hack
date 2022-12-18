import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetFolderFilesQuery } from "../../store/services/folderService";
import { BreadCrumbsFile } from "../breadCrumbsFile/breadCrumbsFile";
import FileComponent from "../File/File";
import "./FolderContent.css";

export const FolderContent = () => {
  const { id, folderName } = useParams();
  const { data: files, isFetching } = useGetFolderFilesQuery(id);

  const [searchedFiles, setSearchedFiles] = useState([]);

  useEffect(() => {
    setSearchedFiles(files);
  }, [files]);

  const handleSearchedFiles = (searchedUsers) => {
    setSearchedFiles(searchedUsers);
  };

  return (
    <div className="folder_content">
      <BreadCrumbsFile
        onChange={handleSearchedFiles}
        files={files}
        folder_id={id}
        folder_name={folderName}
      />
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {searchedFiles && searchedFiles.length ? (
          searchedFiles.map((file) => (
            <FileComponent key={file._id} {...file} />
          ))
        ) : (
          <h1 style={{ margin: "0 auto" }}>Папка пуста</h1>
        )}
      </div>
    </div>
  );
};
