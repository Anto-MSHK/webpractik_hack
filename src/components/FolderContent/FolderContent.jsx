import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetFolderFilesQuery } from "../../store/services/folderService";
import { BreadCrumbsFile } from "../breadCrumbsFile/breadCrumbsFile";
import FileComponent from "../File/File";
import "./FolderContent.css";

export const FolderContent = () => {
  const { id } = useParams();
  const { data: files, isFetching } = useGetFolderFilesQuery(id);
  return (
    <div className="folder_content">
      <BreadCrumbsFile folder_id={id} />
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {files ? (
          files.map((file) => <FileComponent {...file} />)
        ) : (
          <span>Пусто</span>
        )}
      </div>
    </div>
  );
};
