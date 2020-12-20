import React, {useState} from 'react'
import {View, Image} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Colors, Images, hp, wp, Size, Font } from "../../../assets/index";
import ImagePicker from 'react-native-image-picker';
import {Chats} from '../../chatBoard/messages/chat/index'
import {Calls} from '../../chatBoard/messages/call/index'
import {Camra} from '../../chatBoard/messages/camra/index'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();

// myCamra = () => {

//   ImagePicker.showImagePicker((response) => {
//     console.log('Response = ', response);
  
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       console.log('User tapped custom button: ', response.customButton);
//     } else {
//       const source = { uri: response.uri };
//     }
//   })
// }

function MyTabs(props) {
  
  

  var [camraVisible , setCamraVisible] = useState(true)
  return (
     
        <Tab.Navigator  tabBarOptions={{
          labelStyle: { fontSize: 12 },
          // lazy: 'true',
          showIcon: 'true',
          indicatorStyle: {backgroundColor: Colors.primary},
          style: {elevation: 0, height : hp(7)},
        }} >
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Calls" component={Calls} 
          // options={{
          //   tabBarIcon: ({ focused }) => 
          //   focused ? ({
          //     setCamraVisible(true)
          //   }):(null)
          // }}
        />
        <Tab.Screen name = "Notefication" component={Camra} 
          // tabPress={()=>{alert('hi')}}
          options={{
            tabBarLabel : '',
            
            // tabBarLabel: null,
            // tabBarLabel:{focused: false,},
            // tabBarIcon: ({ focused }) =>
            //     focused ? (
            //             <Image source = {Images.camraIcon} resizeMode = 'contain' style = {{height: hp(4), width: wp(8), alignSelf: 'center'}}/>

            //       ) : (
                      
            //               <Image source = {Images.camraIcon} resizeMode = 'contain' style = {{height: hp(4), width: wp(8), alignSelf: 'center'}}/>
            //         ),   
                }}
                />
        </Tab.Navigator>
  );
}
export {MyTabs}