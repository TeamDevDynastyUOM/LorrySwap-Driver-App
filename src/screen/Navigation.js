import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './Signin';
import Otp from './Otp';
import Joinnow from './Joinnow';
import Signup from './Signup';
import Signup2 from './Truckdetails';
import Login from './Password';
import Success from './Success';
import Home from './Home';
import EnterLocation from '../components/BottomPopup';
import Notification from './Notification';
import Menu from './Menu';
import SuggestedRides from './SuggestedRides';
import RidesList from '../components/RidesList';
import SelectedRides from './SelectedRides';
import SpecialRequest from './SpecialRequest';
import ConfirmRides from './ConfirmRides';
import Profile from './Profile';
import Settings from './Settings';
import HelpSupport from './HelpSupport';
import WaitingForRides from './WaitingForRides';
import Start from './Start';
import AcceptRequest from './AcceptRequest';
import ShowDetailsCF from './ShowDetails';
import ViewLocation from './ViewLocation';
import DirectionMap from './DirectionMap';
import DirectionNew from './DirectionNew';
import WaitingForConfirmation from './WaitingForConfirmation';
import DirectionWaypoints from './DirectionWaypoints';
import AddLicenseDetails from './AddLicenseDetails';
import OwnerHome from './OwnerHome';
import AddTruck from './AddTruck';
import AddDriver from './AddDriver';
import AddDriver2 from './AddDriver2';
import OwnerDashboard from './OwnerDashboard';
import OwnerEdit from './OwnerEdit';
import OwnerDashboardNodata from './OwnerDashboardNodata';
import DriverList from './DriverList';
import TruckList from './TruckList';
import DriverDetails from './DriverDetails';
import Assign from './Assign';
import OwnerProfile from './OwnerProfile';
import OwnerMenu from './OwnerMenu';
import SelectRole from './SelectRole';
import OwnerEditProfile from './OwnerEditProfile';
import EditProfile from './EditProfile';
import SuggestedRidesReturn from './SuggestedRidesReturn';
import ForgetPasswordOtp from './ForgetPasswordOtp';
import ForgetPasswordNew from './ForgetPasswordNew';
import ForgetPasswordEmail from './ForgetPasswordEmail';
import AddVehicleByDriver from './AddVehicleByDriver';
import ChatSearch from './ChatSearch';
import ChatScreen from './ChatScreen';
import DriverChatSearch from './DriverChatSearch';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Joinnow">
      <Stack.Screen name="Joinnow" component={Joinnow} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="Truckdetails" component={Signup2} options={{ headerShown: false }} />
      <Stack.Screen name="Password" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}/>
      <Stack.Screen name="Success" component={Success} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="EnterStartPoint" component={EnterLocation} options={{ headerShown: false }}/>
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
      <Stack.Screen name="SuggestedRides" component={SuggestedRides} options={{ headerShown: false }}/>
      <Stack.Screen name="SuggestedRidesReturn" component={SuggestedRidesReturn} options={{ headerShown: false }}/>
      <Stack.Screen name="SpecialRequest" component={SpecialRequest} options={{ headerShown: false }}/>
      <Stack.Screen name="RidesList" component={RidesList} options={{ headerShown: false }}/>
      <Stack.Screen name="SelectedRides" component={SelectedRides} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
      <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ headerShown: false }}/>
      <Stack.Screen name="ConfirmRides" component={ConfirmRides} options={{ headerShown: false }}/>
      <Stack.Screen name="WaitingForRides" component={WaitingForRides} options={{ headerShown: false }}/>
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }}/>
      <Stack.Screen name="AcceptRequest" component={AcceptRequest} options={{ headerShown: false }}/>
      <Stack.Screen name="ShowDetails" component={ShowDetailsCF} options={{ headerShown: false }}/>
      <Stack.Screen name="ViewLocation" component={ViewLocation} options={{ headerShown: false }}/>
      <Stack.Screen name="DirectionMap" component={DirectionMap} options={{ headerShown: false }}/>
      <Stack.Screen name="DirectionNew" component={DirectionNew} options={{ headerShown:false}}/>
      <Stack.Screen name="WaitingForConfirmation" component={WaitingForConfirmation} options={{ headerShown: false }}/>
      <Stack.Screen name="DirectionWaypoints" component={DirectionWaypoints} options={{ headerShown: false }}/>
      <Stack.Screen name="AddLicenseDetails" component={AddLicenseDetails} options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerHome" component={OwnerHome} options={{ headerShown: false }} />
      <Stack.Screen name="AddTruck" component={AddTruck} options={{ headerShown: false }} />
      <Stack.Screen name="AddDriver" component={AddDriver} options={{ headerShown: false }} />
      <Stack.Screen name="AddDriver2" component={AddDriver2} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerEdit" component={OwnerEdit} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerDashboardNodata" component={OwnerDashboardNodata} options={{ headerShown: false }} />
      <Stack.Screen name="DriverList" component={DriverList} options={{ headerShown: false }} />
      <Stack.Screen name="TruckList" component={TruckList} options={{ headerShown: false }} />
      <Stack.Screen name="DriverDetails" component={DriverDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Assign" component={Assign} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerProfile" component={OwnerProfile} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerMenu" component={OwnerMenu} options={{ headerShown: false }} />
      <Stack.Screen name="SelectRole" component={SelectRole} options={{ headerShown: false }} />
      <Stack.Screen name="OwnerEditProfile" component={OwnerEditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPasswordOtp" component={ForgetPasswordOtp} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPasswordNew" component={ForgetPasswordNew} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPasswordEmail" component={ForgetPasswordEmail} options={{ headerShown: false }} />
      <Stack.Screen name="AddVehicleByDriver" component={AddVehicleByDriver} options={{ headerShown: false }} />
      <Stack.Screen name="ChatSearch" component={ChatSearch} options={{ headerShown: false }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DriverChatSearch" component={DriverChatSearch} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Navigation;
