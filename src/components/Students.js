import { Fragment, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';
import { GET_STUDENTS } from "../graphql/Query";
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Students = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const { data, loading } = useQuery(GET_STUDENTS);

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
    }, []);
    
    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 font-title">Estudiantes</h1>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
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
                                        data.getStudents.map(u => (
                                            <tr key={ u._id }>
                                                <td>{ u.nombre }</td>
                                                <td>
                                                    <span className={ u.estadoUsuario === 'PENDIENTE' ? 'badge bg-warning text-dark' : u.estadoUsuario === 'AUTORIZADO' ? 'badge bg-success' : 'badge bg-danger' }>{ u.estadoUsuario }</span>
                                                </td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                        <button className="btn btn-warning btn-sm text-dark">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                        </button>
                                                        <button className="btn btn-danger btn-sm">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-x" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
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
        </Fragment>
    );
}
 
export default Students;