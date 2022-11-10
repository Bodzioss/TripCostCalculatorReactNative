import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import AddAdditionalCostView from './components/AddAdditionalCostView';
import AddPassengerView from './components/AddPassengerView';

function MainView({passengers, setPassengers, fuelPrice, setFuelPrice, combustion, setCombustion, additionalCosts, setAdditionalCosts}){
      const [passengerName,setPassengerName] = useState('');
      const [passengerDistance,setPassengerDistance] = useState(0);

      const [additionalCostName,setAdditionalCostName] = useState('');
      const [additionalCostPrice,setAdditionalCostPrice] = useState(0);

    
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.topView}>
              {/*App name*/}
            
              {/*Dodawanie pasażerów*/}
              <AddPassengerView 
                passengers={passengers} 
                setPassengers={setPassengers}
                passengerName={passengerName} 
                setPassengerName={setPassengerName} 
                passengerDistance={passengerDistance} 
                setPassengerDistance={setPassengerDistance}
              />
      
              {/*Dodawanie ceny paliwa*/}
              <View style={styles.dataInputSection}>
                <Text style={styles.sectionTitle}>Cena paliwa:</Text>
                <View style={styles.dataInputSectionRight}>
                  <TextInput style={styles.input} 
                    placeholder={'0'} 
                    keyboardType = 'numeric' 
                    value = {fuelPrice} 
                    onChangeText={(fuelPrice) => setFuelPrice(fuelPrice)}/>
                  <Text style={styles.unit}>zł</Text>
                </View>
              </View>
      
              {/*Dodawanie wartości spalania*/}
              <View style={styles.dataInputSection}>
                <Text style={styles.sectionTitle}>Spalanie:</Text>
                <View style={styles.dataInputSectionRight}>
                  <TextInput style={styles.input} 
                    placeholder={'0'} 
                    keyboardType = 'numeric' 
                    value = {combustion} 
                    onChangeText={(combustion) => setCombustion(combustion)}/>
                  <Text style={styles.unit}>l/100km</Text>
                </View>
              </View>
      
              {/*Dodawanie kosztów dodatkowych*/}
              <AddAdditionalCostView 
                passengers={passengers} 
                setPassengers={setPassengers}
                additionalCosts={additionalCosts} 
                setAdditionalCosts={setAdditionalCosts}
                additionalCostName={additionalCostName} 
                setAdditionalCostName={setAdditionalCostName} 
                additionalCostPrice={additionalCostPrice} 
                setAdditionalCostPrice={setAdditionalCostPrice}
              />        
            
            </View>
          </ScrollView>
        </View>
      );
    }
    
const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
      justifyContent: 'center',
      alignItems: 'center',
    },

    topView: {
      paddingTop: 30,
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 20,
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
    })

export default MainView;