import { Fragment, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { GET_PROJECTS_AND_INSCRIBED } from "../graphql/Query";
import { UPDATE_SIGNED_STATE } from "../graphql/Mutation";
import { useAlert } from 'react-alert';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Requests = () => {

    const alert = useAlert();
    const cookies = new Cookies();
    const navigate = useNavigate();

    const { data, loading, refetch } = useQuery(GET_PROJECTS_AND_INSCRIBED, {
        variables: {
            id: cookies.get('_id')
        },
    });

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);

    const [updateSignedState] = useMutation(UPDATE_SIGNED_STATE, {
        onCompleted(data) {
            console.log('actualizado', data);
            alert.show('La solicitud ha sido respondida con éxito', { type: 'success' });
            refetch();
        }
    });

    const manageRequest = (projectId, inscribedId, status) => {
        updateSignedState({
            variables: {
                projectId: projectId,
                inscribedId: inscribedId,
                estadoInscrito: status
            }
        })
    }

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 font-title">Solicitudes pendientes</h1>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre Proyecto</th>
                                    <th scope="col">Nombre Estudiante</th>
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
                                        data.getInscribedByLeader.map(u => (
                                            <tr key={ u._id }>
                                                <td>{ data.getProjects.filter(p => p.inscritos.some(i => i._id === u._id))[0].nombre }</td>
                                                <td>{ u.nombre }</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                        <button className="btn btn-success btn-sm" onClick={ e => manageRequest(data.getProjects.filter(p => p.inscritos.some(i => i._id === u._id))[0]._id, u._id, 'ACEPTADA') }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></svg>
                                                            Aceptar
                                                        </button>
                                                        <button className="btn btn-danger btn-sm" onClick={ e => manageRequest(data.getProjects.filter(p => p.inscritos.some(i => i._id === u._id))[0]._id, u._id, 'RECHAZADA') }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-x" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
                                                            Rechazar
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
 
export default Requests;