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
import { saveData } from './src/utils/Storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs(); // sirve para quitar los warnings


async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS !== 'web') {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const projectId = await AsyncStorage.getItem('projectId');
    token = (await Notifications.getExpoPushTokenAsync({ experienceId: `@${projectId}/your-app-slug` })).data;
    console.log(token);
    saveData('tokenNotification', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}




export default function App() {

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('projectId', 'your-expo-username-or-organization');
      registerForPushNotificationsAsync().then(token => console.log(token));
    })();
  }, []);

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
