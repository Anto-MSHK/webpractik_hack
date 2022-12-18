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

export const BreadCrumbsEmployees = ({onChange, users}) => {

    const [searchedUser, setSearchedUser] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    
   
  useEffect(()=> {
    onSearch()
  },[searchQuery])
  
    const onSearch = () => {
        

      if (searchQuery) {
       /*  console.log('Отработал поиск');
        console.log(searchQuery) */
    
         setSearchedUser([...users].filter(user =>  user.name.toLowerCase().includes(searchQuery.toLocaleLowerCase().replace(' ',''))))
         console.log(searchedUser);
      } else {
  /*       console.log('пустая');
        console.log(users); */
        setSearchedUser(users)
    }

      onChange(searchedUser)
  }
 

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
          <Input placeholder="Поиск..." value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value)} />
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
