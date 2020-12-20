import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View, Text, ActivityIndicator, Image, ImageBackground, ScrollView } from 'react-native';
import { Colors, hp, wp, Images, Size } from '../../assets/index';
import { Button } from '../../component/button/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AIcon from "react-native-vector-icons/AntDesign";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import AsyncStorage from '@react-native-community/async-storage'
import Swiper from 'react-native-swiper'
import { Page1 } from './page1/index'
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const InitialScreen = (props) => {
const [docID, setDocID] = useState()
    useEffect(()=>{
       fetchData()
    },[])
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
    const fetchData = async () => {
        const UUID = await AsyncStorage.getItem('UUID');
        const fcmToken = await messaging().getToken()
        console.log(UUID)
        if (UUID) {
            firestore()
            .collection('Driver')
            .where('uid','==',UUID)
            .onSnapshot(i => {
                var docs = ""
                i.forEach(j => {
                    docs = j.id
                })
                setDocID(docs)
            })
            if(docID){
                firestore()
                .collection('driver')
                .doc(docId)
                .update({
                    fcmToken : fcmToken
                })
            }else{
                console.log("something went wrong")
            }
            props.navigation.replace("dashboard")
            status()
        }
        else {
            console.log("Login Please")
        }
        }
    return (<View style={{ height: hp('100%') }}>
        <View style={{ flex: 1 }}>
            <View style={{ flex: .14, justifyContent: 'center', alignItems: 'center' }}>

            </View>
            <View style={{ flex: .48, justifyContent: 'center', alignItems: 'center' }}>
                <Swiper activeDot={<View style={{ backgroundColor: '#fff', borderWidth: 1.3, borderColor: '#640ADD', width: 12, height: 12, borderRadius: 12 / 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ backgroundColor: '#640ADD', width: 6, height: 6, borderRadius: 6 / 2 }}></View>
                </View>}
                    dot={<View style={{ backgroundColor: '#fff', borderWidth: 1.3, borderColor: 'rgba(0,0,0,0.3)', width: 12, height: 12, borderRadius: 12 / 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, justifyContent: 'center', alignItems: 'center' }} >
                    </View>}
                    showsButtons={false} loop={false} >
                    <View style={{ flex: 1 }}>
                        <Page1></Page1>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Page1></Page1>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Page1></Page1>
                    </View>
                </Swiper>
            </View>

            {/* <View style={{flex : .02}}></View> */}
            {/* <View style={{ flex: .07, justifyContent: "center", alignItems: 'center' }}>
                <Button fontWeight={'bold'} onPress={() => { }} borderWidth={0.5} backgroundColor={Colors.mail} Icon={FontistoIcon} IconName={'facebook'} IconColor={Colors.facebookColor} width={wp('77%')} size={wp('5%')} IconLeftMargin={wp('3%')} borderRadius={wp('10%')} text={'Facebook'} textColor={Colors.facebookColor} borderColor={Colors.facebookColor} fontSize={Size(1.8)} ></Button>
            </View> */}
            <View style={{ flex: .01 }}></View>
            {/* <View style={{ flex: .07, justifyContent: "center", alignItems: 'center' }}> */}
                {/* {this.state.facebookLoader == false ? */}
                {/* <Button fontWeight={'bold'} borderColor={Colors.twitterColor} Icon={FontistoIcon} borderWidth={0.5} IconName={'twitter'} IconColor={Colors.twitterColor} width={wp('77%')} size={wp('5%')} IconLeftMargin={wp('3%')} borderRadius={wp('10%')} text={'Twitter'} textColor={Colors.twitterColor} fontSize={Size(1.8)} ></Button> */}
                {/* :
                          <ActivityIndicator size="large" color={'#fff'} style={{backgroundColor : 'transparent'}} />
                        } */}
            {/* </View> */}
            <View style={{ flex: .01 }}></View>

            <View style={{ flex: .035 }}></View>
            <View style={{ flex: .07, flexDirection: 'row' }}>
                <View style={{ flex: .1 }}></View>
                <View style={{ flex: .38 }}>
                    <Button onPress={() => { props.navigation.replace('signup') }} backgroundColor={Colors.primary} borderColor={Colors.instagramColor} borderWidth={0.2} size={wp('5%')} IconLeftMargin={wp('3%')} borderRadius={wp('10%')} text={'Sign Up'} textColor={Colors.white} fontSize={Size(1.8)} ></Button>
                </View>
                <View style={{ flex: .02 }}></View>
                <View style={{ flex: .38 }}>
                    <Button onPress={() => { props.navigation.replace('login') }} backgroundColor={Colors.white} borderWidth={0.2} size={wp('5%')} IconLeftMargin={wp('3%')} borderRadius={wp('10%')} text={'Sign In'} textColor={Colors.black} fontSize={Size(1.8)} ></Button>

                </View>
                <View style={{ flex: .1 }}></View>

            </View>
            <View style={{ flex: .015 }}></View>


        </View>
    </View>
    );

}

export { InitialScreen };