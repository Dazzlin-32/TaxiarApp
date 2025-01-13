import { Provider } from 'react-redux';
import store from './store';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-get-random-values'
import { Text, View } from 'react-native';
import LandingScreen from './screens/LandingScreen';
import GetStarted from './screens/GetStarted';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import DriversSearch from './screens/DriversSearch';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './constants/colors';
import Activity from './screens/Activity';
import Account from './screens/Account';
import Trip from './screens/Trip';
// 

const Tab = createBottomTabNavigator();


const TabNavigation = () => (

  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
       
      } else if (route.name === 'Activity') {
        iconName = focused ? 'newspaper' : 'newspaper-outline';
       
      }
      else if (route.name === 'Account') {
        iconName = focused ? 'person' : 'person-outline';
      
      }

      return <Ionicons name={iconName} size={size}  color={color}  />;
    },
    tabBarActiveTintColor: colors.primary,
    animation: 'shift',
  })}
  > 
   
    <Tab.Screen name="Home" 
     options={ {headerShown: false}}
      component={HomeScreen}  />
     <Tab.Screen  name="Activity" component={Activity}  />
     <Tab.Screen name="Account" component={Account}
     options={ {headerShown: false}} />
</Tab.Navigator>

)



export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
          <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Get Started"
              component={GetStarted}
              options={{
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="Sign Up"
              component={SignUp}
              options={{
                headerShown: false,
              }}
            />
              <Stack.Screen
              name="Sign In"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="Trip"
              component={Trip}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: true,
              }}
            />
             <Stack.Screen
              name="Search"
              component={DriversSearch}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    
  );
}

