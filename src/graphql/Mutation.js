import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation($correo: String!, $documento: String!, $nombre: String!, $contrasenia: String!, $tipo: Tipo!) {
        createUser(correo: $correo, documento: $documento, nombre: $nombre, contrasenia: $contrasenia, tipo: $tipo) {
            nombre
        }
    }
`;

export const UPDATE_USER = gql`
    mutation Mutation($id: ID!, $documento: String, $nombre: String, $contrasenia: String) {
        updateUser(_id: $id, documento: $documento, nombre: $nombre, contrasenia: $contrasenia) {
            _id
            documento
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

export const APPROVE_PROJECT = gql`
    mutation Mutation($id: ID!) {
        approveProject(_id: $id) {
            nombre
            estadoProyecto
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

export const UPDATE_PROJECT_PHASE = gql`
    mutation Mutation($id: ID!, $fase: Fase!) {
        updateProjectPhase(_id: $id, fase: $fase) {
            nombre
            fase
        }
    }
`;

export const AUTHORIZE_STUDENT = gql`
    mutation Mutation($id: ID!) {
        authorizeStudent(_id: $id) {
            nombre
            estadoUsuario
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation Mutation($nombre: String!, $oGenerales: String!, $oEspecificos: String!, $lider: LiderInput!, $presupuesto: Int!) {
        createProject(nombre: $nombre, oGenerales: $oGenerales, oEspecificos: $oEspecificos, lider: $lider, presupuesto: $presupuesto) {
            nombre
            oGenerales
            oEspecificos
            lider {
                documento
                nombre
                usuarioId
            }
            presupuesto
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation Mutation($id: ID!, $nombre: String, $oGenerales: String, $oEspecificos: String, $presupuesto: Int) {
        updateProject(_id: $id, nombre: $nombre, oGenerales: $oGenerales, oEspecificos: $oEspecificos, presupuesto: $presupuesto) {
            nombre
            oGenerales
            oEspecificos
            presupuesto
        }
    }
`;

export const UPDATE_SIGNED_STATE = gql`
    mutation Mutation($projectId: ID!, $inscribedId: ID!, $estadoInscrito: EstadoInscrito!) {
        updateSignedState(projectId: $projectId, inscribedId: $inscribedId, estadoInscrito: $estadoInscrito) {
            nombre
            inscritos {
                _id
                nombre
                estadoInscrito
                fIngreso
                fEgreso
                usuarioId
            }
        }
    }
`;

export const UPDATE_ADVANCE_REMARK = gql`
    mutation Mutation($id: ID!, $advanceId: ID!, $remark: String!) {
        updateAdvanceRemark(_id: $id, advanceId: $advanceId, remark: $remark) {
            avances {
                _id
                fecha
                descripcion
                observaciones
            }
        }
    }
`;

export const CREATE_INSCRIPTION = gql`
    mutation Mutation($projectId: ID!, $nombre: String!, $usuarioId: ID!) {
        createInscription(projectId: $projectId, nombre: $nombre, usuarioId: $usuarioId) {
            nombre
            inscritos {
                _id
                nombre
                estadoInscrito
                fIngreso
                fEgreso
                usuarioId
            }
        }
    }
`;

export const CREATE_ADVANCE = gql`
    mutation Mutation($projectId: ID!, $fecha: Date, $descripcion: String) {
        createAdvance(projectId: $projectId, fecha: $fecha, descripcion: $descripcion) {
            nombre
            avances {
                _id
                fecha
                descripcion
                observaciones
            }
        }
    }
`;

export const UPDATE_ADVANCE_DESCRIPTION = gql`
    mutation Mutation($id: ID!, $advanceId: ID!, $descripcion: String!) {
        updateAdvanceDescription(_id: $id, advanceId: $advanceId, descripcion: $descripcion) {
            nombre
            avances {
                _id
                fecha
                descripcion
                observaciones
            }
        }
    }
`;