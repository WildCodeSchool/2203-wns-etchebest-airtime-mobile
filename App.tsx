import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { ProtectedRoutesScreen } from "./navigation/ProtectedRouteScreen";
import { ProjectStackScreen, SignedInStackScreen } from "./navigation/StackScreens";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
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
