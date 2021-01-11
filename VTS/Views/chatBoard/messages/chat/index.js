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
    Linking,
    ActivityIndicator,
} from 'react-native';
import FEIcon from "react-native-vector-icons/Feather";
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Colors, Images, hp, wp, Size, Font } from "../../../../assets/index";


let Childs = '';
let Data = [];
const Chats = () => {

    const [UserInfo, setUserInfo] = useState([])
    const [Childss, setChild] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [childName, setChildName] = useState([])

    useEffect(() => {

        ChildCode()
    }, []);

    const ChildCode = () => {
        var Childsss = []
        var statuss = []
       
        // Data = ['']
        setIsLoading(true)
        firestore()
            .collection('addToListDriver')
            // Filter results
            .where("uid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                //   var Childs = []
                setUserInfo([])
                setChild('')
                setEmpty(false)
                setChildName([])
                console.log(i)
                console.log("helllooooooooooooooooooooooooo", auth().currentUser.uid)
                i.forEach(j => {

                    // Childs = j.data().SchoolCode;
                    // Childs.push(j.data().SchoolCode)
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

        console.log("Childs", Childsss)

    }
    const userData = (Childsss) => {

        console.log(Childsss)

        let schoolcd = ''
        // Childss.map((ChildsId, index) => {

        console.log('Datachilds', Childsss)
        // let ChildId = ChildId;
        Childsss.map((item,index) => {
            console.log(item)
            firestore()
                .collection('Driver')
                // Filter results
                .where('uid', '==', item)
                .onSnapshot(i => {
                    //   let Data = []
                    // Data = []
                    setUserInfo([])
                    i.forEach(j => {
                        // Data = j.data();
                        // schoolcd = j.data().SchoolCode
                        Data.push(j.data())
                    })
    
                })
               
            })
            setTimeout(() => {
                setUserInfo(Data)
                setIsLoading(false)
                console.log("userInfo", UserInfo)
            }, 1000);
        // }
        // )

    }

    const nativeSms = (number) => {
        const url = (Platform.OS === 'android')
  ? 'sms:'+number+'?body='
  : 'sms:1-408-555-1212'

Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Unsupported url: ' + url)
  } else {
    return Linking.openURL(url)
  }
}).catch(err => console.error('An error occurred', err))
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.os == 'ios' ? 'padding' : null}>
            {isLoading == true ? (
                
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    
                    <ActivityIndicator size={25} color={'black'} />
                </View>
            ):(
            
            <View style={{ flex: 1, top: Platform.os == 'ios' ? IOS : 0 }}>
                <View style = {{height: hp(100)}}>
                    <FlatList
                        // numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={UserInfo}
                        style={{flex: 1, marginBottom: wp(8)}}
                        keyExtractor={(item, index) => {
                            return  index.toString();
                           }}
                        // getItemLayout={(item,index)=>alert(index)}
                        renderItem={({ item, index }) => {

                        return<View style = {{}}>
                                <TouchableOpacity onPress = {() => {nativeSms(item.MobNo)}} style = {{height: hp(8) ,flexDirection: 'row', alignItems: 'center',  borderBottomWidth: 0.2, borderBottomColor: Colors.lightGray, marginHorizontal : wp(3)}}>
                            <View style = {{flex : .2, alignItems: 'center', justifyContent : 'center'}}>
                                <Image source = {{uri: item.imageUrl}} style = {{height: hp(4), width: hp(4), borderRadius: hp(4/2), marginHorizontal: wp(2)}}/>
                                
                            </View>
                            <View style={{flex  :1,alignItems : 'flex-start', marginHorizontal : wp(4)}}>
                                    <Text style = {{fontSize: Size(2.1)}}>{item.name}</Text>
                                    <Text style = {{fontSize: Size(1.3), opacity: 0.5}}>{item.MobNo}</Text>
                                </View>
                            <View style = {{flex : .1, marginHorizontal: wp(5), alignSelf:'flex-end'}}>
                                
                                <FEIcon name = {item.status} size = {16} color = {item.status == 'arrow-down-left' ? ('red'):('green')}/>
                            </View>
                        </TouchableOpacity>
                        </View>
                        }}
                    />
                    <View style = {{height: 170}}/>
                </View>
            </View>
            )}
        </KeyboardAvoidingView>
    )
}

export { Chats }