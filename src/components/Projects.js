import { Fragment, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/Query";
import { APPROVE_PROJECT, CREATE_INSCRIPTION } from "../graphql/Mutation";
import Cookies from 'universal-cookie';
import Toast from '../helpers/sweetAlertConfig';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const Projects = () => {

    const cookies = new Cookies();

    const { data, loading, refetch } = useQuery(GET_PROJECTS);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, []);

    const [ApproveProject] = useMutation(APPROVE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'El proyecto fue aprobado',
                icon: 'success'
            });
        }
    });

    const [createInscription] = useMutation(CREATE_INSCRIPTION, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'La solicitud de inscripción ha sido enviada',
                icon: 'success'
            });
        }
    });

    const approve = (id) => {
        ApproveProject({
            variables: {
                id: id
            }
        });
    };

    const submitInscription = projectId => {
        createInscription({
            variables: {
                projectId: projectId,
                nombre: cookies.get('nombre'),
                usuarioId: cookies.get('_id'),
            }
        }).then(() => {
            refetch();
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
                            <h1 className="h4 font-title">Proyectos</h1>
                        </div>
                        { 
                            loading 
                            ?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            :
                                data.getProjects.map(p => (
                                    <div className="card mb-3" key={ p._id }>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h5 className="card-title font-subtitle">{ p.nombre }</h5>
                                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                                    {
                                                        cookies.get('tipo') === 'ADMINISTRADOR' && p.estadoProyecto === 'INACTIVO'
                                                        ?
                                                            <button className="btn btn-success btn-sm" onClick={ e => approve(p._id, e) }>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></svg>
                                                                Aprobar
                                                            </button>
                                                        :
                                                            null
                                                    }
                                                    {
                                                        cookies.get('tipo') === 'ESTUDIANTE' && !p.inscritos.some(i => i.usuarioId === cookies.get('_id'))
                                                        ?
                                                            <button className="btn btn-success btn-sm" onClick={ e => submitInscription(p._id, e) }>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></svg>
                                                                Inscribirme
                                                            </button>
                                                        :
                                                            null
                                                    }
                                                    {
                                                        cookies.get('tipo') === 'ADMINISTRADOR' || cookies.get('tipo') === 'LIDER'
                                                        ?
                                                            <Link to={{ pathname: "/project/" + p._id }} className="btn btn-info btn-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><circle cx="16.5" cy="17.5" r="2.5" /><line x1="18.5" y1="19.5" x2="21" y2="22" /></svg>
                                                                Detalles
                                                            </Link>
                                                        :
                                                        cookies.get('tipo') === 'ESTUDIANTE' && (p.inscritos.filter(i => i.usuarioId === cookies.get('_id'))[0] ? p.inscritos.filter(i => i.usuarioId === cookies.get('_id'))[0].estadoInscrito === 'ACEPTADA' : false)
                                                        ?
                                                            <Link to={`/project/${p._id}/advances`} state={{ projectName: p.nombre }} className="btn btn-info btn-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><circle cx="16.5" cy="17.5" r="2.5" /><line x1="18.5" y1="19.5" x2="21" y2="22" /></svg>
                                                                Avances
                                                            </Link>
                                                        :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                            <p className="card-text">
                                                Estado: <span className={ p.estadoProyecto === 'ACTIVO' ? 'badge bg-success' : 'badge bg-danger' }>{ p.estadoProyecto }</span> |
                                                Fase: <span className="badge bg-dark">{ p.fase }</span> |
                                                Líder: <span className="text-info">{ p.lider.nombre }</span> |
                                                Total inscritos: <span className="text-info">{ p.inscritos.length }</span> |
                                                Total avances: <span className="text-info">{ p.avances.length }</span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                        }
                    </main>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Projects;