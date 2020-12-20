import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {InitialScreen} from '../initialScreen/index';
import {Login} from '../login/index';
import {SignUp} from '../signup/index'
import {createStackNavigator} from '@react-navigation/stack';
import {Search} from '../search/index';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from '../../assets';
import {Travellers} from '../Travellers/index';
import {TravellerDetails} from '../Travellers/travellerDetails/index';
import {Discover} from '../discover/index';
import {ProfileDetail} from '../profileDetail/index';
import {Profile} from '../profile/index';
import {MyTrips} from '../profile/myTrip/index';
import {AddTrips} from '../profile/myTrip/addTrip/index';
import {MyTripList} from '../profile/myTrip/myTripList/index';
import {Setting} from '../profile/setting/index';
import {Messages} from '../chatBoard/messages/index'
import RequestSchool from '../schoolRequest/index'
import Map from '../map/index'
import {myDrivers} from '../myDrivers/index'
import {Report} from '../report/index'



const Stack3 = createStackNavigator();

function SearchStack() {
    return (
        <Stack3.Navigator
              screenOptions={{ gestureEnabled: false }}
              headerMode='none'
        >
          <Stack3.Screen name="search" component={Search} />
          <Stack3.Screen name="profile" component={ProfileDetail} />
          <Stack.Screen name = "Location" component = {Map} />
          <Stack5.Screen name = "myDriver" component = {myDrivers}/>
          <Stack3.Screen name = "Report" component = {Report}/>

        </Stack3.Navigator>
  );
}


const Stack2 = createStackNavigator();

function TravellerStack() {
    return (
        <Stack2.Navigator
              screenOptions={{ gestureEnabled: false }}
              headerMode='none'
        >
          <Stack2.Screen name="traveller" component={Travellers} />
          <Stack2.Screen name="travellerDetails" component={TravellerDetails} />
          {/* <Stack2.Screen name = "RequestSchool" component = {RequestSchool}/> */}

        </Stack2.Navigator>
  );
}

const Stack4 = createStackNavigator();

function ProfileStack() {
    return (
        <Stack4.Navigator
              screenOptions={{ gestureEnabled: false }}
              headerMode='none'
        >
          <Stack4.Screen name="Profile" component={Profile} />
          <Stack4.Screen name="MyTrips" component={MyTrips} />
          <Stack4.Screen name="AddTrips" component={AddTrips} />
          <Stack4.Screen name="MyTripList" component={MyTripList} />
          <Stack.Screen name = "Setting" component= {Setting}/>
          <Stack2.Screen name="traveller" component={Travellers} />

        </Stack4.Navigator>
  );
}

const Stack5 = createStackNavigator();

function SchoolStack() {
    return (
        <Stack5.Navigator
              screenOptions={{ gestureEnabled: false }}
              headerMode='none'
        >
          <Stack5.Screen name="School" component={MyTripList} />

        </Stack5.Navigator>
  );
}


const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Driver') {
          iconName = focused
          ? 'ios-search'
          : 'ios-search-outline';
        } 
        else if (route.name === 'School') {
            iconName = focused
              ? 'ios-school'
              : 'school-outline';
          } 
          else if (route.name === 'MESSAGES') {
            iconName = focused
              ? 'ios-mail'
              : 'ios-mail-outline';
          } 
          else if (route.name === 'PROFILE') {
            iconName = focused
              ? 'ios-person'
              : 'ios-person-outline';
          } 

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: Colors.primary,
      inactiveTintColor: 'gray',
    }}
  >        
  <Tab.Screen name="Driver" component={SearchStack} />
  <Tab.Screen name="School" component={SchoolStack} />
  <Tab.Screen name="MESSAGES" component={Messages} />
  <Tab.Screen name="PROFILE" component={ProfileStack} />

  </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
function App() {
    return (
        <NavigationContainer>
        <Stack.Navigator
              screenOptions={{ gestureEnabled: false }}
              headerMode='none'
        >
          <Stack.Screen name="Home" component={InitialScreen} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="dashboard" component={Navigation} />
          <Stack5.Screen name = "RequestSchool" component = {RequestSchool}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }