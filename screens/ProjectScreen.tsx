import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../components/Button/Button";
import { CardProject } from "../components/CardProject/CardProject";
import { ModalBottom } from "../components/ModalBottom/ModalBottom";
import { ModalCreateProject } from "../components/ModalCreateProject/ModalCreateProject";
import { CREATE_PROJECT } from "../graphql/mutations/projectMutation";
import { GET_ALL_PROJECTS } from "../graphql/queries/projectQueries";
import { FocusAwareStatusBar } from "../navigation/FocusStatusBar";
import { IProject } from "../types/project";

export const ProjectScreen = ({navigation}: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectEndDate, setProjectEndDate] = useState(new Date());

  const {
    data: projects,
    loading: loadingProjects,
    error: errorProjects,
  } = useQuery(GET_ALL_PROJECTS);

  const [
    createProject,
    { loading: newProjectLoading, error: newProjectError },
  ] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_ALL_PROJECTS],
  });

  const handleNewProject = () => {
    createProject({
      variables: {
        name: projectName,
        description: projectDescription,
        photography: projectImage,
        startTime: "2022-01-01",
        endTime: projectEndDate.toISOString().split("T")[0],
      },
    });
    !newProjectLoading && setModalVisible(false);
    setProjectName("");
    setProjectDescription("");
    setProjectImage("");
    setProjectEndDate(new Date());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.title}>
          {projects?.getAllProjects?.length == 0
            ? "Pas de projet"
            : projects?.getAllProjects?.length > 1
            ? "Projets"
            : "Projet"}{" "}
          en cours
        </Text>
      </View>
      <ScrollView>
        {loadingProjects ? (
          <View style={styles.loader}>
            <ActivityIndicator size={35} color="black" />
          </View>
        ) : (
          projects?.getAllProjects?.map((project: IProject) => (
            <CardProject
              key={project.id}
              projectTitle={project.name}
              projectDescription={project.description}
              projectImage={project.photography}
              onPress={() => navigation.navigate("ProjectDetails", { project: project.id })}
            />
          ))
        )}
        {errorProjects ? (
          <Text style={styles.error}>Une erreur s'est produite</Text>
        ) : null}
      </ScrollView>
      <Button
        title="+"
        variant="primary"
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.button}
      />
      <ModalBottom
        isModalVisible={isModalVisible}
        setModalIsVisible={setModalVisible}
        height={"70%"}
      >
        <ModalCreateProject
          name={projectName}
          description={projectDescription}
          image={projectImage}
          endDate={projectEndDate}
          onPress={handleNewProject}
          setName={setProjectName}
          setDescription={setProjectDescription}
          setImage={setProjectImage}
          setEndDate={setProjectEndDate}
          loading={newProjectLoading}
        />
      </ModalBottom>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 16,
    position: "relative",
  },
  error: { color: "red", fontSize: 18, textAlign: "center" },
  loader: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 60,
  },
  header: {
    backgroundColor: "#000",
    marginHorizontal: -16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
});
