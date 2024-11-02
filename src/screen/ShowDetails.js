import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native'; 
import ContactCard from '../components/ContactCard';
import PackageDetailsCF from '../components/PackageDetailsCF';
import PackageDetailsMS from '../components/PackageDetailsCF';

const ShowDetails= ({route}) =>{

    const { selectedItem } = route.params;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={GlobalStyles.wrapper}>
            <View style={GlobalStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack() }> 
                    <Feather style={GlobalStyles.iconHeader} name="arrow-left" size={20} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={GlobalStyles.whiteContainerProfile}>
            <View style={{ flex: 1 }}>
            <View style={styles.container}>
            <View style={{alignItems:"center"}}>
                <View style={styles.ProfileImage}>
                    <Image source={require('../assests/images/ProfilePic.jpg')} style={styles.image}></Image>
                </View>
                <Text style={styles.NameText}>{selectedItem.name}</Text>
            </View>
            <View style={{flexDirection:"row-reverse", alignItems:"flex-end", marginTop:"2%", justifyContent:"space-between"}}>
                <ContactCard/>
                <Text style={[styles.title,]}>Package Details</Text>
            </View>
                <View elevation={10} style={styles.CardStyle}>
                { selectedItem.actor === 'CF' ? (
                <PackageDetailsCF
                    ride={selectedItem.ride}
                    date={selectedItem.date}
                    type={selectedItem.type}
                    weight={selectedItem.weight}
                    dimension={selectedItem.dimension}
                    pickuplocation={selectedItem.pickuplocation}
                    destination={selectedItem.destination}
                    plat={selectedItem.plat}
                    plon={selectedItem.plon}
                    dlat={selectedItem.dlat}
                    dlon={selectedItem.dlon}
                />
                ) : (
                    <PackageDetailsMS
                        ride={selectedItem.ride}
                        date={selectedItem.date}
                        weight={selectedItem.weight}
                        pickuplocation={selectedItem.pickuplocation}
                        destination={selectedItem.destination}
                        plat={selectedItem.plat}
                        plon={selectedItem.plon}
                        dlat={selectedItem.dlat}
                        dlon={selectedItem.dlon}
                    />
                )}
                </View>
            </View>
            </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical:"-30%",
              
    },
    ProfileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        marginBottom:5,
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    NameText:{
        fontSize:18,
        color: '#004344',
    },
    title:{
        color:"#004344",
        fontSize: 17,
        fontWeight: "bold",
    },
    CardStyle:{
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: "5%",
        shadowColor: 'black',
        paddingBottom:"7%"
    },
    
});

export default ShowDetails;
