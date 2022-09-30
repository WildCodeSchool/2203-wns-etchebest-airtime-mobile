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
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: projectImage }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{projectTitle}</Text>
          <Text style={styles.description}>{projectDescription}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    marginVertical: 8,
    borderRadius: 8,
    padding: 8,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
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
