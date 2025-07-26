import {ActivityIndicator, StyleSheet, View} from "react-native";

const LoadingSpinner = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
        }}
      >
        <ActivityIndicator size="large" color="#B3B3B3" />
      </View>
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
