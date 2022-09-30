import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { SignedInProvider } from "./context/AuthContext";
import { GlobalStackScreen } from "./navigation/StackScreens";

const httpLink = createHttpLink({
  uri: "http://192.168.1.21:4000/graphql",
  //uri: "https://staging.etchebest-2-04-22.wilders.dev/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const MyApp = () => {
  return (
    <SignedInProvider>
      <GlobalStackScreen />
    </SignedInProvider>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyApp />
      </NavigationContainer>
    </ApolloProvider>
  );
}
