import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { wp, Size } from "../../assets";

const Header = props => {
  return (
   <View style={{flex : 1}}>
       <View style={{flex : 1, flexDirection : 'row'}}>
       {props.students ?
            <View style={{flex : .2}} />
            :
       <TouchableOpacity onPress={props.onPress} style={{flex : .1, justifyContent : 'center', alignItems : 'center'}}>
           {props.Icon ? 
        <props.Icon color={props.iconColor} name={props.name} size={props.size}></props.Icon>
        :
        null
    }
       </TouchableOpacity>}
       <View style={{flex : props.students ? .6 : .8, justifyContent : 'center',alignItems : 'center'}}>
            <Text style={{fontSize : Size(3), color : props.color, fontWeight : 'bold'}}>
                {props.heading}
            </Text>
       </View>
       {
           props.students ? 
           <TouchableOpacity onPress={props.onstudentPress} style={{ justifyContent: 'center', flex : .2,paddingVertical : 2.5,paddingHorizontal : 2.5,alignSelf : 'center', borderWidth: 1, borderColor: 'white', borderRadius: 5, alignItems: 'center' }}>
                                <Text style={{ color: '#FFFFFF' }}>
                                    Students
                                </Text>
                            </TouchableOpacity>
                            :

           props.Icon ?
                            <View style={{flex : .1, justifyContent: 'center', alignItems: 'center'}}>
        {props.Icon ? 
            <props.Icon color={props.iconColor} name={props.nameIconLogo} size={props.size}></props.Icon>
            :
            null}
       </View>
       :
       null
       }
       </View>
   </View>
  );
};


export  {Header};
