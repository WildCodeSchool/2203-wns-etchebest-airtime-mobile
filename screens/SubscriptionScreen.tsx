import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button/Button";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";

export const SubscriptionScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errorMutation, setErrorMutation] = useState("");
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <Text style={styles.title}>Bienvenue chez AirTime</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="#E2E2E2"
          onChangeText={setFirstname}
          value={firstname}
          autoFocus
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#E2E2E2"
          onChangeText={setLastname}
          value={lastname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E2E2E2"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#E2E2E2"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <Button
        title="Valider"
        variant="secondary"
        style={styles.button}
        onPress={() => {}}
      />
      <Text style={styles.mentions}>
        En cliquant sur valider j'accepte les conditions générales et la
        politique de confidentialité.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#000", flex: 1, padding: 16 },
  input: {
    height: 40,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FFF",
    textAlign: "center",
  },
  mentions: {
    color: "#E5E5E5",
    fontSize: 9,
    fontWeight: "400",
  },
});
