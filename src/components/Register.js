import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/Mutation";
import Cookies from 'universal-cookie';
import Toast from '../helpers/sweetAlertConfig';
import "./Login.css";

const Register = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.get('_id')) {
            navigate('/projects');
        }
        // eslint-disable-next-line
    }, []);

    const [user, setUser] = useState({
        correo: '',
        documento: '',
        nombre: '',
        contrasenia: '',
        tipo: ''
    });

    const { correo, documento, nombre, contrasenia, tipo } = user;

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted() {
            Toast.fire({
                title: 'Éxito',
                text: 'La cuenta de usuario ha sido creada',
                icon: 'success'
            });
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

        if (correo.trim() === '' || documento.trim() === '' || nombre.trim() === '' || contrasenia.trim() === '' || tipo.trim() === '') {
            Toast.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                icon: 'error'
            });
            return ;
        }

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

        navigate('/');
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
                        <select className="form-select" id="tipo" name="tipo" defaultValue="" aria-label="Floating label select example" onChange={ changeUser }>
                            <option disabled value="">Selecciona un tipo</option>
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