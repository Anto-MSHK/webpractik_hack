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

import { useDispatch } from "react-redux";
import { useCreateFolderMutation } from "../../store/services/folderService";
const { Search } = Input;

export const BreadCrumbsEmployees = () => {

    const [searchedUser, setSearchedUser] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
  
   
/*   
    const onSearch = (searchQuery) => {
     
      if (searchQuery) {
        console.log('Отработал поиск');
        console.log(searchQuery)
        console.log(folders);
         setSearchedUser([...folders].filter(folder => folder.name && folder.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())))
         console.log(searchedUser);
      } else folders ? setSearchedUser([folders]) : setSearchedUser([])
   
     
      onChange(searchedUser)
  
  } */
 

  const onFinish = (fieldsValue) => {
   /*  createFolder(fieldsValue); */
  };



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
            <Search placeholder="Поиск" />
          </div>
          <div>
            <Segmented
              options={[
                "Админы",
                "Сотрудники",
            
              ]}
              style={{ marginLeft: "10px" }}
            />
          </div>
          
        </div>
      </Card>
    </div>
  );
};
