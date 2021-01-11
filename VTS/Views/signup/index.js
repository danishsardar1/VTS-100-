import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, ToastAndroid, TouchableOpacity,ActivityIndicator, PermissionsAndroid } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import AIcon from "react-native-vector-icons/AntDesign";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
import UserInput from '../../component/userInput/index';
import { Header } from '../../component/header/index';
import LinearGradient from 'react-native-linear-gradient'
import ImagePicker from 'react-native-image-picker';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage'

const SignUp = (props) => {
  const [avatarSource, setAvatarSource] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cnic, setCnic] = useState("");
  const [MobNo, setMobNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  var [SecureIcon , setSecureIcon] = useState('eye');
  var [secureEntry , setSecureEntry] = useState(true)

  //store Image in database

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      var imageRef = storage().ref('gs://vtsfinalyear-7dc55.appspot.com/gs:/vtsfinalyear-7dc55.appspot.com').child(avatarSource.fileName);
      console.log(avatarSource.fileName)
      // console.log("img",imageRef.putFile() )
      // imageRef.putFile("Parrent")
      imageRef.putFile(avatarSource.uri)
        .then((data) => {
          console.log(data)
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })

    });

  }

  // upload image from camra or Gallery

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(granted)
        ImagePicker.showImagePicker(response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
    
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            setAvatarSource(
              response,
            );
            // avatarSource.name = response.fileName;
            // avatarSource.size = response.fileSize;
    
    
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    
  }

  // creating user

  const createUser = async () => {
    console.log("text" + email + " " + password)

    if (avatarSource == "") {
      alert('Insert Image')
    }
    else if (name == '') {
      alert('Enter your Name')
    }
    else if (email == '') {
      alert('enter your Email')
    }
    else if (password == '') {
      alert('enter your password')
    }
    else if (Cnic == '') {
      alert("Enter your Cnic Number")
    }
    else if (MobNo == '') {
      alert("Enter you'r Mobile Number")
    }
   
    else {

    setIsLoading(true)
    const imageUrl = await uploadImage()
    console.log(imageUrl)
    auth().createUserWithEmailAndPassword(email, password).then(() => {
      console.log("theryrtrth")
      // const usersCollection = firestore().collection('Driver');
      firestore()
        //  console.log(usersCollection)
        .collection('Parrent')
        .add({
          name: name,
          email: email,
          imageUrl: imageUrl,
          uid: auth().currentUser.uid,
          Cnic: Cnic,
          MobNo: MobNo,

        })
        .then(response => {
          console.log(response);

          signIn();
          setIsLoading(false)
        })
        .catch(error => {
          alert(error.message);
          setIsLoading(false)

        })

      
    }).catch(error => {
      alert(error.message);
      setIsLoading(false)

    })
  }
  }


  const signIn = () => {
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



  return (<KeyboardAvoidingView style={{ flex: 1 , height : hp(100) }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
    {/* <ScrollView keyboardShouldPersistTaps="always"> */}

      <View style={{top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
        <View style={{ height: hp(100)}}>
        <LinearGradient colors={Colors.linearGradient1} style={{height: hp(15), width: wp(100) }}>
          <View style={{ height: hp(15) }}>
            <View style={{ height: hp(13), marginHorizontal: wp(5) }}>
              <Header color={Colors.white} iconColor={Colors.white} heading={'Sign up'} Icon={MIcon} size={Size(5)}></Header>
            </View>
          </View>
          </LinearGradient>
          <ScrollView>
          <View style={{ height: hp(90), width : wp(100) }}>
            
              <TouchableOpacity onPress={() => openCamera()}>
                {
                  avatarSource == '' ? (
                    <View style={{ height: 150, width: 150, borderRadius: 150 / 2,marginTop : 15, borderWidth: 5, borderColor: Colors.middleBlue, alignSelf: 'center', justifyContent : 'center', alignItems : 'center' }}>
                    <AIcon name='user' size={Size(8)} color={Colors.middleBlue}></AIcon>
                    </View>
                  ) : (
                    <View style={{ height: 150, width: 150, borderRadius: 150 / 2,marginTop : 15, borderWidth: 5, borderColor: Colors.middleBlue, alignSelf: 'center', justifyContent : 'center', alignItems : 'center' }}>
                      <Image source={{ uri: avatarSource.uri }} style={{ height: 150, width: 150, borderRadius: 150 / 2, }} />
                    </View>
                    
                    )
                }
              </TouchableOpacity>
              {/* <View style={{ height: hp(2) }} /> */}
              <View style={{ height: hp(85), width: wp(100), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(5) }}>
                {/* <ScrollView> */}
                  <View style={{ height: hp(5) }}>
                    <UserInput onChangeText={(val) => { setName(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Your name' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.name} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                  </View>
                  <View style={{ height: hp(2.8) }} />
                  <View style={{ height: hp(5) }}>
                    <UserInput onChangeText={(val) => { setEmail(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Email address' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.email} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                  </View>
                  <View style={{ height: hp(2.8) }} />
                  <View style={{ height: hp(5) }}>
                    <UserInput onPress={()=>onViewPassword()} onChangeText={(val) => { setPassword(val) }} secureTextEntry={secureEntry} textStyle={{ letterSpacing: 1.2, color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='***********' placeholderTextColor={Colors.lightBlack} image={true} imageName={Images.password} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Password'} iconRight={FEIcon} iconColorRight={Colors.lightGray} iconNameRight={SecureIcon} iconSizeRight={20}></UserInput>
                  </View>
                  <View style={{ height: hp(2.8) }} />

                  <View style={{ height: hp(5) }}>
                    <UserInput onChangeText={(val) => { setCnic(val) }} maxLength={13} keyboardType = {'phone-pad'} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='CNIC No.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.card} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                  </View>
                  <View style={{ height: hp(2.8) }} />
                  <View style={{ height: hp(5) }}>
                    <UserInput onChangeText={(val) => { setMobNo(val) }} maxLength = {11}  textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} keyboardType = {'phone-pad'} placeholder='Mob No.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.mob} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                  </View>
                  <View style={{ height: hp(2.8) }} />
                  
                  {!isLoading? (

                  <TouchableOpacity onPress={() => { createUser(), uploadImage() }} style={{ height: hp(7) }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Colors.linearGradient1} style={{ width: wp('90%'),height:hp(7), justifyContent: 'center', alignItems: 'center', borderRadius: wp('10%') }}>
                      <Text style={{ color: '#fff' }}>Let's go</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  ):(
                <ActivityIndicator size={25} color={'black'} />

                  )}
                  <View style={{ height: hp(4) }} />
                  <TouchableOpacity onPress={() => {props.navigation.navigate('login'); }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: Size(1.4), letterSpacing: .4, color: Colors.black }}> Already have an account ? <Text style={{ color: Colors.primary, letterSpacing: .4 }}>Sign In</Text> </Text></View>

            </TouchableOpacity>
                  {/* <View style={{ height: hp(2) }}></View>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('register') }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: Size(1.4), letterSpacing: .4 }}>Don't have an account? <Text style={{ color: Colors.primary, letterSpacing: .4 }}>Sign up here</Text></Text></View>
                  </TouchableOpacity> */}
                  {/* <View style={{ height: hp(5) }}></View>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('register') }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: Size(1.4), letterSpacing: .4 }}>By continuing you agree to our</Text></View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: Size(1.4), letterSpacing: .4, color: Colors.primary }}> Terms & Conditions <Text style={{ color: Colors.black, letterSpacing: .4 }}>and</Text> Privacy Policy</Text></View>
                  </TouchableOpacity> */}
                  {/* <View style = {{height: hp(20)}}/> */}
                {/* </ScrollView> */}
              </View>
          </View>
          <View style={{height : 400}} ></View>
        </ScrollView>
        </View>
      </View>
    {/* </ScrollView> */}
  </KeyboardAvoidingView>);
}

export { SignUp };