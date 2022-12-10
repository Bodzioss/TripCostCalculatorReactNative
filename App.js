import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TopBar from './shared/TopBar';
import MainView from './views/MainView/MainView';
import ResultView from './views/ResultView/ResultView';
import { POSSIBLE_VIEWS } from './constants/AppConstants';
import Passenger  from './classes/Passenger';
import AdditionalCost from './classes/AdditionalCost';

// Mock data
const passengerArr = [
  new Passenger("Wiktor", 200),
  new Passenger("Marcin", 300),
  new Passenger("Karol", 150),
  new Passenger("Kuba", 400),
  new Passenger("Kacper", 500)
]

passengerArr[0].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)];
passengerArr[1].additionalCosts = [ new AdditionalCost('Autostrada', 3.0)];
passengerArr[2].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)];
passengerArr[3].additionalCosts = [ new AdditionalCost('Autostrada', 3.0)];
passengerArr[4].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)];


export default function App() {
  const [currentView, setCurrentView] = useState(POSSIBLE_VIEWS.MAIN);
  const [totalDistance, setTotalDistance] = useState(500);
  const [passengers, setPassengers] = useState(passengerArr);
  const [fuelPrice, setFuelPrice] = useState(6.0);
  const [combustion, setCombustion] = useState(10.0);
  
  function toggleView(){
    if(currentView !== POSSIBLE_VIEWS.RESULT){
      // Calculate fuel costs for each person
      calculateFuelCosts(passengers);
    }
    setCurrentView((currentView) => currentView === POSSIBLE_VIEWS.MAIN ? POSSIBLE_VIEWS.RESULT : POSSIBLE_VIEWS.MAIN);
  }

  function calculateFuelCosts(passengers){
    passengers
      .sort((a, b) => a.mileage - b.mileage)
      .reduce(
        ([prevFuelCost, prevMileage], passenger, index, arr) => {
          if (prevMileage === passenger.mileage) {
            passenger.fuelCost = prevFuelCost;
          } else {
            const nextIntervalPrice =
              (passenger.mileage - prevMileage) *
              ((fuelPrice * combustion) / 100);
            const remainingPassengers = arr.length - index;
            passenger.fuelCost =
              prevFuelCost + nextIntervalPrice / remainingPassengers;
          }
          passenger.additionalCosts = additionalCosts.map(
            (addCost) =>
              new AdditionalCost(
                addCost.name,
                addCost.price / passengers.length
              )
          );
          return [passenger.fuelCost, passenger.mileage];
        },
        [0, 0]
      );
  }

  return (
    <>
      {/* Status bar (battery status, wi-fi etc.) */}
      <StatusBar backgroundColor="#003956" style="light" />

      {/* Main content */}
      <View style={styles.container}>
        {/* --- App name --- */}
        <TopBar />

          {/* Changing content */}
          {currentView === POSSIBLE_VIEWS.MAIN ? <MainView passengers={passengers} setPassengers={setPassengers} fuelPrice={fuelPrice} setFuelPrice={setFuelPrice} combustion={combustion} setCombustion={setCombustion}/> : <ResultView passengers={passengers}/>}

        {/* --- Toggle view buttons --- */}
        <View style={styles.screensNavigation}>
          <IconButton
            icon="home-outline"
            iconColor={COLORS.MAIN_BLUE}
            size={32}
            onPress={() => setCurrentView(POSSIBLE_VIEWS.MAIN)}
          />
          <IconButton
            icon="calculator-variant-outline"
            iconColor={COLORS.MAIN_BLUE}
            size={32}
            onPress={() => {
              calculateCosts();
              setCurrentView(POSSIBLE_VIEWS.RESULT);
            }}
          />
          <IconButton
            icon="gas-station-outline"
            iconColor={COLORS.MAIN_BLUE}
            size={32}
            onPress={() => setCurrentView(POSSIBLE_VIEWS.PETROL)}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screensNavigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    // Shadow config
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
