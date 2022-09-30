import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { CardTicket } from "../components/CardTicket/CardTicket";
import { DELETE_TICKET } from "../graphql/mutations/ticketMutation";
import { GET_PROJECT_BY_ID } from "../graphql/queries/projectQueries";
import { GET_TICKET_BY_PROJECT_ID } from "../graphql/queries/ticketQueries";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";

export const ProjectDetails = ({ route }: any) => {
  const { project } = route.params;

  const { data, loading } = useQuery(GET_TICKET_BY_PROJECT_ID, {
    variables: { projectId: project },
  });
  const { data: projectData, loading: projectLoading } = useQuery(
    GET_PROJECT_BY_ID,
    {
      variables: { projectId: project },
    }
  );

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    refetchQueries: [GET_TICKET_BY_PROJECT_ID],
  });
  const handleDelete = (id: number) =>
    deleteTicket({
      variables: {
        deleteTicketId: id,
      },
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView>
        <Text style={styles.title}>{projectData?.getProjectById?.name}</Text>
        {data?.getAllTicketsForOneProject?.map((ticket: any) => (
          <CardTicket
            id={ticket.id}
            key={ticket.id}
            ticketTitle={ticket?.title}
            ticketDescription={ticket?.comment}
            ticketStatus={ticket?.status}
            deleteTicket={handleDelete}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
