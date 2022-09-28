import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
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
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <Text>Se connecter</Text>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoFocus
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Button
          title="Se Connecter"
          variant="primary"
          onPress={handleConnection}
          disabled={email === "" || password === ""}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#FFF", flex: 1 },
});
