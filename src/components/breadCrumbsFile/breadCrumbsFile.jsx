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
import { FileAddFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from "react-redux";
import { useCreateFolderMutation } from "../../store/services/folderService";

const { Search } = Input;

export const BreadCrumbsFile = () => {
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
            <Search placeholder="Поиск" />
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
        </div>
      </Card>
    </div>
  );
};
