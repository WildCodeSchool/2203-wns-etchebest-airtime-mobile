import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../Button/Button";

interface ModalCreateProjectProps {
  onPress: () => void;
  name: string;
  description: string;
  image: string;
  endDate: Date;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: string) => void;
  setEndDate: (endDate: Date) => void;
  loading: boolean;
}

export const ModalCreateProject = ({
  onPress,
  name,
  description,
  image,
  endDate,
  setName,
  setDescription,
  setImage,
  setEndDate,
  loading,
}: ModalCreateProjectProps) => {
  const sourceDate = new Date();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.modalPicker} />
      <Text style={styles.modalTitle}>
        {loading ? "Création en cours..." : "Ajouter un nouveau projet"}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nom du projet"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description du projet"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Image du projet"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        {showDatePicker ? (
          <DateTimePicker
            value={!endDate ? sourceDate : endDate}
            style={{ zIndex: 10 }}
            display="default"
            onChange={(_event, selectedDate) => {
              const currentDate = selectedDate || sourceDate;
              setEndDate(currentDate);
              setShowDatePicker(false);
            }}
          />
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Date de fin"
          onPress={() => setShowDatePicker(true)}
          variant="secondary"
        />
        <Button
          title="Ajouter"
          onPress={onPress}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    alignSelf: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalPicker: {
    backgroundColor: "#E5E5E5",
    height: 4,
    width: 24,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#757575",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 80,
  },
});
