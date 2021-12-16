import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    query($correo: String!, $contrasenia: String!) {
        authUser(correo: $correo, contrasenia: $contrasenia) {
            nombre
            tipo
            estadoUsuario
        }
    }
`;