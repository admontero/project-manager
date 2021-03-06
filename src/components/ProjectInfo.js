import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "../graphql/Query";
import { UPDATE_PROJECT_STATE, UPDATE_PROJECT_PHASE, UPDATE_ADVANCE_REMARK } from "../graphql/Mutation";
import Cookies from 'universal-cookie';
import Toast from '../helpers/sweetAlertConfig';
import Header from '../components/Header';
import Navigation from "../components/Navigation";
import Modal from "./Modal";

const ProjectInfo = () => {

    const cookies = new Cookies();
    const params = useParams();

    const [projectStatus, setProjectStatus] = useState({
        id: '',
        estadoProyecto: ''
    });

    const [projectPhase, setProjectPhase] = useState({
        id: '',
        fase: ''
    });

    const [advanceRemark, setAdvanceRemark] = useState({
        id: '',
        advanceId: '',
        remark: ''
    });

    const { data, loading, refetch } = useQuery(GET_PROJECT_BY_ID, {
        variables: {
            id: params.id
        },
    });

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (data) {
            setProjectStatus({
                estadoProyecto: data.getProjectById.estadoProyecto
            });
            setProjectPhase({
                fase: data.getProjectById.fase === 'NULA' ? '' : data.getProjectById.fase
            })
        }
        // eslint-disable-next-line
    }, [data]);

    const [updateProjectState] = useMutation(UPDATE_PROJECT_STATE, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'El estado fue actualizado',
                icon: 'success'
            });
        }
    });

    const [updateProjectPhase] = useMutation(UPDATE_PROJECT_PHASE, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'La fase fue actualizada',
                icon: 'success'
            });
        }
    });

    const [updateAdvanceRemark] = useMutation(UPDATE_ADVANCE_REMARK, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'La observación ha sido actualizada',
                icon: 'success'
            });
        }
    });

    const updateStatus = e => {
        e.preventDefault();

        if (projectStatus.id.trim() === '' || projectStatus.estadoProyecto.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

        updateProjectState({
            variables: {
                id: projectStatus.id,
                estadoProyecto: projectStatus.estadoProyecto
            }
        }).then(() => {
            refetch();
        });

        setProjectPhase({
            id: '',
            fase: ''
        });
    };

    const updatePhase = e => {
        e.preventDefault();
      
        if (projectPhase.id.trim() === '' || projectPhase.fase.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

        updateProjectPhase({
            variables: {
                id: projectPhase.id,
                fase: projectPhase.fase
            }
        }).then(() => {
            refetch();
        });

        setProjectStatus({
            id: '',
            estadoProyecto: ''
        });
    };

    const updateRemark = e => {
        e.preventDefault();

        if (advanceRemark.id.trim() === '' || advanceRemark.advanceId.trim() === '' || advanceRemark.remark.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

        updateAdvanceRemark({
            variables: {
                id: advanceRemark.id,
                advanceId: advanceRemark.advanceId,
                remark: advanceRemark.remark
            }
        }).then(() => {
            refetch();
        });

        setAdvanceRemark({
            id: '',
            advanceId: '',
            remark: ''
        });
    };

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {
                            loading
                            ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            :
                                <Fragment>
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 border-bottom">
                                        <h1 className="h5 font-title">{ data.getProjectById.nombre }</h1>
                                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            {
                                                cookies.get('tipo') === 'ADMINISTRADOR'
                                                ?
                                                    <Fragment>
                                                        <button className="btn btn-warning btn-sm text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={ () => setProjectStatus({ ...projectStatus, id: data.getProjectById._id }) }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                            Editar Estado
                                                        </button>
                                                        <button className="btn btn-warning btn-sm text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={ () => setProjectPhase({ ...projectPhase, id: data.getProjectById._id }) }>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                            Editar Fase
                                                        </button>
                                                    </Fragment>
                                                :
                                                cookies.get('tipo') === 'LIDER'
                                                ?
                                                    <Link to="edit" className="btn btn-warning btn-sm text-dark">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                        Editar Información
                                                    </Link>
                                                :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs border-0">
                                        <li className="nav-item font-subtitle">
                                            <a className="nav-link active" data-bs-toggle="tab" href="#home">Información general</a>
                                        </li>
                                        {
                                            cookies.get('tipo') === 'ADMINISTRADOR' || cookies.get('tipo') === 'LIDER'
                                            ?
                                                <li className="nav-item font-subtitle">
                                                    <a className="nav-link" data-bs-toggle="tab" href="#inscritos">Inscritos</a>
                                                </li>
                                            :
                                                null
                                        }
                                        <li className="nav-item font-subtitle">
                                            <a className="nav-link" data-bs-toggle="tab" href="#avances">Avances</a>
                                        </li>
                                    </ul>
                                    <div id="myTabContent" className="tab-content">
                                        <div className="tab-pane fade show active mt-2 mb-4" id="home">
                                            <div className="card">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item"><b>Objetivos Generales: </b> { data.getProjectById.oGenerales }</li>
                                                    <li className="list-group-item"><b>Objetivos Específicos: </b> { data.getProjectById.oEspecificos }</li>
                                                    <li className="list-group-item"><b>Líder: </b> { data.getProjectById.lider.nombre }</li>
                                                    <li className="list-group-item"><b>Presupuesto: </b> { data.getProjectById.presupuesto }</li>
                                                    <li className="list-group-item"><b>Estado: </b> { data.getProjectById.estadoProyecto }</li>
                                                    <li className="list-group-item"><b>Fase: </b> { data.getProjectById.fase }</li>
                                                    <li className="list-group-item"><b>Fecha inicial: </b> { data.getProjectById.fInicio }</li>
                                                    <li className="list-group-item"><b>Fecha de terminación: </b> { data.getProjectById.fTerminacion }</li>
                                                    <li className="list-group-item"><b>N°. Inscritos: </b> { data.getProjectById.inscritos.length }</li>
                                                    <li className="list-group-item"><b>N°. Avances: </b> { data.getProjectById.avances.length }</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade mt-2" id="inscritos">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Estado</th>
                                                        <th scope="col">Fecha de ingreso</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.getProjectById.inscritos.map( i => (
                                                            <tr key={ i._id }>
                                                                <td>{ i.nombre }</td>
                                                                <td>
                                                                    <span className={ i.estadoInscrito === 'ACEPTADA' ? 'badge bg-success' : i.estadoInscrito === 'RECHAZADA' ? 'badge bg-danger' : '' }>{ i.estadoInscrito === 'NULA' ? '' : i.estadoInscrito }</span>
                                                                </td>
                                                                <td>{ i.fIngreso}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="tab-pane fade mt-2" id="avances">
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
                                                        data.getProjectById.avances.map(a => (
                                                            <tr key={ a._id }>
                                                                <td>{ a.descripcion }</td>
                                                                <td>{ a.observaciones }</td>
                                                                <td>{ a.fecha }</td>
                                                                <td>
                                                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                                        {
                                                                            cookies.get('tipo') === 'LIDER'
                                                                            ?
                                                                                <button className="btn btn-warning btn-sm text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={ () => { setAdvanceRemark({ ...advanceRemark, id: data.getProjectById._id, advanceId: a._id, remark: a.observaciones || '' }) } }>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                                                    Editar observación
                                                                                </button>

                                                                            :
                                                                            cookies.get('tipo') === 'ESTUDIANTE'
                                                                            ?
                                                                                <button className="btn btn-warning btn-sm text-dark">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                                                    Editar descripción
                                                                                </button>
                                                                            :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <Modal id="exampleModal" title="Editar estado" action={ updateStatus }>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="estadoProyecto" className="form-label">Estados de proyecto</label>
                                                <select id="estadoProyecto" name="estadoProyecto" className="form-select" aria-label="Default select example" onChange={ e => setProjectStatus({ ...projectStatus, estadoProyecto: e.target.value }) } defaultValue={ data.getProjectById.estadoProyecto }>
                                                    <option value="" disabled>Seleccione un estado de proyecto</option>
                                                    <option value="ACTIVO">Activo</option>
                                                    <option value="INACTIVO">Inactivo</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal id="exampleModal2" title="Editar fase" action={ updatePhase }>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="fase" className="form-label">Fases de proyecto</label>
                                                <select id="fase" name="fase" className="form-select" aria-label="Default select example" onChange={ e => setProjectPhase({ ...projectPhase, fase: e.target.value }) } defaultValue={ data.getProjectById.fase === 'NULA' ? '' : data.getProjectById.fase }>
                                                    <option value="" disabled>Seleccione una fase de proyecto</option>
                                                    <option value="INICIADO">Iniciado</option>
                                                    <option value="EN_DESARROLLO">En desarrollo</option>
                                                    <option value="TERMINADO">Terminado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal id="exampleModal3" title="Editar observación" action={ updateRemark }>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="observacion" className="col-form-label">Observación</label>
                                                <textarea 
                                                    className="form-control font-body" 
                                                    id="observacion"
                                                    name="observacion"
                                                    rows="3"
                                                    onChange={ e => setAdvanceRemark({ ...advanceRemark, remark: e.target.value }) }
                                                    value={ advanceRemark.remark }
                                                ></textarea>
                                            </div>
                                        </div>
                                    </Modal>
                                </Fragment>
                        }
                    </main>
                </div>
            </div>
        </Fragment>
    );
}
 
export default ProjectInfo;