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
    const [responses, setResponse] = useState([])
    const [docId, setDocId] = useState('')

    useEffect(() => {
        NotificationData()
        console.log('hello')
    },[])
    const NotificationData = () => {
        firestore()
            .collection("addToListDriver")
            .where("driveruid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                setData([])
                setRequest([])
                setDocId('')
                setResponse([])   
                var ids = []
                let requestt = []
                let docId = ''
                let responsesArray = []
                let requestArray = []
                i.forEach(j => {
                    docId = j.id
                    ids.push(j.data().uid)
                    requestArray.push(j.data().request)
                    responsesArray.push(j.data().response)
                })
                // setTimeout(() => {
                    console.log(request)
                    // setRequest(requestt)
                    getDataNotification(ids,requestArray,responsesArray)
                    setDocId(docId)
                    // alert('request', request)
                // }, 5000);
            })
        // console.log(ids)
    }

    const getDataNotification = (id,requestArray,responsesArray) => {
        // alert(id)
        let data = []
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj ",id)
        id.map((item,index)  => {
            firestore()
                .collection("Parrent")
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
            
            alert(requestArray)
            requestArray.map((item,index) => {
                responsesArray.map((datasss,i) => {
                if (item == true && datasss == true ) {
                    data[index]['request'] = true
                    data[index]['response'] = true
                }
                else {
                        data[index]['request'] = false
                        data[index]['response'] = datasss
                    }
                })
            })
            // alert(JSON.stringify(data[0]))
            setData(data)
        }, 3000);
        // alert(JSON.stringify(Data[0]))
    }


    const requestResponse = () => {
        firestore()
        .collection('addToListDriver')
        .doc(docId)
        .update({
            request: true,
            response : true
        })
    }
    const requestResponseFalse = () => {
        firestore()
        .collection('addToListDriver')
        .doc(docId)
        .update({
            request: false,
            response : true
        })
    }
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

                        return <View style={{ flex: 1, flexDirection: 'row', marginVertical: hp(2), borderBottomWidth: 0.2, borderBottomColor: Colors.lightGray, marginHorizontal: wp(3) }}>
                            <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: item.imageUrl }} style={{ height: hp(10), width: hp(10), borderRadius: hp(10 / 2), marginHorizontal: wp(2) }} />

                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-start',justifyContent: 'center', marginHorizontal: wp(4), }}>
                                <Text style={{ fontSize: Size(2.1) }}>{item.name}</Text>
                                {
                                    item.request == false && item.response == false ? (
                                        <Text style={{ fontSize: Size(1.3), opacity: 0.5 }}>{item.name} send you request</Text>
                                    ):(
                                        <Text style={{ fontSize: Size(1.3), opacity: 0.5 }}>you have accepted the request of {item.name}</Text>

                                    )
                                }
                                {
                                    item.request == false && item.response == false ?(

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
                                }
                            </View>

                        </View>
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export { Camra };