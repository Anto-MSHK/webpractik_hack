import {
  FileFilled,
  EditOutlined,
  CheckCircleFilled,
  DownloadOutlined,
} from "@ant-design/icons";
import { type } from "@testing-library/user-event/dist/type";
import { Button, Form, Input, Space, DatePicker, Image } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./File.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const FileComponent = ({ name, extension, url, _id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [fileName, setFolderName] = useState("");
  const [date, setDate] = useState("");
  const [form] = Form.useForm();

  const onFinish = (fieldsValue) => {
    setIsEdit(!isEdit);
    setDate(fieldsValue["date"]);
    setFolderName(fieldsValue["folderName"]);
    console.log("Received values of form: ", fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const downloadFile = async () => {
    const response = await fetch(
      `https://serverpractik-hack.onrender.com${url}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const downLoadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile();
  };

  const docs = [{ uri: `https://serverpractik-hack.onrender.com${url}` }];

  return (
    <div className="file-main">
      <Link to="/file">
        <div
          style={{
            //   position: "absolute",
            width: "270px",
            overflow: "hidden",
            borderRadius: 10,
            border: "solid #009FE3 3px",
            maxHeight: "180px",
          }}
        >
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            config={{
              header: {
                disableHeader: true,
                disableFileName: true,
              },
              pdfZoom: {
                defaultZoom: 1,
                zoomJump: 0.1,
              },
            }}
            style={{
              width: "300px",
              marginLeft: "-15px",
              marginTop: extension !== "pdf" ? "-15px" : "-100px",
            }}
          />
        </div>
      </Link>

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
                    name="fileName"
                    rules={[
                      {
                        required: true,
                        message: "Обязтельное поле",
                      },
                      () => ({
                        validator(_, value) {
                          if (
                            !value ||
                            value.match(/^([а-яА-яa-zA-z“№:()-_.]{7,30})$/)
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Название должно содержать от 7 до 30 символов"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input value={fileName} placeholder="Название" />
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
          <div className="content-file" style={{ display: "flex", margin: 10 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {name ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "270px",
                    margin: "0 0 0 -26px",
                  }}
                >
                  <div
                    style={{
                      margin: "0 10px 0 0",
                      width: "35px",
                      height: "35px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 700,
                        position: "absolute",
                        top: 12,
                        left: 6,
                      }}
                    >
                      {extension}
                    </div>
                    <FileFilled style={{ fontSize: "35px", color: "red" }} />
                  </div>
                  <h1 style={{ margin: 0 }}>
                    {name}.{extension}
                  </h1>
                  <Button
                    onClick={(e) => downLoadClickHandler(e)}
                    icon={<DownloadOutlined />}
                  />
                  <EditOutlined
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              ) : (
                <span>Название</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileComponent;
