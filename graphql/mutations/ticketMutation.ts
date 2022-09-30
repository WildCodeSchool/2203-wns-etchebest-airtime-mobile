import { gql } from "@apollo/client";

export const DELETE_TICKET = gql`
  mutation DeleteTicket($deleteTicketId: Int!) {
    deleteTicket(id: $deleteTicketId) {
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
