import React from "react";
import { View, Text, ActivityIndicator} from "react-native";
import GlobalStyles from '../styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const ActivityIndicatorCustom = ({indicatorName,color}) => {

    return(
        <View style={GlobalStyles.loading}>
            <ActivityIndicator size="large" color={color} />
            <Text style={GlobalStyles.loadingText}>{indicatorName}</Text>
        </View>
    );
};

export default ActivityIndicatorCustom;