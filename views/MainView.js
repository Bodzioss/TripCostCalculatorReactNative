import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard, ScrollView } from 'react-native';
import Passenger from '../classes/Passenger';
import AdditionalCost from '../classes/AdditionalCost';

function MainView({passengers, setPassengers, fuelPrice, setFuelPrice, combustion, setCombustion}){
      const [passengerName,setPassengerName] = useState();
      const [passengerDistance,setPassengerDistance] = useState();

      const [additionalCostName,setAdditionalCostName] = useState();
      const [additionalCostPrice,setAdditionalCostPrice] = useState();
      const [additionalCosts, setAdditionalCosts] = useState([]);

      const handleAddPassenger = () => {
        Keyboard.dismiss();
        setPassengers([...passengers, new Passenger(passengerName, passengerDistance)])
        setPassengerName('');
        setPassengerDistance('');
      }

     
    
      const handleAddAdditionalCosts = () => {
        Keyboard.dismiss();
        setAdditionalCosts([...additionalCosts, new AdditionalCost(additionalCostName,additionalCostPrice)]);
        passengers.map((passenger) => {
          passenger.addAdditionalCost(new AdditionalCost(additionalCostName, additionalCostPrice));
        })
      }

      const removePassenger = (index) =>{
        let passengersCopy = [...passengers];
        passengersCopy.splice(index, 1);
        setPassengers(passengersCopy);
      }

      
      const removeAdditionalCost = (index) =>{
        let additionalCostCopy = [...additionalCosts];
        additionalCostCopy.splice(index, 1);
        setAdditionalCosts(additionalCostCopy);
      }

      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.topView}>
              {/*App name*/}
      
      
              {/* Dodawanie wartości spalania
              <View style={styles.dataInputSection}>
                <Text style={styles.sectionTitle}>Całkowita pokonana trasa:</Text>
                <View style={styles.dataInputSectionRight}>
                  <TextInput style={styles.input} placeholder={'0'} keyboardType = 'numeric' value = {totalDistance} onChangeText={(totalDistance) => setPassengerName(setTotalDistance)} />
                  <Text style={styles.unit}>km</Text>
                </View>
              </View> */}
      
      
              {/*Dodawanie pasażerów*/}
              <View style={styles.passengerSection}>
                <Text style={styles.sectionTitle}>Pasażerowie</Text>
                <View style={styles.passengers}>
                <View style={styles.item}>
                      <View style={styles.itemLeft}>
                      <TextInput style={styles.passengerName} placeholder={'Imie'} value = {passengerName} onChangeText={(passengerName) => setPassengerName(passengerName)}/>
                      </View>
                      <View style={styles.itemRight}>
                      <TextInput style={styles.passengerName} placeholder={'0'} keyboardType = 'numeric'  value = {passengerDistance} onChangeText={(passengerDistance) => setPassengerDistance(passengerDistance)}></TextInput>
                      <Text style={styles.passengerName}>km</Text>
                        <TouchableOpacity style={styles.addPassengerButton} onPress={()=> handleAddPassenger()}>
                          <Ionicons name="add-outline" size={20} ></Ionicons>
                        </TouchableOpacity>
                      </View>
                  </View>
                {
                   passengers.map((passenger, index) => {
                      return( 
                      <View style={styles.item}>
                      <View style={styles.itemLeft}>
                          <Text style={styles.passengerName}>{passenger.name}</Text>
                      </View>
                      <View style={styles.itemRight}>
                          <Text style={styles.passengerName}>{passenger.mileage} km</Text>
                          <TouchableOpacity 
                           key={index}  
                           onPress={() => removePassenger(index)}>
                            <Ionicons name="close-outline"></Ionicons>
                          </TouchableOpacity>
                      </View>
                  </View>)
                    })
                }
                </View>
              </View>
      
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
              <View style={styles.extraCostSection}>
              <Text style={styles.sectionTitle}>Koszty dodatkowe</Text>
                <View style={styles.passengers}>
                  <View style={styles.item}>
                    <View style={styles.itemLeft}>
                        <TextInput style={styles.costName} 
                          placeholder={'Nazwa kosztu dodatkowego'} 
                          value = {additionalCostName} 
                          onChangeText={additionalCostName => setAdditionalCostName(additionalCostName)}/>
                    </View>
                    <View style={styles.itemRight}>
                        <TextInput style={styles.costInput} 
                          placeholder={'0'} 
                          keyboardType = 'numeric' 
                          value = {additionalCostPrice} 
                          onChangeText={additionalCostPrice => setAdditionalCostPrice(additionalCostPrice)}/>
                        <Text style={styles.costName}>zł</Text>
                        <TouchableOpacity 
                          style={styles.addExtraCostButton} 
                          onPress={()=> handleAddAdditionalCosts()}>
                          <Ionicons name="add-outline" size={20}></Ionicons>
                        </TouchableOpacity>
                    </View>
                  </View>
                  {
                    additionalCosts.map((additionalCost, index) => {
                      return (
                        <View style={styles.item}>
                          <View style={styles.itemLeft}>
                              <Text style={styles.passengerName}>{additionalCost.name}</Text>
                          </View>
                          <View style={styles.itemRight}>
                              <Text style={styles.passengerName}>{additionalCost.price} zł</Text>
                              <TouchableOpacity key={index}  onPress={() => removeAdditionalCost(index)}>
                                <Ionicons name="close-outline"></Ionicons>
                              </TouchableOpacity>
                          </View>
                      </View>
                      )
                    })
                  }
                </View>
              </View>
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
    itemDivided:{
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
  },
    itemTop:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    itemBottom:{
      flexDirection:'row',
      flexWrap:'wrap',
      paddingTop: 10,
      justifyContent: 'space-between',
  },
  checkbox:{
    alignItems:'center',
    paddingRight: 15,
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