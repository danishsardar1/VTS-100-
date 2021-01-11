import React, { useContext, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Tick from "react-native-vector-icons/AntDesign";
import Cross from "react-native-vector-icons/Entypo";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
import UserInput from '../../component/userInput/index';
import { Header } from '../../component/header/index';
import LinearGradient from 'react-native-linear-gradient'
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNLocation from "react-native-location";
import moment from 'moment'

let Childs = '';
let Data = [];
let DocsID = [];
const Search = (props) => {
    const [UserInfo, setUserInfo] = useState([])
    const [Drivers, setDrivers] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    var [docId, setDocId] = useState("");
    const [docsID, setDocsID] = useState([]);
    const [dateOnce, setDateOnce] = useState(false);
    const [location, setLocation] = useState([]);
    const [locationId, setLocationId] = useState('');
    const [uid, setUid] = useState('');
    const [SchoolCode, setSchoolCode] = useState('')
    const [locationPermission, setLocationPermission] = useState(0)


    useEffect(() => {
        setLocationPermission(0)
        requestLocation();
        // setUid(auth().currentUser.uid)
        // setDrivers('')
        // setEmpty('')
        // setDocId('')
        // setLocationId('')
        // setUid('')
        console.log("uid", auth().currentUser.uid)
        SchoolCodeSSSSS()
        sendinglocation()
    }, []);

    const SchoolCodeSSSSS = async () => {
        var SchoolCodes = []
        console.log('DriverCode sldkflskalskdlsklfkaslkfjlkdsjfsl')
        firestore()
            .collection('Driver')
            // Filter results
            .where("uid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                console.log('pakistanlkdslakfjlaskjldfksalkjfdl;', i)
                var docId = []
                i.forEach(j => {
                    console.log(j.data().SchoolCode)
                    SchoolCodes = j.data().SchoolCode
                })
                setDocId(docId)
                // setDrivers(drivers)
                // setTimeout(() => {
                setSchoolCode(SchoolCodes)
                console.log('lsdklfkads', SchoolCodes)
                DriverCode(SchoolCodes)
                console.log("Childs", SchoolCodes)
                // }, 3000);
            })


        // set
        //   userData(drivers)
        //   setIsLoading(false)
    };

    const DriverCode = async (SchoolCodes) => {
        var drivers = []
        console.log('DriverCode sldkflskalskdlsklfkaslkfjlkdsjfsl')
        firestore()
            .collection('addToListDriver')
            // Filter results
            .where("driveruid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                console.log('pakistanlkdslakfjlaskjldfksalkjfdl;kajsl;', i)
                var docId = []
                i.forEach(j => {
                    drivers.push(j.data().uid)

                    // docId = j.id;
                })
                // setDocId(docId)
                setDrivers(drivers)
                console.log('lsdklfkads;af', Drivers)
                //    setTimeout(()=>
                userData(drivers, SchoolCodes)
                //    ,2000)
            })
        console.log("Childs", Drivers)


        // set
        //   userData(drivers)
        //   setIsLoading(false)
    };

    const userData = (driverss, SchoolCodes) => {
        console.log('drivers', driverss, SchoolCodes)
        if (driverss.length != 0) {
        driverss.map((data, index) => {

            firestore()
                .collection('Child')
                // Filter results
                .where('uid', '==', data)
                .where('SchoolCode', '==', SchoolCodes)
                .onSnapshot(i => {
                    Data = []
                    setUserInfo([])
                    DocsID = []
                    let docId = ''
                    i.forEach(j => {
                        // Data = j.data();
                        docId = j.id
                        DocsID.push(j.id)
                        Data.push(j.data())

                    })
                    console.log(Data)
                    // alert(DocsID)
                    setUserInfo(Data)
                })
            setTimeout(() => {
                setDocsID(DocsID)
                DataChange(Data, DocsID)
                setIsLoading(false)
                console.log("userInfo", UserInfo)
            }, 3000);
        })
    }
    else {
        setIsLoading(false)
    }
    }

    const DataChange = (Data, docs) => {
        if (Data.length != 0) {
        Data.map((item, index) => {
            // alert(moment(item.date).format('l'))
            if (moment(item.date).format('l') < moment(new Date()).format('l')) {
                firestore()
                    .collection('Child')
                    .doc(docs[index])
                    .update({
                        status: 0,
                        date: new Date()
                    })
            }
        })
    }
    else {
        setIsLoading(false)
    }
        // setIsLoading(false)
    }
    // location start

    // const rnlocation = () => {

    const requestLocation = () => {
        if (locationPermission == 0) {
            setLocationPermission(1)
            RNLocation.configure({
                distanceFilter: 1.0,
                desiredAccuracy: { android: 'balancedPowerAccuracy' },
                // androidProvider: 'auto',
                interval: 1000, // Milliseconds
                fastestInterval: 500, // Milliseconds
                maxWaitTime: 5000, // Milliseconds
                // iOS Only
                activityType: 'other',
                allowsBackgroundLocationUpdates: true,
                headingFilter: 0, // Degrees
                headingOrientation: "portrait",
                pausesLocationUpdatesAutomatically: false,
                showsBackgroundLocationIndicator: true,
            });
            RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "fine",
                    rationale: {
                        title: "Location permission",
                        message: "We use your location to demo the library",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            }).then(granted => {
                if (granted) {
                    _startUpdatingLocation();
                    setLocationPermission(1)
                    // setIsLoading(false)
                }
            });
        }
        else {
            console.log("already requested")
        }
    }
    // }


    const _startUpdatingLocation = async () => {
        const locationssss = await RNLocation.subscribeToLocationUpdates(
            async locations => {
                await setLocation(locations[0])
            }
        );
        await console.log('location', location)

    };


    const sendinglocation = () => {
        // setInterval(function () {
        firestore()
            .collection('location')
            .where('uid', '==', auth().currentUser.uid)
            .onSnapshot(i => {
                let id = ""
                i.forEach(j => {
                    id = j.id
                })
                setLocationId(id)
            })
        // }, 3000);
    }
    // {
    // setInterval(function() {
    // if(location == []){
    //     console.log('stay same')
    // }else{
    firestore()
        .collection('location')
        .doc(locationId)
        .update({
            location: location
        })
    console.log('updating data')
    // }
    // },150000)
    // }
    // location end

    const markAttendance = (doc, status) => {
        firestore()
            .collection('Child')
            .doc(doc)
            .update({
                status: status,
                date: new Date()
            })
    }



    if (isLoading == true) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={25} color={'black'} />
        </View>
    }
    else {
        // if (Childs != '') { 
        return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
            <View style={{ height: hp(100), top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>

                <View style={{ flex: 1 }}>
                    <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(20), width: wp(100) }}></LinearGradient>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: hp(13), marginHorizontal: wp(5) }}>
                            <Header onstudentPress={() => props.navigation.navigate("MyStudents")} students={true} color={Colors.white} iconColor={Colors.white} heading={'Home'} Icon={MIcon} size={Size(5)}></Header>
                        </View>
                    </View>
                    <View style={{ height: hp(85), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(8) }}>
                        <View style={{ height: hp(85) }}>
                            {isLoading == false ? (
                                <>
                                    <FlatList
                                        // numColumns={3}
                                        data={UserInfo}
                                        keyExtractor={(item, index) => {
                                            return index.toString();
                                        }}
                                        renderItem={({ item, index }) => (
                                            item &&
                                            <View key={index} style={{ marginTop: index == 0 ? hp(4) : hp(2), width: '100%' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: Size(2) }}>{item.ChildName}</Text>
                                                    <View style={{ flexDirection: 'row' }} >
                                                        <TouchableOpacity disabled={item.status != 0 ? true : false} onPress={() => markAttendance(docsID[index], 2)} >
                                                            {
                                                                item.status == 0 || item.status == 1 ?
                                                                    <Cross size={25} name='cross' color={Colors.primary}></Cross>
                                                                    :
                                                                    <Cross size={25} name='circle-with-cross' color={Colors.primary}></Cross>
                                                            }
                                                        </TouchableOpacity>
                                                        <TouchableOpacity disabled={item.status != 0 ? true : false} onPress={() => markAttendance(docsID[index], 1)} style={{ marginLeft: wp(5) }} >
                                                            {
                                                                item.status == 2 || item.status == 0 ?
                                                                    <Cross size={25} name='check' color={Colors.primary}></Cross>
                                                                    :
                                                                    <Tick size={20} name='checkcircle' color={Colors.primary}></Tick>
                                                            }
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    />
                                    <View style={{ height: hp(5) }} />
                                </>
                            ) : (
                                    <ActivityIndicator size={25} color={'black'} />
                                )}

                        </View>
                    </View>
                </View>
                {/* )} */}
            </View>
        </KeyboardAvoidingView>
        );
        // }
        // else {
        //     return <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //     <Text>Their is no Driver</Text>
        // </View>
        // }
    }
}

export { Search };