import React from "react";

import { Space } from "antd";
import "./MainAdminPage.css";
import { Folder } from "../../Components/Folder/Folder";
import { useGetFoldersQuery } from "../../store/services/folderService";
import { BreadCrumbsFolder } from "../../Components/breadCrumbsFolder/breadCrumbsFolder";
import "./MainAdminPage.css";
import Spinner from "../../Components/SpinnerComponents/Spinner";

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: "https://joeschmoe.io/api/v1/random",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const Main = () => {
  const { data, errors, isLoading } = useGetFoldersQuery();
  console.log(data);
  return (
    <div className="mainAdmpage-main">
      <BreadCrumbsFolder />
      <div style={{ display: "flex" }}>
        {isLoading ? (
          <Spinner text="Загружаем папки..." size="large" />
        ) : (
          data &&
          data.map((folder, index) => (
            <Folder
              key={folder.name + index}
              name={folder.name}
              createDate={folder.createDate}
              id={folder._id}
            />
          ))
        )}
      </div>
    </div>
  );
};
