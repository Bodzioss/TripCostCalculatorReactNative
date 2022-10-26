import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import ExtraCost from '../components/ExtraCost';
import Passenger from '../components/Passenger';

function MainView(){

    const [passenger, setPassenger] = useState({
        name: '',
        distance: ''
      });
    
      //const [passenger, setPassenger] = useState();
      const [passengerItems, setPassengerItems] = useState([]);
    
      const handleAddPassenger = () => {
        Keyboard.dismiss();
        console.log(passenger)
        setPassengerItems([...passengerItems, passenger])
      }

      const [extraCost, setExtraCost] = useState();
      const [extraCostItems, setExtraCostItems] = useState([]);
    
      const handleAddExtraCost = () => {
        Keyboard.dismiss();
        console.log(extraCost)
        setExtraCostItems([...extraCostItems, extraCost])
        setExtraCost(null)
      }
      return (
        <View style={styles.container}>
          <View style={styles.topView}>
            {/*App name*/}
    
    
            {/*Dodawanie wartości spalania*/}
            <View style={styles.dataInputSection}>
              <Text style={styles.sectionTitle}>Całkowita pokonana trasa:</Text>
              <View style={styles.dataInputSectionRight}>
                <TextInput style={styles.input} placeholder={'0'} keyboardType = 'numeric'  />
                <Text style={styles.unit}>km</Text>
              </View>
            </View>
    
    
            {/*Dodawanie pasażerów*/}
            <View style={styles.passengerSection}>
              <Text style={styles.sectionTitle}>Pasażerowie</Text>
              <View style={styles.passengers}>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <TextInput style={styles.passengerName} placeholder={'Imie'} value = {passenger.name} onChangeText={text => setPassenger({name:text,distance:90})}></TextInput>
                </View>
                <View style={styles.itemRight}>
                    <TextInput style={styles.distanceInput} placeholder={'0'} keyboardType = 'numeric'  value = {passenger.distance} onChangeText={text => setPassenger({name:'dsaf',distance:90})}></TextInput>
                    <Text style={styles.passengerName}>km</Text>
                    <TouchableOpacity style={styles.addPassengerButton} onPress={()=> handleAddPassenger()}>
                      <Ionicons name="add-outline" size={20} ></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
               {
                  passengerItems.map((passenger, index) => {
                    return <Passenger key={index} text={passenger.distance}/>
                  })
               }
              </View>
            </View>
    
            {/*Dodawanie ceny paliwa*/}
            <View style={styles.dataInputSection}>
              <Text style={styles.sectionTitle}>Cena paliwa:</Text>
              <View style={styles.dataInputSectionRight}>
                <TextInput style={styles.input} placeholder={'0'} keyboardType = 'numeric'></TextInput>
                <Text style={styles.unit}>zł</Text>
              </View>
            </View>
    
            {/*Dodawanie wartości spalania*/}
            <View style={styles.dataInputSection}>
              <Text style={styles.sectionTitle}>Spalanie:</Text>
              <View style={styles.dataInputSectionRight}>
                <TextInput style={styles.input} placeholder={'0'} keyboardType = 'numeric'></TextInput>
                <Text style={styles.unit}>l/100km</Text>
              </View>
            </View>
    
            {/*Dodawanie kosztów dodatkowych*/}
            <View style={styles.extraCostSection}>
            <Text style={styles.sectionTitle}>Koszty dodatkowe</Text>
              <View style={styles.passengers}>
                <View style={styles.item}>
                  <View style={styles.itemLeft}>
                      <TextInput style={styles.costName} value = {extraCost} onChangeText={text => setExtraCost(text)}></TextInput>
                  </View>
                  <View style={styles.itemRight}>
                      <TextInput style={styles.costInput} placeholder={'0'} keyboardType = 'numeric'></TextInput>
                      <Text style={styles.costName}>zł</Text>
                      <TouchableOpacity style={styles.addExtraCostButton}>
                        <Ionicons name="add-outline" size={20}></Ionicons>
                      </TouchableOpacity>
                  </View>
                </View>
                {
                  extraCostItems.map((extraCost, index) => {
                    return <ExtraCost key={index} text={extraCost}/>
                  })
                }
              </View>
            </View>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      topView: {
    
      },
      bottomView: {
        backgroundColor:'#fff',
        justifyContent: 'flex-end',
        paddingBottom: 30,
      },
      viewTitle:{
        paddingTop: 60,
        paddingBottom: 40,
        fontSize: 25 ,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
      },
      sectionTitle:{
        fontSize: 20 ,
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingRight: 20,
        width: '60%',
      },
      dataInputSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 20,
      },
      dataInputSectionRight:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '40%',
        paddingLeft: 20,
      },
      input:{
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: '40%',
        textAlign: 'center'
      },
      unit:{
        textAlign: 'left',
        paddingLeft: 15
      },
      passengerSection:{
        paddingBottom: 10,
      },
      addPassengerButton:{
        alignItems: 'center',
      },
      addExtraCostButton:{
        alignItems: 'center',
      },
      extraCostSection:{
        
      },
      summaryButton:{
    
      },
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

export default MainView;