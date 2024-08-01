import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View, Dimensions, Linking } from "react-native";
import { Text, Modal, Button } from "react-native-paper";
import { InvoiceList } from "../types/types";

type Props = {
  invoice: InvoiceList;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export default function InvoiceSummaryModal(props: Props) {
  const [serializedMsg, setSerializedMsg] = useState(
    props.invoice.items
      .map((item) => `${item.name}: ${item.quantity}`)
      .join("\n")
  );

  const handleUpdate = () => {
    props.setModalVisible(false);
    sendToWhatsApp();
  };

  const sendToWhatsApp = async () => {
    const phoneNumber = "98765432";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(serializedMsg)}`;
    const supported = await Linking.canOpenURL(whatsappURL);
    console.log(whatsappURL);

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
      <Text style={styles.header}>Summary</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.title}>{serializedMsg}</Text>
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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
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
