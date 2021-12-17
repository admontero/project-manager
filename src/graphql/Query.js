import { gql } from '@apollo/client';

export const AUTH_USER = gql`
    query($correo: String!, $contrasenia: String!) {
        authUser(correo: $correo, contrasenia: $contrasenia) {
            _id
            nombre
            documento
            tipo
            estadoUsuario
        }
    }
`;

export const GET_PROJECTS = gql`{
    getProjects {
        _id
        nombre
        oGenerales
        oEspecificos
        fInicio
        fTerminacion
        lider {
            documento
            nombre
            usuarioId
        }
        presupuesto
        estadoProyecto
        fase
        inscritos {
            _id
            nombre
            estadoInscrito
            fIngreso
            fEgreso
            usuarioId
        }
        avances {
            _id
            fecha
            descripcion
            observaciones
        }
    }
}
`;

export const GET_PROJECTS_BY_LEADER = gql`
    query Query($id: ID!) {
        getProjectsByLeader(_id: $id) {
            _id
            nombre
            oGenerales
            oEspecificos
            fInicio
            fTerminacion
            lider {
                documento
                nombre
                usuarioId
            }
            presupuesto
            estadoProyecto
            fase
            inscritos {
                _id
                nombre
                estadoInscrito
                fIngreso
                fEgreso
                usuarioId
            }
            avances {
                _id
                fecha
                descripcion
                observaciones
            }
        }
    }
`;

export const GET_INSCRIBED_BY_LEADER = gql`
    query Query($id: ID!) {
        getInscribedByLeader(_id: $id) {
            _id
            nombre
            estadoInscrito
            fIngreso
            fEgreso
            usuarioId
        }
    }
`;

export const GET_PROJECT_BY_ID = gql`
    query Query($id: ID!) {
        getProjectById(_id: $id) {
            _id
            nombre
            oGenerales
            oEspecificos
            fInicio
            fTerminacion
            lider {
                documento
                nombre
                usuarioId
            }
            presupuesto
            estadoProyecto
            fase
            inscritos {
                _id
                nombre
                estadoInscrito
                fIngreso
                fEgreso
                usuarioId
            }
            avances {
                _id
                fecha
                descripcion
                observaciones
            }
        }
    }
`;

export const GET_PROJECT_ADVANCES = gql`
    query Query($id: ID!) {
        getProjectAdvances(_id: $id) {
            _id
            fecha
            descripcion
            observaciones
        }
    }
`;

export const GET_USERS = gql`{
    getUsers {
        _id
        correo
        documento
        nombre
        contrasenia
        tipo
        estadoUsuario
    }
}
`;

export const GET_STUDENTS = gql`{
    getStudents {
        _id
        correo
        documento
        nombre
        contrasenia
        tipo
        estadoUsuario
    }
}
`;
