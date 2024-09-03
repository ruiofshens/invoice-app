import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Linking } from "react-native";
import { Modal, Button } from "react-native-paper";
import { InvoiceList } from "../types/types";

import CustomText from "./CustomText";

type Props = {
  invoice: InvoiceList;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export default function InvoiceSummaryModal(props: Props) {
  const handleUpdate = () => {
    props.setModalVisible(false);
    sendToWhatsApp();
  };

  useEffect(() => {
    // Table header and divider
    const serializedArr = [];
    serializedArr.push(props.invoice.additionalDetails + "\n");
    serializedArr.push(`Qty | Item`);
    serializedArr.push("------------");
    const previewArr: string[] = [];
    previewArr.push(props.invoice.additionalDetails + "\n");

    // Use monospace for quantity in front to ensure items behind start at same pos
    props.invoice.items.forEach((item) => {
      // Skip past items with 0 quantity
      if (item.quantity > 0) {
        const numSpaces = item.quantity < 10 ? 2 : 1; // Additional space for single-digit numbers
        serializedArr.push(
          `\`\`\`${item.quantity}${" ".repeat(numSpaces)}\`\`\` ${item.name}`
        );
        previewArr.push(
          `${item.quantity}${" ".repeat(numSpaces - 1)} ${item.name}`
        );
      }
    });

    setSerializedMsg(serializedArr.join("\n"));
    setPreviewMsg(previewArr.join("\n"));
  }, [props.invoice]);

  const [serializedMsg, setSerializedMsg] = useState("");
  const [previewMsg, setPreviewMsg] = useState("");

  const sendToWhatsApp = async () => {
    const whatsappURL = `https://wa.me/${props.invoice.contactDetails}?text=${encodeURIComponent(serializedMsg)}`;

    await Linking.openURL(whatsappURL);
  };

  return (
    <Modal
      visible={props.modalVisible}
      onDismiss={() => props.setModalVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <CustomText style={styles.header}>Message Summary</CustomText>

      <View style={styles.modalContent}>
        <CustomText style={styles.modalMessage}>{previewMsg}</CustomText>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => props.setModalVisible(false)}
          style={styles.button}
          labelStyle={styles.buttonText}
          maxFontSizeMultiplier={1}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleUpdate}
          style={[styles.button, { marginLeft: "3%" }]}
          labelStyle={styles.buttonText}
          maxFontSizeMultiplier={1}
        >
          Whatsapp
        </Button>
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: "white",
    margin: 0, // Remove default margin to utilize maximum space
    borderRadius: 8,
    width: width * 0.9,
    height: height * 0.85,
    alignSelf: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10%",
  },
  modalContent: {
    flex: 1,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "CourierPrime_400Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
  },
});
