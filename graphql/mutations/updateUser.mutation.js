import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $values: profiles_set_input) {
    update_profiles_by_pk(pk_columns: { id: $id }, _set: $values) {
      id
      name
      age
      occupation
    }
  }
`
