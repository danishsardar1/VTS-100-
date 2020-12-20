import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { wp } from "../../assets";

const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={
        {
            backgroundColor: props.backgroundColor,
            opacity : props.disabled ? 0.4 : 1,
            width : props.width,
            flex : 1,
            borderRadius : props.borderRadius,
            borderColor : props.borderColor,
            borderWidth : props.borderWidth
       
        }
      }
    >
      <View style={{flex : 1, flexDirection : props.Icon ? 'row' : 'column'}}>
            {props.Icon ? 
        <View style={{alignSelf : 'center',justifyContent : "flex-start", position : "absolute", marginLeft : wp(8)}}>
          <props.Icon
                name={props.IconName}
                size={props.size}
                color={props.IconColor}
                resizeMode="contain"
                style={{width : props.size, height : props.size}}
          ></props.Icon>
        </View>
        :
        null
      }
      <View style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
      <Text
        style={{
          color : props.textColor,
          fontSize : props.fontSize,
          letterSpacing  : props.letterSpacing ? props.letterSpacing : 0,
          fontWeight : props.fontWeight
        }}
      >
        {props.text}
        
      </Text>
      </View>
      </View>

    </TouchableOpacity>
  );
};


export {Button};
