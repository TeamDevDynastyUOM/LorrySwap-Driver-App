import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonContained from '../components/ButtonContained';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

const OwnerEditProfile = ({ route }) => {

  const { id, token } = useRideContext();
  const navigation = useNavigation();
  const { item } = route.params;
  console.log(item);

  const [loading, setLoading] = useState(false);

  const [fname, setFname] = useState(item.first_name);
  const [lname, setLname] = useState(item.last_name);
  const [phone, setPhone] = useState(item.phone);
  const [email, setEmail] = useState(item.email);
  const [photo, setPhoto] = useState(item.photo);
  const [img, setImg] = useState(item.photo);

  const handlePress = async () => {
    try {
      const response = await fetch(`${BASE_URL}/owner/edit_owner_details/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: id,
          fname: fname,
          lname: lname,
          phone: phone,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from server:', data);
      Alert.alert('Success', 'Owner details updated successfully', [
        {
          text: 'OK',
        },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Error fetching data: ' + error.message);
      throw error;
    }
  };

  // const handleContinue = async (photoUrl) => {
  //   console.log('Photo URL:', photoUrl);
  //   if (!photoUrl || typeof photoUrl !== 'string' || photoUrl.trim().length === 0) {
  //     console.error('Invalid photo data:', photoUrl);
  //     Alert.alert('Error', 'Invalid photo data. Please select a valid photo.');
  //     return;
  //   }
  
  //   const formData = {
  //     user_id: id,
  //     photo: photoUrl,
  //   };
  
  //   try {
  //     const response = await fetch(`${BASE_URL}/user/save_profilepic_todb`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  //     }
  
  //     const responseData = await response.json();
  //     console.log('Save Profile Pic Response:', responseData);
  
  //     Alert.alert('Success', 'Profile picture saved successfully', [
  //       {
  //         text: 'OK',
  //         onPress: () => navigation.navigate('OwnerProfile'),
  //       },
  //     ]);
  
  //   } catch (error) {
  //     console.error('Save Profile Pic Error:', error);
  //     console.log('Error', 'Failed to save profile picture: ' + error.message);
  //     throw error;
  //   }
  // };
  

  const handleImageUpload = async () => {
    const choosePhotoSource = async () => {
      return new Promise((resolve) => {
        Alert.alert(
          'Select Photo',
          'Choose a photo source',
          [
            { text: 'Camera', onPress: () => resolve('camera') },
            { text: 'Gallery', onPress: () => resolve('gallery') },
            { text: 'Cancel', onPress: () => resolve('cancel'), style: 'cancel' },
          ],
          { cancelable: true }
        );
      });
    };
  
    const source = await choosePhotoSource();
  
    if (source === 'cancel') {
      return;
    }
  
    let pickerResult;
  
    if (source === 'camera') {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }
      pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else if (source === 'gallery') {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("You've refused to allow this app to access your photos!");
        return;
      }
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }
  
    if (pickerResult.cancelled || !pickerResult.assets) {
      console.log('User canceled image picker or no assets');
      return;
    }
  
    const asset = pickerResult.assets[0];
    const localUri = asset.uri;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
  
    const formData = new FormData();
    formData.append('photo', { uri: localUri, name: filename, type });
  
    try {
      setLoading(true);
  
      const response = await fetch(`${BASE_URL}/user/upload_profilepic`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseJson = await response.json();
      console.log('Upload successful', responseJson);
      const img_url = responseJson.shareable_link;
  
      await handleContinue(img_url); // Call handleContinue with the uploaded image URL
  
      setLoading(false);
      setPhoto(img_url); // Set the photo URL
      fileId = img_url.split('/d/')[1].split('/')[0];
      setImg(`https://drive.google.com/uc?export=view&id=${fileId}`)
  
    } catch (error) {
      console.error('Upload error', error);
      setLoading(false);
    }
  };
  
  const handleContinue = async (photoUrl) => {
    console.log('Photo URL:', photoUrl);
    if (!photoUrl || typeof photoUrl !== 'string' || photoUrl.trim().length === 0) {
      console.error('Invalid photo data:', photoUrl);
      Alert.alert('Error', 'Invalid photo data. Please select a valid photo.');
      return;
    }
  
    const formData = {
      user_id: id,
      photo: photoUrl,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/user/save_profilepic_todb`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
  
      const responseData = await response.json();
      console.log('Save Profile Pic Response:', responseData);
  
      Alert.alert('Success', 'Profile picture saved successfully', [
        {
          text: 'OK',
          // onPress: () => navigation.navigate('OwnerProfile'),
        },
      ]);
  
    } catch (error) {
      console.error('Save Profile Pic Error:', error);
      console.log('Error', 'Failed to save profile picture: ' + error.message);
      throw error;
    }
  };


  // const convertGoogleDriveLink = (shareableLink) => {
  //   const fileId = shareableLink.split('/d/')[1].split('/')[0];
  //   const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
  //   return directLink;
  // };

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
        <KeyboardAvoidingView style={styles.whiteContainerProfile}>
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={{alignItems: "center"}}>
              <View style={{flexDirection:"row"}}>
                <View style={styles.ProfileImage}>
                  <Image
                    source={{ uri: img }}
                    style={styles.image}
                  />
                </View>
                <TouchableOpacity 
                  style={styles.circleButton}
                  onPress={handleImageUpload} 
                  loading={loading} 
                >
                  <MaterialIcons name="add-a-photo" size={28} color="white" />
                </TouchableOpacity>
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
                  keyboardType="email-address"
                  style={styles.textinput}
                />

                {/* <View>
                  <ButtonContained 
                    buttonName={buttonName} 
                    onPress={handleImageUpload} 
                    loading={loading} 
                  />
                </View> */}

                <TouchableOpacity 
                  style={styles.submitBtn} 
                  onPress={() => handlePress()}
                >
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
    marginVertical: "-20%",
  },
  whiteContainerProfile: {
        marginTop: 55,
        backgroundColor:'#ffffff',
        paddingHorizontal: 30,
        borderRadius:25,
        width: '100%',
        height: '100%',
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
  form: {
    alignSelf: "stretch",
    marginTop: "10%",
    marginHorizontal: "5%",
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#132939",
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  text: {
    color: "#132939",
    fontSize: 17,
    fontWeight: "bold",
  },
  submitBtn: {
    backgroundColor: '#132939',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center', 
    width: '50%',
    alignSelf: 'center',
    marginTop: "5%",
  },
  btntext: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  circleButton: {
    width:  50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#132939',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"30%", 
    marginLeft:"-10%"
    },
});

export default OwnerEditProfile;
