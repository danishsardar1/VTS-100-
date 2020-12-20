/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import messaging from '@react-native-firebase/messaging';

import Navigation from './Views/navigation/index';

const App: () => React$Node = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const Auth = await  messaging().getToken();
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnn",await messaging().requestPermission())
    setToken(Auth)
   }
   
  useEffect( () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // const tokenFucntion = async () =>{{
      getToken()
      // alert(JSON.stringify(Auth))
      // console.log(messaging().requestPermission())
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
      messaging().onMessage(data => {
        
        console.log("sdalhflkajhfksjaf hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",data)
      
       Alert.alert(
         data.notification.title,
         data.notification.body
       )
      })
      messaging().setBackgroundMessageHandler(async remoteMessage => {
       console.log(remoteMessage)
      });
      // return subscribe;
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
