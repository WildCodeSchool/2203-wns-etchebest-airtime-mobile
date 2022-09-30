import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/logo-xl.png";
import { DashboardCard } from "../components/dashboardCard/DashboardCard";
import { GET_ALL_TICKETS } from "../graphql/queries/ticketQueries";
import { GET_USER_BY_ID } from "../graphql/queries/userQueries";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { ITicket } from "../types/ticket";

export const HomeScreen = () => {
  const { data: ticketsData, loading: loadingTicketsData } =
    useQuery(GET_ALL_TICKETS);

  const [userId, setUserId] = React.useState("");

  const getUserIdFromStorage = async () => {
    const userIdFromStorage = await AsyncStorage.getItem("userId");
    setUserId(userIdFromStorage as string);
  };

  useEffect(() => {
    getUserIdFromStorage();
  }, []);
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { getUserId: userId.substring(1, userId.length - 1) },
  });

  const dashboardData = [
    {
      status: "TO DO",
      backgroundColor: "rgba(243, 139, 160, 0.8)",
      icon: "newspaper-outline",
    },
    {
      status: "IN PROGRESS",
      backgroundColor: "rgba(255, 188, 188, 0.8)",
      icon: "reload-circle-outline",
    },
    {
      status: "REVIEWED",
      backgroundColor: "rgba(211, 228, 205, 0.8)",
      icon: "glasses-outline",
    },
    {
      status: "DONE",
      backgroundColor: "rgba(181, 234, 234, 0.8)",
      icon: "trophy-outline",
    },
  ];

  function filterNumberOfTickets(status: string) {
    const filteredTickets = ticketsData?.getAllTickets?.filter(
      (ticket: ITicket) => ticket.status === status.toLowerCase()
    );
    return filteredTickets?.length;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#F0F0F0" />
      <View style={styles.headerContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="cover" />
        <Text style={styles.header}>
          Bienvenue {userData?.getUser?.firstname + "," ?? ""}
        </Text>
      </View>
      <View style={styles.grid}>
        {dashboardData.map((data, index) => (
          <DashboardCard
            key={index}
            icon={data.icon}
            status={data.status}
            number={filterNumberOfTickets(data.status)}
            backgroundColor={data.backgroundColor}
            loading={loadingTicketsData}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    top: 50,
    left: 20,
  },
  headerContainer: {
    height: 150,
    position: "relative",
    width: "100%",
    marginBottom: 24,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    opacity: 0.2,
    width: "100%",
    height: "100%",
  },
});
