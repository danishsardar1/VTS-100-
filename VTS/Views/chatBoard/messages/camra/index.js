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
    StyleSheet
} from 'react-native';
import FEIcon from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-picker';
import Firebase from "@react-native-firebase/app"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Colors, Images, hp, wp, Size, Font } from "../../../../assets/index";
import { Button } from '../../../../component/button/index';



const Camra = () => {
    const [Data, setData] = useState([])
    const [request, setRequest] = useState([])
    const [docId, setDocId] = useState('')

    useEffect(() => {
        NotificationData()
        console.log('hello')
    },[])
    const NotificationData = () => {
        firestore()
            .collection("addToListDriver")
            .where("uid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                setData([])
                setRequest([])
                setDocId('')        
                var ids = []
                let requestt = []
                let docId = ''
                i.forEach(j => {
                    docId = j.id
                    ids.push(j.data().driveruid)
                    request.push(j.data().request)
                })
                // setTimeout(() => {
                    
                    // setRequest(requestt)
                    getDataNotification(ids)
                    setDocId(docId)
                    // alert('request', request)
                // }, 5000);
            })
        // console.log(ids)
    }

    const getDataNotification = (id) => {
        // alert(id)
        let data = []
        id.map((item,index)  => {
            firestore()
                .collection("Driver")
                .where("uid", "==", item)
                .onSnapshot(d => {
                    // var data = []
                    d.forEach(k => {
                        data.push(k.data())
                        console.log("kkkkkkkkkkkkkkk", k)
                    })
                })
        })
        setTimeout(() => {
            
            // alert(request)
            request.map((item,index) => {
                if (item == true) {
                    data[index]['request'] = true
                }
                else {
                    data[index]['request'] = false
                }
            })
            // alert(JSON.stringify(data[0]))
            setData(data)
        }, 3000);
        // alert(JSON.stringify(Data[0]))
    }

    // const requestResponse = () => {
    //     firestore()
    //     .collection('addToListDriver')
    //     .doc(docId)
    //     .update({
    //         request: true
    //     })
    // }
    // const requestResponseFalse = () => {
    //     firestore()
    //     .collection('addToListDriver')
    //     .doc(docId)
    //     .update({
    //         request: false
    //     })
    // }
    // useEffect(() => {

    //     ImagePicker.showImagePicker((response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //           console.log('User cancelled image picker');
    //         } else if (response.error) {
    //           console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //           console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //           const source = { uri: response.uri };
    //         }
    //       })
    // });
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.os == 'ios' ? 'padding' : null}>
            <View style={{ height: hp(100), top: Platform.os == 'ios' ? IOS : 0 }}>
                <FlatList
                    // numColumns={2}
                    keyExtractor={(item, index) => {
                        return  index.toString();
                       }}
                    showsVerticalScrollIndicator={false}
                    data={Data}
                    style={{ flex: 1, marginBottom: wp(8) }}
                    // getItemLayout={(item,index)=>alert(index)}
                    renderItem={({ item, index }) => {
                        // alert(item.request)
                        return <View style={{ height: hp(12),paddingHorizontal : wp(2), flexDirection: 'row', borderBottomWidth: 0.2, borderBottomColor: Colors.lightGray, marginHorizontal: wp(3) }}>
                            <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: item.imageUrl }} style={{ height: hp(10), width: hp(10), borderRadius: hp(10 / 2), marginHorizontal: wp(2) }} />

                            </View>
                            <View style={{ flex: 1,justifyContent: 'center', marginHorizontal: wp(4), }}>
                                <Text style={{ fontSize: Size(2.1), paddingHorizontal: wp(2) }}>{item.name}</Text>
                                {
                                    item.request == false ? (
                                        <Text style={{ fontSize: Size(1.3),paddingHorizontal: wp(2), opacity: 0.5 }}>Your request has been sent to {item.name}</Text>
                                    ):(
                                        <Text style={{ fontSize: Size(1.3), paddingHorizontal: wp(2), opacity: 0.5 }}>Your request has been accepted by {item.name}</Text>

                                    )
                                }
                                {/* {
                                    request.request == false?(

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: wp(3), height: hp(5) }}>
                                    <Button
                                        fontWeight={'bold'}
                                        onPress={() => {requestResponseFalse()}}
                                        borderWidth={0.5}
                                        backgroundColor={"#F8AA14"}
                                        Icon={null} IconName={null}
                                        IconColor={Colors.facebookColor}
                                        width={wp('20%')} size={wp('5%')}
                                        IconLeftMargin={wp('3%')}
                                        borderRadius={wp('10%')}
                                        text={'reject'}
                                        textColor={Colors.white}
                                        borderColor={"#F8AA14"}
                                        fontSize={Size(1.8)} >
                                    </Button>
                                    <Button
                                        fontWeight={'bold'}
                                        onPress={() => {requestResponse()}}
                                        borderWidth={0.5}
                                        backgroundColor={"#F8AA14"}
                                        Icon={null} IconName={null}
                                        IconColor={Colors.facebookColor}
                                        width={wp('20%')} size={wp('5%')}
                                        IconLeftMargin={wp('3%')}
                                        borderRadius={wp('10%')}
                                        text={'Accept'}
                                        textColor={Colors.white}
                                        borderColor={"#F8AA14"}
                                        fontSize={Size(1.8)} >
                                    </Button>
                                </View>
                                    ):(null)
                                } */}
                            </View>
                                {/* <View style = {{height: 5}}/> */}
                        </View>
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export { Camra };