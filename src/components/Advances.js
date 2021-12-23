import { Fragment, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { GET_PROJECT_ADVANCES } from "../graphql/Query";
import { UPDATE_ADVANCE_DESCRIPTION, CREATE_ADVANCE } from "../graphql/Mutation";
import Toast from '../helpers/sweetAlertConfig';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Advances = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const { data, loading, refetch } = useQuery(GET_PROJECT_ADVANCES, {
        variables: {
            id: params.id
        },
    });

    const [updateAdvanceDescription] = useMutation(UPDATE_ADVANCE_DESCRIPTION, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'La descripción ha sido actualizada',
                icon: 'success'
            });
        }
    });

    const [createAdvance] = useMutation(CREATE_ADVANCE, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'Avance de proyecto guardado',
                icon: 'success'
            });
        }
    });

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);
    
    const [newAdvance, setNewAdvance] = useState({
        projectId: '',
        fecha: '',
        descripcion: ''
    });

    const [advanceDescription, setAdvanceDescription] = useState({
        id: '',
        advanceId: '',
        descripcion: ''
    });

    const updateDescription = e => {
        e.preventDefault();

        if (advanceDescription.id.trim() === '' || advanceDescription.advanceId.trim() === '' || advanceDescription.descripcion.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

        updateAdvanceDescription({
            variables: {
                id: advanceDescription.id,
                advanceId: advanceDescription.advanceId,
                descripcion: advanceDescription.descripcion
            }
        }).then(() => {
            refetch();
        });

        setAdvanceDescription({
            id: '',
            advanceId: '',
            descripcion: ''
        });
    };

    const submitAdvance = e => {
        e.preventDefault();

        if (newAdvance.projectId.trim() === '' || newAdvance.fecha.trim() === '' || newAdvance.descripcion.trim() === '') {
            alert.show('Todos los campos son obligatorios', { type: 'error' })
            return ;
        }

        createAdvance({
            variables: {
                projectId: newAdvance.projectId,
                fecha: newAdvance.fecha,
                descripcion: newAdvance.descripcion
            }
        }).then(() => {
            refetch();
        });

        setNewAdvance({
            projectId: '',
            fecha: '',
            descripcion: ''
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
                            <h1 className="h4 font-title">Avances { location.state.projectName }</h1>
                            <button type="button" className="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={ () => { setNewAdvance({ ...newAdvance, projectId: params.id }) } }>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-plus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
                                Nuevo Avance
                            </button>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col">Fecha</th>
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
                                        data.getProjectAdvances.map(a => (
                                            <tr key={ a._id }>
                                                <td>{ a.descripcion }</td>
                                                <td>{ a.observaciones }</td>
                                                <td>{ a.fecha }</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                        <button className="btn btn-warning btn-sm text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={ () => { setAdvanceDescription({ ...advanceDescription, id: params.id, advanceId: a._id, descripcion: a.descripcion || '' }) } }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                            Editar descripción
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
                    <form onSubmit={ updateDescription }>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Editar descripción</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="descripcion" className="col-form-label">Descripción</label>
                                        <textarea 
                                            className="form-control font-body" 
                                            id="descripcion"
                                            name="descripcion"
                                            rows="3"
                                            onChange={ e => { setAdvanceDescription({ ...advanceDescription, descripcion: e.target.value }) } }
                                            value={ advanceDescription.descripcion }
                                        ></textarea>
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
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={ submitAdvance }>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Creación de Avance</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="fecha" className="col-form-label">Fecha</label>
                                        <input type="date" className="form-control" id="fecha" name="fecha" onChange={ e => { setNewAdvance({ ...newAdvance, fecha: e.target.value }) } }/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="descripcion" className="col-form-label">Descripción</label>
                                        <textarea 
                                            className="form-control font-body" 
                                            id="descripcion"
                                            name="descripcion"
                                            rows="3"
                                            onChange={ e => { setNewAdvance({ ...newAdvance, descripcion: e.target.value }) } }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Advances;