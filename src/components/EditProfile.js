import { Fragment, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from "../graphql/Mutation";
import { useAlert } from 'react-alert';
import Header from '../components/Header';
import Navigation from "../components/Navigation";

const EditProfile = () => {

    const alert = useAlert();
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.get('_id')) {
            navigate('/');
        }
    }, []);

    const [user, setUser] = useState({
        documento: cookies.get('documento'),
        nombre: cookies.get('nombre'),
        contrasenia: '',
        confirm: ''
    });

    const { documento, nombre, contrasenia, confirm } = user;

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted(data) {
            console.log('actualizado', data);
            alert.show('La información fue actualizada con éxito', { type: 'success' })
        }
    });

    const submitUser = e => {
        e.preventDefault();

        if (nombre.trim() === '' || documento.trim() === '') {
            alert.show('Todos los campos son obligatorios', { type: 'error' })
            return ;
        }

        if (contrasenia !== confirm) {
            alert.show('Las contraseñas no coinciden', { type: 'error' })
            return ;
        }

        if (contrasenia === confirm && contrasenia !== '' && confirm !== '') {
            updateUser({
                variables: {
                    id: cookies.get('_id'),
                    nombre: nombre,
                    documento: documento,
                    contrasenia: contrasenia
                }
            }).then(() => {
                cookies.set('nombre', nombre, { path:"/" });
                cookies.set('documento', documento, { path:"/" });
                setUser({
                    documento: cookies.get('documento'),
                    nombre: cookies.get('nombre'),
                    contrasenia: '',
                    confirm: ''
                });
            });
        } else {
            updateUser({
                variables: {
                    id: cookies.get('_id'),
                    nombre: nombre,
                    documento: documento
                }
            }).then(() => {
                cookies.set('nombre', nombre, { path:"/" });
                cookies.set('documento', documento, { path:"/" });
                setUser({
                    documento: cookies.get('documento'),
                    nombre: cookies.get('nombre'),
                    contrasenia: '',
                    confirm: ''
                });
            });
        }
    };

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flexWrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 font-title">Edición de perfil</h1>
                        </div>
                        <form onSubmit={ submitUser }>
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
                                                placeholder="Nombre del usuario" 
                                                aria-label="Nombre usuario"
                                                onChange={ e => { setUser({ ...user, [e.target.name]: e.target.value }) } }
                                                value={ nombre }
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="documento" className="col-form-label">Documento</label>
                                            <input 
                                                type="text"
                                                id="documento" 
                                                name="documento" 
                                                className="form-control font-body" 
                                                placeholder="Documento del usuario" 
                                                aria-label="Documento usuario"
                                                onChange={ e => { setUser({ ...user, [e.target.name]: e.target.value }) } }
                                                value={ documento }
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="contrasenia" className="col-form-label">Contraseña</label>
                                            <input 
                                                type="password"
                                                id="contrasenia" 
                                                name="contrasenia" 
                                                className="form-control font-body"
                                                aria-label="Contraseña usuario"
                                                onChange={ e => { setUser({ ...user, [e.target.name]: e.target.value }) } }
                                                value={ contrasenia }
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="confirm" className="col-form-label">Confirmar contraseña</label>
                                            <input 
                                                type="password"
                                                id="confirm" 
                                                name="confirm" 
                                                className="form-control font-body"
                                                aria-label="Confirmación contraseña usuario"
                                                onChange={ e => { setUser({ ...user, [e.target.name]: e.target.value }) } }
                                                value={ confirm }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-grid d-md-flex justify-content-md-end">
                                    <button type="submit" className="btn btn-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-plus" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                                        Actualizar información
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
 
export default EditProfile;