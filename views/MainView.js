import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, MD3Colors } from 'react-native-paper';

import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import Passenger from '../classes/Passenger';
import AdditionalCost from '../classes/AdditionalCost';
import { COLORS } from '../constants/AppConstants';

function MainView({
  passengers,
  setPassengers,
  additionalCosts,
  setAdditionalCosts,
  fuelPrice,
  setFuelPrice,
  combustion,
  setCombustion,
}) {
  const [passengerName, setPassengerName] = useState('');
  const [passengerDistance, setPassengerDistance] = useState(0);

  const [additionalCostName, setAdditionalCostName] = useState('');
  const [additionalCostPrice, setAdditionalCostPrice] = useState(0);

  const handleAddPassenger = () => {
    Keyboard.dismiss();
    if (passengerName === '') return;
    setPassengers([
      ...passengers,
      new Passenger(passengerName, passengerDistance),
    ]);
    // Clear inputs
    setPassengerName('');
    setPassengerDistance(0);
  };

  const handleAddAdditionalCosts = () => {
    Keyboard.dismiss();
    if (additionalCostName === '') return;
    setAdditionalCosts([
      ...additionalCosts,
      new AdditionalCost(additionalCostName, additionalCostPrice),
    ]);
    // Clear inputs
    setAdditionalCostName('');
    setAdditionalCostPrice(0);
  };

  const removePassenger = (index) => {
    let passengersCopy = [...passengers];
    passengersCopy.splice(index, 1);
    setPassengers(passengersCopy);
  };

  const removeAdditionalCost = (index) => {
    let additionalCostCopy = [...additionalCosts];
    additionalCostCopy.splice(index, 1);
    setAdditionalCosts(additionalCostCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentWrapper}>
          {/* Adding passengers */}
          <View style={styles.section}>
            {/* Label */}
            <Text style={styles.sectionTitle}>Pasażerowie</Text>

            {/* Passanger input*/}
            <View style={styles.whiteCard}>
              {/* Name input */}
              <View style={styles.itemLeft}>
                <TextInput
                  placeholder={'Imie'}
                  value={passengerName}
                  onChangeText={(passengerName) =>
                    setPassengerName(passengerName)
                  }
                />
              </View>

              {/* Mileage input*/}
              <View style={styles.itemRight}>
                {/* Input */}
                <TextInput
                  style={styles.numberInput}
                  placeholder={'0'}
                  keyboardType="numeric"
                  value={passengerDistance}
                  onChangeText={(passengerDistance) =>
                    setPassengerDistance(passengerDistance)
                  }
                ></TextInput>
                {/* Suffix */}
                <Text style={styles.unit}>km</Text>
                {/* Add button */}
                <IconButton
                  icon="plus-circle"
                  iconColor={COLORS.MAIN_BLUE}
                  size={32}
                  onPress={() => handleAddPassenger()}
                />
              </View>
            </View>

            {/* Passangers list */}
            {passengers.map((passenger, index) => {
              return (
                // Passanger card
                <View key={passenger.id} style={styles.whiteCard}>
                  {/* Passanger name */}
                  <View style={styles.itemLeft}>
                    <Text>{passenger.name}</Text>
                  </View>

                  {/* Passanger mileage */}
                  <View style={styles.itemRight}>
                    {/* Mileage label */}
                    <Text>{passenger.mileage} km</Text>

                    {/* Delete button */}
                    <IconButton
                      icon="close"
                      iconColor="red"
                      size={28}
                      onPress={() => removePassenger(index)}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Fuel cost logic */}
          <View style={styles.dataInputSection}>
            {/* Label */}
            <Text style={styles.sectionTitle}>Cena paliwa:</Text>

            {/* Input */}
            <View style={styles.dataInputSectionRight}>
              <TextInput
                style={styles.input}
                placeholder={'0'}
                keyboardType="numeric"
                value={fuelPrice}
                onChangeText={(fuelPrice) => setFuelPrice(fuelPrice)}
              />
              <Text style={styles.unit}>zł</Text>
            </View>
          </View>

          {/* Combustion logic */}
          <View style={styles.dataInputSection}>
            {/* Label */}
            <Text style={styles.sectionTitle}>Spalanie:</Text>

            {/* Input */}
            <View style={styles.dataInputSectionRight}>
              <TextInput
                style={styles.input}
                placeholder={'0'}
                keyboardType="numeric"
                value={combustion}
                onChangeText={(combustion) => setCombustion(combustion)}
              />
              <Text style={styles.unit}>l/100km</Text>
            </View>
          </View>

          {/* Adding additionlCosts */}
          <View style={styles.section}>
            {/* Label */}
            <Text style={styles.sectionTitle}>Koszty dodatkowe</Text>

            {/* Additional cost input */}
            <View style={styles.whiteCard}>
              {/* Name input */}
              <View style={styles.itemLeft}>
                <TextInput
                  placeholder={'Koszt dodatkowy'}
                  value={additionalCostName}
                  onChangeText={(additionalCostName) =>
                    setAdditionalCostName(additionalCostName)
                  }
                />
              </View>

              {/* Cost input */}
              <View style={styles.itemRight}>
                {/* Input */}
                <TextInput
                  style={styles.numberInput}
                  placeholder={'0'}
                  keyboardType="numeric"
                  value={additionalCostPrice}
                  onChangeText={(additionalCostPrice) =>
                    setAdditionalCostPrice(additionalCostPrice)
                  }
                />
                {/* Suffix */}
                <Text style={styles.unit}>zł</Text>
                {/* Add button */}
                <IconButton
                  icon="plus-circle"
                  iconColor={COLORS.MAIN_BLUE}
                  size={32}
                  onPress={() => handleAddAdditionalCosts()}
                />
              </View>
            </View>

            {/* Addtional costs list */}
            {additionalCosts.map((additionalCost, index) => {
              return (
                // Addtional cost card
                <View key={additionalCost.id} style={styles.whiteCard}>
                  {/* Name */}
                  <View style={styles.itemLeft}>
                    <Text>{additionalCost.name}</Text>
                  </View>

                  {/* Price */}
                  <View style={styles.itemRight}>
                    <Text>{additionalCost.price} zł</Text>
                    {/* Delete button */}
                    <IconButton
                      icon="close"
                      iconColor="red"
                      size={28}
                      onPress={() => removeAdditionalCost(index)}
                    />
                  </View>
                </View>
              );
            })}
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
  contentWrapper: {
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 20,
  },
  sectionTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingRight: 20,
    width: '60%',
  },
  dataInputSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 20,
  },
  dataInputSectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '40%',
    paddingLeft: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '40%',
    textAlign: 'center',
  },
  unit: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  section: {
    paddingBottom: 10,
  },
  whiteCard: {
    backgroundColor: '#FFF',
    paddingLeft: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  numberInput: {
    width: 60,
    textAlign: 'right',
  },
});

export default MainView;
