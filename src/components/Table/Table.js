import React from 'react'
import './Table.css'
export default props => (
    //создаем таблицу
    //с помощью map создаем ячейки и вносим в них данные

    <table className="table">
    
        <thead>
            <tr>
                <th className={'thTable'} onClick={props.onSort.bind(null, 'id')}>ID
                {(props.sortField === 'id') ?
                props.sort === 'asc' ?
                        <small>▼</small>  :  <small>▲</small>
                    :null 
                }
                    </th>
                    
                    <th className={'thTable'} onClick={props.onSort.bind(null, 'firstName')}>First Name
                        {props.sortField === 'firstName' ? 
                        props.sort === 'asc' ?
                        <small>▼</small>  :  <small>▲</small>
                    : null}
                    </th>
                    
                    <th className={'thTable'} onClick={props.onSort.bind(null, 'lastName')}>Last Name
                        {props.sortField === 'lastName' ? 
                        props.sort === 'asc' ?
                        <small>▼</small>  :  <small>▲</small>
                    : null}
                    </th>
    
                    <th className={'thTable'} onClick={props.onSort.bind(null, 'email')}>E-mail
                        {props.sortField === 'email' ? 
                        props.sort === 'asc' ?
                        <small>▼</small>  :  <small>▲</small>
                    : null}
                    </th>
    
                    <th className={'thTable'} onClick={props.onSort.bind(null, 'phone')}>Phone
                        {props.sortField === 'phone' ? 
                        props.sort === 'asc' ?
                        <small>▼</small>  :  <small>▲</small>
                    : null}
                    </th>
            </tr>
        </thead>
        <tbody>
        
            {props.data.map(item => (
                <tr className = {'strUser'} key = {item.id+item.phone} onClick = {props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>

                </tr>
            ))}

          

        </tbody>
    </table>

)