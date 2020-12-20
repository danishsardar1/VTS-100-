import React, { useContext, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import LeftArrow from "react-native-vector-icons/FontAwesome5";
import OIcon from "react-native-vector-icons/Octicons";
import UserInput from '../../component/userInput/index';
import { Header } from '../../component/header/index';
import LinearGradient from 'react-native-linear-gradient';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { serviceFile } from '../../react-native-firbase-4b74e-firebase-adminsdk-vxehx-d8612a4dbc';

const ProfileDetail = (props) => {
    const [userData, setuserData] = useState(props.route.params.item);
    const [UserInfo, setUserInfo] = useState({})
    const [location, setLocation] = useState(props.route.params.location)
    const [request, setRequest] = useState(props.route.params.request)
    const [remove, setRemove] = useState(props.route.params.remove)
    const [documentid, setDocumentId] = useState('')
    const [notificationData, setNotificationData] = useState({

        "to": userData.fcmToken,
        "notification": {
            "title": "Breaking News",
            "body": "New news story available."
        },
        "data": {
            "story_id": "story_12345"
        }
    })

  
    const Notification = async () => {
        console.log(userData.fcmToken)
        axios({
            method: 'post',
            url: "https://fcm.googleapis.com/fcm/send",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=AAAAX2ddpTA:APA91bGqV_vvZ7c8_RenR-CkpfJ6ORR_DioNOGLQ_VqhPhv0jEf3C5CBXVQturU6wmLu_PQVln_ABjWebL-IUUVN1-GjGnoGcxIWT7vZIxfB2CKOxePlGMKg_TySpByX-o5sjold28KZ",
            },
            data: {
                to: userData.fcmToken,
                notification: {
                    title: "Driver",
                    body: "You have been added to the driver list"
                },
                "data": {
                    "story_id": "story_12345"
                }
            }

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log(firestore.FieldValue.arrayUnion(userData.fcmToken))
        DocdIdFunction()
        // alert(request, location)
        // getAccessToken()
    }, [])

    const sendRequest = () => {
        const data = firestore()
            .collection('addToListDriver')
            .where("uid", "==", auth().currentUser.uid)
            .where("driveruid", "==", userData.uid)
            .get()
            .then((res) => {
                // console.log(res)
                if (res.docs.length == 0) {
                    firestore()
                        .collection('addToListDriver')
                        .add({
                            uid: auth().currentUser.uid,
                            driveruid: userData.uid,
                            request: false,
                            response: false
                        })
                    alert("driver has been added to your list")
                    Notification()
                }
                else {
                    Notification()
                    alert('driver is already added')
                }
            })
        // console.log(data)

    }
    const DocdIdFunction = () => {
        var doc = ''
            firestore()
            .collection("addToListDriver")
            .where('uid', '==', auth().currentUser.uid)
            .where("driveruid", '==', userData.uid )
            .onSnapshot(i => {
                doc = ''
                i.forEach(j => {
                    doc = j.id
                })
                setDocumentId(doc)
            })
    }
        const Remove = () => {
            
            firestore()
            .collection('addToListDriver')
            .doc(documentid)
            .delete()
            .then(() => {
                console.log('User deleted!');
                props.route.params.deleteDriver(props.route.params.index)
                console.log(props.route.params.DocId)
                props.navigation.pop()
            });
    }




    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <ScrollView>
            <View style={{ top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
               
                <View style={{ height: hp(32), width: wp(100), position: "absolute" }}>
                    <Swiper activeDot={<View style={{ backgroundColor: '#fff', borderWidth: 1.3, borderColor: Colors.primary, width: 12, height: 12, borderRadius: 12 / 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ backgroundColor: Colors.primary, width: 6, height: 6, borderRadius: 6 / 2 }}></View>
                        </View>}
                            dot={<View style={{ backgroundColor: 'transparent', borderWidth: 1.3, borderColor: 'white', width: 12, height: 12, borderRadius: 12 / 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, justifyContent: 'center', alignItems: 'center' }} >
                        </View>}
                        showsButtons={false} loop={false} >
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: userData.imageUrl }} style={{ height: hp(35), width: wp(100) }} />
                        </View>
                    </Swiper>
                </View>
                <View style={{ height: '100%', marginTop: hp(32), paddingTop: hp(5) }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: wp(5) , justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style = {{flexDirection: 'row'}}>
                            <View style={{
                                backgroundColor: 'lightgreen',
                                height: wp(5),
                                width: wp(5),
                                borderWidth: 2,
                                borderColor: Colors.white,
                                elevation: 5,
                                alignSelf: 'center',
                                borderRadius: wp(5) / 2,
                            }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: wp(3), paddingHorizontal: wp(5) }}>
                                <Text style={{ fontSize: Size(3), fontWeight: 'bold', color: 'rgba(0,0,0,0.7)' }}>{userData.name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress = {() => props.navigation.navigate('Report', {uid: userData.uid})}>
                           <Text>
                                Report
                           </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: hp(1) }}></View>

                    <View style={{ height: hp(1) }}></View>
                    <View style={{ height: hp(3) }}></View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: wp(5) }}>
                        <View>
                            <Text style={{ fontSize: Size(2), paddingVertical: hp(.7) }}>School Name</Text>
                        </View>
                    </View>
                    <Text style={{ paddingHorizontal: wp(5), marginVertical: hp(2), lineHeight: hp(3) }}>{userData.SchoolName}</Text>
                    <View style={{ height: hp(1) }}></View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: wp(5) }}>
                        <View>
                            <Text style={{ fontSize: Size(2), paddingVertical: hp(.7) }}>{'Other Details'}</Text>
                        </View>
                    </View>
                    <View style={{ height: hp(1) }}></View>

                    <View style={{ paddingHorizontal: wp(5), paddingTop: hp(2) }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Text>Mob : </Text>
                            <View style={{ flex: .5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{userData.MobNo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: wp(5), paddingTop: hp(2) }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Text>Cnic : </Text>
                            <View style={{ flex: .5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{userData.Cnic}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: wp(5), paddingTop: hp(2) }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Text>Vehicle Number : </Text>
                            <View style={{ flex: .5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{userData.VechicleNo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: wp(5), paddingTop: hp(2) }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Text>License Number : </Text>
                            <View style={{ flex: .5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{userData.LicenseNo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: hp(5) }}></View>
                    {
                        location == false ? (null):(

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Colors.linearGradient1} style={{ width: wp('90%'), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: hp(6), borderRadius: wp('10%') }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { props.navigation.navigate('Location', { uid: userData.uid }) }}>
                                    <Text style={{ color: '#fff' }}>{'Location'}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        )
                    }
                    <View style={{ height: hp(5) }}></View>
                    {
                        request == true ?(
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Colors.linearGradient1} style={{ width: wp('90%'), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: hp(6), borderRadius: wp('10%') }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { sendRequest() }}>
                                    <Text style={{ color: '#fff' }}>{'Send Request'}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        ):(null)
                    }
                    {
                        remove == true ?(
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Colors.linearGradient1} style={{ width: wp('90%'), justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: hp(6), borderRadius: wp('10%') }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { Remove() }}>
                                    <Text style={{ color: '#fff' }}>{'Remove'}</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        ):(null)
                    }
                    <View style={{ height: hp(4) }}></View>

                </View>
                <TouchableOpacity onPress =  {() => props.navigation.pop()} style = {{margin: hp(2), position: 'absolute', height: 37, width: 37, borderRadius: 37/2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
                    <LeftArrow name="arrow-left" size={30} color= {Colors.primary} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}

export { ProfileDetail };