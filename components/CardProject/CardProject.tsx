import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardProjectProps {
  onPress: () => void;
  projectTitle: string;
  projectDescription: string;
  projectImage?: string;
}

export const CardProject = ({
  onPress,
  projectImage,
  projectDescription,
  projectTitle,
}: CardProjectProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: projectImage }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{projectTitle}</Text>
        <Text style={styles.description}>{projectDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    shadowColor: "rgb(16, 24, 40)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
  },
  textContainer: {
    alignItems: "flex-start",
    padding: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 8,
  },
});
