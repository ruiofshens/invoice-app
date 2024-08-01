import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { useInvoice } from "../context/InvoiceContext";
import InvoiceSummaryModal from "./InvoiceSummaryModal";

export default function CopyToClipboardButton() {
  const { invoice } = useInvoice();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FAB
        icon="clipboard-text-multiple"
        style={styles.fab}
        onPress={() => {
          setModalVisible(true);
        }}
      />

      {/* Passing in invoice here because context seems to not work well for component in Portal */}
      <Portal>
        <InvoiceSummaryModal
          invoice={invoice}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: "5%",
    bottom: "5%",
  },
});
