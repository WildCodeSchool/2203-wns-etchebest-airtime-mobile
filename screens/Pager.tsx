import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button/Button";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";

export const Pager = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/logo-xl.png")}
            resizeMode="center"
          />
        </View>
        <Text style={styles.titleContainer}>
          Air<Text style={styles.title}>Time</Text>
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Inscription"
          onPress={() => {
            navigation.navigate("Subscription");
          }}
          variant="primary"
          style={styles.button}
        />
        <Button
          title="Connexion"
          onPress={() => {
            navigation.navigate("Connection");
          }}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  button: {
    marginTop: 16,
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#545454",
  },
  titleContainer: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "#048B9A",
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottomContainer: {
    marginBottom: 32,
  },
});
