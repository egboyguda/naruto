import React, { useCallback } from "react";
import { Linking, View, Text, Button, StyleSheet } from "react-native";

const OpenUrl = ({ url }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  });
  return (
    <View style={styles.container}>
      <Button title="PDF" onPress={handlePress} />
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    //90 percent width
    width: "90%",
    //center horizontally
    alignSelf: "center",
    //margin top
    marginTop: 5,
    //margin button
    //margin: 10,
    //background color
    backgroundColor: "#fff",
    //border radius
    borderRadius: 10,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default OpenUrl;
