import React, { useContext, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native';
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
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';


var arr = []
var arr2 = []
const SignUp = (props) => {

  const [avatarSource, setAvatarSource] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cnic, setCnic] = useState("");
  const [MobNo, setMobNo] = useState("");
  const [VechicleNo, setVechicleNo] = useState("")
  const [LicenseNo, setLicenseNo] = useState("")
  // const [SchoolCode, setSchoolCode] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  var [SecureIcon, setSecureIcon] = useState('eye');
  var [secureEntry, setSecureEntry] = useState(true)
  var [items, setItems] = useState([]);
  const [school, setSchool] = useState([])
  const [value, setValue] = useState(null);
  const [labelValue, setLabelValue] = useState('')

  let controller;

  useEffect(() => {
    getSchool()
  }, []);
  const getSchool = () => {
    setIsLoading(true)
    setItems([])
    firestore()
        .collection('Schools')
        .onSnapshot(async i => {
            setSchool([])
            i.forEach(j => {
                school.push(j.data())
            })
            console.log("SSSHelloo", school)

        })
    console.log("school2222222222222222222222222222222222222222222", school)

    setTimeout(() => {

        items = []
        
        arr = school.map(
            (data) => ({
                label: data.Name,
                value: data.SchoolCode,
            })
            // setIsLoading(false)
        );
        console.log("newArray", arr)
        setItems(arr)
         arr2 = arr.map(
            async (data) => {
                await items.push(data)
            }

        );
        
        //    setItems(arr)
        setIsLoading(false)
        console.log("newArray2", items)
        // Driver(value)
    }, 1000);

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
        console.warn('User data: ', snapshot.val());
      });

    // console.warn('d;lskd;lsakjdlk',onValueChange)
  }
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
          title: "Cool Photo App Camera Permission",
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
            setAvatarSource(
              response,
            );
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
    else if (VechicleNo == '') {
      alert("Enter You'r Vechicle Number")
    }
    else if (value == null) {
      alert("select the school")
    }
    else if (LicenseNo == '') {
      alert("Enter You'r License Number")
    }
    else {

      setIsLoading(true)
      const imageUrl = await uploadImage()
      const fcmToken = await messaging().getToken()
      console.log(imageUrl)
      auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log("theryrtrth")
        // const usersCollection = firestore().collection('Driver');
        firestore()
          .collection('Driver')
          .add({
            name: name,
            email: email,
            imageUrl: imageUrl,
            uid: auth().currentUser.uid,
            Cnic: Cnic,
            MobNo: MobNo,
            VechicleNo: VechicleNo,
            LicenseNo: LicenseNo,
            SchoolName: labelValue,
            SchoolCode: value,
            fcmToken: fcmToken
          })
          .then(response => {
            console.log(response);
            firestore()
              .collection('location')
              .add({
                uid: auth().currentUser.uid,
                location: ''
              })
            signIn();
            status();
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
          .collection('Driver')
          // Filter results
          .where("uid", "==", auth().currentUser.uid)
          .onSnapshot(i => {

            var product = ''
            i.forEach(j => {
              product = j.data()


            })
            if (product.uid == auth().currentUser.uid) {

              console.log(response)
              AsyncStorage.setItem('UUID', product.uid)
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

  if (isLoading == true) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={25} color={'black'} />
    </View>)
  }
  else {

    return (<KeyboardAvoidingView style={{ flex: 1, height: hp(100) }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
      {/* <ScrollView keyboardShouldPersistTaps="always"> */}

      <View style={{ top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
        <View style={{ height: hp(100) }}>
          <LinearGradient colors={Colors.linearGradient1} style={{ height: hp(15), width: wp(100) }}>
            <View style={{ height: hp(15) }}>
              <View style={{ height: hp(13), marginHorizontal: wp(5) }}>
                <Header color={Colors.white} iconColor={Colors.white} heading={'Sign up'} Icon={MIcon} size={Size(5)}></Header>
              </View>
            </View>
          </LinearGradient>
          <ScrollView>
            <View style={{ height: hp(90), width: wp(100) }}>

              <TouchableOpacity onPress={() => openCamera()}>
                {
                  avatarSource == '' ? (
                    <View style={{ height: 150, width: 150, borderRadius: 150 / 2, marginTop: 15, borderWidth: 5, borderColor: Colors.middleBlue, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      <AIcon name='user' size={Size(8)} color={Colors.middleBlue}></AIcon>
                    </View>
                  ) : (
                      <View style={{ height: 150, width: 150, borderRadius: 150 / 2, marginTop: 15, borderWidth: 5, borderColor: Colors.middleBlue, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: avatarSource.uri }} style={{ height: 150, width: 150, borderRadius: 150 / 2, }} />
                      </View>

                    )
                }
              </TouchableOpacity>
              <View style={{ height: hp(2) }} />
              <View style={{ height: hp(85), width: wp(100), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(5) }}>
                {/* <ScrollView> */}
                <View style={{ height: hp(5) }} />
                <View style={{ height: hp(5) }}>
                  <UserInput onChangeText={(val) => { setName(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Your name' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.name} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />
                <View style={{ height: hp(5) }}>
                  <UserInput onChangeText={(val) => { setEmail(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Email address' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.email} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />
                <View style={{ height: hp(5) }}>
                  <UserInput onPress={() => onViewPassword()} onChangeText={(val) => { setPassword(val) }} secureTextEntry={secureEntry} textStyle={{ letterSpacing: 1.2, color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='***********' placeholderTextColor={Colors.lightBlack} image={true} imageName={Images.password} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Password'} iconRight={FEIcon} iconColorRight={Colors.lightGray} iconNameRight={SecureIcon} iconSizeRight={20}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />


                <View style={{ height: hp(5) }}>
                  <UserInput onChangeText={(val) => { setCnic(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='CNIC No.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.card} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />
                <View style={{ height: hp(5) }}>
                  <UserInput onChangeText={(val) => { setMobNo(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Mob No.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.mob} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />
                <View style={{ height: hp(5) }}>
                  <UserInput onChangeText={(val) => { setVechicleNo(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Vechicle No.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.bus} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />
                <View style={{ height: hp(5) }}>
                  <UserInput onChangeText={(val) => { setLicenseNo(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='License No.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.card} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
                </View>
                <View style={{ height: hp(2.8) }} />
                <View style={{ height: hp(5) }}>
                  {/* <UserInput onChangeText={(val) => { setSchoolCode(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='School Code.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.code} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput> */}
                  <DropDownPicker
                    searchable={true}
                    searchablePlaceholder="Search for the School"
                    items={items}
                    controller={instance => controller = instance}
                    containerStyle={{ height: 40 }}
                    itemStyle={{
                      justifyContent: 'flex-start'
                    }}
                    // onChangeList={(items, callback) => {
                    //     // new Promise((resolve, reject) => resolve(setItems(items)))
                    //     //     .then(() => callback())
                    //     //     .catch(() => { });
                    // }}

                    defaultValue={value}
                    onChangeItem={item => { setValue(item.value), setLabelValue(item.label) }}
                  />
                </View>
                <View style={{ height: hp(4) }} />
                {!isLoading ? (

                  <TouchableOpacity onPress={() => { createUser(), uploadImage() }} style={{ height: hp(7) }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Colors.linearGradient1} style={{ width: wp('90%'), height: hp(7), justifyContent: 'center', alignItems: 'center', borderRadius: wp('10%') }}>
                      <Text style={{ color: '#fff' }}>Let's go</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                    <ActivityIndicator size={25} color={'black'} />

                  )}
                <View style={{ height: hp(4) }} />
                <TouchableOpacity onPress={() => { props.navigation.navigate('login'); }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: Size(1.4), letterSpacing: .4, color: Colors.black }}> Already have an account ? <Text style={{ color: Colors.primary, letterSpacing: .4 }}>Sign In</Text> </Text></View>

                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 400 }} ></View>
          </ScrollView>
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>);
  }
}

export { SignUp };