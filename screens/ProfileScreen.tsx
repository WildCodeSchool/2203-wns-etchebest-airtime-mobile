import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button/Button";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";

export const ProfileScreen = ({ navigation }: any) => {
  //delete token storage
  const removeData = async () => {
    try {
      const token = await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <Text>Profile</Text>
        <Button title="Se déconnecter" variant="primary" onPress={removeData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#FFF", flex: 1 },
});
