import React from 'react';
import { useGetUsersQuery } from '../../store/services/userService';
import { BreadCrumbsEmployees } from '../BreadCrumbsEmployees/BreadCrumbsEmployees';
import Spinner from '../SpinnerComponents/Spinner';

import Employee from './Employee';

const Employees = () => {
    const { data: employees, isFetching, isError } = useGetUsersQuery()

        if(isError){
            return (
                <div style={{ display: 'flex', flexDirection: 'column', width: '1800px' }}>
                {
                    JSON.stringify(console.log(employees))
                }
                <BreadCrumbsEmployees/>
                <div  style={{ display: 'flex', margin: '0 auto'}}>
                    <h1>Произошла какая-то ошибка, либо у вас нет доступа</h1>
                </div>
    
            </div>
            )
        }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '1800px' }}>
            {
                JSON.stringify(console.log(employees))
            }
            <BreadCrumbsEmployees/>
            <div  style={{ display: 'flex'}}>

            {
                isFetching
                    ?
                    <div style={{marginTop: '10px', margin: '0 auto'}}>
                          <Spinner  text='Загружаем сотрудников...' size='large' />
                    </div>
                    :
                    employees.length &&
                    employees.map(employee => 
                       
                        <Employee key={employee._id} {...employee} />

                    )
            }
            </div>

        </div>
    );
}




export default Employees;
