import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Snackbar } from "react-native-paper";

export default function CopyToClipboardButton() {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <FAB
        icon="clipboard-text-multiple"
        style={styles.fab}
        onPress={onToggleSnackBar}
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Got it",
          onPress: () => {
            // Do something
          },
        }}
      >
        Copied to clipboard!
      </Snackbar>
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
