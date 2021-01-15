import { gql } from 'apollo-boost';

const addUserMutation = gql`
  mutation($email: String!) {
    addUser(email: $email) {
      id
      email
    }
  }
`

const updateUserMutation = gql`
  mutation($id: String!, $email: String!) {
    updateUser(id: $id, email: $email) {
      id
      email
    }
  }
`

const deleteUserMutation = gql`
  mutation($id: String!){
    deleteUser(id: $id){
      id
      email
    }
  }
`

export {
  addUserMutation,
  updateUserMutation,
  deleteUserMutation,
};