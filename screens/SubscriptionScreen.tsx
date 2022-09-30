import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../components/Button/Button";
import { AuthContext } from "../context/AuthContext";
import { SIGNUP } from "../graphql/mutations/userMutation";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { AuthContextType } from "../types/auth";

export const SubscriptionScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errorMutation, setErrorMutation] = useState("");

  const [signUp, { data: dataSignUp, error: errorSignUp }] = useMutation(
    SIGNUP,
    {
      onError: (): any => setErrorMutation(errorSignUp?.message || ""),
    }
  );

  const { setSignedIn } = useContext(AuthContext) as AuthContextType;

  const handleRegister = async () =>
    signUp({
      variables: {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      },
    });

  useEffect(() => {
    if (dataSignUp) {
      const storeData = async (tokenBdd: string, id: string) => {
        try {
          await AsyncStorage.setItem("token", tokenBdd);
          await AsyncStorage.setItem("userId", id);
          setSignedIn(true);
          navigation.navigate("ProtectedRoutes");
        } catch (e) {
          setErrorMutation("La connexion a échoué");
        }
      };
      storeData(dataSignUp?.signUp?.token, dataSignUp?.signUp?.id);
    }
  }, [dataSignUp]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <Text style={styles.title}>Bienvenue chez AirTime</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="#545454"
          onChangeText={setFirstname}
          value={firstname}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#545454"
          onChangeText={setLastname}
          value={lastname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#545454"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#545454"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <Button
        title="Valider"
        variant="secondary"
        style={styles.button}
        onPress={handleRegister}
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
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    color: "#FFF",
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
