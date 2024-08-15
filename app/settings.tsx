import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import {
  populateAsyncStorage,
  clearAsyncStorage,
} from "@/scripts/populateSampleInvoices";

export default function SettingsScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Button>Add New Invoice (WIP)</Button>
        <Button>Delete Existing Invoice (WIP)</Button>

        {/* Comment and uncomment lines below if you need to populate or clear storage */}
        <Button onPress={populateAsyncStorage}>
          dev: Click to populate default values!
        </Button>
        <Button onPress={clearAsyncStorage}>
          dev: Click to clear default values!
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
