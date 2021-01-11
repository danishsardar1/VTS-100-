import React, { useContext, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../assets/index';
import UserInput from '../../component/userInput/index';
import { Header } from '../../component/header/index';
import LinearGradient from 'react-native-linear-gradient'
import MIcon from "react-native-vector-icons/MaterialIcons";
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { set } from 'react-native-reanimated';


const types = ['ICG F-6/2', 'IMCG G-6/3', 'Model College', 'FG College']
const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const Attendance = (props) => {
    const [ChildName, setChildName] = useState("")
    const [SchoolCode, setSchoolCode] = useState("")
    const [imageUrl, setimageUrl] = useState("")
    const [UserInfo, setUserInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
   
        userData()
    
    },[]);

    const userData = () => {
        // setIsLoading(false)
        firestore()
        .collection('Child')
        // Filter results
        .where("uid", "==", auth().currentUser.uid)
        .onSnapshot(i => {

          var UserInfo = []
          i.forEach(j => {
           
                console.log('j.data',j.data())
              UserInfo.push(j.data())
              
          })
          console.log("add", UserInfo)  
          setUserInfo(UserInfo)
        //   setIsLoading(true)
        })

    }
    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <View style={{ height: hp(100), top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
            <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(35), width: wp(100) }}></LinearGradient>
            <View style={{ flex: 1 }}>
                <View style={{ height: hp(13), marginHorizontal: wp(5) }}>
                    <Header
                        onPress = {() => {props.navigation.pop()}}
                        color={Colors.white}
                        iconColor={Colors.white}
                        heading={'Children'}
                        Icon={MIcon}
                        name={'keyboard-arrow-left'}
                        size={Size(5)}>
                    </Header>
                </View>

                <View style={{ height: hp(85), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(7) }}>
                    <ScrollView>
                        <View style={{height : hp(3)}} />
                        {UserInfo.map((item,index) => {
                         return   item.status && (item.status == 1 || item.status == 2) ?
                             <TouchableOpacity style={{ height: hp(5), marginTop : index == 0 ? hp(3) : hp(2.5), width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent : 'space-between' }}>

                                    <View style={{marginHorizontal: wp(2), justifyContent: 'center', }}>
                                        <Text style={{ fontSize: Size(2) }}>{item.ChildName}</Text>
                                        <Text style={{ fontSize: Size(1.2), color: Colors.primary }}>{item.SchoolName}</Text>
                                    </View>
                                    <Text style={{ fontSize: Size(1.7), color: Colors.primary, textAlignVertical : 'center' }}>{item.status == 1 ? "Present" : "Absent"}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            null
                        })}
                        <View style = {{height: hp(15)}}/>
                    </ScrollView>
                </View>

            </View>
        </View>
    </KeyboardAvoidingView>);
}

export { Attendance };