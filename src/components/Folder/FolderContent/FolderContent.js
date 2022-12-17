import React from "react";
import { useSelector } from "react-redux";
import { useGetFolderFilesQuery } from "../../../store/services/folderService";
import FileComponent from "../../File/File";
import "./FolderContent.css";

const FolderContent = () => {
  const folderId = useSelector((state) => state.folder.folderId);
  const { data: folder, isFetching } = useGetFolderFilesQuery(folderId);
  return (
    <div className="folder_content">
      {folder && folder.files ? (
        folder.files.map((file) => <FileComponent {...file} />)
      ) : (
        <span>Пусто</span>
      )}
    </div>
  );
};
