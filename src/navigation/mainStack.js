import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import ListScreen from "../screens/listSceens";
import accountScreen from "../screens/account";
import MapForm from "../screens/mapForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormSubmit from "../screens/fillupForm";
import DetailScreen from "../screens/details";
import Evacuees from "../screens/evacuess";
import { Context as AuthContext } from "../context/authContext";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const DrawerStack = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName="List"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {/**log out button*/}
            <DrawerItem
              label="Logout"
              onPress={async () => {
                logout();
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="List" component={ListScreen} />
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerStack} />
      <Stack.Screen name="Map" component={MapForm} />
      <Stack.Screen name="FillUp" component={FormSubmit} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Evacuees" component={Evacuees} />
    </Stack.Navigator>
  );
};
export default MainStack;
