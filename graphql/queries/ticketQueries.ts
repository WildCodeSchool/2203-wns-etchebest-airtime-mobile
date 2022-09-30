import { gql } from "@apollo/client";

export const GET_TICKET_BY_PROJECT_ID = gql`
  query GetAllTicketsForOneProject($projectId: Int) {
    getAllTicketsForOneProject(projectId: $projectId) {
      id
      title
      comment
      estimated_time
      spent_time_minutes
      status
      user_id
      project_id
    }
  }
`;
