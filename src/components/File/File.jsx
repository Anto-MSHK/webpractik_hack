import {
  FileFilled,
  EditOutlined,
  CheckCircleFilled,
  DownloadOutlined
} from '@ant-design/icons'
import { type } from '@testing-library/user-event/dist/type'
import { Button, Form, Input, Space, DatePicker } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './File.css'


const FileComponent = ({name, extension, url, _id}) => {

  const [isEdit, setIsEdit] = useState(false)
  const [fileName, setFolderName] = useState('')
  const [date, setDate] = useState('')
  const [form] = Form.useForm()

  
 
  const onFinish = fieldsValue => {


    setIsEdit(!isEdit)
    setDate(fieldsValue['date'])
    setFolderName(fieldsValue['folderName'])
    console.log('Received values of form: ', fieldsValue)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const downloadFile = async () =>{
    const response = await fetch(`https://serverpractik-hack.onrender.com${url}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if ( response.ok) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  const downLoadClickHandler = (e) =>{
    e.stopPropagation()
    downloadFile()
  }

  return (

    <div className='file-main'>
      <div style={{ width: '180px', height: '180px' }}>
        <Link to='/file'>
          {' '}
          <FileFilled  style={{ fontSize: '180px', color: 'gray' }} />
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {isEdit ? (
          <div className='content-folder'>
            <Form
              form={form}
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <div style={{ display: 'flex', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Form.Item
                    style={{ margin: '2px' }}
                    name='fileName'
                    rules={[
                      {
                        required: true,
                        message: 'Обязтельное поле'
                      },
                      () => ({
                        validator (_, value) {
                          if (
                            !value ||
                            value.match(/^([а-яА-яa-zA-z“№:()-_.]{7,30})$/)
                          ) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error(
                              'Название должно содержать от 7 до 30 символов'
                            )
                          )
                        }
                      })
                    ]}
                  >
                    <Input value={fileName} placeholder='Название' />
                  </Form.Item>

                 
                </div>

                <Form.Item
                  style={{ margin: '0' }}
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Button size='small' type='primary' htmlType='submit'>
                    <CheckCircleFilled
                      color='white'
                      style={{ fontSize: '15px' }}
                    />
                  </Button>
                </Form.Item>
              
              </div>
            </Form>
          </div>
        ) : (
          <div className='content-file' style={{ display: 'flex', gap: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {name 
              ? 
              <div>{name}.{extension}</div> 
              : 
              <span>Название</span>}
        
       <Button onClick={(e)=> downLoadClickHandler(e)} icon={<DownloadOutlined />} />

            </div>
            <EditOutlined
              onClick={() => {
                setIsEdit(!isEdit)
              }}
              style={{ fontSize: '20px' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FileComponent