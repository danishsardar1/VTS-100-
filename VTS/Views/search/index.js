import React, { useContext, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';



var Childs = '';
var arr = []
var arr2 = []

const Search = (props) => {
    const [UserInfo, setUserInfo] = useState([])
    const [Childss, setChild] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [value, setValue] = useState(null);
    let [items, setItems] = useState([]);
    const [school, setSchool] = useState([])
    let controller;

    useEffect(() => {
        getSchool()
        // ChildCode()
        // userData()
    }, []);

    const getSchool = () => {
        setIsLoading(true)
        setItems([])
        firestore()
            .collection('Schools')
            .onSnapshot(async i => {
                setSchool([])
                i.forEach(j => {
                    school.push(j.data())
                })
                console.log("SSSHelloo", school)

            })
        console.log("school2222222222222222222222222222222222222222222", school)

        setTimeout(() => {

            items = []
            
            arr = school.map(
                (data) => ({
                    label: data.Name,
                    value: data.SchoolCode,
                })
                // setIsLoading(false)
            );
            console.log("newArray", arr)
            setItems(arr)
             arr2 = arr.map(
                async (data) => {
                    await items.push(data)
                }

            );
            
            //    setItems(arr)
            setIsLoading(false)
            console.log("newArray2", items)
            Driver(value)
        }, 1000);

    }

    const Driver = async (value) => {
        setIsLoading(true)
        firestore()
            .collection('Driver')
            .where('SchoolCode', '==', value)
            .onSnapshot(async i => {
                // setUserInfo([])
                    // setUserInfo([])

                let UserInfos = []
                i.forEach(j => {
                    UserInfos.push(j.data())
                })
                setTimeout(() => {
                    setUserInfo(UserInfos)
                    console.log("UserInfo", UserInfos)
                    setIsLoading(false)
                }, 1000);

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
                    <View style={{ height: hp(13) }}>
                        <View style={{ height: hp(13), marginHorizontal: wp(5), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate('myDriver') }} style={{ justifyContent: 'center', width: wp(25), borderWidth: 1, borderColor: 'white', borderRadius: 5, alignItems: 'center', position: 'absolute' }}>
                                <Text style={{ color: Colors.white, }}>
                                    My Drivers
                                </Text>
                            </TouchableOpacity>
                            <Header color={Colors.white} iconColor={Colors.white} heading={'Driver'} Icon={MIcon} size={Size(5)}></Header>
                        </View>
                    </View>
                    <View style={{ height: hp(85), backgroundColor: '#fff', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), elevation: 10, paddingHorizontal: wp(5) }}>
                        <View style = {{height: hp(3)}}/>
                        <View>
                            {
                                items.length > 0 &&
                                <DropDownPicker
                                    searchable={true}
                                    searchablePlaceholder="Search for the School"
                                    items={items}
                                    controller={instance => controller = instance}
                                    // dropDownMaxHeight = {200}
                                    containerStyle={{ height: 40 }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                        
                                    }}

                                    defaultValue={value}
                                    onChangeItem={item => { Driver(item.value), setValue(item.value) }}
                                />
                            }
                        </View>
                        <View style = {{height: hp(1)}}/>
                        {/* <ImageBackground resizeMode = 'contain' source = {Images.page1} style = {{width: wp(75), height: hp(75), alignSelf: 'center', opacity: 0.3,}}></ImageBackground> */}

                        <View style={{ height: hp(85), }}>
                            {isLoading == false ? (
                                // <Text>{Child.MobNo}</Text>
                                <FlatList
                                    // numColumns={3}
                                    data={UserInfo}
                                    style={{ marginTop: hp(1), marginBottom: hp(9) }}
                                    keyExtractor={(item, index) => {
                                        return  index.toString();
                                       }}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity key = {index} onPress={() => { props.navigation.navigate('profile', { item: item, location: false, request: true, remove: false })}} style={{ height: hp(9), marginVertical: hp(2), width: '100%' }}>
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
                                              
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )}
                                />

                            ) : (
                                    <ActivityIndicator size={25} color={'black'} />

                                )}
                            <View style={{ height: 60 }} />
                        </View>
                    </View>
                </View>
                {/* )} */}
            </View>
        </KeyboardAvoidingView>
        );
    }
}

export { Search };