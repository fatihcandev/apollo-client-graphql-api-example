import { gql } from '@apollo/client'

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    delete_profiles_by_pk(id: $id) {
      id
      name
      age
      occupation
    }
  }
`
