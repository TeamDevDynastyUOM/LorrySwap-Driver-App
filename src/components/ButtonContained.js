import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import GlobalStyles from '../styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const ButtonContained = ({ buttonName, onPress, iconName, alignIcon, loading, size }) => {
    return (
        size === "small" ? (
            <TouchableOpacity style={GlobalStyles.smallConfirmContainer} onPress={onPress} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <>
                        {alignIcon === 'left' && <FontAwesome5 name={iconName} style={GlobalStyles.confirmButton} />}
                        <Text style={GlobalStyles.smallConfirmButton}>{buttonName}</Text>
                        {alignIcon === 'right' && <FontAwesome5 name={iconName} style={GlobalStyles.confirmButton} />}
                    </>
                )}
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={GlobalStyles.confirmContainer} onPress={onPress} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <>
                        {alignIcon === 'left' && <FontAwesome5 name={iconName} style={GlobalStyles.confirmButton} />}
                        <Text style={GlobalStyles.confirmButton}>{buttonName}</Text>
                        {alignIcon === 'right' && <FontAwesome5 name={iconName} style={GlobalStyles.confirmButton} />}
                    </>
                )}
            </TouchableOpacity>
        )
    );
};

export default ButtonContained;
