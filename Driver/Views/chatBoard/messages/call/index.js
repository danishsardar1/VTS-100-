import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Animated,
    Easing,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import FEIcon from "react-native-vector-icons/Feather";
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { Colors, Images, hp, wp, Size, Font } from "../../../../assets/index";


let Childs = '';
let Data = [];
const Calls = () => {
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
        // sendinglocation()
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

        setIsLoading(false)
          
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

    const Call = (number) => {
        RNImmediatePhoneCall.immediatePhoneCall(number);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.os == 'ios' ? 'padding' : null}>
            {isLoading == true ? (

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <ActivityIndicator size={25} color={'black'} />
                </View>
            ) : (
                    <View style={{ flex: 1, top: Platform.os == 'ios' ? IOS : 0 }}>
                        <View style={{ height: hp(100) }}>
                            <FlatList
                                // numColumns={2}
                                keyExtractor={(item, index) => {
                                    return  index.toString();
                                   }}
                                showsVerticalScrollIndicator={false}
                                data={UserInfo}
                                style={{ flex: 1, marginBottom: wp(8) }}
                                // getItemLayout={(item,index)=>alert(index)}
                                renderItem={({ item, index }) => {

                                    return <TouchableOpacity onPress={() => { Call(item.MobNo) }} style={{ flex: 1, flexDirection: 'row', marginVertical: hp(2), borderBottomWidth: 0.2, borderBottomColor: Colors.lightGray, marginHorizontal: wp(3) }}>
                                        <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={{ uri: item.imageUrl }} style={{ height: hp(4), width: hp(4), borderRadius: hp(4 / 2), marginHorizontal: wp(2) }} />

                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: wp(4) }}>
                                            <Text style={{ fontSize: Size(2.1) }}>{item.ChildName}</Text>
                                            <Text style={{ fontSize: Size(1.3), opacity: 0.5 }}>{item.MobNo}</Text>
                                        </View>
                                        <View style={{ flex: .1, marginHorizontal: wp(5), alignSelf: 'flex-end' }}>
                                            <FEIcon name={item.status} size={16} color={item.status == 'arrow-down-left' ? ('red') : ('green')} />
                                        </View>
                                    </TouchableOpacity>
                                }}
                            />
                            <View style={{ height: 170 }} />
                        </View>
                    </View>
                )}
        </KeyboardAvoidingView>
    )
}

export { Calls }