import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#FFF", flex: 1 },
});
