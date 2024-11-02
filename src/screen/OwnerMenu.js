import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View,SafeAreaView,Alert } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const OwnerMenu = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Yes', onPress: () => pressLogout() },
            { text: 'No', style: 'cancel' },
        ]);        
    };

    const pressLogout= async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Signin');
          } catch (error) {
            console.error('Logout Error:', error);
            Alert.alert('Logout Error', 'Failed to logout. Please try again later.');
          }
    };
    
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={GlobalStyles.wrapper}>
            <Header title="Menu" goBack={goBack}/>   
            <View style={GlobalStyles.whiteContainer} >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate("OwnerProfile")}>
                    <Card
                        icon=<FontAwesome5 name='user-alt' size={20} color="black" />
                        title='View Profile'
                    />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                    <Card
                        icon=<Ionicons name="notifications-sharp" size={24} color="black" />
                        title='Notification'
                    />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                    <Card
                        icon=<Ionicons name="settings-sharp" size={24} color="black" />
                        title='Settings'
                    />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("HelpSupport")}>
                    <Card
                        icon=<Entypo name="help-with-circle" size={24} color="black" />
                        title='Help & Support'
                    />
                    </TouchableOpacity>
                    <View style={styles.customStyle}>
                        <TouchableOpacity onPress={handleLogout}>
                        <Card
                            title='Log Out'
                        />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:-50,
        marginBottom: 150,
    },
    customStyle:{
        flex: 1,
        justifyContent: 'flex-end',
    }
});

export default OwnerMenu;


//add comment to test the vcs