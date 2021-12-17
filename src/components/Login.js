import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { AUTH_USER } from "../graphql/Query";
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Cookies from 'universal-cookie';
import "./Login.css";

const Login = () => {

    const alert = useAlert();
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.get('_id') && ( cookies.get('tipo') === 'ADMINISTRADOR' || cookies.get('tipo') === 'ESTUDIANTE')) {
            navigate('/projects');
        } else if (cookies.get('_id') && cookies.get('tipo') === 'LIDER') {
            navigate('/my-projects');
        }
    }, []);

    const [authUser, setAuthUser] = useState({
        correo: '',
        contrasenia: ''
    });

    const { correo, contrasenia } = authUser;

    const { data } = useQuery(AUTH_USER, {
        variables: {
            correo: correo,
            contrasenia: contrasenia
        },
    });

    const changeUser = e => {
        setAuthUser({
            ...authUser,
            [e.target.name]: e.target.value
        });
    };

    const submitUser = e => {
        e.preventDefault();

        if (correo.trim() === '' || contrasenia.trim() === '') {
            alert.show('Todos los campos son obligatorios', { type: 'error' })
            return ;
        }

        if (data.authUser) {
            const { _id, nombre, documento, estadoUsuario, tipo } = data.authUser;
            switch (estadoUsuario) {
                case 'PENDIENTE':
                    alert.show('Usuario pendiente de autorización', { type: 'info' })
                    break;
                case 'NO_AUTORIZADO':
                    alert.show('El usuario no fue autorizado', { type: 'error' })
                    break;
                case 'AUTORIZADO':
                    cookies.set('_id', _id, { path:"/" });
                    cookies.set('nombre', nombre, { path:"/" });
                    cookies.set('documento', documento, { path:"/" });
                    cookies.set('tipo', tipo, { path:"/" });

                    alert.show('Hola ' + nombre, { type: 'success' });

                    setAuthUser({
                        correo: '',
                        contrasenia: ''
                    });

                    if (cookies.get('_id') && ( cookies.get('tipo') === 'ADMINISTRADOR' || cookies.get('tipo') === 'ESTUDIANTE')) {
                        navigate('/projects');
                    } else if (cookies.get('_id') && cookies.get('tipo') === 'LIDER') {
                        navigate('/my-projects');
                    }
            
                default:
                    break;
            }
        } else {
            alert.show('No existe un usuario con esos datos', { type: 'error' })
            return ;
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
                            onChange={ changeUser } 
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
                            onChange={ changeUser }
                        />
                        <label htmlFor="contrasenia">Contraseña</label>
                    </div>
                
                    <div className="mb-3">
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