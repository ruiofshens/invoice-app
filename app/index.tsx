import { StyleSheet, ScrollView } from "react-native";
import Invoice from "@/components/Invoice";
import AddItemButton from "@/components/AddItemButton";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

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
