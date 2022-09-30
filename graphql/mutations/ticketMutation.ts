import { gql } from "@apollo/client";

export const DELETE_TICKET = gql`
  mutation DeleteTicket($deleteTicketId: Int!) {
    deleteTicket(id: $deleteTicketId) {
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
