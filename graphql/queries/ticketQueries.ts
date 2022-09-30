import { gql } from "@apollo/client";

export const GET_TICKET_BY_PROJECT_ID = gql`
  query GetAllTicketsForOneProject($projectId: Int) {
    getAllTicketsForOneProject(projectId: $projectId) {
      id
      title
      comment
      estimated_time_unix
      estimated_time_string
      creation_date
      update_date
      status
      user_id
      project_id
    }
  }
`;

export const GET_ALL_TICKETS = gql`
  query GetAllTickets {
    getAllTickets {
      id
      title
      comment
      estimated_time_unix
      estimated_time_string
      creation_date
      update_date
      status
      user_id
      project_id
    }
  }
`;