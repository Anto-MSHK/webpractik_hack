import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Popover,
  Segmented,
  Upload,
} from "antd";
import { FileAddFilled, UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from "react-redux";
import { useCreateFolderMutation } from "../../store/services/folderService";
import { useCreateFileMutation } from "../../store/services/fileService";
const { message, Dragger } = Upload;
const { Search } = Input;

export const BreadCrumbsFile = ({ folder_id, folder_name }) => {
  const [addFile] = useCreateFileMutation();
  const [file, setFile] = useState(null);
  /*    const navigate = useNavigate(); */
  const formData = new FormData();
  const createFolder = async (fieldsValue) => {
    formData.append("name", fieldsValue.fileName);
    formData.append("description", fieldsValue.fileDescription);
    formData.append("isHidden", fieldsValue.isHidden);
    formData.append("folder_id", folder_id);
    formData.append("file", file);
    addFile(formData).unwrap();
  };

  const onFinish = (fieldsValue) => {
    createFolder(fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [fileList, setFileList] = useState([]);
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFile(file);
      setFileList([...fileList, file]);
      return false;
    },

    fileList,
  };
  const content = (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
      <div style={{ width: "200px" }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              height: "fit-content",
            }}
          >
            <Form.Item
              style={{ margin: "2px" }}
              name="fileName"
              label="Название"
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
                      new Error("Название должно содержать от 5 до 20 символов")
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Название" />
            </Form.Item>

            <Form.Item
              style={{ margin: "2px" }}
              name="fileDescription"
              label="Описание"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input placeholder="Описание" />
            </Form.Item>

            <Form.Item
              name="isHidden"
              valuePropName="checked"
              label="Обязательно"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox>Доступ</Checkbox>
            </Form.Item>

            {/* <Form.Item
              style={{ margin: "2px" }}
              valuePropName="fileList"
              name="fileFile"
              label="Файл"
              rules={[
                {
                  required: true,
                },
              ]}
            > */}
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            {/* </Form.Item> */}

            <Form.Item
              style={{ margin: "0" }}
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button size="small" type="primary" htmlType="submit">
                Создать
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );

  return (
    <div className={"breadCrumbs-main"}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/folders">Документы</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link>{folder_name}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <Search placeholder="Поиск" />
          </div>
          <div>
            <Segmented
              options={["все", "скрытые", "открытые"]}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div className={"breadCrumbs-button"}>
            <Popover content={content} trigger="click">
              <Button type={"primary"}>
                <FileAddFilled />
              </Button>
            </Popover>
          </div>
        </div>
      </Card>
    </div>
  );
};
