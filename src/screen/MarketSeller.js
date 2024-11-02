import React from 'react';
import { StyleSheet, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import RidesList from '../components/RidesList';

const MarketSeller = ({items, onAddItem, selectedItems = [], onRemove, iconName, display}) => {

    const filteredItems = items.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id));

    console.log('selectedItems01');
    console.log(selectedItems);

    return (
        <View style={GlobalStyles.wrapper}>
            <View style={styles.whiteContainer} >
                <RidesList results={filteredItems} onAddItem={onAddItem} onRemove={onRemove} iconName={iconName} display={display}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    whiteContainer:{
        marginTop: 40,
        backgroundColor:'#fff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: '100%',
        height: '95%',
    }
});

export default MarketSeller;