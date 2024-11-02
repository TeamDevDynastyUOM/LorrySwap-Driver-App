import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

export default function ForgetPasswordOtp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = otp.map(() => useRef(null));
  const [combinedOtp, setCombinedOtp] = useState();
  const [loading, setLoading] = useState(false)

  const {id, token} = useRideContext();

  const route = useRoute();
  const { requestBody } = route.params;

  useEffect(() => {
    const newCombinedOtp = parseInt(otp.join(''), 10);
    setCombinedOtp(newCombinedOtp);
    console.log('Combined OTP:', newCombinedOtp);
  }, [otp]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      // Move to the next input field if the current one has a value
      if (index < refs.length - 1) {
        refs[index + 1].current.focus();
      } else {
        refs[index].current.blur();
      }
    } else if (index > 0) {
      // Move to the previous input field if the current one is empty (for backspace)
      refs[index - 1].current.focus();
    }
  };

  const navigation = useNavigation()

  console.log(requestBody)
  const verifyOtp = async(combinedOtp) => {
    console.log(requestBody.email)
    const message = {
      email: requestBody.email,
      otp: combinedOtp
    }
    console.log('msg',message)
    navigation.navigate("ForgetPasswordNew", {formData: message})
  }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView 
            style={styles.container} 
            enabled={true} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={60}
        >
            <View style={styles.top}>
                <Image source={require('../assests/images/OTP.png')} style={styles.image} />
                <View style={styles.bottom}>
                    <Text style={styles.text1}>ONE TIME PASSWORD</Text>
                    <Text style={styles.text2}>Verification Code sent to</Text>
                    <Text style={styles.text3}>{requestBody.email}</Text>
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                        <TextInput
                          key={index}
                          ref={refs[index]}
                          style={styles.otpInput}
                          value={digit}
                          onChangeText={(value) => handleOtpChange(index, value)}
                          keyboardType="numeric"
                          maxLength={1}
                        />
                        ))}
                    </View>                

                    {otp.every(digit => digit !== '') && (
                      <TouchableOpacity onPress={() => verifyOtp(combinedOtp)}>
                        <Ionicons name="arrow-forward" size={32} color="#132939" />
                      </TouchableOpacity>
                    )}


                    {/* <Text style={styles.text4}>Didn't receive OTP</Text>
                    <Text style={styles.text5}>Resend in 60s</Text> */}
                </View>
            </View>
        </KeyboardAvoidingView>
    </View>
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
