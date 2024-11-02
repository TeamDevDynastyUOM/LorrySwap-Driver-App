import { StyleSheet, Text, View, TouchableOpacity, Image , Alert} from 'react-native'
import React, { useState , useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome,FontAwesome5, Feather,Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

const OwnerHome = () => {

  const navigation = useNavigation();
  const { id, token } = useRideContext();

  console.log(id);

  const [owner, setOwner] = useState([]);

  const [ownerDetails, setOwnerDetails] = useState([]);

  const [data, setData] = useState({
    assignedDriversCount: 0,
    unassignedDriversCount: 0,
    unassignedVehiclesCount: 0,
  });


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/owner/get_owner_by_userId/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data && data.Result) {
            setOwnerDetails(data.Result); // Set the owner state with the nested Result object
          } else {
            console.error('Unexpected response format:', data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [id, token])
  );




  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/owner/get_assign_details/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
      });
      const result = await response.json();

      if (
        typeof result.assigned_drivers_count === 'number' &&
        typeof result.unassigned_drivers_count === 'number' &&
        typeof result.unassigned_vehicles_count === 'number'
      ) {
        setData({
          assignedDriversCount: result.assigned_drivers_count,
          unassignedDriversCount: result.unassigned_drivers_count,
          unassignedVehiclesCount: result.unassigned_vehicles_count,
        });
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };
  console.log(data)

  useEffect(() => {
    fetchData(); // Fetch data when component mounts or `id` changes
  }, [data.assignedDriversCount, data.unassignedDriversCount, data.unassignedVehiclesCount]);

  return (
    <View style={styles.wrapper}>
      <View style={{alignItems:"center"}}>
        <Image source={require('../assests/images/ownerHome.jpeg')} style={styles.backgroundImage}/>
      </View>

      <View style={[styles.circleButton,{flexDirection:"row"}]}>
      <TouchableOpacity onPress={() => navigation.navigate("OwnerMenu")}>
        <Feather name='menu' style={{ fontSize: 30}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ChatSearch')} style={{ marginLeft: "80%" }}>
        <Entypo name='chat' style={{ fontSize: 30}} />
      </TouchableOpacity>
      </View>

      <View style={styles.Profile}>
        <View style={styles.ProfileImage}>
            <Image source={{ uri: ownerDetails.photo }} style={styles.profilepic}></Image>
        </View>
        <View>
          <Text style={styles.nameTxt}>{ownerDetails.first_name} {ownerDetails.last_name}</Text>
        </View>
      </View>

      <View style={styles.pageTitle}>
        <TouchableOpacity onPress={() => navigation.navigate("OwnerDashboard")}>
          <Text style={styles.pageTitleTxt}>{ownerDetails.first_name} Travels</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>

      <View style={styles.cardType1}>               

      <TouchableOpacity elevation={10} style={[styles.CardStyle, styles.card1]} onPress={() =>navigation.navigate("AddDriver")}>
          <FontAwesome name="user" size={50} color="#132939"/>
          <Text style={styles.card1Txt}>Add Driver</Text>                 
      </TouchableOpacity>

      <TouchableOpacity elevation={10} style={[styles.CardStyle, styles.card1]} onPress={() =>navigation.navigate("AddTruck")}>
        <FontAwesome5 name="truck" size={40} color="#132939" />
        <Text style={styles.card1Txt}>Add Truck</Text>                 
      </TouchableOpacity>

      </View>

      <View elevation={10} style={[styles.CardStyle, styles.cardType2]}>

      <View style={{alignItems:"center"}}>
        <View style={{paddingBottom:"5%",alignItems:"center"}}>
          <Text style={styles.card2Txt}>Unassigned</Text>
          <Text style={styles.card2Txt}> Drivers</Text>
        </View>
        <View style={styles.ring}>
          <Text style={styles.card2TxtNO}>{data.unassignedDriversCount}</Text>
        </View>
      </View>

      <View style={{alignItems:"center"}}>
        <View style={{paddingBottom:"5%",alignItems:"center"}}>
          <Text style={styles.card2Txt}>Unassigned</Text>
          <Text style={styles.card2Txt}> Trucks</Text>
        </View>
        <View style={styles.ring}>
          <Text style={styles.card2TxtNO}>{data.unassignedVehiclesCount}</Text>
        </View>
      </View>

      </View>


      <View elevation={10} style={[styles.CardStyle, styles.cardType2]}>
      <View style={{alignItems:"center", marginRight:"5%"}}>
        <View style={{paddingBottom:"5%",alignItems:"center"}}>
          <Text style={styles.card2Txt}>Assigned</Text>
          <Text style={styles.card2Txt}> Count</Text>
        </View>
        <View style={styles.ring}>
          <Text style={styles.card2TxtNO}>{data.assignedDriversCount}</Text>
        </View>
      </View>

      <View>
      
      <View style={[styles.square,{marginBottom:"10%"}]}>
      <TouchableOpacity style={{ paddingLeft:"5%"}} onPress={() =>navigation.navigate("DriverList")}>
      <View style={{flexDirection:"row"}}>
        <FontAwesome name="user" size={35} color="#132939" style={{paddingRight:"5%"}}/>
        <Text style={styles.iconTxt}>Driver List</Text>
      </View>
      </TouchableOpacity>
      </View>

      <View style={styles.square}>
      <TouchableOpacity style={{ paddingLeft:"5%"}} onPress={() =>navigation.navigate("TruckList")}>
      <View style={{flexDirection:"row"}}>
        <FontAwesome name="truck" size={30} color="#132939" style={{paddingRight:"5%"}}/>
        <Text style={styles.iconTxt}>Truck List</Text>
      </View>
      </TouchableOpacity>
      </View>

      </View>

      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
    container:{
      alignSelf:"center",
      padding:"6%",
      position:"absolute",
      marginTop:"75%",
    },
    pageTitleTxt: {
        color: '#0d1c27',
        fontSize: 30,
        fontWeight: '700',
        textAlign:"center",
    },
    pageTitle:{
        position:"absolute",
        alignSelf:"center",
        marginTop:"13%",       
    },
    backgroundImage:{
      width: "100%",
      height:"60%",
      opacity: 0.8 ,
    },

    ProfileImage: {
      width: 80,
      height: 80,
      borderRadius: 100,
      overflow: "hidden",
    },
    profilepic: {
      flex: 1,
      height: undefined,
      width: undefined
    },
    Profile:{
      flexDirection:"row",
      position:"absolute", 
      alignItems:"center", 
      marginLeft:"2%",
      marginTop:"53%", 
      padding:"3%"
    },
    nameTxt:{
      color: '#132939',
      fontSize: 24, 
      paddingRight:"5%",
      paddingLeft:"5%",
      fontWeight: '700',
    },
    CardStyle:{
      backgroundColor: '#e7e9eb',
      borderRadius: 8,
      paddingHorizontal: 25,
      width: '100%',
      marginVertical: "5%",
      shadowColor: 'black',
      paddingBottom:"2%",
  },
  cardType1:{
    flexDirection:"row", 
    justifyContent:"space-between",
  },
  cardType2:{
    flexDirection:"row", 
    justifyContent:"space-evenly", 
    alignItems:"center",  
    paddingTop:"5%", 
    paddingBottom:"5%",
    marginBottom:"1%"
  },
  card1:{
    alignItems:"center", 
    justifyContent:"center",
    paddingBottom:"5%",
    paddingTop:"5%",
    width: '48%',
  },
  card1Txt:{
    fontSize:18, 
    fontWeight:"bold",
    color: '#132939',
    paddingTop:"5%",
  },
  card2Txt:{
    fontSize:18, 
    color: '#132939',
  },
  card2TxtNO:{
    fontSize:42, 
    fontWeight:"800",
    color: '#132939',
    paddingTop:"2%"
  },
  iconTxt:
  {
    fontSize:18, 
    fontWeight:"bold",
    color: '#132939',
    paddingTop:"2%"
  },
  ring:{
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    borderWidth: 8, // Adjust this to change the thickness of the ring
    borderColor: "#132939", // Color of the ring
    backgroundColor: "transparent",
    alignItems:"center",
  },
  square:{
    width: 80*2,
    height: 50,
    borderRadius: 10 / 2,
    borderWidth: 3, // Adjust this to change the thickness of the ring
    borderColor: "#132939", // Color of the ring
    backgroundColor: "transparent",
    alignItems:"center",
    padding:"1%",
  },
  circleButton:{
    position: "absolute",
    marginTop:"12%",
    marginLeft:"5%"
  },
  // circleButton2: {
  //   width:  55,
  //   height: 55,
  //   orderRadius: 50,
  //   marginBottom: 10,
  //   backgroundColor: 'rgba(197, 197, 197, 0.6)',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   },
    
})

export default OwnerHome 