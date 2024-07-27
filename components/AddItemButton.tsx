import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export default function AddItemButton() {
  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => console.log("Pressed")}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    left: "5%",
    bottom: "5%",
  },
});
