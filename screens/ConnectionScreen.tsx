import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "../components/Button/Button";
import { AuthContext } from "../context/AuthContext";
import { LOGIN } from "../graphql/mutations/userMutation";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { AuthContextType } from "../types/auth";

export const ConnectionScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMutation, setErrorMutation] = useState("");

  const { setSignedIn } = useContext(AuthContext) as AuthContextType;

  const [signIn, { data: dataSignIn, error: errorSignIn }] = useMutation(
    LOGIN,
    {
      onError: (): any => setErrorMutation(errorSignIn?.message || ""),
    }
  );

  const handleConnection = async () => {
    signIn({
      variables: { email: email, password: password },
    });
  };

  useEffect(() => {
    if (dataSignIn) {
      const storeData = async (value: string) => {
        try {
          const token = JSON.stringify(value);
          await AsyncStorage.setItem("token", token);
          setSignedIn(true);
          navigation.navigate("ProtectedRoutes");
        } catch (e) {
          setErrorMutation("La connexion a échoué");
        }
      };
      storeData(dataSignIn?.signIn?.token);
    }
  }, [dataSignIn]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFF" />
      {/* <View style={styles.container}>
        <Text style={styles.title}>AirTime</Text>
    </View> */}
    <Image source={require("../assets/logo-xl.png")} style={styles.image}/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button
        title="Connexion"
        variant="primary"
        onPress={handleConnection}
        disabled={email === "" || password === ""}
        style={styles.button}
      />
      <Button
        title="Annuler"
        variant="secondary"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#757575",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
    image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 16,
    opacity: 0.5,
    alignSelf: "center",
    },
});
