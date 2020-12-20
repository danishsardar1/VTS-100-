import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
import UserInput from '../../component/userInput/index';
import { Header } from '../../component/header/index';
import LinearGradient from 'react-native-linear-gradient'
import Firebase from "@react-native-firebase/app"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var [isLoading, setIsLoading] = useState(false);
  var [SecureIcon , setSecureIcon] = useState('eye');
  var [secureEntry , setSecureEntry] = useState(true)

  const signIn = () => {

    if (email == '') {
      alert('Email cant be empty')
      return 0
    }

   else if (password == '') {
      alert('Password cant be empty')
      return 0
    }
    else{
    setIsLoading(true)
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        firestore()
          .collection('Parrent')
          // Filter results
          .where("uid", "==", auth().currentUser.uid)
          .onSnapshot(i => {

            var product = ''
            i.forEach(j => {
              product = j.data()


            })
            if (product.uid == auth().currentUser.uid) {

              console.log(response)
              AsyncStorage.setItem('UUID',product.uid)
              setIsLoading(false)
              props.navigation.replace('dashboard')
              console.log('User account created & signed in!');
            }
            else {
              ToastAndroid.show("Wrong Email or Password", ToastAndroid.LONG);
              setIsLoading(false)
            }

          })
      })
      .catch(error => {
        setIsLoading(false)
        if (error.code === 'auth/wrong-password') {
          alert('That email address or password is invalid!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address or password is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          alert('That email address or password is invalid!');
        }

        console.error(error);
      });
    }  

  }


 const onViewPassword = () => {
    if (secureEntry) {
      setSecureEntry(false);
      setSecureIcon('eye-off')
    }
    else {
      setSecureEntry(true)
      setSecureIcon('eye')
    }
  }




  return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={{ flex:1, top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
        <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(35), width: wp(100) }}></LinearGradient>
        <View style={{ flex: 1 }}>
          <View style={{ height: hp(13), marginHorizontal: wp(5) }}>
            <Header color={Colors.white} iconColor={Colors.white} heading={'Login'} Icon={MIcon} size={Size(5)}></Header>
          </View>

          <View style={{ height: hp(83), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(5) }}>
            <View style={{ height: hp(5) }} />
            <View style={{ height: hp(5) }}>
              <UserInput value={email} onChangeText={(val) => { setEmail(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Email address' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.email} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
            </View>
            <View style={{ height: hp(2.8) }} />
            <View style={{ height: hp(5) }}>
              <UserInput value={password} onPress={()=>onViewPassword()} onChangeText={(val) => { setPassword(val) }} secureTextEntry={secureEntry} textStyle={{ letterSpacing: 1.2, color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='***********' placeholderTextColor={Colors.lightBlack} image={true} imageName={Images.password} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Password'} iconRight={FEIcon} iconColorRight={Colors.lightGray} iconNameRight={SecureIcon} iconSizeRight={20}></UserInput>
            </View>
            <View style={{ height: hp(4) }} />
            {
              !isLoading ? 
          <TouchableOpacity onPress={() => {
              signIn()
              // props.navigation.navigate('dashboard')
            }} style={{ width: wp('90%'), justifyContent: 'center', alignItems: 'center', height: '8%', }}>

              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Colors.linearGradient1} style={{ height: '100%', width: '100%', borderRadius: wp('10%'), justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ color: '#fff' }}>Login</Text>

              </LinearGradient>
            </TouchableOpacity>
            :
            <ActivityIndicator size={25} color={'black'} />
            }
            

            <View style={{ height: hp(5) }}></View>
            {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('register') }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: Colors.primary, letterSpacing: .4 }}>Forgot Password</Text></View>
            </TouchableOpacity> */}
            <View style={{ height: hp(30)}}></View>
            <TouchableOpacity onPress={() => {props.navigation.replace('signup');setEmail('') , setPassword('') }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: Size(1.4), letterSpacing: .4, color: Colors.black }}> Dont have account ? <Text style={{ color: Colors.primary, letterSpacing: .4 }}>Sign Up</Text> </Text></View>

            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>);
}

export { Login };