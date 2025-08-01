import React, { useEffect } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import store from "./redux/store";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
// import * as SystemUI from 'expo-system-ui'; // 추가

export default function App() {
  // useEffect(() => {
  //   console.log('Navigation bar color set');
  //   SystemUI.setBackgroundColorAsync('#6d6d6dff'); // 원하는 색상으로 변경
  // }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <ActionSheetProvider>        
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </ActionSheetProvider>
          {/* <Toast/>    */}
        </RootSiblingParent>         
      </SafeAreaProvider>
    </Provider>
  );
}
