import React, { useContext, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { hp, wp, Size, Colors, Images } from '../../../../assets/index';
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Fontisto";
import FEIcon from "react-native-vector-icons/Feather";
import FoundationIcon from "react-native-vector-icons/Foundation";
import OIcon from "react-native-vector-icons/Octicons";
// import UserInput from '../../component/userInput/index';
import { Header } from '../../../../component/header/index';
import { Button } from '../../../../component/button/index';
import FontistoIcon from "react-native-vector-icons/Fontisto";
import UserInput from '../../../../component/userInput/index';
import AIcon from "react-native-vector-icons/AntDesign";
import ImagePicker from 'react-native-image-picker';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient'
import { set } from 'react-native-reanimated';

var arr = []
var arr2 = []
const AddTrips = (props) => {
  const [avatarSource, setAvatarSource] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [ChildName, setChildName] = useState('');
  const [SchoolName, setSchoolName] = useState("");
  const [SchoolCode, setSchoolCode] = useState("");
  const [MobNo, setMobNo] = useState("");
  const [value, setValue] = useState(null);
  let [items, setItems] = useState([]);
  const [school, setSchool] = useState([])
  const [labelValue, setLabelValue] = useState('')
  const [id,setId] = useState('')
  let controller;

  useEffect(() => {
    getSchool()
    uuidv4()
    setId(uuidv4())
   
  }, []);

   function uuidv4(){
     
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      console.log("shazimmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",r)
      return v.toString(16);
    });
  }

  const getSchool = () => {
    setIsLoading(true)
    setItems([])
    firestore()
        .collection('Schools')
        .onSnapshot(async i => {
            setSchool([])
            i.forEach(j => {
                school.push(j.data())
            })
            // console.log("SSSHelloo", school)

        })
    // console.log("school2222222222222222222222222222222222222222222", school)

    setTimeout(() => {

        items = []
        
        arr = school.map(
            (data) => ({
                label: data.Name,
                value: data.SchoolCode,
            })
            // setIsLoading(false)
        );
        console.log("newArray", arr)
        setItems(arr)
         arr2 = arr.map(
            async (data) => {
                await items.push(data)
            }

        );
        
        //    setItems(arr)
        setIsLoading(false)
        console.log("newArray2", items)
        
    }, 1000);

}
  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      var imageRef = storage().ref('gs://vtsfinalyear-7dc55.appspot.com/Parrent').child(avatarSource.fileName);
      console.log(avatarSource.fileName)

      imageRef.putFile(avatarSource.uri)
        .then((data) => {
          console.log(data)
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })

    });

  }

  const openCamera = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        setAvatarSource(
          response,
        );

      }
    });
  }

  const AddChild = async () => {
    // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    // console.log("text"+ email +" " +password)
    if(avatarSource == ''){
      alert('insert image')
    }
    else if(ChildName == ''){
      alert('enter your child name')
    }
    else if(value == null){
      alert('select the school')
    }
    else if (MobNo == ''){
      alert('enter Mobile number')
    }
    else{

    setIsLoading(true)
    const imageUrl = await uploadImage()
    console.log(imageUrl)
    // console.log("theryrtrth")
    firestore()
      .collection('Child')
      .add({
        ChildName: ChildName,
        SchoolName: labelValue,
        imageUrl: imageUrl,
        SchoolCode: value,
        MobNo: MobNo,
        status : 0,
        date : '',
        uid: auth().currentUser.uid,
        id:id
      })

      .then(response => {
        // console.log(response);
        props.navigation.navigate('Profile')
        setIsLoading(false)
      })
      .catch(error => {
        alert(error.message);
        setIsLoading(false)

      })


      .catch(error => {
        alert(error.message);
        setIsLoading(false)

      })
    }
    

  }
  if(isLoading == true){
    return(<View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
             <ActivityIndicator size={25} color={'black'} />
    </View>)
  }
  else{
  return (<KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>

    <View style={{ flex: 1, top: Platform.OS == 'ios' ? IOS : 0, backgroundColor: Colors.white }}>
      <ScrollView keyboardShouldPersistTaps="always">

        <LinearGradient colors={Colors.linearGradient1} style={{ position: 'absolute', height: hp(15), width: wp(100) }}></LinearGradient>

        <View style={{ height: hp(10) }}>
          <View style={{ height: hp(10), marginHorizontal: wp(5) }}>
            <Header
              onPress={() => { props.navigation.pop(); setAvatarSource(''); setChildName(''); setSchoolName(''); setSchoolCode(''); setMobNo('') }}
              color={Colors.white}
              iconColor={Colors.white}
              heading={'Add Child'}
              Icon={MIcon}
              name={'keyboard-arrow-left'}
              size={Size(5)}>

            </Header>
          </View>
        </View>

        <View style={{ height: hp(6) }} />
        <View style={{ height: hp(72), width: wp(100), alignItems: "center" }}>

          <TouchableOpacity onPress={() => openCamera()}
            style={{ height: wp(35), width: wp(35), borderRadius: wp(35) / 2, borderWidth: 5, borderColor: Colors.middleBlue, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            {
              avatarSource == '' ? (

                <AIcon name='user' size={Size(8)} color={Colors.middleBlue}></AIcon>
              ) : (
                  <Image source={{ uri: avatarSource.uri }} style={{ height: wp(35), width: wp(35), borderRadius: wp(35) / 2, }} />
                )
            }
          </TouchableOpacity>
          <View style={{ height: hp(35), width: wp(100), backgroundColor: "white", elevation: 1, padding: wp(3) }}>
            <View style={{ height: hp(8) }}>
              < UserInput onChangeText={(val) => { setChildName(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Child Name' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.name} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
            </View>

            {/* <View style={{ height: hp(8) }}>
              <UserInput onChangeText={(val) => { setSchoolName(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='School Name' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.school} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
            </View> */}

            <View style={{ height: hp(8), marginTop: hp(2) }}>
              {/* <UserInput onChangeText={(val) => { setSchoolCode(val) }} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='School Code' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.code} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput> */}
              <View>
                {/* {
                  items.length > 0 && */}
                  <DropDownPicker
                    searchable={true}
                    searchablePlaceholder="Search for the School"
                    placeholder = 'Select a school'
                    dropDownMaxHeight={180}
                    items={items}
                    controller={instance => controller = instance}
                    containerStyle={{ height: 40 }}
                    itemStyle={{
                      justifyContent: 'flex-start'
                    }}
                 
                    defaultValue={value}
                    onChangeItem={item => {setValue(item.value), setLabelValue(item.label)}}
                  />
                  {/* } */}
              </View>
            </View>
            <View style={{ height: hp(8) }}>
              <UserInput  onChangeText={(val) => { setMobNo(val)}} maxLength = {11} keyboardType = {'phone-pad'} textStyle={{ color: Colors.lightBlack, paddingVertical: hp(1) }} placeholder='Mobile' placeholderTextColor={Colors.lightBlack} iconColor={Colors.gray} image={true} imageName={Images.mob} borderBottomWidth={1.2} borderColor={Colors.lightGray} heading={'Email'}></UserInput>
            </View>
          </View>

          <View style={{ height: hp(7), width: wp(80), top: hp(5), }}>

            {isLoading == true ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={25} color={'black'} />
              </View>
            ) : (

                <Button
                  fontWeight={'bold'}
                  onPress={() => { AddChild() }}
                  borderWidth={0.5}
                  backgroundColor={"#F8AA14"}
                  Icon={null} IconName={null}
                  IconColor={Colors.facebookColor}
                  width={wp('77%')} size={wp('5%')}
                  IconLeftMargin={wp('3%')}
                  borderRadius={wp('10%')}
                  text={'Add Child'}
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
}

export { AddTrips };