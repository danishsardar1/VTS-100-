import React, { useContext, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
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
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNLocation from "react-native-location";

let Childs = '';
let Data = [];
const Search = (props) => {
    const [UserInfo, setUserInfo] = useState([])
    const [Drivers, setDrivers] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [docId, setDocId] = useState("");
    const [location, setLocation] = useState([]);
    const [locationId, setLocationId] = useState('');
    const [uid, setUid] = useState('');
    const [SchoolCode,setSchoolCode] = useState('')


    useEffect(() => {
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
        .onSnapshot( i => {
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
        .onSnapshot( i => {
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
               userData(drivers,SchoolCodes)
            //    ,2000)
        })
        console.log("Childs", Drivers)

          
        // set
    //   userData(drivers)
        //   setIsLoading(false)
    };

    const userData =  (driverss,SchoolCodes) => {
        console.log('drivers', driverss, SchoolCodes)
        driverss.map((data,index) => {

            firestore()
            .collection('Child')
            // Filter results
            .where('uid', '==', data)
            .where('SchoolCode','==',SchoolCodes)
            .onSnapshot( i => {
                
                let docId = ''
                i.forEach(j => {
                    // Data = j.data();
                    docId = j.id
                    Data.push(j.data())
    
                })
                //   console.log(data)
                setUserInfo(Data)
                //   await setDocId(docId)
                setIsLoading(false)
                console.log("userInfo", UserInfo)
            })
        })
       
    }
    // location start

    // const rnlocation = () => {
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
                setIsLoading(false)
            }
        });
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
                            <Header color={Colors.white} iconColor={Colors.white} heading={'Students'} Icon={MIcon} size={Size(5)}></Header>
                        </View>
                    </View>
                    <View style={{ height: hp(85), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(5) }}>
                        <View style={{ height: hp(85), }}>
                            {isLoading == false ? (
                                // <Text>{Child.MobNo}</Text>
                                <View>
                                    <FlatList
                                        numColumns={3}
                                        data={UserInfo}
                                        keyExtractor={(item, index) => {
                                            return  index.toString();
                                           }}
                                        style={{ marginTop: hp(4), marginBottom: hp(10) }}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: hp(2) }} onPress={() => { props.navigation.navigate('profile', { item: item }) }}>
                                                <View style={{ height: hp(9.5), width: hp(9.5), borderRadius: hp(9.5 / 2), backgroundColor: "white", alignItems: "center", justifyContent: "center", elevation: 10 }}>
                                                    <Image source={{ uri: item.imageUrl }} style={{ height: hp(9), width: hp(9), borderRadius: hp(9 / 2) }} />
                                                </View>
                                                <View>
                                                    <Text style={{ textAlign: "center", fontSize: Size(1.2), marginTop : hp(.5) }}>{item.ChildName}</Text>
                                                    <View style={{ height: hp(.3) }} />
                                                    <Text style={{ textAlign: "center", fontSize: Size(1.2) }}>{item.SchoolCode}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    {/* <View style = {{height: hp(90)}}/> */}
                                </View>
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