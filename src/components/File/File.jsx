import {
  FolderFilled,
  EditOutlined,
  CheckCircleFilled
} from '@ant-design/icons'
import { Button, Form, Input, Space, DatePicker } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './File.css'

export const File = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [folderName, setFolderName] = useState('')
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

  return (
    <div className='file-main'>
      <div style={{ width: '180px', height: '180px' }}>
        <Link to='/file'>
          {' '}
          <FileFilled  style={{ fontSize: '200px', color: 'gray' }} />
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

                  <Form.Item
                    style={{ margin: '0' }}
                    rules={[
                      {
                        required: true,
                        message: 'Обязтельное поле'
                      },
                      () => ({
                        validator (_, value) {
                          if (
                            !value ||
                            value.match(/(\d{2})(.{1})(\d{2})(.{1})(\d{4})/)
                          ) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error('Неверный формат даты')
                          )
                        }
                      })
                    ]}
                    name='date'
                  >
                    <Input value={date} placeholder='Дата: (дд.мм.гггг)' />
                    {/*   <DatePicker value={date} showTime format="YYYY-MM-DD HH:mm:ss" /> */}
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
              {fileName ? <div>{fileName}</div> : <span>Название</span>}

              {date ? <div>{date}</div> : <span>Дата</span>}
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
