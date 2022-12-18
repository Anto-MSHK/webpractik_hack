import React from 'react';
import { LockOutlined, UserOutlined,MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './AuthForm.css'

const RegisterForm = () => {

    const onFinish = (values) => {


        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className='authForm'
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Имя"
                name="firstName"

                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваше имя!'
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || value.match(/(^[а-яА-я]+)$/)) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Имя не должно содержать цифр, символов и пробелов'))
                        }
                    })


                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите вашу фамилию!'
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || value.match(/(^[а-яА-я]+)$/)) {

                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Фамилия не должна содержать цифр, символов и пробелов'))
                        }
                    })


                ]}
            >
                <Input />
            </Form.Item>
            
        
            <Form.Item 
            
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите вашу электронную почту!',
                    },
                    () => ({
                        validator(_, value) {
                            if (!value || value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
                                return Promise.resolve()

                            }
                            return Promise.reject(new Error('Неправильный формат почты!'))
                        }
                    })
                ]}
            >
                <Input prefix={<MailOutlined/>} />
            </Form.Item>

            <Form.Item

                label="Пароль"
                name="password"
                hasFeedback
                rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
            >

                < Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item
                
                label="Подтвердите пароль"
                name="confirmPassword"
                dependencies={['password']}

                hasFeedback
                rules={[{
                    required: true,
                    message: 'Пожалуйста, подтвердите ваш пароль!'
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                        }
                        console.log(value);
                        return Promise.reject(new Error('Пароли не совпадают'))
                    }
                })
                ]}
            >

                < Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item style={{margin:'0 auto'}} wrapperCol={{ offset: 8, span: 16 }}>
                <Button  type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
}

export default RegisterForm;
