import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
    Animated,
    Easing,
    PermissionsAndroid,
    StyleSheet
} from 'react-native';
// import MapView, {Marker, Callout, Circle } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import NetInfo from "@react-native-community/netinfo";
import Geolocation from 'react-native-geolocation-service';
import { hp, wp, Size, Colors, Images } from '../../assets/index';



export default class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {

            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            isloading: true,
        }


        Geolocation.getCurrentPosition(info => console.log(info));
    }

    async componentDidMount() {
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
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
                Geolocation.getCurrentPosition((position) => {
                    console.log(position)
                    var lat = parseFloat(position.coords.latitude)
                    var long = parseFloat(position.coords.longitude)

                    var initialRegion = {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.0690,
                        longitudeDelta: 0.0150,

                    }
                    console.log(position)
                    this.setState({ initialPosition: initialRegion, isloading: false })
                    // alert(JSON.stringify(this.state.position))

                },
                    (error) => alert(JSON.stringify(error)),
                    { enableHighAccuracy: true, timeout: 20000 });
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.log(err);
        }


    };

    render() {

        if (this.state.isloading == true) {

            return (<View style={{ flex: 1,}}>
            </View>)
        }
        else {

            return (

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.os == 'ios' ? 'padding' : null}>
                    <View style={{ height: hp(100), top: Platform.os == 'ios' ? IOS : 0 }}>

                        <View style={styles.container}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                showsUserLocation = {true}
                                initialRegion={this.state.initialPosition}
                            >
                            </MapView>
                        </View>



                    </View>
                </KeyboardAvoidingView>
            );
        }
    }
}



const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});