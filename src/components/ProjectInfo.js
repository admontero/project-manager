import { Fragment, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_PROJECT_BY_ID, GET_PROJECT_ADVANCES } from "../graphql/Query";
import { UPDATE_PROJECT_STATE } from "../graphql/Mutation";
import { useAlert } from 'react-alert';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const ProjectInfo = () => {

    const alert = useAlert();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const params = useParams();

    const [projectStatus, setProjectStatus] = useState({
        id: '',
        estadoProyecto: ''
    });

    const { data, loading } = useQuery(GET_PROJECT_BY_ID, {
        variables: {
            id: params.id
        },
    });

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
    }, []);

    const selectId = (id) => {
        setProjectStatus({
            ...projectStatus,
            id: id
        })
    };

    const changeProject = e => {
        setProjectStatus({
            ...projectStatus,
            [e.target.name]: e.target.value
        });
    };

    const [updateProjectState] = useMutation(UPDATE_PROJECT_STATE, {
        onCompleted(data) {
            console.log('actualizado', data);
            alert.show('El estado fue actualizado con éxito', { type: 'success' });
        }
    });

    const updateStatus = e => {
        e.preventDefault();

        if (projectStatus.id.trim() === '' || projectStatus.estadoProyecto.trim() === '') {
            alert.show('Todos los campos son obligatorios', { type: 'error' })
            return ;
        }

        updateProjectState({
            variables: {
                id: projectStatus.id,
                estadoProyecto: projectStatus.estadoProyecto
            }
        });

        setProjectStatus({
            id: '',
            estadoProyecto: ''
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
                                        <h1 className="h5">{ data.getProjectById.nombre }</h1>
                                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <button className="btn btn-warning btn-sm text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={ e => selectId(data.getProjectById._id) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                Estado Proyecto
                                            </button>
                                            <button className="btn btn-warning btn-sm text-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg>
                                                Información Proyecto
                                            </button>
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs border-0">
                                        <li className="nav-item font-subtitle">
                                            <a className="nav-link active" data-bs-toggle="tab" href="#home">Información general</a>
                                        </li>
                                        <li className="nav-item font-subtitle">
                                            <a className="nav-link" data-bs-toggle="tab" href="#inscritos">Inscritos</a>
                                        </li>
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
                                                        <th scope="col">Acciones</th>
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
                                                                <td>12-11-2021</td>
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
                                        </div>
                                    </div>
                                </Fragment>
                        }
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
                                        <label htmlFor="estadoProyecto" className="form-label">Estados de proyecto</label>
                                        <select id="estadoProyecto" name="estadoProyecto" defaultValue="" className="form-select" aria-label="Default select example" onChange={ changeProject }>
                                            <option disabled value="">Seleccione un estado</option>
                                            <option value="ACTIVO">Activo</option>
                                            <option value="INACTIVO">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
 
export default ProjectInfo;