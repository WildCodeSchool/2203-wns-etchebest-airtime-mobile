import { useMutation, useQuery } from "@apollo/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Avatar1 from "../assets/avatar/147133.png";
import Avatar2 from "../assets/avatar/147140.png";
import Avatar3 from "../assets/avatar/147142.png";
import Avatar4 from "../assets/avatar/147144.png";
import { Button } from "../components/Button/Button";
import { RowProfile } from "../components/RowProfile/RowProfile";
import { UPDATE_USER } from "../graphql/mutations/userMutation";
import { GET_USER_BY_ID } from "../graphql/queries/userQueries";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { isAndroid } from "../utils/sizeHelper";

export const ProfileScreen = ({ navigation }: any) => {
  function randomAvatar() {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    return randomAvatar;
  }

  const [avatar, setAvatar] = React.useState(randomAvatar());
  const [modify, setModify] = React.useState(false);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [updateUser] = useMutation(UPDATE_USER);
  const {
    data: userData,
    loading: userDataLoading,
    refetch,
  } = useQuery(GET_USER_BY_ID, {
    variables: { getUserId: userId },
    onCompleted: () => {
      setFirstname(userData?.getUser?.firstname);
      setLastname(userData?.getUser?.lastname);
      setEmail(userData?.getUser?.email);
    },
  });

const getUserIdFromStorage = async () => {
    const userIdFromStorage = await AsyncStorage.getItem("userId");
    setUserId(userIdFromStorage as string);
  };

  useEffect(() => {
    getUserIdFromStorage();
    if (userId) refetch({ getUserId: userId });
  }, [userId]);

  const handleUpdate = async () => {
    updateUser({
      variables: {
        updateUserId: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
      },
    });
    setModify(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={25} color="#757575" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={avatar} resizeMode="center" style={styles.avatar} />
        </View>
        <RowProfile
          category="Nom"
          value={lastname}
          modify={modify}
          setValue={setLastname}
          onFocus={() => setLastname("")}
          loading={userDataLoading}
        />
        <RowProfile
          category="Prénom"
          value={firstname}
          modify={modify}
          setValue={setFirstname}
          onFocus={() => setFirstname("")}
          loading={userDataLoading}
        />
        <RowProfile
          category="Email"
          value={email}
          modify={modify}
          setValue={setEmail}
          onFocus={() => setEmail("")}
          loading={userDataLoading}
        />
      </View>
      {modify ? (
        <>
          <Button
            title="Enregistrer"
            variant="primary"
            onPress={handleUpdate}
            style={styles.largeButton}
          />
          <Button
            title="Annuler"
            variant="secondary"
            onPress={() => {
              setModify(false);
            }}
            style={styles.largeButton}
          />
        </>
      ) : null}
      <Button
        title={<Ionicons name="pencil-outline" size={25} color="#FFF" />}
        variant="primary"
        onPress={() => {
          setModify(true);
        }}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: isAndroid() ? 0 : 16,
    position: "relative",
  },
  header: {
    backgroundColor: "#000",
    marginHorizontal: -16,
    paddingTop: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 60,
  },
  largeButton: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    paddingBottom: 16,
  },
  avatar: { width: 100, height: 100 },
});
