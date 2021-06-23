import { gql } from '@apollo/client'

export const USER_DETAILS = gql`
  query GetUserDetails($id: Int!) {
    profiles_by_pk(id: $id) {
      id
      name
      avatar
      age
      occupation
    }
  }
`
