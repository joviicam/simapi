import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./src/components/account/LoginForm";
import { LogBox } from 'react-native'; // sirve para quitar los warnings
import Toast from "react-native-toast-message";//Para mostrar los mensajes de error en el formulario
import LoginScreen from "./src/screens/LoginScreen";
import MainStack from "./src/navigation/MainStack";
import SocketIOClient from 'react-native-socket.io-client';
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from 'react';

LogBox.ignoreAllLogs(); // sirve para quitar los warnings

export default function App() {
  //const webViewRef = useRef(null);

  const runFirst = `
    window.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (data.type === 'record_updated') {
        const listItem = document.createElement('li');
        listItem.textContent = data.message;
        document.getElementById('message-list').appendChild(listItem);
      }
    });
  `;

  useEffect(() => {
    const socket = io('http://192.168.1.83:3000');

    socket.on('connect', () => {
      console.log('Cliente conectado');
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });

    socket.on('record_updated', (message) => {
      console.log('Mensaje recibido:', message);
      //webViewRef.current.postMessage(JSON.stringify({ type: 'record_updated', message }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <MainStack />
      <Toast />
    </>
  );
}
