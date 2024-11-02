import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../../config';
import GlobalStyles from '../styles/GlobalStyles';
import Header from '../components/Header';
import ButtonContained from '../components/ButtonContained';
import { useRideContext } from '../context/RideContext';

const SignupSchema = Yup.object().shape({
  residence: Yup.string().required('Please enter your residence'),
  licenceUrlSide1: Yup.string().required('Please upload the first side of your license'),
  licenceUrlSide2: Yup.string().required('Please upload the second side of your license'),        
});

const AddLicenseDetails = () => {
  const navigation = useNavigation();
  const { id, token } = useRideContext();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [buttonName1, setButtonName1] = useState("Upload License Side 01");
  const [buttonName2, setButtonName2] = useState("Upload License Side 02");

  const goBack = () => {
    navigation.goBack();
  };

  const handleContinue = async (values) => {
    const formData = {
      user_id: id,
      residence: values.residence,
      licence_side1: values.licenceUrlSide1,
      licence_side2: values.licenceUrlSide2
    };

    try {
      const response = await fetch(`${BASE_URL}/driver/saveLicense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Save License Response:', responseData);

      // Navigate to home screen upon successful response
      navigation.navigate("Home");

    } catch (error) {
      console.error('Save License Error:', error);
      // Handle error scenario (e.g., show error message)
    }
  }

  const handleImageUpload = async (side, setFieldValue) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Optional: if you want the user to edit the photo before uploading
      quality: 1, // Optional: 0 to 1, 1 being the highest quality
    });
  
    // Use "canceled" instead of "cancelled" based on the updated API in SDK 48
    if (pickerResult.cancelled === true || !pickerResult.assets) {
      console.log('User canceled image picker or no assets');
      return;
    }
  
    // Proceed with accessing the selected asset and uploading as before
    const asset = pickerResult.assets[0];
    let localUri = asset.uri;
    let filename = localUri.split('/').pop();
    
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    // Upload the image using fetch
    let formData = new FormData();
    formData.append('licenseImage', { uri: localUri, name: filename, type });
  
    try {
      if (side === 'side1') {
        setLoading1(true); 
      } else {
        setLoading2(true);
      }

      const response = await fetch(`${BASE_URL}/driver/uploadLicense`, {
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

      if (side === 'side1') {
        setButtonName1("License side 01 Uploaded");
        setLoading1(false);
        setFieldValue('licenceUrlSide1', img_url);
      } else if (side === 'side2') {
        setButtonName2("License side 02 Uploaded");
        setLoading2(false);
        setFieldValue('licenceUrlSide2', img_url);
      }
      
    } catch (error) {
      console.error('Upload error', error);
    }
  };
  
  return (
    <Formik 
      initialValues={{
        residence: '',
        licenceUrlSide1: '',
        licenceUrlSide2: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleContinue}
    >
      {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <Header title="Add License Details" goBack={goBack} />
          <View style={styles.formcontainer}>
            <View style={styles.inputwrapper}>
              <Text style={styles.txt}>Residence</Text>
              <TextInput 
                style={styles.inputStyle} 
                value={values.residence}
                onChangeText={handleChange('residence')} 
                onBlur={() => setFieldTouched('residence')}
              />
              {touched.residence && errors.residence && (
                <Text style={styles.errorTxt}>{errors.residence}</Text>
              )}
            </View>

            <View style={styles.container}>
              <ButtonContained 
                buttonName={buttonName1} 
                onPress={() => handleImageUpload('side1', setFieldValue)} 
                loading={loading1} 
              />
            </View>

            <View style={styles.container}>
              <ButtonContained 
                buttonName={buttonName2} 
                onPress={() => handleImageUpload('side2', setFieldValue)} 
                loading={loading2} 
              />
            </View>

            <TouchableOpacity 
              onPress={() => handleContinue(values)}
              disabled={!isValid}
              style={[GlobalStyles.continueContainer]}
            >
              <Text style={GlobalStyles.continueButton}>
                Continue
                <Icon name="arrow-right" size={20} color="#132939" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#132939',
    paddingHorizontal: 5,
  },  
  formcontainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 25,
    width: '100%',
    height: '100%',
  },
  txt: {
    color: '#004344',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 10,
  },
  inputStyle: {
    backgroundColor: '#f1f3f5',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 7,
    flex: 0,
    height: 36,
    width: 240,
    marginLeft: 90,
    bottom: 25,
    paddingLeft: 15,
  },
  errorTxt: {
    fontSize: 12,
    color: 'brown',
    bottom: 25,
    marginLeft: 85,
  },
  container: {
    bottom: 25,
    paddingTop: 20,
  },
});

export default AddLicenseDetails;
