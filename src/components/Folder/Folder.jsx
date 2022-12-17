import {
  FolderFilled,
  EditOutlined,
  CheckCircleFilled,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFolderId } from "../../store/slices/folderSlice";
import "./Folder.css";

export const Folder = ({ name, createDate, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const onFinish = (fieldsValue) => {
    
    setIsEdit(!isEdit);
    setDate(fieldsValue["date"]);
    setFolderName(fieldsValue["folderName"]);
    console.log("Received values of form: ", fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div onClick={()=> dispatch(setFolderId(id))} className="folder-main">
      <div style={{ width: "180px", height: "140px" }}>
        <Link to={`/folders/${name}`}>
          {" "}
          {/* <FolderFilled style={{ fontSize: "200px", color: 'gray' }} /> */}
          <div className="folderFigure">
            <div className="folderTrapezoid"></div>
            <div className="folderSquare">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }}
              ></div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }}
              ></div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                }}
              ></div>
              <span style={{ color: "white" }}>Антон</span>
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
              <h1 style={{ padding: 0, margin: 0, fontSize: 20 }}>{name}</h1>

              <div>{createDate}</div>
            </div>
            <EditOutlined
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              style={{ fontSize: "20px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
