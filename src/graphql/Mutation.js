import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation($correo: String!, $documento: String!, $nombre: String!, $contrasenia: String!, $tipo: Tipo!) {
        createUser(correo: $correo, documento: $documento, nombre: $nombre, contrasenia: $contrasenia, tipo: $tipo) {
            nombre
        }
    }
`;