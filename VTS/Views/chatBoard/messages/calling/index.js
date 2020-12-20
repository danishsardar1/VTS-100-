import React, { useState } from 'react';
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
import { Colors, Images, hp, wp, Size, Font } from "../../../../assets/index";



const Calling = () => {

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.os == 'ios' ? 'padding' : null}>
            <View style={{ height: hp(100), top: Platform.os == 'ios' ? IOS : 0 }}>
                <View style = {{height: hp(85), backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source = {Images.img1} style = {{height: hp(18), width: hp(18), borderRadius: hp(100/2)}}/>
                        <View style = {{height:hp(5)}}/>
                        <Text style = {{color: 'white'}}>CLAIRE KUMAS</Text>
                        <View style = {{height:hp(1)}}/>
                        <Text style = {{color: 'white', opacity: 0.7}}>Calling...</Text>
                </View>
                <View style = {{height: hp(15), backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', height: hp(8), width: hp(8), borderRadius: hp(100/2), elevation: 5, backgroundColor: 'gray'}}>
                        <FEIcon size = {20} name = 'plus' color = {'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', height: hp(8), width: hp(8), borderRadius: hp(100/2), elevation: 5, backgroundColor: 'gray'}}>
                        <FEIcon size = {20} name = 'video' color = {'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', height: hp(8), width: hp(8), borderRadius: hp(100/2), elevation: 5, backgroundColor: Colors.callingBPink}}>
                        <FEIcon size = {20} name = 'phone-call' color = {'white'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export { Calling }