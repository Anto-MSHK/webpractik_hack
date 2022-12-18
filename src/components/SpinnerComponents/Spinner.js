import * as React from 'react';
import { Space, Spin } from 'antd';

const Spinner = ({text, size}) => {
    return(
        <div style={{display: 'flex', width:'100px', margin: '0 auto'}}>
        <Space >
            <Spin  tip={text} size={size}>

            </Spin>
        </Space>
    </div>
    )
}

export default Spinner