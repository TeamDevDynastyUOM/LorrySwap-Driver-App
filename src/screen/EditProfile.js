import React, { useEffect, useState } from "react";
import {StyleSheet,SafeAreaView,Text,View,Image,TouchableOpacity,ScrollView,Alert,KeyboardAvoidingView} from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

const EditProfile = ({ route }) => {

const { id, token} = useRideContext();
  const navigation = useNavigation();

  const { item } = route.params;
  console.log(item);

  
  const [fname, setFname] = useState(item.first_name);
  const [lname, setLname] = useState(item.last_name);
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);
  const [residence, setResidence] = useState(item.email);

  const handlePress = () => {
    fetch(`${BASE_URL}/owner/edit_driver_details/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        residence: residence,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data); // Log the response from the server
        Alert.alert('Success', 'Driver details updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Profile'),
          },
        ]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message); // Update state with the error message
      });
  };

  return (
    <SafeAreaView style={GlobalStyles.wrapper}>
    
        <View style={GlobalStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              style={GlobalStyles.iconHeader}
              name="arrow-left"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={GlobalStyles.whiteContainerProfile}>
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={{ alignItems: "center" }}>
                <View style={styles.ProfileImage}>
                  <Image
                    source={require("../assests/images/ProfilePic.jpg")}
                    style={styles.image}
                  ></Image>
                </View>
              </View>

              <View style={styles.form}>
                <Text style={styles.text}>First Name:</Text>
                <TextInput
                  value={fname}
                  onChangeText={(text) => setFname(text)}
                  style={styles.textinput}
                />

                <Text style={styles.text}>Last Name:</Text>
                <TextInput
                  value={lname}
                  onChangeText={(text) => setLname(text)}
                  style={styles.textinput}
                />

                <Text style={styles.text}>Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  style={styles.textinput}
                />

                <Text style={styles.text}>Email:</Text>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="numeric"
                  style={styles.textinput}
                />

                <Text style={styles.text}>Residence:</Text>
                <TextInput
                  value={residence}
                  onChangeText={(text) => setResidence(text)}
                  keyboardType="numeric"
                  style={styles.textinput}
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handlePress}>
                    <Text style={styles.btntext}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: "-30%",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  ProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 5,
  },
  form:{
    alignSelf:"stretch",
    marginTop:"10%",
    marginHorizontal:"5%"
    
  },
  textinput:{
    alignSelf:"stretch",
    height:40,
    marginBottom:30,
    color:"#132939",
    backgroundColor:"white",
    borderBottomWidth:1
  },
  text:{
    color:"#132939",
    fontSize:17,
    fontWeight:"bold"
  },
  submitBtn: {
    backgroundColor:'#132939',
    padding:12,
    borderRadius:25,
    justifyContent:'center', 
    width:'50%',
    alignSelf:'center',
    marginTop:"5%"
  },
  btntext:{
    color: '#ffffff',
    textAlign:'center',
    fontSize: 18,
    fontWeight: '700',
  }

});

export default EditProfile;
