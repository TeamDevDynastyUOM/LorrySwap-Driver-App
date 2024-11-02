import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import ButtonContained from '../components/ButtonContained';
import { BASE_URL } from '../../config';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email')
        .required('Please enter your Email address'),
});

const ForgetPasswordEmail = () => {

    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();

    const goBack = () => {
      navigation.goBack() 
    }

    const showAlert = (errors) => {
        let errorMessages = [];
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            errorMessages.push(errors[key]);
          }
        }
        Alert.alert("Form Errors", errorMessages.join('\n'));
      };
    
      const handleSendOtp = async (values) => {
  
        const requestBody = {
          email: values.email,
        };

        setLoading(true)
        try {
          const response = await fetch(`${BASE_URL}/user/forgot_password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
  
          const responseData = await response.json();
  
          if (!response.ok) {
            Alert.alert('Error', responseData.message || 'Something went wrong. Please try again.', [
              { text: 'OK',},
            ]);
          } else {
            navigation.navigate('ForgetPasswordOtp', { requestBody: requestBody });
          }
        } catch (error) {    
          console.error('Request error', error);
          Alert.alert('Network Error', 'Could not connect to the server. Please try again later.', [
            { text: 'OK'},
          ]);
        }finally {
          setLoading(false);
        }
      }

    return (
        <Formik initialValues={{
            email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    handleSendOtp(values)
                    setSubmitting(false);
                }, 400);
              }}
        >
        {({values,errors,touched,handleChange,setFieldTouched,handleSubmit}) => (

        <View style={styles.wrapper}>
            <StatusBar barStyle={'light-content'}/>
            <Header title="Forget Password" goBack={goBack}/> 
            <View style={styles.whiteContainer}>

                <View style={styles.inputwrapper}>
                    <Text style={styles.txt}>Email</Text>
                    <TextInput
                        style={styles.inputStyle} 
                        value={values.email}
                        onChangeText={handleChange('email')} 
                        onBlur={() => setFieldTouched('email')}
                    />
                </View>
                {touched.email && errors.email && (
                    <Text style={styles.errorTxt}>{errors.email}</Text>
                )}

                <View style={styles.findRideButton}>
                    <ButtonContained buttonName="Send Otp" onPress={handleSubmit} arrow="right" loading={loading}/>
                </View>
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
  header:{
    flexDirection: 'row',
    margin: 10,
    marginTop: '10%',
    paddingRight: 10,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 10,
    paddingRight: 10,
  },
  whiteContainer: {
    marginTop: 20,
    backgroundColor:'#ffffff',
    padding: 30,
    borderRadius:25,
    width: '100%',
    height: '100%',
  },
  txt: {
    color:'#004244',
    fontSize:15,
    fontWeight:"700",
  },
  
  inputStyle: {
    backgroundColor: '#f1f3f5',
    marginBottom: 8,
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 7,
    flex: 0,
    height: 36,
    width: 243,
    left:80,
    bottom:25,
    paddingLeft:15,
  },
  errorTxt: {
    fontSize: 12,
    color: 'brown',
    bottom:27,
    marginLeft: 85,
  },
  submitBtn: {
    backgroundColor:'#004344',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius:25,
    justifyContent:'center', 
    top:60,
    alignItems: 'center',
    alignSelf:'center',
  },
  submitBtnTxt: {
    color: '#ffffff',
    textAlign:'center',
    fontSize: 18,
    fontWeight: '700',
  },
  conditiontxt: {
    color:'#004244',
    fontSize:12,
  }
,
checkbox:{
    flexDirection:"row", 
    alignItems:'center', 
    alignSelf:'center',
    top:10,
    columnGap:-20,
},
iconHeader:{
  top:4,
},
});
 export default ForgetPasswordEmail;
