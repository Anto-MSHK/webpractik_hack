import React, { useState, useEffect, useCallback } from "react";
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
import { FileAddFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useCreateFolderMutation } from "../../store/services/folderService";
import './BreadCrumbsFolder.css'
const { Search } = Input;

export const BreadCrumbsFolder = ({ folders, onChange}) => {
  const [searchedFolder, setSearchedFolder] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

 

  const onSearch = (searchQuery) => {
   
    if (searchQuery) {
      console.log('Отработал поиск');
      console.log(searchQuery)
      console.log(folders);
       setSearchedFolder([...folders].filter(folder => folder.name && folder.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())))
       console.log(searchedFolder);
    } else folders ? setSearchedFolder([folders]) : setSearchedFolder([])
 
   
    onChange(searchedFolder)

}

  const [addFolder] = useCreateFolderMutation();
  /*    const navigate = useNavigate(); */
  const createFolder = async (fieldsValue) => {
    addFolder({
      name: fieldsValue.folderName,
      description: fieldsValue.folderDescription,
      isHidden: fieldsValue.isHidden,
    }).unwrap();
  };

  const onFinish = (fieldsValue) => {
    createFolder(fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              name="folderName"
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
              name="folderDescription"
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
    <div className="breadCrumbs-main">
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
              <Breadcrumb.Item>Главная</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/folders">Документы</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/employees">Сотрудники</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <Input placeholder="Поиск..."  onChange={ (e) => onSearch(e.target.value)} />
          </div>
          <div>
            <Segmented
              options={[
                "По дням",
                "По неделям",
                "По месяцам",
                "По кварталам",
                "По годам",
              ]}
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
