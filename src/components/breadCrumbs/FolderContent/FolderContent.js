import { Upload } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetFolderFilesQuery } from "../../../store/services/folderService";
import ImgCrop from "antd-img-crop";
export const FolderContent = () => {
  const { id } = useParams();
  console.log(id);
  const { data: files, isLoading } = useGetFolderFilesQuery(id);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "name",
      status: "done",
      url: "https://serverpractik-hack.onrender.com/opt/render/project/src/files/639e0f39c7b491850c341551/krutoyPresent.pptx",
    },
  ]);
  return (
    <div>
      {!isLoading ? (
        files.map((file) => (
          <div>
            <span>
              {file.name}.{file.extension}
            </span>
          </div>
        ))
      ) : (
        <div>
          <span>Пусто</span>
        </div>
      )}
    </div>
  );
};
