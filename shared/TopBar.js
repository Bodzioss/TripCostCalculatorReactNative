import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants' 

function TopBar(){

    return(
        <View style={styles.container}>
            {/* Text */}
            <Text style={styles.appName}>Trip Cost Calculator</Text>
            {/* Logo */}
            <FontAwesome5 name='dollar-sign' size={16} color='white'/>
            <FontAwesome5 name='dollar-sign' size={12} color='white'/>
            <FontAwesome5 name='dollar-sign' size={8} color='white'/>
            <FontAwesome5 name='car-side' size={20} style={styles.carIcon} color='white'/>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        backgroundColor: '#006b96',
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
        
    },
    appName: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        paddingVertical: 12,
        paddingHorizontal: 6
    },
    carIcon: {
        marginLeft: 2
    }
})

export default TopBar;