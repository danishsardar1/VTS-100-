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


var Childs = '';
let Data = [];
const myDrivers = (props) => {
    const [UserInfo, setUserInfo] = useState([])
    const [Childss, setChild] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [childName, setChildName] = useState([])
    const [docId, setDocId] = useState([])

    useEffect(() => {
        // setUserInfo([])
        ChildCode()
    }, []);

    const ChildCode = () => {
        setUserInfo([])
        setChild([])
        setStatus([])
        setEmpty([])
        setDocId([])
        setChildName([])
        // alert('useeffect working')
        setIsLoading(true)
        firestore()
            .collection('addToListDriver')
            .where("uid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                
                setChild('')
                setEmpty(false)
                setChildName([])
                setUserInfo([])
                var Childsss = []
                var statuss = []
                console.log(i)
                console.log("helllooooooooooooooooooooooooo", auth().currentUser.uid)
                i.forEach(j => {

                    statuss.push(j.data().request)
                    if (j.data().request == true) {
                    Childsss.push(j.data().driveruid)
                    }
                })
                console.log("helllo",statuss)
                
                setStatus(statuss)
                setTimeout(() => {
                    statuss.map((data, index) => {
                        if (data == true) {
                            console.log("status", status)
                            setChild(Childsss)
                        }
                    })
                    userData(Childsss);
                },1000)

            })

    }
    const userData = (Childsss) => {

        console.log(Childsss)

        let schoolcd = ''
        var doc = []

        console.log('Datachilds', Childsss)
        if(Childsss.length == 0){
            console.log("length is 0")
            setIsLoading(false)
        }
        else {

        Childsss.map((item,index) => {
            console.log(item)
            firestore()
                .collection('Driver')
                .where('uid', '==', item)
                .onSnapshot(i => {
                setUserInfo([])
                    Data = []
                    doc = []
                    i.forEach(j => {
                        doc.push(j.id)
                        Data.push(j.data())
                    })
    
                })
               
            })
            setTimeout(() => {
                setDocId([])
                setDocId(doc)
                setUserInfo(Data)
                setIsLoading(false)
                console.log("userInfo", UserInfo)
            }, 3000);
        }
        
    }

    const deleteDriver = (index) => {
        var a = Object.assign([], UserInfo);
        a.splice(index,1);
        setUserInfo(a)
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
                <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(35), width: wp(100) }}></LinearGradient>
                <View style={{ flex: 1 }}>
                    <View style={{ height: hp(13), marginHorizontal: wp(5) }}>
                        <Header
                            onPress={() => { props.navigation.pop() }}
                            color={Colors.white}
                            iconColor={Colors.white}
                            heading={'My Driver'}
                            Icon={MIcon}
                            name={'keyboard-arrow-left'}
                            size={Size(5)}>
                        </Header>
                    </View>
                    <View style={{ height: hp(88), paddingTop: hp(2), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(3) }}>
                        <ScrollView>
                            {UserInfo.map((item,index)=> {
                                return <TouchableOpacity  onPress={() => { props.navigation.navigate('profile', { item: item,index : index, location: true, request: false, remove: true , deleteDriver : deleteDriver, DocId: docId[index] })}} style={{ height: hp(9), marginVertical: hp(2.7), width: '100%' }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: .25 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                                <View style={{ borderRadius: wp(19) / 2, borderWidth: 3, borderColor: 'white', elevation: 14, backgroundColor: Colors.white }}>
                                                    <Image source={{ uri: item.imageUrl }} style={{ height: wp(17.5), width: wp(17.5), borderRadius: wp(17.5) / 2, borderColor: 'white' }}></Image>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: .75, marginHorizontal: wp(2), justifyContent: 'center', }}>
                                            <Text style={{ fontSize: Size(2) }}>{item.name}</Text>
                                            <Text style={{ fontSize: Size(1.2), color: Colors.primary }}>{item.SchoolName}</Text>
                                            <View style = {{flexDirection: 'row'}}>
                                              
                                               
                                            </View>
                                          
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                    </View>

                </View>
            </View>
        </KeyboardAvoidingView>
        );
    }
}

export { myDrivers };