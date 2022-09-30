import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      id
      name
      description
      photography
      start_time
      end_time
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
query GetAllTicketsForOneProject($projectId: Int) {
  getProjectById(projectId: $projectId) {
    id
    name
    description
    photography
    start_time
    end_time
  }
}
`;