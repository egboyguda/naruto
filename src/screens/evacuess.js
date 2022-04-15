import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text, Input, Button, ActivityIndicator } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Person from "../components/person";
import { Context as ApiContext } from "../context/apiContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import OpenUrl from "../components/openUrl";

const Evacuees = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [onLoad, setLoad] = useState(false);
  const { _id } = route.params;
  const { getEvacuees, state } = useContext(ApiContext);
  //console.log(_id);
  useEffect(() => {
    const fetch = navigation.addListener("focus", async () => {
      // setDate(Date.now());
      await getEvacuees(_id);
      console.log("called");
      //console.log(state.evacuees);
    });

    return fetch;
  }, [navigation]);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    //console.log(currentDate.getTime());
    //setLoad(true);
    console.log(currentDate);
    getEvacuees(_id, currentDate);
    setLoad(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <SafeAreaView>
      {onLoad ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}

      <View style={{ height: 8 }}></View>
      <View>
        <Button
          style={styles.btn}
          onPress={showDatepicker}
          title="Select Date"
        />

        <OpenUrl
          url={`https://dfssd232.herokuapp.com/evac/test?date=${date}&_id=${_id}&isMili=${false}`}
        />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <FlatList
        data={state.evacuees}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <Person name={item.name} _id={item._id} />;
        }}
      />
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  //btn style
  btn: {
    //same style openUrl button
    backgroundColor: "#0066ff",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
});
export default Evacuees;
