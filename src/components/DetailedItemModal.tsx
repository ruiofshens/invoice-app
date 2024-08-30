import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Modal, Button, TextInput } from "react-native-paper";
import { InvoiceItem } from "../types/types";
import CustomText from "@/src/components/CustomText";

type Props = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  item: InvoiceItem;
  handleUpdateItem: (item: InvoiceItem) => void;
};

export default function DetailedItemModal(props: Props) {
  const [pendingItem, setPendingItem] = useState<InvoiceItem>(props.item);

  useEffect(() => {
    setPendingItem(props.item);
  }, [props.item]);

  const handleUpdate = () => {
    props.handleUpdateItem(pendingItem);
    props.setModalVisible(false);
  };

  const handleQuantityChange = (field: string, value: string) => {
    setPendingItem((pendingItem) => ({
      ...pendingItem,
      [field]: Number(value),
    }));
  };

  return (
    <Modal
      visible={props.modalVisible}
      onDismiss={() => props.setModalVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <CustomText style={styles.header}>{props.item.name}</CustomText>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <CustomText style={styles.title}>Enter new quantity:</CustomText>
          <TextInput
            placeholder={props.item.quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) => handleQuantityChange("quantity", text)}
            style={styles.input}
            returnKeyType="done"
          />
        </View>

        <View style={styles.inputWrapper}>
          <CustomText style={styles.title}>Enter new price:</CustomText>
          <TextInput
            placeholder={props.item.price.toString()}
            keyboardType="numeric"
            onChangeText={(text) => handleQuantityChange("price", text)}
            style={styles.input}
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => props.setModalVisible(false)}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Close
        </Button>
        <Button
          mode="contained"
          onPress={handleUpdate}
          style={[styles.button, { marginLeft: 40 }]}
          labelStyle={styles.buttonText}
        >
          Update
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
    height: height * 0.7,
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
  input: {
    backgroundColor: "#f5f5f5",
    height: 50,
    fontSize: 18,
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
