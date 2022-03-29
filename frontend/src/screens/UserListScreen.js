import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen({ history }) {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        }
        else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete it!',
            cancelButtonText: 'Cancel!',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id))
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <>
            <h1 style={{ textAlign: 'center  ' }}>Users</h1>
            {loading ?
                <Loader /> :
                error ?
                    <Message variant="danger">{error}</Message> :
                    (
                        <Table stripe bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>
                                            {user.isAdmin ?
                                                (<i className="fas fa-check" style={{ color: 'green' }}></i>) :
                                                (<i className="fas fa-times" style={{ color: 'red' }}></i>)
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant="light" className="btn-sm" disabled={user.name === userInfo.name}>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={() => deleteHandler(user._id)}
                                                disabled={user.name === userInfo.name}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </>
    )
}

export default UserListScreen