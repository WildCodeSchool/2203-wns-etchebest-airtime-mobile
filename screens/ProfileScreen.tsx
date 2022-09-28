import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button/Button";
import { AuthContext } from "../context/AuthContext";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { AuthContextType } from "../types/auth";

export const ProfileScreen = ({ navigation }: any) => {
  const { setSignedIn } = useContext(AuthContext) as AuthContextType;
  //delete token storage
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setSignedIn(false);
      navigation.navigate("NotProtectedRoutes");
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
