import React,{useContext, useState} from 'react';
import {View,Text,KeyboardAvoidingView,ScrollView,Image,TouchableOpacity} from 'react-native';
import { hp , wp,Size,Colors, Images} from '../../assets/index';
import UserInput from '../../component/userInput/index';
import {Header} from '../../component/header/index';
import LinearGradient from 'react-native-linear-gradient'







const types = ['ICG F-6/2','IMCG G-6/3', 'Model College','FG College']
const tempArray = [1,2,3,4,5,6,7,8,9]
const Travellers = (props) => {
  const [category , setCategory] = useState('male')
  return ( <KeyboardAvoidingView style={{flex : 1}} behavior={(Platform.OS === 'ios')? "padding" : null}>  
  <View style={{height : hp(100),top : Platform.OS=='ios' ? IOS : 0, backgroundColor : Colors.white}}>
      <LinearGradient colors={Colors.linearGradient1} style={{position : 'absolute', height : hp(35), width : wp(100)}}></LinearGradient>
  <View style={{flex : 1}}>
      <View style={{height : hp(13), marginHorizontal : wp(5)}}>
        <Header color={Colors.white} iconColor={Colors.white} heading={'Students'} ></Header>
      </View>








            
          <View style={{height : hp(88),paddingTop : hp(2),backgroundColor : '#fff', borderTopLeftRadius : wp(5),borderTopRightRadius : wp(5), elevation : 10, paddingHorizontal : wp(3)}}>
            <ScrollView>
                {tempArray.map(i => {
                return <TouchableOpacity onPress={()=>{props.navigation.navigate('travellerDetails')}} style={{height : hp(9),marginVertical : hp(2.7), width : '100%'}}>
                    <View style={{flex : 1, flexDirection : 'row'}}>
                        <View style={{flex : .25}}>
                            <View style={{justifyContent : 'center', alignItems : 'center', height : '100%', width : '100%'}}>
                                <View style={{borderRadius : wp(19)/2, borderWidth : 3, borderColor : 'white', elevation : 14, backgroundColor : Colors.white}}>
                                    <Image source={{uri : 'https://cdn.iconscout.com/icon/free/png-256/man-1659496-1410018.png'}}  style={{height : wp(17.5), width : wp(17.5), borderRadius : wp(17.5)/2, borderColor : 'white'}}></Image>
                                    </View>
                            </View>
                        </View>






                        <View style={{flex : .75, marginHorizontal  :wp(2)}}>
                            <Text style={{fontSize : Size(2)}}>Hussain Khan, 20</Text>
                            <Text style={{fontSize : Size(1.2), color : Colors.primary}}>Rawalpindi</Text>
                            <Text style={{fontSize : Size(1.2), color : Colors.gray}}>New van and reasonable charges</Text>
                            <View style={{flexDirection : 'row'}}>
                            
                            {types.map(i => {
                                return <Text style={{fontSize : Size(0.9), color : Colors.white, backgroundColor : 'rgba(0,0,0,0.25)', paddingHorizontal : wp(2), marginHorizontal : wp(.5), marginTop : hp(.5), borderRadius : wp(2)}}>{i}</Text>
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
</KeyboardAvoidingView>);
}

export {Travellers};