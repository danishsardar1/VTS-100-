
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Navigation from './Views/navigation/index';
const App = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const Auth = await  messaging().getToken();
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnn",Auth)
    setToken(Auth)
    status()

   }
   const status = () => {
    const userId = auth().currentUser.uid;

    const reference = database().ref(`${userId}`);

    // Set the /users/:userId value to true
    reference.set(true).then(() => console.log('Online presence set'));

    // Remove the node whenever the client disconnects
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));

      const onValueChange = database()
      .ref(`${userId}`)
      .on('value', snapshot => {
        // console.warn('User data: ', snapshot.val());
      });

      // console.warn('d;lskd;lsakjdlk',onValueChange)
   }
  useEffect( () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // const tokenFucntion = async () =>{{
      getToken()
      // alert(JSON.stringify(Auth))
      console.log(token)
    // }}
   messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('remoteMessage', remoteMessage )
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation></Navigation>
    </>
  );
};



export default App;
