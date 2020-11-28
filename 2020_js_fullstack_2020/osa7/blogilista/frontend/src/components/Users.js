import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Table } from 'react-bootstrap'







const SingleUser = ({ user }) => {
    let blogs = user.blogs.length

    return (
        <tr>
            <td>{user.name}</td>
            <td>{blogs}</td>
        </tr>
    )
}

const UsersDisplay = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(users =>
            setUsers(users)
        )
    }, [])

    console.log("hei,", users)

    return (
        <div>
            <Table striped bordered hover>
                
                    <tr>
                        <th>name</th>
                        <th>blogs</th>
                    </tr>
                    <tbody>

                    {users.map(user =>
                        <SingleUser
                            key={user.id}
                            user={user}
                        />)}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersDisplay
