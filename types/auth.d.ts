export type Auth = boolean ;

export type AuthContextType = {
  signedIn: Auth;
  setSignedIn: (signedIn: Auth) => void;
};
