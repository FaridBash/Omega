import {gql} from "@apollo/client";

const Delete_User = gql`
    mutation deleteUser($id: String!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

const Update_User = gql`
    mutation updateUser($id: ID!, $name: String!, $email: String!, $phone: String!) {
        updateUser(id: $id, name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;

export {Delete_User, Update_User};