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

const AddTrips = (props) => {
    const [category, setCategory] = useState('male')






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
                            Icon={MIcon}
                            name={'keyboard-arrow-left'}
                            size={Size(5)}>

                        </Header>
                    </View>
                </View>


                <View style={{ height: hp(90), width: wp(100), alignItems: "center" }}>


                    <View style={{ height: hp(54), width: wp(100), backgroundColor: "white", elevation: 1, padding: wp(3) }}>

                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center", padding: wp(3)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.user} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>School Name</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center", padding: wp(3)
                            }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.world} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Destination</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        {/* <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center", padding: wp(3)
                            }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.calendar} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>From</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1,
                                borderBottomColor: "#00000029",
                                alignItems: "center",
                                padding: wp(3)
                            }}>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.calendar} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Till</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center", padding: wp(3)
                            }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.luggage} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Trip description</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity> */}


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center", padding: wp(3)
                            }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.pathway} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Purpose of Requesting</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center", padding: wp(3)
                            }}>

                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <Image source={Images.card} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Have You searched the list?</Text>
                            </View>

                            <Image source={Images.down} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>





                    </View>


                    <View style={{ height: hp(7), width: wp(80), top: hp(5), }}>

                        <Button

                            fontWeight={'bold'}
                            onPress={() => props.navigation.navigate("MyTripList") }
                            borderWidth={0.5}
                            backgroundColor={"#9932CC"}
                            Icon={null} IconName={null}
                            IconColor={Colors.facebookColor}
                            width={wp('77%')} size={wp('5%')}
                            IconLeftMargin={wp('3%')}
                            borderRadius={wp('10%')}
                            text={'Submit Request'}
                            textColor={Colors.white}
                            borderColor={"#F8AA14"}
                            fontSize={Size(1.8)} >

                        </Button>

                    </View>



                </View>










            </View>
        {/* </ScrollView> */}
    </KeyboardAvoidingView>
    );
}

export { AddTrips };