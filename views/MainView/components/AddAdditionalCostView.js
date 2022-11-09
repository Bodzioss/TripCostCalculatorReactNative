import { StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AdditionalCost from '../../../classes/AdditionalCost';




function AddAdditionalCostView({passengers, additionalCosts, setAdditionalCosts, additionalCostName, 
    setAdditionalCostName, additionalCostPrice, setAdditionalCostPrice}){

    const handleAddAdditionalCosts = () => {
        Keyboard.dismiss();
        if(additionalCostName != '' && additionalCostPrice > 0){
            setAdditionalCosts([...additionalCosts, new AdditionalCost(additionalCostName,additionalCostPrice)]);
            passengers.map((passenger) => {
                passenger.addAdditionalCost(new AdditionalCost(additionalCostName, additionalCostPrice));
            })
            setAdditionalCostName('');
            setAdditionalCostPrice(0);
        }
    }
        
    const removeAdditionalCost = (index) =>{
        let additionalCostCopy = [...additionalCosts];
        additionalCostCopy.splice(index, 1);
        setAdditionalCosts(additionalCostCopy);
    }

    return (
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

export default AddAdditionalCostView;