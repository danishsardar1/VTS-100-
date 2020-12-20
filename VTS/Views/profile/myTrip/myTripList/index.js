import React, { useContext, useState } from 'react';
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

import LinearGradient from 'react-native-linear-gradient'

const types = ['beech break', 'foodie tour', 'side seeing', 'shopping trip']
const tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const MyTripList = (props) => {

    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        {/* <ScrollView> */}
        <View style={{ height: hp(100), top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>

            <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(10), width: wp(100) }}></LinearGradient>

            <View style={{ flex: 1 }}>
                <View style={{ height: hp(10), marginHorizontal: wp(5) }}>
                    <Header
                        color={Colors.white}
                        iconColor={Colors.white}
                        heading={'MY Request List'}
                        name={'keyboard-arrow-left'}
                        size={Size(5)}>
                    </Header>
                </View>
            </View>

            <View style={{ height: hp(90), width: wp(100), }}>
                <View
                    style={{
                        height: hp(15),
                        width: wp(100),
                        backgroundColor: Colors.white,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                    <View style={{ height: hp(7), width: wp(80), alignItems: "center", }}>
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
                            text={'Requested Schools'}
                            textColor={"#F8AA14"}
                            borderColor={"#F8AA14"}
                            fontSize={Size(1.8)} >

                        </Button>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: wp(6) }}>
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

                </View>
            </View>
        </View>
        {/* </ScrollView> */}
    </KeyboardAvoidingView>
    );
}

export { MyTripList };