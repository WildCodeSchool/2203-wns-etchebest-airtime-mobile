import { Dispatch, SetStateAction } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface RowProfileProps {
  category: string;
  value: string;
  modify?: boolean;
  loading?: boolean;
  setValue?: Dispatch<SetStateAction<string>>;
  onFocus?: () => void;
}

export const RowProfile = ({
  category,
  value,
  modify,
  loading,
  setValue,
  onFocus,
}: RowProfileProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.value}>
          {loading ? <ActivityIndicator /> : value}
        </Text>
      </View>
      {modify ? (
        <TextInput
          placeholder={category}
          value={value}
          onChangeText={setValue}
          onFocus={onFocus}
          style={styles.input}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  category: {
    fontSize: 16,
    color: "#545454",
  },
  value: {
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    paddingVertical: 8,
  },
});
