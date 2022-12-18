import {
  FolderFilled,
  EditOutlined,
  CheckCircleFilled,
  CheckCircleTwoTone,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteFolderMutation, useGetFolderFilesQuery} from "../../store/services/folderService";
import { setFolderId } from "../../store/slices/folderSlice";
import "./Folder.css";
import { FileIcon } from '@drawbotics/file-icons';
import '@drawbotics/file-icons/dist/style.css';

export const Folder = ({ name, createDate, id }) => {
  const { data: files, isFetching } = useGetFolderFilesQuery(id);
  const [isEdit, setIsEdit] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (fieldsValue) => {
    
    setIsEdit(!isEdit);
    setDate(fieldsValue["date"]);
    setFolderName(fieldsValue["folderName"]);
    console.log("Received values of form: ", fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [deleteFolder] = useDeleteFolderMutation();

  return (
    <div className="folder-main">
      <div style={{ width: "180px", height: "140px", marginTop: '30px' }}>
        <Link to={`/folders/${id}`}>
          {" "}
          {/* <FolderFilled style={{ fontSize: "200px", color: 'gray' }} /> */}
          <div className="folderFigure">
            <div className="folderTrapezoid"></div>
            <div className="folderSquare">
              <div style={{display: 'flex', width:'100%', flexWrap: 'wrap-reverse', gap:'5px',justifyContent: "space-between"}}>
                  {
                    files
                     &&
                   files.map((file, index)=> (
                        index <= 6 
                        &&
                        <FileIcon key={file.name + index} file = {file.extension}/>
                    ))
                  }
   
              </div>
           
            </div>
          </div>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isEdit ? (
          <div className="content-folder">
            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div style={{ display: "flex", margin: "0 auto" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Form.Item
                    style={{ margin: "2px" }}
                    name="folderName"
                    rules={[
                      {
                        required: true,
                        message: "Обязательное поле",
                      },
                      () => ({
                        validator(_, value) {
                          if (
                            !value ||
                            value.match(/^([а-яА-яa-zA-z“№:()-_.]{5,20})$/)
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Название должно содержать от 5 до 20 символов"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input value={folderName} placeholder="Название" />
                  </Form.Item>

                  <Form.Item
                    style={{ margin: "0" }}
                    rules={[
                      {
                        required: true,
                        message: "Обязательное поле",
                      },
                      () => ({
                        validator(_, value) {
                          if (
                            !value ||
                            value.match(/(\d{2})(.{1})(\d{2})(.{1})(\d{4})/)
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Неверный формат даты")
                          );
                        },
                      }),
                    ]}
                    name="date"
                  >
                    <Input value={date} placeholder="Дата: (дд.мм.гггг)" />
                    {/*   <DatePicker value={date} showTime format="YYYY-MM-DD HH:mm:ss" /> */}
                    
                  </Form.Item>
                </div>

                <Form.Item
                  style={{ margin: "0" }}
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Button size="small" type="primary" htmlType="submit">
                    <CheckCircleFilled
                      color="white"
                      style={{ fontSize: "15px" }}
                    />
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        ) : (
          <div
            className="content-folder"
            style={{ display: "flex", gap: "5px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{ padding: 0, margin: 0, fontSize: 20 }}>{name}</h1>
                <div>
                  <EditOutlined
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                    style={{ fontSize: "20px" }}
                  />
                  <CloseOutlined
                    onClick={() => {
                      deleteFolder(id).unwrap();
                    }}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </div>
              <div>{createDate}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
