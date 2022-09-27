import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { SignedInStackScreen, SignedOutStackScreen } from "./StackScreens";

export const ProtectedRoutesScreen = (): JSX.Element => {
  const [signedIn, setSignedIn] = React.useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("🚀 ~ token", token);
       token ? setSignedIn(true) : setSignedIn(false);
      } catch (e) {
        console.log(e);
      }
    };
getData()
  }, []);

  return signedIn ? <SignedInStackScreen /> : <SignedOutStackScreen />;
};
