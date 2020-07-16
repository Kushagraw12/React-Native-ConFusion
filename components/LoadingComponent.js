import React from "react";
import {
  ActivityInidcator,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

const styles = StyleSheet.create({
  loadingview: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#512DA8",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export const Loading = () => {
  return (
    <View style={styles.loadingview}>
      <ActivityIndicator size="large" color="#512DA8" />
      <Text style={styles.loadingText}>Loading . . . . </Text>
    </View>
  );
};
