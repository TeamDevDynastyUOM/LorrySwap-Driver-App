import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,TouchableWithoutFeedback, Keyboard, SafeAreaView,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/screen/Navigation';
import { RideProvider } from './src/context/RideContext';

export default function App() {

    return (
        <RideProvider>
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <NavigationContainer>
                        <Navigation />
                    </NavigationContainer>
                    <StatusBar style="auto" />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
        </RideProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
