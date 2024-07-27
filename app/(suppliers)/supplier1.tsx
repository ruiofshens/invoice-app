import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function HomeScreen2() {
  return (
    <View style={styles.container}>
      <Text>Hello Again!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
