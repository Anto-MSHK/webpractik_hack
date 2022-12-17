import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Input,
  Popover,
  Segmented,
  Upload,
} from "antd";
import { FileAddFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

const content = (
  <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
    <div>
      Файл:{" "}
      <Upload>
        <Button>Click to Upload</Button>
      </Upload>
    </div>
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <Checkbox>Доступ</Checkbox>
    </div>
    <Button>Загрузить</Button>
  </div>
);

export const BreadCrumbs = () => {
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
                <Link to="/">Документы</Link>
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
