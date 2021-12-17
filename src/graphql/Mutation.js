import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation($correo: String!, $documento: String!, $nombre: String!, $contrasenia: String!, $tipo: Tipo!) {
        createUser(correo: $correo, documento: $documento, nombre: $nombre, contrasenia: $contrasenia, tipo: $tipo) {
            nombre
        }
    }
`;

export const UPDATE_USER_STATE = gql`
    mutation Mutation($id: ID!, $estadoUsuario: EstadoUsuario!) {
        updateUserState(_id: $id, estadoUsuario: $estadoUsuario) {
            _id
            correo
            documento
            nombre
            tipo
            estadoUsuario
        }
    }
`;

export const UPDATE_PROJECT_STATE = gql`
    mutation Mutation($id: ID!, $estadoProyecto: EstadoProyecto!) {
        updateProjectState(_id: $id, estadoProyecto: $estadoProyecto) {
            nombre
            estadoProyecto
        }
    }
`;