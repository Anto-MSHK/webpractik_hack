import {
  FolderFilled,
  EditOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Folder.css";

export const Folder = ({ name, createDate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="folder-main">
      {isEdit ? (
        <div>
          <Link to="/folder">
            {" "}
            <FolderFilled style={{ fontSize: "200px", color: "gray" }} />
          </Link>
          <div style={{ display: "flex", width: "70%", margin: "0 auto" }}>
            <Space direction="vertical">
              <Input
                placeholder="Название"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />

              <Space direction="horizontal">
                <Input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  placeholder="Дата"
                />
                <CheckCircleTwoTone
                  twoToneColor="green"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                  style={{ fontSize: "20px" }}
                />
              </Space>
            </Space>
          </div>
        </div>
      ) : (
        <Space direction="vertical">
          <Link to="/folder">
            {" "}
            <FolderFilled style={{ fontSize: "200px", color: "gray" }} />
          </Link>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Space className="content-folder" direction="vertical">
              <Space direction="horizontal">
                {folderName ? (
                  { folderName }
                ) : (
                  <h1 style={{ fontSize: "20px" }}>{name}</h1>
                )}
                <EditOutlined
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                  style={{ fontSize: "20px" }}
                />
              </Space>
              {date ? { date } : <span>{createDate}</span>}
            </Space>
          </div>
        </Space>
      )}
    </div>
  );
};
