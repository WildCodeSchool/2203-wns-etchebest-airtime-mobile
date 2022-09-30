import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface IDashboardProps {
  status: string;
  icon: any;
  number: string;
  backgroundColor: string;
  loading: boolean;
}

export const DashboardCard = ({
  status,
  icon,
  number,
  backgroundColor,
  loading
}: IDashboardProps) => {
  return (
    <View style={[styles.card, { backgroundColor: backgroundColor }]}>
      <Text style={styles.status}>{status}</Text>
      <Ionicons name={icon} size={35} color="white" />
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles.quantity}>{number}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  status:{
color: "white",
fontSize: 16,
fontWeight: "bold",
marginBottom: 8,
  },
  quantity: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
