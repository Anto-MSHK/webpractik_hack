import { FolderFilled, EditOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Button, Form, Input, Space, DatePicker } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Folder.css'

export const Folder = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [date, setDate] = useState('')
  const [form] = Form.useForm();

  const onFinish = (fieldsValue) => {

  /*   const values = {
      ...fieldsValue,

      'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm:ss'),

    };
    console.log(values['date']); */

    setIsEdit(!isEdit)
    setDate(fieldsValue['date'])
    setFolderName(fieldsValue['folderName'])
    console.log('Received values of form: ', fieldsValue);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='folder-main'>
      
            <div style={{width: '180px', height: '180px'}}>
            <Link to='/folder'> <FolderFilled style={{ fontSize: "200px", color: 'gray' }} /></Link>
            </div>
            
        
            <div style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
              {
                isEdit
                ?      
                  <div className='content-folder' >
      
                    <Form
                  
                      form={form}
                      name='basic'
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off">
                      <div style={{display:'flex', margin: '0 auto'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                          <Form.Item style={{margin: '2px'}} 
                            name='folderName'
      
                            rules={[{
                              required: true,
                              message: 'Обязтельное поле'
                            }, () => ({
                              validator(_, value) {
                                if (!value || value.match(/^([а-яА-яa-zA-z“№:()-_.]{5,20})$/)) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(new Error('Название должно содержать от 5 до 20 символов'))
                              }
      
                            })]}>
                            <Input value={folderName} placeholder='Название' />
                          </Form.Item>
      
                          <Form.Item style={{margin: '0'}}
                             rules={[{
                              required: true,
                              message: 'Обязтельное поле'
                            }, () => ({
                              validator(_, value) {
                                if (!value || value.match(/(\d{2})(.{1})(\d{2})(.{1})(\d{4})/)) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(new Error('Неверный формат даты'))
                              }
      
                            })]}
                            name="date" >
                                <Input value={date} placeholder='Дата: (дд.мм.гггг)' />
                          {/*   <DatePicker value={date} showTime format="YYYY-MM-DD HH:mm:ss" /> */}
                          </Form.Item>
      
                        </div>
      
                        <Form.Item style={{margin: '0'}}  wrapperCol={{ offset: 8, span: 16 }}>
                          <Button size='small' type="primary" htmlType="submit">
                            <CheckCircleFilled color='white' style={{ fontSize: "15px" }} />
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
      
      
      
                  </div>
            
                :
                <div className='content-folder' style={{display: 'flex', gap:'5px'}}>

                      <div style={{display: 'flex', flexDirection: 'column'}}>
      
                        {
                          folderName
                            ?
                            <div>{folderName}</div>
                            :
                            <span>Название</span>
                        }
      
                        {
                          date
                            ?
                            <div>{date}</div>
                            :
                            <span>Дата</span>
                        }
      
                      </div>
                      <EditOutlined onClick={() => { setIsEdit(!isEdit) }} style={{ fontSize: "20px" }} />
              
            
                </div>
              }
            </div >
   {/*    {

        isEdit
          ?

          <div style={{display:'flex', flexDirection: 'column', margin: '0 auto', justifyContent: 'center', alignItems:'center'}}>
            <Link to='/folder'> <FolderFilled style={{ fontSize: "200px", color: 'gray' }} /></Link>
            <div >

              <Form
            
                form={form}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <div style={{display:'flex', margin: '0 auto'}}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <Form.Item style={{margin: '2px'}} 
                      name='folderName'

                      rules={[{
                        required: true,
                        message: 'Обязтельное поле'
                      }, () => ({
                        validator(_, value) {
                          if (!value || value.match(/^([а-яА-яa-zA-z“№:()-_.]{5,20})$/)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Название должно содержать от 5 до 20 символов'))
                        }

                      })]}>
                      <Input value={folderName} placeholder='Название' />
                    </Form.Item>

                    <Form.Item style={{margin: '0'}}
                      rules={[{
                        required: true,
                        message: 'Обязтельное поле'
                      }]}
                      name="date" >
                      <DatePicker value={date} showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                  </div>

                  <Form.Item style={{margin: '0'}}  wrapperCol={{ offset: 8, span: 16 }}>
                    <Button size='small' type="primary" htmlType="submit">
                      <CheckCircleFilled color='white' style={{ fontSize: "15px" }} />
                    </Button>
                  </Form.Item>
                </div>
              </Form>



            </div>
          </div>
          :
          <Space direction='vertical'>

            <Link to='/folder'> <FolderFilled style={{ fontSize: "200px", color: 'gray' }} /></Link>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              <Space className='content-folder' direction="horizontal">
                <Space direction="vertical">

                  {
                    folderName
                      ?
                      <div>{folderName}</div>
                      :
                      <span>Название</span>
                  }

                  {
                    date
                      ?
                      <div>{date}</div>
                      :
                      <span>Дата</span>
                  }

                </Space>
                <EditOutlined onClick={() => { setIsEdit(!isEdit) }} style={{ fontSize: "20px" }} />
              </Space>

            </div>
          </Space>

      } */}

      </div>
  )
}


