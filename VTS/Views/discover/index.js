// import React, { Component } from 'react';
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

import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Colors, Images, hp, wp, Size, Font } from "../../assets/index";



const Discover = () => {
    
    const ENTRIES1 = [
        {
            image: Images.maskGroup,
            name: 'Adriana Rose, 22',
            location: 'Blue Mountain Park'
        },
        {
            image: Images.maskGroup,
            name: 'Adriana Rose, 22',
            location: 'Blue Mountain Park'

        },
        {
            image: Images.maskGroup,
            name: 'Adriana Rose, 22',
            location: 'Blue Mountain Park'
        },

    ];
    const _renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={{ width: '100%', height: '100%', }}>
                <ParallaxImage
                    containerStyle={{
                        flex: 1,
                        opacity: 1,
                        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
                        backgroundColor: 'white',
                        borderRadius: 8,
                        borderRadius: wp(3)
                    }}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        resizeMode: 'cover',
                    }}
                    parallaxFactor={1}


                //   {...parallaxProps}
                />
                <View style={{  position: 'absolute', height: '90%', width: '90%', borderRadius: wp(3),  }}>
                    <View style={{flex: 8, flexDirection: 'row' }}>
                        <View style = {{position: 'absolute'}}>
                            <Image source={item.image} style={{ height: hp(55), width: wp(80) }} />
                        </View>
                        <View style = {{paddingHorizontal: wp(5), height: hp(6), width: wp(80), alignItems: 'flex-end'}}>
                                <View style = {{height: hp(2)}}/>
                            <View style = {{height: hp(4),  width: wp(25), backgroundColor: Colors.middleBlack, justifyContent: 'center', alignItems: 'center', borderRadius: 100}}>
                            <Text style = {{color: Colors.white}}>4km away</Text>
                            </View>

                        </View>

                    </View>
                        <View style={{ height: hp(2) }} />
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style= {{fontSize: Size(3)}}>{item.name}</Text>
                        </View>
                        <View style = {{height: hp(1)}}/>
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <View style ={{ height: hp(5), width: wp(50), borderWidth: 0.5, borderColor: Colors.primary, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style = {{color:Colors.primary}}>{item.location}</Text>
                            </View>
                        </View>
                        <View style={{ height: hp(2) }} />
                        <View style = {{justifyContent: 'center', alignItems:'center'}}>
                            <View style = {{height:wp(13), width:wp(13), justifyContent: 'center', alignItems: 'center', borderRadius: wp(100/2), elevation: 5,  backgroundColor: 'white'}}>
                                <Text>X</Text>
                            </View>
                        </View>
                </View>
            </View>
        );
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.os == 'ios' ? 'padding' : null}>
            <View style={{ height: hp(100), top: Platform.os == 'ios' ? IOS : 0 }}>

                <View style={{ height: hp(100), backgroundColor: 'white' }}>
                    <View style={{ height: hp(10), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: Size(2.5) }}>Discover</Text>
                    </View>
                    <View style={{ height: hp(90), }}>
                        <Carousel
                            sliderWidth={wp(100)}
                            sliderHeight={hp(80)}
                            itemWidth={wp(80)}
                            data={ENTRIES1}
                            renderItem={_renderItem}
                            hasParallaxImages={true}
                            firstItem = {ENTRIES1.length}
                            layout={'stack'} layoutCardOffset={`9`}
                        />
                       
                        <View style = {{height: hp(2)}}/>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

export { Discover }