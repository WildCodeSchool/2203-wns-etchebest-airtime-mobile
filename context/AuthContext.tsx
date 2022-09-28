import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

//create a context provider
export const SignedInProvider = ({ children }: any) => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{ signedIn: signedIn, setSignedIn: setSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
