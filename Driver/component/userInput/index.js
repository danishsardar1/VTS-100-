import React, { Component } from "react";
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors,hp,wp,Size } from "../../assets";


export default class UserInput extends Component {
  render() {
      return (
        <View
        style={{
          flex : 1,
          width : this.props.width,
          justifyContent : 'center',
        //   backgroundColor : this.props.backgroundColor,
        //   borderRadius : this.props.borderRadius,
        //   borderWidth : this.props.borderWidth,
        //  borderColor : this.props.borderColor
        }}
        >
            {/* <View style={{ flex : .25 ,flexDirection : 'row'}}>
            {this.props.icon || this.props.image?
            <View style={{flex : .15}} />
            :
            null}
            <View style={{flex : this.props.icon ? .85 : 1}}>
            <Text style={{color : this.props.showData ? Colors.lightBlack : Colors.lightGray}}>{this.props.heading}</Text>
            </View>
            </View> */}
          <View style={{flex : 1, flexDirection : 'row', alignItems : 'center',marginHorizontal : this.props.marginHorizontal}}>
          
           
            <View style={{flex : 1, flexDirection : 'row' ,
           borderBottomWidth : this.props.borderBottomWidth,
          borderColor : this.props.borderColor}}>
              {this.props.icon ?
            <View style={{flex : .15, justifyContent : 'center', alignItems : 'center'}}>
            <this.props.icon name={this.props.iconName} color={this.props.iconColor} size={this.props.iconSize}>
            </this.props.icon>
            </View>
            : null}
            
            {this.props.image ?
            <View style={{flex : .15, justifyContent : 'center', alignItems : 'center'}}>
            <Image resizeMode='contain' source={this.props.imageName} style={{height : wp(5),width : wp(5)}}>
            </Image>
            </View>
            : null
          }
            <View style={{flex  :1}}>
            <TextInput
              style={[this.props.textStyle]}
              placeholder={this.props.placeholder}
              secureTextEntry={this.props.secureTextEntry}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              returnKeyType={this.props.returnKeyType}
              keyboardType={this.props.keyboardType}
              placeholderTextColor={this.props.placeholderTextColor}
              underlineColorAndroid="transparent"
              onChangeText={this.props.onChangeText}
              value={this.props.value}
              maxLength={this.props.maxLength}
              textAlignVertical={this.props.textAlignVertical}
              multiline={this.props.multiline}
              numberOfLines={this.props.numberOfLines}
              blurOnSubmit={this.props.blurOnSubmit}
              onSubmitEditing={this.onSubmitEditing}
              editable={this.props.editable}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
            </View>
             {this.props.iconRight ?
            <TouchableOpacity onPress={this.props.onPress} style={{flex : .15, justifyContent : 'center', alignItems : 'center'}}>
            <this.props.iconRight name={this.props.iconNameRight} color={this.props.iconColorRight} size={this.props.iconSizeRight}>
            </this.props.iconRight>
            </TouchableOpacity>
            : null }
            </View>
            
            
            </View>
          </View>

      );
}
}
