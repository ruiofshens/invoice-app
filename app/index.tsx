import { StyleSheet, ScrollView } from "react-native";
import Invoice from "@/src/components/Invoice";
import AddItemButton from "@/src/components/AddItemButton";
import CopyToClipboardButton from "@/src/components/CopyToClipboardButton";

export default function HomeScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Invoice />
      </ScrollView>
      <AddItemButton />
      <CopyToClipboardButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
