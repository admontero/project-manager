import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom'
import { Fragment } from 'react';

const Navigation = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const closeSession = () => {
        cookies.remove('_id', { path:"/" });
        cookies.remove('nombre', { path:"/" });
        cookies.remove('documento', { path:"/" });
        cookies.remove('tipo', { path:"/" });

        navigate('/');
    };

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    {
                        cookies.get('tipo') === 'ADMINISTRADOR'
                        ?    
                            <Fragment>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" to="/projects">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-grid" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
                                        Proyectos
                                    </Link>
                                </li>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" to="/users">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                                        Usuarios
                                    </Link>
                                </li>
                            </Fragment>
                        :
                        cookies.get('tipo') === 'LIDER'
                        ?
                            <Fragment>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" to="/my-projects">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-grid" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
                                        Mis proyectos
                                    </Link>
                                </li>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" to="/requests">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checkup-list" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><rect x="9" y="3" width="6" height="4" rx="2" /><path d="M9 14h.01" /><path d="M9 17h.01" /><path d="M12 16l1 1l3 -3" /></svg>
                                        Solicitudes pendientes
                                    </Link>
                                </li>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" to="/students">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                                        Estudiantes
                                    </Link>
                                </li>
                            </Fragment>
                        :
                            <Fragment>
                                <li className="nav-item border-bottom">
                                    <Link className="nav-link" to="/projects">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-grid" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
                                        Proyectos
                                    </Link>
                                </li>
                            </Fragment>
                    }
                    <li className="nav-item border-bottom">
                        <Link className="nav-link" to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="7" r="4" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                            Mi perfil
                        </Link>
                    </li>
                    <li className="nav-item border-bottom">
                        <button 
                            type="button" 
                            className="nav-link" 
                            style={{ outline: 'none', border: 'none', backgroundColor: 'transparent' }}
                            onClick={ closeSession }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-power" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><line x1="12" y1="4" x2="12" y2="12" /></svg>
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navigation;