import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
// import UserInput from '../../component/userInput/index';
import { Header } from '../../../../component/header/index';
import { Button } from '../../../../component/button/index';
import FontistoIcon from "react-native-vector-icons/Fontisto";
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient'
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const types = ['beech break', 'foodie tour', 'side seeing', 'shopping trip']
const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let doc = ''
const MyTripList = (props) => {
    var [items, setItems] = useState([]);
    const [school, setSchool] = useState([])
    const [value, setValue] = useState(null);
    const [labelValue, setLabelValue] = useState('')
    const [isLoading, setIsLoading] = useState(false);

  let controller;

    useEffect(() => {
        getSchool()
            firestore()
            .collection('Driver')
            .where('uid', '==' , auth().currentUser.uid)
            .onSnapshot(i => {
                doc = ''
                i.forEach( j => {
                    doc = j.id
                })
            })
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
            let arr = []
            school.map(
                (data,index) => (
                 
                 
               arr[index] =   {
                    label: data.Name,
                    value: data.SchoolCode,
                }
                )
                // setIsLoading(false)
            );
            console.log("newArray", arr)
            setItems(arr)
            //  arr2 = arr.map(
            //     async (data) => {
            //         await items.push(data)
            //     }
    
            // );
            
            //    setItems(arr)
            setIsLoading(false)
            console.log("newArray2", items)
            // Driver(value)
        }, 1000);
    
    }

    const onUpdateSchool = () => {
        firestore()
        .collection('Driver')
        .doc(doc)
        .update({
            SchoolName : labelValue,
            SchoolCode : value
        })
        alert("School changed succesfully!")
    }
    

    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        {/* <ScrollView> */}
        <View style={{ height: hp(100), top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>

            <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(10), width: wp(100) }}></LinearGradient>

            <View style={{ flex: 1 }}>
                <View style={{ height: hp(10), marginHorizontal: wp(5) }}>
                    <Header
                        color={Colors.white}
                        iconColor={Colors.white}
                        heading={'Request School'}
                        name={'keyboard-arrow-left'}
                        size={Size(5)}>
                    </Header>
                </View>
            </View>

            <View style={{ height: hp(90), width: wp(100), }}>
                <View
                    style={{
                        height: hp(30),
                        width: wp(100),
                        backgroundColor: Colors.white,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                        <View style={{ height: hp(5) }}>
                      {/* <UserInput onChangeText={(val) => { setSchoolCode(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='School Code.' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.code} iconSize={20} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput> */}
                      <DropDownPicker
                        searchable={true}
                        searchablePlaceholder="Search for the School"
                        items={items}
                        placeholder={'Select a School'}
                        controller={instance => controller = instance}
                        containerStyle={{ height: 40, width : wp(80) }}
                        dropDownMaxHeight={hp(27)}
                        itemStyle={{
                          justifyContent: 'flex-start'
                        }}
                        // onChangeList={(items, callback) => {
                        //     // new Promise((resolve, reject) => resolve(setItems(items)))
                        //     //     .then(() => callback())
                        //     //     .catch(() => { });
                        // }}
    
                        defaultValue={value}
                        onChangeItem={item => { setValue(item.value), setLabelValue(item.label) }}
                      />
                    </View>
                <View style={{ height: hp(7), width: wp(80), alignItems: "center", marginTop : hp(2) , }}>
                        <Button
                            fontWeight={'bold'}
                            onPress={() => onUpdateSchool()}
                            borderWidth={0.5}
                            backgroundColor={Colors.white}
                            Icon={null} IconName={null}
                            IconColor={Colors.facebookColor}
                            width={wp('77%')} size={wp('5%')}
                            IconLeftMargin={wp('3%')}
                            borderRadius={wp('10%')}
                            text={'Update School'}
                            textColor={Colors.primary}
                            borderColor={Colors.primary}
                            fontSize={Size(1.8)} >

                        </Button>
                    </View>
                    <View style={{ height: hp(7), width: wp(80), alignItems: "center", marginTop : hp(2) , }}>
                        <Button
                            fontWeight={'bold'}
                            onPress={() => { props.navigation.navigate('RequestSchool') }}
                            borderWidth={0.5}
                            backgroundColor={Colors.white}
                            Icon={null} IconName={null}
                            IconColor={Colors.facebookColor}
                            width={wp('77%')} size={wp('5%')}
                            IconLeftMargin={wp('3%')}
                            borderRadius={wp('10%')}
                            text={'Click to request school'}
                            textColor={Colors.primary}
                            borderColor={Colors.primary}
                            fontSize={Size(1.8)} >

                        </Button>
                    </View>
                </View>

                {/* <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: wp(6) }}>
                    <View>
                        <Text style={{ fontSize: Size(2), paddingVertical: hp(.7) }}>Within a month</Text>
                    </View>
                </View>

                <View style={{ height: hp(70), width: wp(100), backgroundColor: Colors.white, marginHorizontal: wp(3.5) }}>

                    <ScrollView style={{ marginBottom: hp(5) }}>
                        {tempArray.map(i => {
                            return <TouchableOpacity onPress={() => { props.navigation.navigate('travellerDetails') }} style={{ height: hp(9), marginVertical: hp(2.7), width: '100%' }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: .25 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                            <View style={{ height: wp(19), width: wp(19), borderRadius: wp(19) / 2, borderWidth: 3, borderColor: 'white', elevation: 14, backgroundColor: Colors.white, alignItems: "center", justifyContent: "center" }}>
                                                <Image source={Images.school1} style={{ height: wp(18), width: wp(18), borderRadius: wp(18) / 2, borderColor: 'white', position: "absolute" }}></Image>
                                                <View style={{ height: wp(2), width: wp(2), borderRadius: wp(2) / 2, backgroundColor: "#29C729", top: hp(3.5), left: wp(6) }} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: .75, marginHorizontal: wp(2) }}>
                                        <Text style={{ fontSize: Size(2) }}>ICG F-6/2 Islamabad</Text>
                                        <Text style={{ fontSize: Size(1.2), color: Colors.primary }}>Islamabad</Text>
                                        <Text style={{ fontSize: Size(1.2), color: Colors.gray }}>My Requests</Text>
                                        <View style={{ flexDirection: 'row' }}>

                                            {types.map(i => {
                                                return <Text style={{ fontSize: Size(0.9), color: Colors.white, backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: wp(2), marginHorizontal: wp(.5), marginTop: hp(.5), borderRadius: wp(2) }}>{i}</Text>
                                            })}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        })}
                    </ScrollView>

                </View> */}
            </View>
        </View>
        {/* </ScrollView> */}
    </KeyboardAvoidingView>
    );
}

export { MyTripList };