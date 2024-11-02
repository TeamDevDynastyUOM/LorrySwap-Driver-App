import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation  } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

export default function SelectRole() {

  const navigation = useNavigation()
  const { id, token } = useRideContext();

  const goBack = () => {
    navigation.navigate("Signin");
  };


  const checkLicenseUploaded = async() => {
    console.log('UserId', id)
    try {
        //get current ride details
        const response = await fetch(`${BASE_URL}/driver/checkLicense/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const license = await response.json();
        console.log(license)
        if (license.message === "License is valid.") {
            console.log('License already added. navigate to Home') 
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
        else{
            console.log('License details not found. please add license details') 
            navigation.navigate("AddLicenseDetails");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.wrapper}>
      <Header title="Select your Role" goBack={goBack}/>   
      <View style={{...GlobalStyles.whiteContainer, 
          marginTop: 50, flexDirection: 'row', gap: 20, justifyContent:'center'}}>
        <TouchableOpacity style={styles.contain} onPress={()=> checkLicenseUploaded()}>
          <MaterialCommunityIcons name="steering" size={30} color="#004344" />
          <Text style={{fontSize: 20, color: '#004344' }}>Driver</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.contain} 
          onPress={()=> 
            navigation.reset({
              index: 0,
              routes: [{ name: 'OwnerHome' }],
          })}>
          <FontAwesome5 name="user-tie" size={30} color='#004344'/>
          <Text style={{fontSize: 20, color: '#004344' }}>Owner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '45%',
    height: '25%',
    alignItems: 'center',
    marginTop: '18%',
  },
  top: {
    alignItems: 'center',
    backgroundColor: '#132939',
    height: '100%',
    width: '100%',
  },
  contain:{
    width: 150,
    height: 150,
    borderRadius: 15,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#004344',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  bottom: {
    flex: 1,
    marginTop: '15%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  text1: {
    fontSize: 22,
    marginTop: 30,
    paddingTop: 10,
    fontWeight: 'bold',
    color: '#132939',
  },
  text2: {
    paddingTop: 5,
    fontSize: 15,
    color: '#000',
  },
  text3: {
    paddingTop: 30,
    fontSize: 16,
    color: '#f00',
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#132939',
    width: 50,
    height: 60,
    fontSize: 20,
    borderRadius: 8,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  text4: {
    fontSize: 16,
    paddingTop: 30,
    color: '#132939',
    fontWeight: 'bold',
  },
  text5: {
    fontSize: 12,
    color: '#132939',
    fontWeight: 'bold',
  },
});
