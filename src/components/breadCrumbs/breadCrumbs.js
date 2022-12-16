import React from 'react';
import {Breadcrumb, Button, Card, Checkbox, Input, Popover, Segmented, Upload} from "antd";

const {Search} = Input;

const content = (
    <div style={{display: 'flex', flexDirection: 'column', rowGap: '5px'}}>
        <div>Файл: <Upload>
        <Button>Click to Upload</Button>
    </Upload></div>
        <div style={{alignItems: 'center', textAlign: 'center'}}>
            <Checkbox>Доступ</Checkbox>
        </div>
        <Button>Загрузить</Button>
    </div>
);

export const BreadCrumbs = () => {
    return (
        <div className={'breadCrumbs-main'}>
            <Card>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Application Center</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Application List</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>An Application</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <Search placeholder="Поиск" style={{width: 800}}/>
                    </div>
                    <div>
                        <Segmented options={['По дням', 'По неделям', 'По месяцам', 'По кварталам', 'По годам']}
                                   style={{marginLeft: '10px'}}/>
                    </div>
                    <div className={'breadCrumbs-button'}>
                        <Popover content={content} trigger="click">
                            <Button type={'primary'}>Добавить</Button>
                        </Popover>
                    </div>
                </div>
            </Card>
        </div>
    );
};