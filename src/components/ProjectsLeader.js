import { Fragment, useEffect } from "react";
import Cookies from 'universal-cookie';
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from 'react-router-dom';
import { GET_PROJECTS_BY_LEADER } from "../graphql/Query";
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const ProjectsLeader = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const { data, loading } = useQuery(GET_PROJECTS_BY_LEADER, {
        variables: {
            id: cookies.get('_id')
        },
    });

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
                            <h1 className="h4 font-title">Mis proyectos</h1>
                            <a href="nuevo-proyecto.html" className="btn btn-dark btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-plus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
                                Nuevo Proyecto
                            </a>
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
                                data.getProjectsByLeader.map(p => (
                                    <div className="card mb-3" key={ p._id }>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h5 className="card-title font-subtitle">{ p.nombre }</h5>
                                                <Link to={{ pathname: "/project/" + p._id }} className="btn btn-info btn-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><circle cx="16.5" cy="17.5" r="2.5" /><line x1="18.5" y1="19.5" x2="21" y2="22" /></svg>
                                                    Detalles
                                                </Link>
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
 
export default ProjectsLeader;