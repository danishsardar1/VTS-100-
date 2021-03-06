import React, { useContext, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, ActivityIndicator, TouchableOpacity, FlatList, TextInput, ToastAndroid } from 'react-native';
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
import AsyncStorage from '@react-native-community/async-storage'
import { Button } from '../../component/button/index';

// import { TextInput } from 'react-native-gesture-handler';

const Profile = (props) => {
    const [category, setCategory] = useState('male')
    const [isLoading, setIsLoading] = useState(false)
    const [UserInfo, setUserInfo] = useState({})
    const [Edit, setEdit] = useState(false)
    const [Cnic, setCnic] = useState("")
    const [MobNo, setMobNo] = useState("")
    // const [email, setEmail] = useState()
    const [imageUrl, setImageUrl] = useState("")
    const [name, setName] = useState("")
    const [docId, setDocId] = useState("");



    useEffect(() => {

        userData()

    }, []);

    const userData = () => {
        setIsLoading(true)
        firestore()
            .collection('Driver')
            // Filter results
            .where("uid", "==", auth().currentUser.uid)
            .onSnapshot(i => {
                var UserInfo = ''
                UserInfo = i
                console.warn("i", i)
                i.forEach(j => {
                    UserInfo = j.data()
                    setDocId(j.id)
                    setCnic(j.data().Cnic)
                    setMobNo(j.data().MobNo)
                    setName(j.data().name)
                    setImageUrl(j.data.imageUrl)
                    console.warn(j.id)
                    // product.push(j.data())
                })
                console.warn("k", UserInfo.imageUrl)
                setUserInfo(UserInfo)
                // setTimeout(() => {
                    setIsLoading(false)
                // }, 3000);

            })
            // setIsLoading(false)
    }

    let enableEdit = () => {
        if (Edit == false) {
            setEdit(true)
        }
        else {
            setEdit(false)
        }

    }

    const updateInfo = () => {
        setIsLoading(true)
        firestore()
            .collection('Driver')
            .doc(docId)
            .update({
                Cnic: Cnic,
                MobNo: MobNo,
                name: name
            })
            .then(() => {
                userData()
                enableEdit()
                console.log('User updated!');
                setIsLoading(true)
                ToastAndroid.show("User updated!", ToastAndroid.LONG);
            });
    }


    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <ScrollView keyboardShouldPersistTaps="always">
            {isLoading == true ? (
                <View style={{ height: hp(100), justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={25} color={'black'} />
                </View>
            ) : (
                    <View style={{ flex: 1, top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>

                        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#F1F1F1" }}>

                            <View style={{ height: hp(2) }} />

                            <View style={{ height: hp(19), width: hp(20), borderRadius: hp(20 / 2), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center", elevation: 10, }}>
                                {
                                    isLoading ?
                                        console.log("hahahahhaha", UserInfo, imageUrl)
                                        :
                                        console.log("hello ", UserInfo.imageUrl)
                                }
                                <Image source={{ uri: UserInfo.imageUrl }} style={{ height: hp(18), width: hp(18), borderRadius: hp(18) / 2, position: "absolute" }} />
                                <View style={{ height: hp(3), width: hp(3), borderRadius: hp(3 / 2), backgroundColor: "#E5871B", justifyContent: "center", alignItems: "center", top: hp(9) }}>
                                    < FEIcon name="edit" size={10} />
                                </View>
                            </View>



                            <View style={{ top: hp(3) }}>
                                <TextInput onChangeText={(val) => { setName(val) }} style={{ fontSize: Size(2.5), fontWeight: "bold", color: "black" }} editable={Edit == true ? true : false} value={name} />
                            </View>


                            <View style={{ height: hp(60), width: wp(100), backgroundColor: "white", top: hp(8), elevation: 1, }}>



                                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#00000029", alignItems: "center", paddingHorizontal: wp(4), paddingVertical: hp(1.5) }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                                        <Image source={Images.email} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                        <Text style={{ marginLeft: wp(2) }}>Email: </Text>
                                        <TextInput style={{ marginTop: hp(1), fontSize: Size(1.8), color: 'black', marginLeft: wp(3) }} editable={false} value={UserInfo.email} />

                                    </View>
                                    <View>
                                        <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#00000029", alignItems: "center", paddingHorizontal: wp(4), paddingVertical: hp(1.5) }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                                        <Image source={Images.card} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                        <Text style={{ marginLeft: wp(2) }}>CNIC:</Text>
                                        <TextInput onChangeText={(val) => { setCnic(val) }} style={{ marginTop: hp(1), fontSize: Size(1.8), color: 'black', marginLeft: wp(3) }} editable={Edit == true ? true : false} value={Cnic} />

                                    </View>
                                    <View>
                                        <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#00000029", alignItems: "center", paddingHorizontal: wp(4), paddingVertical: hp(1.5) }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                                        <Image source={Images.mob} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                        <Text style={{ marginLeft: wp(2) }}>Mobile:</Text>
                                        <TextInput onChangeText={(val) => { setMobNo(val) }} style={{ marginTop: hp(1), fontSize: Size(1.8), color: 'black', marginLeft: wp(3) }} editable={Edit == true ? true : false} value={MobNo} />
                                    </View>
                                    <View>
                                        <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                                    </View>
                                </View>

                                {/* {
                                    Edit == false ?
                                        <TouchableOpacity onPress={() => { enableEdit() }}
                                            style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#00000029", alignItems: "center", paddingHorizontal: wp(4), paddingVertical: hp(1.5) }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                <Image source={Images.edit} style={{ height: hp(4), width: wp(4), opacity: .3 }} resizeMode="contain" />
                                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3) }}>Edit</Text>
                                            </View>
                                            <View>
                                                <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => { updateInfo() }}
                                            style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#00000029", alignItems: "center", paddingHorizontal: wp(4), paddingVertical: hp(1.5) }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                <Image source={Images.edit} style={{ height: hp(4), width: wp(4), opacity: .3 }} resizeMode="contain" />
                                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3) }}>Save</Text>
                                            </View>
                                            <View>
                                                <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                                            </View>
                                        </TouchableOpacity>
                                } */}
                                {/* {
                                    Edit == false ?
                                        <TouchableOpacity onPress={() => { AsyncStorage.removeItem('UUID'); props.navigation.replace('login') }}
                                            style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#00000029", alignItems: "center", paddingHorizontal: wp(4), paddingVertical: hp(1.5) }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                <Image source={Images.logout} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3) }}>Logout</Text>
                                            </View>
                                            <View>
                                                <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        null
                                } */}

                                <View style={{ height: hp(7) }} />
                                <View style={{ flexDirection: 'row', justifyContent: Edit == false ? 'space-around' : 'center' }}>
                                    <View style={{ height: hp(5) }}>
                                        {
                                            Edit == false ?
                                                <Button
                                                    fontWeight={'bold'}
                                                    onPress={() => { enableEdit() }}
                                                    borderWidth={0.5}
                                                    backgroundColor={Colors.primary}
                                                    Icon={null} IconName={null}
                                                    IconColor={Colors.facebookColor}
                                                    width={wp('40%')} size={wp('5%')}
                                                    IconLeftMargin={wp('3%')}
                                                    borderRadius={wp('10%')}
                                                    text={'Edit'}
                                                    borderColor={Colors.primary}
                                                    textColor={Colors.white}

                                                    fontSize={Size(1.8)} >
                                                </Button>
                                                :
                                                <Button
                                                    fontWeight={'bold'}
                                                    onPress={() => { updateInfo() }}
                                                    borderWidth={0.5}
                                                    backgroundColor={Colors.primary}
                                                    Icon={null} IconName={null}
                                                    IconColor={Colors.facebookColor}
                                                    width={wp('40%')} size={wp('5%')}
                                                    IconLeftMargin={wp('3%')}
                                                    borderRadius={wp('10%')}
                                                    text={'Save'}
                                                    textColor={Colors.white}
                                                    borderColor={Colors.primary}
                                                    fontSize={Size(1.8)} >
                                                </Button>
                                        }
                                    </View>
                                    <View style={{ height: hp(5) }}>
                                        {

                                            Edit == false ?
                                                <Button
                                                    fontWeight={'bold'}
                                                    onPress={() => { AsyncStorage.removeItem('UUID'); props.navigation.replace('login') }}
                                                    borderWidth={0.5}
                                                    backgroundColor={Colors.primary}
                                                    Icon={null} IconName={null}
                                                    IconColor={Colors.facebookColor}
                                                    width={wp('40%')} size={wp('5%')}
                                                    IconLeftMargin={wp('3%')}
                                                    borderRadius={wp('10%')}
                                                    text={'Logout'}
                                                    textColor={Colors.white}
                                                    borderColor={Colors.primary}
                                                    fontSize={Size(1.8)} >
                                                </Button>
                                                :
                                                null
                                        }

                                    </View>
                                </View>


                            </View>

                        </View>
                    </View>
                )}

        </ScrollView>
    </KeyboardAvoidingView>
    );
}

export { Profile };