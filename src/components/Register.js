import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/Mutation";
import { Link } from 'react-router-dom'
import "./Login.css";

const Register = () => {

    const [user, setUser] = useState({
        correo: '',
        documento: '',
        nombre: '',
        contrasenia: '',
        tipo: ''
    });

    const [showAlert, setShowAlert] = useState(false);

    const { correo, documento, nombre, contrasenia, tipo } = user;

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted(data) {
            console.log('creado', data);
        }
    });

    const changeUser = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const submitNewUser = e => {
        e.preventDefault();

        createUser({
            variables: {
                correo: correo,
                documento: documento,
                nombre: nombre,
                contrasenia: contrasenia,
                tipo: tipo
            }
        });

        setUser({
            correo: '',
            documento: '',
            nombre: '',
            contrasenia: '',
            tipo: ''
        });
    };

    return (
        <div className="login-container text-center login">
            <main className="form-signin">
                <form onSubmit={ submitNewUser }>
                    <h1 className="h3 mb-3 fw-normal">Register</h1>
                
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
                            type="text" 
                            className="form-control" 
                            id="documento" 
                            name="documento" 
                            placeholder="name@example.com" 
                            onChange={ changeUser } 
                        />
                        <label htmlFor="documento">Documento</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre" 
                            name="nombre" 
                            placeholder="name@example.com" 
                            onChange={ changeUser } 
                        />
                        <label htmlFor="nombre">Nombre</label>
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
                    
                    <div className="form-floating">
                        <select className="form-select" id="tipo" name="tipo" aria-label="Floating label select example" onChange={ changeUser }>
                            <option selected>SELECCIONA UN TIPO</option>
                            <option value="ADMINISTRADOR">Administrador</option>
                            <option value="LIDER">Lider</option>
                            <option value="ESTUDIANTE">Estudiante</option>
                        </select>
                        <label htmlFor="tipo">Tipo</label>
                    </div>
                
                    <div className="my-3">
                       <Link to="/" className="text-dark text-decoration-none">Ingresar con mi cuenta</Link>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Guardar</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>      
        </div>
    );
}
 
export default Register;