import React from 'react';
import { useGetUsersQuery } from '../../store/services/userService';
import Spinner from '../SpinnerComponents/Spinner';

import Employee from './Employee';

const Employees = () => {
    const { data: employees, isFetching } = useGetUsersQuery()
    return (
        <div style={{ display: 'flex', width: '1800px' }}>
            {
                JSON.stringify(console.log(employees))
            }

            {
                isFetching
                    ?
                    <Spinner text='Загружаем сотрудников...' size='large' />
                    :
                    employees.length &&
                    employees.map(employee => 
                       
                        <Employee key={employee._id} {...employee} />

                    )
            }

        </div>
    );
}




export default Employees;
