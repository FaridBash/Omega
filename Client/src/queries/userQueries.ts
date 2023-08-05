import {gql} from "@apollo/client";

const GET_ALL_USERS = gql`
    query getUsers {
    users{
        id
        name
        email
        phone
        role
       } 
    }
    `;

const GET_USERS_BY_ROLE = gql`
  query getUsersByRole($role: [String]) {
    usersByRole(role: $role) {
      id
      name
      email
      phone
      role
    }
  }
`;

export {GET_ALL_USERS, GET_USERS_BY_ROLE};