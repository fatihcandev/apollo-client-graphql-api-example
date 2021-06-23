import { gql } from '@apollo/client'

export const USERS = gql`
  query {
    profiles {
      id
      name
      avatar
    }
  }
`
