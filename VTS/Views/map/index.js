import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Linking, PermissionsAndroid, Animated, } from 'react-native';
import { hp, wp, Size, Colors, Images, } from '../../assets/index';
import Geolocation from 'react-native-geolocation-service';
import NetInfo from "@react-native-community/netinfo";
import MapView, { Marker, AnimatedRegion, Polyline, Callout, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import App from '../navigation';
import { set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';



export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 44.00522,
        longitudeDelta: 0.0001,
      },
      isloading: true,
      uid: this.props.route.params.uid,
      trackLocation: {},
      latitude: 0, 
      longitude: 0,
      status: '',
      animatedMarkerLocation: new AnimatedRegion({
        latitude: 33.0687819,
        longitude:73.0098190,
        latitudeDelta: 44.00522,
        longitudeDelta: 0.0001,
      })
    }
    Geolocation.getCurrentPosition(info => console.log(info));
    this.permissionLocation()
  }

  componentDidMount(){
    this.gettingLocation()
    
    console.log(this.state.uid)
    
  }
  async permissionLocation() {

    // console.log(this.props.route.params.uid)
    //    setInterval(() => {
    // this.animated()
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      if (state.isConnected == false)
        alert("Check your Internet Connection", state.isConnected);

    });
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: ":Location Permission",
          message:
            "Allow to Use location service" +
            "so you can see the location of driver.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        await Geolocation.getCurrentPosition(async (position) => {
          var lat = parseFloat(position.coords.latitude)
          var long = parseFloat(position.coords.longitude)
          var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0210,
            longitudeDelta: 0.00001
          }
          console.log(position)
          await this.setState({ initialPosition: initialRegion, })
          // setTimeout(() => {
          this.gettingLocation()
          // }, 3000);
          // alert(JSON.stringify(this.state.position))

        },
          (error) =>  console.log(JSON.stringify(error)),
          { enableHighAccuracy: true, timeout: 20000 });
        this.setState({ isloading: false })
      } else {
        console.log("Location permission");
        this.setState({ isloading: false })

      }
    } catch (err) {
      console.log(err);
      this.setState({ isloading: false })

    }

  }
  // open map
   
  // location 
  gettingLocation = () => {
    this.setState({ isloading: true })
    firestore()
      .collection('location')
      .where('uid', '==', this.state.uid)
      .onSnapshot(async i => {
        let latitude = 0
        let longitude = 0
        let Data = {}
        i.forEach(async j => {
          // Data = j.data();
          // Data.push(j.data())
          console.log(j.data())
          latitude =  j.data().location.latitude
          longitude = j.data().location.longitude
          // Data =  {
          //   latitude:latitude,
          //   longitude:longitude,
          //   latitudeDelta: 44.00522,
          //   longitudeDelta: 0.0001,
          // }

        })
        // setTimeout(() => {
          if(this.state.status == true){

            await this.setState({ trackLocation: {
                latitude:latitude,
                longitude: longitude,
                latitudeDelta: 0.02522,
                longitudeDelta: 0.0001,
            } })
          }else{
            this.setState({trackLocation:this.state.initialPosition})
          }
        // }, 5000); 
        // await this.setState({latitude: latitude})
        // await this.setState({longitude: longitude})
        await this.setState({ isloading: false })
        {
          if(Data == []){
            console.log("stay previos data")
          }else{
              await this.state.animatedMarkerLocation.setValue({
                latitude:latitude,
                longitude: longitude,
                latitudeDelta: 0.02522,
                longitudeDelta: 0.0001,
            })
          }
        }
        console.log("trackLocation", this.state.trackLocation)
        
        // await console.log('latitude', this.state.trackLocation.location.latitude)
        this.statusfunction()
      })



  }
  statusfunction = () => {
    const onValueChange = database()
      .ref(this.state.uid)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        if(snapshot.val() == null){
          alert("your driver is offline")
        }else{
          this.setState({status: snapshot.val()})
          console.warn(this.state.status)
        }
      });
  }

  render() {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyC2rgoXove6rvWpG87KiTlGicv8c6_oms8'
    if (this.state.isloading) {

      return (<View style={{ flex: 1, backgroundColor: "#fff" }}>
      </View>)
    }
    else {

      return (
        <View style={{ flex: 1 }}>
          <MapView style={{ height: hp(100), top: 0, left: 0, right: 0, bottom: 0,}}
            initialRegion={this.state.trackLocation}
            ref={(ref) => { this.ref = ref }}
            showsUserLocation={true}
            showsCompass={true}
            followsUserLocation={true}
            loadingEnabled={true}
            // provider = {null}
            mapType={'standard'}
          >
            {this.state.status == true?(

              <Marker.Animated
                ref={marker => { this.marker = marker }}
                coordinate={this.state.animatedMarkerLocation}
              >
                <Image source = {Images.bus} style = {{height: hp(5), width: wp(9)}}/>
              </Marker.Animated>
            ):(null)}
            
            
            {/* <Circle center={this.state.initialPosition}
              radius={1000}
              strokeWidth={0}
              fillColor='rgba(85,166,248,0.1)'
            />
            <Circle center={this.state.initialPosition}
              radius={1500}
              strokeWidth={0}
              fillColor='rgba(85,166,248,0.2)'
            />
            <Circle center={this.state.initialPosition}
              radius={2500}
              strokeWidth={0}
              fillColor='rgba(85,166,248,0.3)'
            /> */}
          </MapView>
         
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
