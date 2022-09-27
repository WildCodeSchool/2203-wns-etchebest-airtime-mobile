import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { ProtectedRoutesScreen } from "./navigation/ProtectedRouteScreen";

const httpLink = createHttpLink({
  uri: "http://192.168.1.21:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem("token");
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
    <ProtectedRoutesScreen />
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
