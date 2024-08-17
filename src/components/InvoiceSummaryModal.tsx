import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Linking } from "react-native";
import { Text, Modal, Button } from "react-native-paper";
import { InvoiceList } from "../types/types";

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
    serializedArr.push(`Qty | Item`);
    serializedArr.push("------------");
    const previewArr: string[] = [];

    // Use monospace for quantity in front to ensure items behind start at same pos
    props.invoice.items.forEach((item) => {
      const numSpaces = item.quantity < 10 ? 2 : 1; // Additional space for single-digit numbers
      serializedArr.push(
        `\`\`\`${item.quantity}${" ".repeat(numSpaces)}\`\`\` ${item.name}`
      );
      previewArr.push(`${item.quantity}${" ".repeat(numSpaces)} ${item.name}`);
    });

    setSerializedMsg(serializedArr.join("\n"));
    setPreviewMsg(previewArr.join("\n"));
  }, [props.invoice]);

  const [serializedMsg, setSerializedMsg] = useState("");
  const [previewMsg, setPreviewMsg] = useState("");

  const sendToWhatsApp = async () => {
    const whatsappURL = `https://wa.me/${props.invoice.contactDetails}?text=${encodeURIComponent(serializedMsg)}`;
    const supported = await Linking.canOpenURL(whatsappURL);

    if (supported) {
      await Linking.openURL(whatsappURL);
    } else {
      console.log("Unable to open URL:", whatsappURL);
    }
  };

  return (
    <Modal
      visible={props.modalVisible}
      onDismiss={() => props.setModalVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <Text style={styles.header}>Message Summary</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.modalMessage}>{previewMsg}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => props.setModalVisible(false)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleUpdate}
            style={[styles.button, { marginLeft: 20 }]}
            labelStyle={styles.buttonText}
          >
            WhatsApp
          </Button>
        </View>
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
    height: height * 0.5,
    alignSelf: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputWrapper: {
    marginBottom: 30,
  },
  modalMessage: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "Courier",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    height: 50,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});
