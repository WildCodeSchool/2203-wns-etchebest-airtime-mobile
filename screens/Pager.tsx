import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button/Button";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";

export const Pager = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View>
        <Text>Pager</Text>
        <View>
          <Button
            title="Inscription"
            onPress={() => {
              navigation.navigate("Subscription");
            }}
            variant="primary"
          />
          <Button
            title="Connexion"
            onPress={() => {
              navigation.navigate("Connection");
            }}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#FFF", flex: 1, padding: 16 },
});
