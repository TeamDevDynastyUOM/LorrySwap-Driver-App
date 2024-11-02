import React from "react";
import { View, Text,  StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../styles/GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import ButtonOutlined from "./ButtonOutlined";

const PackageDetailsCF = ({selectedItem, distance}) => {      

    const navigation = useNavigation();

    // View location Button
    const onSubmit = () => {
        navigation.navigate('DirectionMap', {
            startLat: selectedItem.plat,
            startLon: selectedItem.plon,
            endLat: selectedItem.dlat,
            endLon: selectedItem.dlon
          });
    };

    const payment = parseFloat(distance)*18;
    const roundedPayment = payment.toFixed(2);

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                    {/* <Text style={styles.subTitle1}>Special request</Text> */}
                    <Text style={styles.subTitle1}>{selectedItem.location} to {selectedItem.destination}</Text>
                    <Text style={styles.date}>{selectedItem.date}</Text>
                </View>
                <View style={styles.subText}>
                    <View style={{flexDirection:"row",}}>
                        <Text  style={{color:"#004344",fontSize:15}}>Package Type</Text>
                        <Text  style={styles.data}>{selectedItem.package_type}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text  style={{color:"#004344",fontSize:15}}>Package Weight  </Text>
                        <Text  style={styles.data}>{selectedItem.weight} kg</Text>
                    </View>
                            <View>
                                <View style={{flexDirection:"row"}}>
                                    <Text  style={{color:"#004344",fontSize:15}}>Package Dimension </Text>

                                </View>                                    
                                <View style={{flexDirection:"row", marginLeft:"55%", position:"absolute"}}>
                                        <Text  style={{color:"#004344",fontSize:15}}>Height - </Text>
                                        <Text  style={{color:"#004344",fontSize:15}}>{selectedItem.height} cm</Text>
                                </View>
                                <View style={{flexDirection:"row", marginLeft:"55%"}}>
                                    <Text  style={{color:"#004344",fontSize:15}}>Length - </Text>
                                    <Text  style={{color:"#004344",fontSize:15}}>{selectedItem.length} cm</Text>
                                </View>
                                <View style={{flexDirection:"row", marginLeft:"55%"}}>
                                    <Text  style={{color:"#004344",fontSize:15}}>Width - </Text>
                                    <Text  style={{color:"#004344",fontSize:15}}>{selectedItem.width} cm</Text>
                                </View>
                            </View>
                    <View style={{flexDirection:"row"}}>
                        <Text  style={{color:"#004344",fontSize:15}}>Pickup Location  </Text>
                        <Text  style={styles.data}>{selectedItem.location}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text  style={{color:"#004344",fontSize:15}}>Drop Location  </Text>
                        <Text  style={styles.data}>{selectedItem.destination}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text  style={{color:"#004344",fontSize:15}}>Distance  </Text>
                        <Text  style={styles.data}>{distance}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text  style={{color:"#004344",fontSize:15}}>Cost  </Text>
                        <Text  style={styles.data}>Rs. {selectedItem.cost}</Text>
                    </View>
                </View>
                <View style={{alignItems:"flex-end", marginTop: 10}}>
                    <ButtonOutlined buttonName="View Location" onPress={onSubmit} size='small'/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    subTitle1:{
        color:"#004344",
        fontWeight:"bold",
        fontSize:16,
        maxWidth: 200,
    },
    date:{
        color:"#004344",
        fontSize:15,
        maxWidth: 80,
    },
    subTitle2:{
        color:"#132939",
        fontSize:17,
        fontWeight:"bold",
        marginTop:"2%"
    },
    subText:{
        marginTop:"5%",
        rowGap:10
    },
    data:{
        color:"#004344",
        fontSize:15,
        marginLeft:"55%",
        position:"absolute"
    }
});

export default PackageDetailsCF;