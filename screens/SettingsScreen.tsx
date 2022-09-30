import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../components/Button/Button";
import { AuthContext } from "../context/AuthContext";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { AuthContextType } from "../types/auth";

export const SettingsScreen = ({ navigation }: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { setSignedIn } = useContext(AuthContext) as AuthContextType;
  //delete token storage
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      setSignedIn(false);
      navigation.navigate("NotProtectedRoutes");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <TouchableOpacity style={styles.settingsItemContainer}>
        <View style={styles.listContainer}>
          <Ionicons name="ios-settings" size={24} color="black" />
          <Text style={styles.listItem}>Paramètres</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItemContainer}>
        <View style={styles.listContainer}>
          <Ionicons name="eye" size={24} color="black" />
          <Text style={styles.listItem}>Apparence</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.settingsItemContainer}>
        <View style={styles.listContainer}>
          <Ionicons name="notifications" size={24} color="black" />
          <Text style={styles.listItem}>
            Notifications {isEnabled ? "activées" : "désactivées"}
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#757575", true: "#E0E0E0" }}
          thumbColor={isEnabled ? "#048B9A" : "#E0E0E0"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Button title="Se déconnecter" variant="primary" onPress={removeData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#000",
    marginHorizontal: -16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  settingsItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItem: {
    marginLeft: 8,
  },
});
