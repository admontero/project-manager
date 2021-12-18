import { Fragment, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';
import { GET_STUDENTS } from "../graphql/Query";
import { AUTHORIZE_STUDENT } from '../graphql/Mutation';
import { useAlert } from 'react-alert';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Students = () => {

    const alert = useAlert();
    const cookies = new Cookies();
    const navigate = useNavigate();

    const { data, loading } = useQuery(GET_STUDENTS);

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
    }, []);

    const [AuthorizeStudent] = useMutation(AUTHORIZE_STUDENT, {
        refetchQueries: [{ query: GET_STUDENTS }],
        onCompleted(data) {
            console.log('autorizado', data);
            alert.show('El estudiante fue autorizado con éxito', { type: 'success' });
        }
    });

    const authorize = id => {
        AuthorizeStudent({
            variables: {
                id: id
            }
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
                                                    {
                                                        u.estadoUsuario !== 'AUTORIZADO'
                                                        ?
                                                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                                <button className="btn btn-success btn-sm" onClick={ e => authorize(u._id, e) }>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></svg>
                                                                    Autorizar
                                                                </button>
                                                            </div>
                                                        :
                                                            null
                                                    }
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