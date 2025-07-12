import {NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
