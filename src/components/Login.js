import { useState } from "react";
import { useQuery } from "@apollo/client";
import { AUTH_USER } from "../graphql/Query";
import { Link } from 'react-router-dom'
import "./Login.css";

const Login = () => {

    const [authUser, setAuthUser] = useState({
        correo: '',
        contrasenia: ''
    });

    const [showAlert, setShowAlert] = useState(false);

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

        console.log(data.authUser)
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