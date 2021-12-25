import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { AUTH_USER } from "../graphql/Query";
import Toast from '../helpers/sweetAlertConfig';
import Cookies from 'universal-cookie';
import "./Login.css";

const Login = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.get('_id') && ( cookies.get('tipo') === 'ADMINISTRADOR' || cookies.get('tipo') === 'ESTUDIANTE')) {
            navigate('/projects');
        } else if (cookies.get('_id') && cookies.get('tipo') === 'LIDER') {
            navigate('/my-projects');
        }
        // eslint-disable-next-line
    }, []);

    const [authUser, setAuthUser] = useState({
        correo: '',
        contrasenia: ''
    });

    const { correo, contrasenia } = authUser;

    const { data, loading } = useQuery(AUTH_USER, {
        variables: {
            correo: correo,
            contrasenia: contrasenia
        },
    });

    const submitUser = e => {
        e.preventDefault();

        if (correo.trim() === '' || contrasenia.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

        if (!loading) {
            if (data.authUser) {
                const { _id, nombre, documento, estadoUsuario, tipo } = data.authUser;
                switch (estadoUsuario) {
                    case 'PENDIENTE':
                        Toast.fire({
                            title: 'Acceso en espera',
                            text: 'El usuario está pendiente de autorización',
                            icon: 'info'
                        });
                        break;
                    case 'NO_AUTORIZADO':
                        Toast.fire({
                            title: 'Acceso denegado',
                            text: 'El usuario no fue autorizado',
                            icon: 'error'
                        });
                        break;
                    case 'AUTORIZADO':
                        cookies.set('_id', _id, { path:"/" });
                        cookies.set('nombre', nombre, { path:"/" });
                        cookies.set('documento', documento, { path:"/" });
                        cookies.set('tipo', tipo, { path:"/" });
    
                        Toast.fire({
                            title: 'Login exitoso',
                            text: `Hola ${ nombre }`,
                            icon: 'success'
                        });
    
                        setAuthUser({
                            correo: '',
                            contrasenia: ''
                        });
    
                        if (cookies.get('_id') && ( cookies.get('tipo') === 'ADMINISTRADOR' || cookies.get('tipo') === 'ESTUDIANTE')) {
                            navigate('/projects');
                        } else if (cookies.get('_id') && cookies.get('tipo') === 'LIDER') {
                            navigate('/my-projects');
                        }
                        break;
                    default:
                        break;
                }
            } else {
                Toast.fire({
                    title: 'Error',
                    text: 'No encontramos usuario con esas credenciales',
                    icon: 'error'
                });
                return ;
            }
        }
    };

    return (
        <div className="login-container text-center login">
            <main className="form-signin">
                <form onSubmit={ submitUser }>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                
                    <div className="form-floating">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="correo" 
                            name="correo" 
                            placeholder="name@example.com" 
                            onChange={ e => setAuthUser({ ...authUser, correo: e.target.value }) } 
                        />
                        <label htmlFor="correo">Email</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="contrasenia"
                            name="contrasenia"
                            placeholder="Password" 
                            onChange={ e => setAuthUser({ ...authUser, contrasenia: e.target.value }) }
                        />
                        <label htmlFor="contrasenia">Contraseña</label>
                    </div>
                
                    <div className="my-3">
                       <Link to="/register" className="text-dark text-decoration-none">Crear nuevo usuario</Link>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>      
        </div>
    );
}
 
export default Login;