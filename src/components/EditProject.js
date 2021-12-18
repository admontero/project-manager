import { Fragment, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_PROJECT_BY_ID } from "../graphql/Query";
import { UPDATE_PROJECT } from "../graphql/Mutation";
import { useAlert } from 'react-alert';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const EditProject = () => {

    const alert = useAlert();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
    }, []);

    const { data, loading } = useQuery(GET_PROJECT_BY_ID, {
        variables: {
            id: params.id
        },
    });

    const [project, setProject] = useState({
        nombre: '',
        oGenerales: '',
        oEspecificos: '',
        presupuesto: 0
    });

    useEffect(() => {
        if (!loading) {
            setProject({
                nombre: data.getProjectById.nombre,
                oGenerales: data.getProjectById.oGenerales,
                oEspecificos: data.getProjectById.oEspecificos,
                presupuesto: data.getProjectById.presupuesto.toString()
            })
        }
    }, [loading]);

    const { nombre, oGenerales, oEspecificos, presupuesto } = project;

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        onCompleted(data) {
            console.log('creado', data);
            alert.show('El proyecto fue actualizado con éxito', { type: 'success' })
        }
    });

    const update = e => {
        e.preventDefault();

        if (nombre.trim() === '' || oGenerales.trim() === '' || oEspecificos.trim() === '' || presupuesto.trim() === '') {
            alert.show('Todos los campos son obligatorios', { type: 'error' })
            return ;
        }

        updateProject({
            variables: {
                id: params.id,
                nombre: nombre,
                oGenerales: oGenerales,
                oEspecificos: oEspecificos,
                presupuesto: Number(presupuesto)
            }
        });

        setProject({
            nombre: '',
            oGenerales: '',
            oEspecificos: '',
            presupuesto: 0
        });

        navigate('/project/' + params.id);
    };

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flexWrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 font-title">Editar Proyecto</h1>
                        </div>
                        <form onSubmit={ update }>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="nombre" className="col-form-label">Nombre</label>
                                            <input 
                                                type="text" 
                                                id="nombre" 
                                                name="nombre" 
                                                className="form-control font-body" 
                                                placeholder="Nombre del proyecto" 
                                                aria-label="Nombre proyecto"
                                                onChange={ e => { setProject({ ...project, [e.target.name]: e.target.value }) } }
                                                value={ nombre }
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="presupuesto" className="col-form-label">Presupuesto</label>
                                            <input 
                                                type="number" 
                                                min="0"
                                                id="presupuesto" 
                                                name="presupuesto" 
                                                className="form-control font-body" 
                                                placeholder="Presupuesto del proyecto" 
                                                aria-label="Presupuesto proyecto"
                                                onChange={ e => { setProject({ ...project, [e.target.name]: e.target.value }) } }
                                                value={ presupuesto }
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="oGenerales" className="col-form-label">Objetivos generales</label>
                                            <textarea 
                                                className="form-control font-body" 
                                                id="oGenerales"
                                                name="oGenerales"
                                                rows="3"
                                                onChange={ e => { setProject({ ...project, [e.target.name]: e.target.value }) } }
                                                value={ oGenerales }
                                            ></textarea>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="oEspecificos" className="col-form-label">Objetivos específicos</label>
                                            <textarea 
                                                className="form-control font-body" 
                                                id="oEspecificos" 
                                                name="oEspecificos"
                                                rows="3"
                                                onChange={ e => { setProject({ ...project, [e.target.name]: e.target.value }) } }
                                                value={ oEspecificos }
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-grid d-md-flex justify-content-md-end">
                                    <button type="submit" className="btn btn-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-plus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                                        Crear Proyecto
                                    </button>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </Fragment>
    );
}
 
export default EditProject;