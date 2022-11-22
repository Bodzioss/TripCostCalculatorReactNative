import { StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Passenger from '../../../classes/Passenger';


function AddPassengerView({passengers,setPassengers,passengerName,setPassengerName,passengerDistance,setPassengerDistance, additionalCosts}){

    const handleAddPassenger = () => {
        Keyboard.dismiss();
        if(passengerName != '' && passengerDistance > 0){  
            setPassengers([...passengers, new Passenger(passengerName, passengerDistance)])
            setPassengerName('');
            setPassengerDistance(0);
        }
      }

    const removePassenger = (index) =>{
        let passengersCopy = [...passengers];
        passengersCopy.splice(index, 1);
        setPassengers(passengersCopy);
      }  
    
    return (
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
              <View key={index} style={styles.item}>
              <View style={styles.itemLeft}>
                  <Text style={styles.passengerName}>{passenger.name}</Text>
              </View>
              <View style={styles.itemRight}>
                  <Text style={styles.passengerName}>{passenger.mileage} km</Text>
                  <TouchableOpacity 
                   key={index}  
                   onPress={() => removePassenger(index)}>
                    <Ionicons name="close-outline" size={20}></Ionicons>
                  </TouchableOpacity>
              </View>
          </View>)
            })
        }
        </View>
      </View>
    );
}

const styles = StyleSheet.create({

    sectionTitle:{
      fontSize: 20 ,
      fontWeight: 'bold',
      paddingBottom: 5,
      paddingRight: 20,
      width: '60%',
    },

    passengerSection:{
      paddingBottom: 10,
    },

    addPassengerButton:{
      alignItems: 'center',
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
  })

export default AddPassengerView;