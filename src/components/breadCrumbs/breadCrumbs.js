import React, {useState, useEffect} from "react";
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





export const BreadCrumbs = () => {
  const [folderName, setFolderName] = useState("");
  const [date, setDate] = useState("");

   const [addFolder, {isError}]=useCreateFolderMutation()
   
/*    const navigate = useNavigate(); */
   const   createFolder = async() => {
      addFolder({
    name: folderName, 
    description: 'test',
    createDate: date,
   })
   }
  const onFinish = (fieldsValue) => {
   
    setFolderName(fieldsValue['folderName'])
    setDate(fieldsValue['date'])
    createFolder()
    console.log("Received values of form: ", fieldsValue);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  const content = (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
  
      <div style={{width: '200px'}} >
  
        <Form
  
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
  
          <div style={{ display: "flex", flexDirection: "column", gap: '5px', height: 'fit-content'}}>
            <Form.Item
              style={{ margin: "2px" }}
              name="folderName"
              label = 'Название'
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
              <Input placeholder="Название" />
            </Form.Item>

            <Form.Item label = 'Файл'>
         
              <Upload>
                <Button>Click to Upload</Button>
              </Upload>
  
            </Form.Item>
  
            <Form.Item>
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
