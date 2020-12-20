import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { wp, Size } from "../../assets";

const Header = props => {
  return (
   <View style={{flex : 1}}>
       <View style={{flex : 1, flexDirection : 'row'}}>
       <TouchableOpacity onPress={props.onPress} style={{flex : .1, justifyContent : 'center', alignItems : 'center'}}>
           {props.Icon ? 
        <props.Icon color={props.iconColor} name={props.name} size={props.size}></props.Icon>
        :
        null}
       </TouchableOpacity>
       <View style={{flex : .8, justifyContent : 'center',alignItems : 'center'}}>
            <Text style={{fontSize : Size(3.3), color : props.color, fontWeight : 'bold'}}>
                {props.heading}
            </Text>
       </View>
       <View style={{flex : .1, justifyContent: 'center', alignItems: 'center'}}>
        {props.Icon ? 
            <props.Icon color={props.iconColor} name={props.nameIconLogo} size={props.size}></props.Icon>
            :
            null}
       </View>
       </View>
   </View>
  );
};


export  {Header};
