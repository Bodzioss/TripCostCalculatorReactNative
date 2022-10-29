import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import TopBar from './shared/TopBar';
import MainView from './views/MainView';
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
        .reduce(([prevFuelCost, prevMileage], passenger, index, arr) => {

          if(prevMileage === passenger.mileage){
            passenger.fuelCost = prevFuelCost;
          }
          else{
            const nextIntervalPrice = (passenger.mileage - prevMileage)*(fuelPrice*combustion/100);
            const remainingPassengers = (arr.length - index);
            passenger.fuelCost = prevFuelCost + nextIntervalPrice/remainingPassengers;
          }
          return [passenger.fuelCost, passenger.mileage]

        }, [0, 0]);
  }

  return (
    <>  
      {/* Status bar (battery status, wi-fi etc.) */}
      <StatusBar backgroundColor='#003956' style='light'/>

      {/* Main content */}
      <View style={styles.container}>

          {/* App name */}
          <TopBar />

          {/* Changing content */}
          {currentView === POSSIBLE_VIEWS.MAIN ? <MainView /> : <ResultView passengers={passengers}/>}

          {/* Toggle view button*/}
          <Button
            title={currentView === POSSIBLE_VIEWS.MAIN ? 'OBLICZ' : 'POWRÓT'} 
            color={currentView === POSSIBLE_VIEWS.MAIN && '#00c5a4'}
            onPress={toggleView}
          />

      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
