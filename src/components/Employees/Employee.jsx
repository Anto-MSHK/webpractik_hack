import Card from 'antd/es/card/Card';
import React from 'react';

const Employee = ({name, email, role}) => {
    return (
        <Card 
        style={{margin: '10px'}}
        title = {
            <>
                {name}
            </>
        }>
                <div>Email:{email}</div>
                <div>Role: {role}</div>
            
        </Card>
    );
}

export default Employee;
