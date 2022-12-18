import { Button, Form, Input } from 'antd';
import Card from 'antd/es/card/Card';
import React, { useState } from 'react';
import './ProfilePage.css'
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../store/services/userService';
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

const ProfilePage = () => {

    const [form] = Form.useForm();
    const { id } = useParams()
    const { data: user, isFetching } = useGetUserQuery(id)
    const [isFormDisabled, setIsFormDisabled] = useState(true)


    const onFinish = (fieldsValue) => {
        setIsFormDisabled(!isFormDisabled)
        console.log("Received values of form: ", fieldsValue);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (

        <div>
            {

                user &&
                <Card className='profileCard'
                    title={
                        <>
                        <UserOutlined/> {user.name}
                        </>
                        }>
                    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '10px', paddingBottom:'10px' }}>
                        <div><MailOutlined/> Email: {user.email}</div>
                        <div>Role: {user.role}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form
                            disabled={isFormDisabled}
                            form={form}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            style={{ display: 'flex', flexDirection: 'column', columnGap:'10px'}}
                        >

                            <Form.Item
                                style={{height: 'fit-content'}}
                                label={
                                    <>
                                    <LockOutlined/>  Пароль
                                    </>
                                }
                                name='password'
                                hasFeedback
                            >
                                <Input.Password  placeholder={user.password} />
                            </Form.Item>



                            {
                                !isFormDisabled &&

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item
                                        dependencies={['password']}
                                        hasFeedback
                                        label={
                                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
                                                <span>
                                                    Подтвердить
                                                </span>
                                                <span>
                                                    пароль
                                                </span>
                                            </div>
                                        }
                                        name='confirmPassword'
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
                                        <Input.Password  value={user.password} />
                                    </Form.Item>

                                    <Form.Item style={{margin: '0 auto'}}>
                                        <Button type="primary" htmlType="submit" >Подтвердить</Button>
                                    </Form.Item>
                                 
                                </div>


                            }



                        </Form>
                        {
                            isFormDisabled &&
                            <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                                <Button onClick={() => setIsFormDisabled(!isFormDisabled)} type="primary" >Изменить</Button>
                                 <Button >Log Out</Button>
                            </div>
                            
                        }
                    </div>

                </Card>

            }
        </div>
    );
}

export default ProfilePage;
