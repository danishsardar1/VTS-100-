import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity,ScrollView, KeyboardAvoidingView} from 'react-native';
import {Images, Size, wp,Colors} from '../../../assets/index';

const Page1 = (props) => {
    return (<View style={{flex : 1}}>
            <View style={{flex : .6, justifyContent : 'center', alignItems : 'center'}}>
                <Image resizeMode="contain" style={{flex : 1}} source={Images.page1}></Image>
            </View>
            <View style={{flex : .07}}></View>
            <View style={{flex : .3, marginHorizontal : wp(10)}}>
                <Text style={{fontSize : Size(3), textAlign : 'center', fontWeight : 'bold', color : Colors.middleBlack}}>Welcome to VTS</Text>
            </View>
        </View>);
}

export {Page1};