import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String
    $description: String
    $photography: String
    $startTime: String
    $endTime: String
  ) {
    createProject(
      name: $name
      description: $description
      photography: $photography
      start_time: $startTime
      end_time: $endTime
    ) {
      id
      name
      description
      photography
      start_time
      end_time
    }
  }
`;
