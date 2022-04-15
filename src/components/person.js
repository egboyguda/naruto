import React, { useContext, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text, ListItem, Button } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as ApiContext } from "../context/apiContext";

const Person = ({ name, _id }) => {
  const [show, setShow] = useState(false);
  const { deleteEvacuees } = useContext(ApiContext);
  return (
    <View style={{ margin: 2 }}>
      {show ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <ListItem.Swipeable
        rightContent={
          <Button
            title="Delete"
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
            onPress={async () => {
              setShow(true);
              await deleteEvacuees(_id);
              setShow(false);
            }}
          />
        }
      >
        <Icon name="person" type="ionicon" />

        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};
const style = StyleSheet.create({
  //activityIndicator style

  activityIndicatorStyle: {
    //absolute position
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Person;
