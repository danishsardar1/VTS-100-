import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity,FlatList } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../../assets/index';

import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'

// import { colors } from 'g:/singup solution/bonnie/bonnie/assets';

const flags = [Images.flag,Images.flag, Images.flag, Images.flag]

const TravellerDetails = () => {
    const [category, setCategory] = useState('male')

    const data = [
        {images:Images.img4 , name: "Hussain Khan, 20"},
        {images:Images.img2 , name: "Hussain Khan, 20"},
        {images:Images.img3 , name: "Hussain Khan, 20"},
        {images:Images.img1 , name: "Hussain Khan, 20"},
        {images:Images.img2 , name: "Hussain Khan, 20"},
        {images:Images.img4 , name: "Hussain Khan, 20"},
        {images:Images.img3 , name: "Hussain Khan, 20"},
        {images:Images.img1 , name: "Hussain Khan, 20"},
        {images:Images.img3 , name: "Hussain Khan, 20"},
        {images:Images.img1 , name: "Hussain Khan, 20"},
        {images:Images.img3 , name: "Hussain Khan, 20"},
        {images:Images.img2 , name: "Hussain Khan, 20"},
        {images:Images.img2 , name: "Hussain Khan, 20"},
        {images:Images.img2 , name: "Hussain Khan, 20"},
        {images:Images.img2 , name: "Hussain Khan, 20"},

]



    return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <ScrollView>
        <View style={{ top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
           
            <View style = {{height:hp(32),width:wp(100),position:"absolute"}}>
            <Swiper activeDot={<View style={{backgroundColor: '#fff',borderWidth : 1.3, borderColor : Colors.primary, width: 12, height: 12, borderRadius: 12/2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,justifyContent : 'center', alignItems : 'center'}} >
                        <View  style={{backgroundColor: Colors.primary, width: 6, height: 6, borderRadius : 6/2}}></View>
                    </View>} 
                    dot={<View style={{backgroundColor: 'transparent',borderWidth : 1.3, borderColor : 'white', width: 12, height: 12, borderRadius: 12/2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,justifyContent : 'center', alignItems : 'center'}} >
                </View>}
                    showsButtons={false} loop={false} >
                        <View style={{flex : 1}}>
                        <Image source = {Images.img2} style ={{height:hp(35),width:wp(100)}}/>
                        </View>
                        <View style={{flex : 1}}>
                        <Image source = {Images.img2} style ={{height:hp(35),width:wp(100)}}/>
                        </View>
                        <View style={{flex : 1}}>
                        <Image source = {Images.img2} style ={{height:hp(35),width:wp(100)}}/>
                        </View>
                    </Swiper>  
                </View>

            <View style={{ height:hp(12), marginTop : hp(30),backgroundColor : '#fff', borderTopLeftRadius : wp(5),borderTopRightRadius : wp(5), elevation : 8,position : 'absolute' }}>

                <View style={{height : hp(12),flexDirection:"row", borderTopLeftRadius : wp(5),borderTopRightRadius : wp(5)}}>
                    <TouchableOpacity style = {{height:hp(12),borderTopLeftRadius : wp(5),backgroundColor:"#9932CC",width:wp(50),alignItems:"center",}}>
                        <Text style = {{color: Colors.white,fontSize:Size(2.5),paddingTop:hp(2)}}>Message</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style = {{height:hp(12),borderTopRightRadius : wp(5),backgroundColor:"#fff",width:wp(50),alignItems:"center",}}>
                        <Text style = {{color: Colors.black,fontSize:Size(2.5),paddingTop:hp(2)}}>Meet</Text>
                    </TouchableOpacity>

                </View>
                </View>
                <View style={{height : '100%', marginTop : hp(37),paddingTop : hp(5), backgroundColor : '#fff', borderTopLeftRadius : wp(5),borderTopRightRadius : wp(5), elevation : 25}}>
                   <View style={{flexDirection : 'row', paddingHorizontal : wp(5) }}>
                    <View style={{
                        backgroundColor : 'lightgreen',
                        height : wp(5),
                        width : wp(5),
                        borderWidth : 2,
                        borderColor : Colors.white,
                        elevation : 5,
                        alignSelf : 'center',
                        borderRadius : wp(5)/2,
                    }}></View>

                    {/* Driver name, flag country */}


                    <View style={{justifyContent : 'center', alignItems : 'center', marginHorizontal : wp(3), paddingHorizontal : wp(5) }}>
                        <Text style={{fontSize : Size(3), fontWeight : 'bold', color : 'rgba(0,0,0,0.7)'}}>Hussain Khan, 20</Text>
                    </View>
                    </View>
                    <View style={{height : hp(1)}}></View>
                    <View style={{flexDirection : 'row', paddingHorizontal : wp(5) }}>
                    <View style={{
                        justifyContent : 'center',
                        alignItems : 'center'
                    }}>
                        <Image source={Images.flag} resizeMode='contain' style={{height : wp(15), width : wp(15)}}></Image>
                    </View>
                    <View style={{justifyContent : 'center', alignItems : 'flex-start', marginHorizontal : wp(3)}}>
                        <Text style={{fontSize : Size(2), color : 'rgba(0,0,0,0.7)'}}>Pakistan</Text>
                        <Text style={{fontSize : Size(1.3), color : 'rgba(0,0,0,0.7)'}}>19 Nov 1999</Text>
                    </View>
                    </View>
                    <View style={{height : hp(3)}}></View>
                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                       
                       
                    {/* Description */}

                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>Description</Text>
                        </View>
                    </View>

                    <Text style={{paddingHorizontal : wp(5), marginVertical : hp(2),lineHeight : hp(3)}}>Pick and Drop from 6am to 7pm. He goes academy too.</Text>
                    <View style={{height : hp(3)}}></View>
                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        
                        
                    {/* Prefrred Areas */}
                        
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>School </Text>
                        </View>
                    </View>
                    <Text style={{paddingHorizontal : wp(5), marginVertical : hp(2),lineHeight : hp(3)}}>ICB G-6/3</Text>
                    <View style={{height : hp(3)}}></View>
                    <View style={{flexDirection : 'row',backgroundColor : 'rgba(0,0,0,0.1)', paddingHorizontal : wp(5) }}>
                        <View>
                        <Text style={{fontSize : Size(2),paddingVertical : hp(.7) }}>Students Details</Text>
                        </View>
                    </View>
                    <Text style={{paddingHorizontal : wp(5), marginVertical : hp(2),lineHeight : hp(3)}}> School timing : 8am - 2pm {"\n"} Class: Matric {"\n"} Average Rating : *****</Text>
                    <View style={{height : hp(2)}}></View>
                    <LinearGradient start={{x : 0 , y : 0}} end={{x : 1,y : 1}}  colors={Colors.linearGradient1} style={{width : wp('90%'),justifyContent : 'center', alignSelf : 'center', alignItems : 'center',height : hp(6), borderRadius : wp('10%')}}>
                        <Text style={{color : '#fff'}}>Rate Me</Text>
                    </LinearGradient> 
                     <View style={{height : hp(2)}}></View>
                    <TouchableOpacity  style={{width : wp('90%'),borderWidth : 1,justifyContent : 'center', alignSelf : 'center', alignItems : 'center',height : hp(6), borderRadius : wp('10%')}}>
                        <Text style={{color : '#000'}}>Close</Text>
                    </TouchableOpacity>  

                </View>               
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}

export {TravellerDetails};