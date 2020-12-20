import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
// import UserInput from '../../component/userInput/index';
import { Header } from '../../../component/header/index';
import { Button } from '../../../component/button/index';
import FontistoIcon from "react-native-vector-icons/Fontisto";

import LinearGradient from 'react-native-linear-gradient'

const Setting = (props) => {
    const [category, setCategory] = useState('male')






    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
       {/* <ScrollView> */}
            <View style={{top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>

                <LinearGradient colors={Colors.linearGradient1} style={{ height: hp(10), width: wp(100) }}>

                <View style={{ flex: 1 }}>
                    <View style={{ height: hp(10), marginHorizontal: wp(5) }}>
                        <Header
                            color={Colors.white}
                            iconColor={Colors.white}
                            heading={'SETTINGS'}
                            Icon={MIcon}
                            name={'keyboard-arrow-left'}
                            size={Size(3)}>

                        </Header>
                    </View>
                </View>
                </LinearGradient>
              
                
                {/* <View style={{marginBottom:wp(10)}}> */}
             
                <ScrollView >
                <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>Verify your profile</Text>
                        </View>
                    </View>
                    


                    <View style={{ height: hp(17), width: wp(100), backgroundColor: "white", elevation: 1, }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.picture} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Photo Verification</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                        


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.id} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>ID Verification</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.phone} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Mobile Phone Verification</Text>
                            </View>

                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>


                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>Notifiations</Text>
                        </View>
                    </View>


                    <View style={{ height: hp(17), width: wp(100), backgroundColor: "white", elevation: 1, }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.email} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Email (sardarmalik@gmail.com)</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                        


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.transfer} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Mobile Push</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.speaker} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Sounds</Text>
                            </View>

                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>




{/* Privacys */}
                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>Privacy</Text>
                        </View>
                    </View>


                    <View style={{ height: hp(17), width: wp(100), backgroundColor: "white", elevation: 1, }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.eye} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>My Profile is visible to</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                        


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.txt} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Keep Chat History</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.picture} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Who can contact me</Text>
                            </View>

                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    
                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>About</Text>
                        </View>
                    </View>


                    <View style={{ height: hp(17), width: wp(100), backgroundColor: "white", elevation: 1, }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.term} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Terms and Conditions</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                        


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.firewall} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Privacy</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.download} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>About</Text>
                            </View>

                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>




                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>Personal Information and Security</Text>
                        </View>
                    </View>


                    <View style={{ height: hp(30), width: wp(100), backgroundColor: "white", elevation: 1, }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.email} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Change Email Address</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                        


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.password} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Change Password</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.download} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Download Your Information</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                borderBottomWidth: 1, borderBottomColor: "#00000029",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(1)
                            }}>

                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.logout} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Logout</Text>
                            </View>
                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",paddingHorizontal:wp(5),paddingVertical:hp(.5)
                            }}>
                            <View
                                style={{ flexDirection: "row", alignItems: "center",}}>
                                <Image source={Images.delete} style={{ height: hp(4), width: wp(4) }} resizeMode="contain" />
                                <Text style={{ fontSize: Size(1.8), marginLeft: wp(3), color: "#535353" }}>Delete Account</Text>
                            </View>

                            <Image source={Images.leftarrow} style={{ height: hp(3), width: wp(3) }} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style = {{height:hp(20)}}/>

                    </ScrollView>


                {/* </View> */}


            </View>
            {/* </ScrollView> */}
    </KeyboardAvoidingView>
    );
}

export { Setting };