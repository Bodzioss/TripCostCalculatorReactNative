import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ExtraCost = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.costName}>{props.text}</Text>
            </View>
            <View style={styles.itemRight}>
                <TextInput style={styles.costInput} placeholder={'0'} keyboardType = 'numeric'></TextInput>
                <Text style={styles.costName}>zł</Text>
                <Ionicons name="close-outline"></Ionicons>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemRight:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    costName: {
      paddingRight: 20,
    },
    costInput: {
        paddingRight: 5,
        textAlign: 'right',
    }
})

export default ExtraCost;