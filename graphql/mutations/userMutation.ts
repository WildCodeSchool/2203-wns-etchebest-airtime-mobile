import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstname
      lastname
      email
      password
      role
      token
    }
  }
`;
