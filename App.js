import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./src/components/account/LoginForm";
import { LogBox } from 'react-native'; // sirve para quitar los warnings
import Toast from "react-native-toast-message";//Para mostrar los mensajes de error en el formulario
import LoginScreen from "./src/screens/LoginScreen";
import MainStack from "./src/navigation/MainStack";

LogBox.ignoreAllLogs(); // sirve para quitar los warnings

export default function App() {
  return (
    <>
      <MainStack/>
    <Toast/> 
    </>
  );
}
