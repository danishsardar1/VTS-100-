import React, { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, TextInput} from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
// import UserInput from '../../component/userInput/index';
import { Header } from '../../component/header/index';
import { Button } from '../../component/button/index';
// import FontistoIcon from "react-native-vector-icons/Fontisto";
import UserInput from '../../component/userInput/index';
import AIcon from "react-native-vector-icons/AntDesign";
// import ImagePicker from 'react-native-image-picker';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


import LinearGradient from 'react-native-linear-gradient'
// import { TextInput } from 'react-native-gesture-handler';

const Report = (props) => {
    const [avatarSource, setAvatarSource] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [DriverId, setDriverId] = useState(props.route.params.uid)
  
    const [subject, setSubject] = useState("");
    const [Description, setDescription] = useState("");
    const [Purpose, setPurpose] = useState("");
  
    const ReportDriver = () => {
        if(subject == ''){
          alert('Please enter the School Name')
        }
        else if(Description == ''){
          alert('Please enter the Destination')
    
        }
        else {
    
          firestore()
            .collection('notifications')
            .add({
              subject: subject,
              Description: Description,
              ParentId : auth().currentUser.uid,
              DriverId:DriverId,
              Type : 'Report'
      
            }).then((res) => {
              alert("you'r Report has been Send. Thank You!")
              setSubject(""); 
              setDescription('');
              props.navigation.pop();
            })
        }
      }
  return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>

    <View style={{ flex: 1, top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
      <ScrollView keyboardShouldPersistTaps="always">

        <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(15), width: wp(100) }}></LinearGradient>

        <View style={{ height: hp(10)}}>
          <View style={{ height: hp(10), marginHorizontal: wp(5) }}>
            <Header
              onPress={() => { props.navigation.pop(); setSubject(''); setDescription('');}}
              color={Colors.white}
              iconColor={Colors.white}
              heading={'Report'}
              Icon={MIcon}
              name={'keyboard-arrow-left'}
              size={Size(5)}>

            </Header>
          </View>
        </View>

        <View style={{ height: hp(6) }} />
        <View style={{ height: hp(72), width: wp(100), alignItems: "center" }}>

          {/* <TouchableOpacity onPress={() => openCamera()}
            style={{ height: wp(35), width: wp(35), borderRadius: wp(35) / 2, borderWidth: 5, borderColor: Colors.middleBlue, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            {
              avatarSource == '' ? (

                <AIcon name='user' size={Size(8)} color={Colors.middleBlue}></AIcon>
              ) : (
                  <Image source={{ uri: avatarSource.uri }} style={{ height: wp(35), width: wp(35), borderRadius: wp(35) / 2, }} />
                )
            }
          </TouchableOpacity> */}
          <View style={{ height: hp(50), width: wp(100), backgroundColor: "white", elevation: 1, padding: wp(3) }}>

            <View style={{ height: hp(8) }}>
              <UserInput onChangeText={(val) => { setSubject(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Subject' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.school} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
            </View>

            <View style={{ height: hp(8), paddingHorizontal: wp(5) }}>
                {/* <View>
                    <Text>
                        Description
                    </Text>
                </View> */}
                <View style = {{height: hp(2)}}/>
                <View style = {{height: hp(20), borderWidth: 1, borderRadius: 10, paddingHorizontal: wp(5) }}>
                    <TextInput multiline = {true} maxLength = {120} onChangeText={(val) => { setDescription(val) }} style placeholder = "Description"/>
                </View>
              {/* <UserInput onChangeText={(val) => { setDestination(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Destination' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.location} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput> */}
            </View>

            {/* <View style={{ height: hp(8) }}>
              <UserInput onChangeText={(val) => { setPurpose(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Purpose of Registration' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.code} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
            </View> */}
            
          </View>

          <View style={{ height: hp(7), width: wp(80), top: hp(5), }}>

          {isLoading == true ? (
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={25} color={'black'} />
                </View>
            ):(

            <Button
              fontWeight={'bold'}
              onPress={() =>  {ReportDriver()}}
              borderWidth={0.5}
              backgroundColor={"#F8AA14"}
              Icon={null} IconName={null}
              IconColor={Colors.facebookColor}
              width={wp('77%')} size={wp('5%')}
              IconLeftMargin={wp('3%')}
              borderRadius={wp('10%')}
              text={'Send Report'}
              textColor={Colors.white}
              borderColor={"#F8AA14"}
              fontSize={Size(1.8)} >
            </Button>
            )}
          </View>
        </View>

      </ScrollView>
    </View>
    {/* </ScrollView> */}
  </KeyboardAvoidingView>
  );
}
export {Report}
