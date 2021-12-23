import { Fragment, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { GET_USERS } from "../graphql/Query";
import { UPDATE_USER_STATE } from "../graphql/Mutation";
import Toast from '../helpers/sweetAlertConfig';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Users = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const { data, loading } = useQuery(GET_USERS);

    const [userState, setUserState] = useState({
        id: '',
        estadoUsuario: ''
    });

    const { id, estadoUsuario } = userState;

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);

    const selectUser = (id, estadoUsuario) => {
        setUserState({
            id,
            estadoUsuario
        });
    };

    const changeUser = e => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        });
    };

    const [updateUserState] = useMutation(UPDATE_USER_STATE, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'El estado fue actualizado',
                icon: 'success'
            });
        }
    });

    const updateStatus = e => {
        e.preventDefault();

        if (id.trim() === '' || estadoUsuario.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

        updateUserState({
            variables: {
                id: id,
                estadoUsuario: estadoUsuario
            }
        });

        setUserState({
            id: '',
            estadoUsuario: ''
        });
        
    };

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 font-title">Usuarios</h1>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading 
                                    ?
                                        <tr>
                                            <td colSpan="4">
                                                <div className="d-flex justify-content-center">
                                                    <div className="spinner-border text-dark" role="status">
                                                        <span className="sr-only"></span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    :
                                        data.getUsers.map(u => (
                                            <tr key={ u._id }>
                                                <td>{ u.nombre }</td>
                                                <td>
                                                    <span className={ u.tipo === 'ADMINISTRADOR' ? 'badge bg-info' : u.tipo === 'LIDER' ? 'badge bg-dark' : 'badge bg-light' }>{ u.tipo }</span>
                                                </td>
                                                <td>
                                                    <span className={ u.estadoUsuario === 'PENDIENTE' ? 'badge bg-warning text-dark' : u.estadoUsuario === 'AUTORIZADO' ? 'badge bg-success' : 'badge bg-danger' }>{ u.estadoUsuario }</span>
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-warning btn-sm text-dark" 
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#exampleModal"
                                                            onClick={ e => selectUser(u._id, u.estadoUsuario) }
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit mr-2" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                            Actualizar estado
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={ updateStatus }>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Editar estado</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="estadoUsuario" className="form-label">Estado de usuario</label>
                                        <select id="estadoUsuario" name="estadoUsuario" value={ userState.estadoUsuario } className="form-select" aria-label="Default select example" onChange={ changeUser }>
                                            <option disabled value="">Seleccione un estado</option>
                                            <option value="AUTORIZADO">Autorizado</option>
                                            <option value="NO_AUTORIZADO">No autorizado</option>
                                            <option value="PENDIENTE">Pendiente</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Users;