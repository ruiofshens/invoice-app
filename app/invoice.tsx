import { StyleSheet, ScrollView } from "react-native";
import CurrentInvoice from "@/src/components/CurrentInvoice";
import AddItemButton from "@/src/components/AddItemButton";
import CopyToClipboardButton from "@/src/components/CopyToClipboardButton";

export default function InvoiceScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <CurrentInvoice />
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
