import { gql } from 'apollo-boost';

const queryEveryUser = gql`
  {
    everyUser {
      id
      email
    }
  }
`

const queryUserById = gql`
  query($id: String!) {
    user(id: $id) {
      id
      email
    }
  }
`

export { queryEveryUser, queryUserById };