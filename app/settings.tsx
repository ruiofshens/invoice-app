import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, List, Snackbar, Text } from "react-native-paper";
import {
  populateAsyncStorage,
  clearAsyncStorage,
} from "@/scripts/populateSampleInvoices";

export default function SettingsScreen() {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <View style={styles.container}>
        <List.Section>
          <List.Subheader style={styles.subHeader}>
            Upcoming Features (WIP!)
          </List.Subheader>
          <List.Item
            title="Adding and Deleting Invoices"
            left={() => <List.Icon icon="timer-sand" />}
          />
          <List.Item
            title="Editing of Contact Information"
            left={() => <List.Icon icon="timer-sand" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={styles.subHeader}>Dev Features</List.Subheader>
          <Button
            mode="contained"
            icon="file-import"
            style={styles.button}
            onPress={() => {
              populateAsyncStorage();
              onToggleSnackBar();
            }}
          >
            Populate Invoices from Script
          </Button>
          <Button
            mode="contained"
            icon="file-remove"
            style={styles.button}
            onPress={() => {
              clearAsyncStorage();
              onToggleSnackBar();
            }}
          >
            Clear all Storage
          </Button>
        </List.Section>
        <View style={styles.footer}>
          <Text>v0.0.1 - Crafted by Chong Shen Rui</Text>
        </View>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Understood",
          onPress: () => {
            onToggleSnackBar();
          },
        }}
      >
        Action performed!
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "5%",
  },
  subHeader: {
    textDecorationLine: "underline",
  },
  button: {
    marginTop: "5%",
  },
  footer: {
    marginTop: "10%",
    paddingTop: "5%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
});
