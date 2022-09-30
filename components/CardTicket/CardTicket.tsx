import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardTicketProps {
  id: number;
  deleteTicket: (id: number) => void;
  ticketTitle: string;
  ticketDescription: string;
  ticketStatus: string;
}

export const CardTicket = ({
  deleteTicket,
  ticketTitle,
  ticketDescription,
  ticketStatus,
  id,
}: CardTicketProps) => {
  function statusColor(status: string) {
    if (status === "to do") {
      return "#F38BA0";
    } else if (status === "in progress") {
      return "#FFBCBC";
    } else if (status === "reviewed") {
      return "#D3E4CD";
    } else if (status === "done") {
      return "#B5EAEA";
    }
  }
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{ticketTitle}</Text>
        <Text style={{ color: statusColor(ticketStatus) }}>
          {ticketStatus.toUpperCase()}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text
          style={[
            styles.description,
            { backgroundColor: statusColor(ticketStatus) },
          ]}
        >
          {ticketDescription}
        </Text>
        <TouchableOpacity style={styles.trash} onPress={() => deleteTicket(id)}>
          <Ionicons name="trash-bin-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: "95%",
    maxHeight: 150,
    minHeight: 100,
    marginVertical: 8,
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardBody: {
    flexDirection: "row",
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
    overflow: "hidden",
    flex: 1,
    borderRadius: 10,
    padding: 4,
  },
  cardStatus: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#757575",
  },
  trash: {
    alignSelf: "flex-end",
    marginLeft: 8,
  },
});
