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
  new Passenger("Wiktor", 150),
  new Passenger("Marcin", 400),
  new Passenger("Karol", 500),
  new Passenger("Kuba", 200),
  new Passenger("Kacper", 350)
]

passengerArr[0].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)]
passengerArr[1].additionalCosts = [ new AdditionalCost('Autostrada', 3.0)]
passengerArr[2].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)]
passengerArr[3].additionalCosts = [ new AdditionalCost('Autostrada', 3.0)]
passengerArr[4].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)]

const mileageSum = passengerArr.reduce((sum, passenger) => sum + passenger.mileage, 0);
passengerArr.forEach((passenger) => passenger.calculateFuelCost(7.9 * (passenger.mileage/mileageSum), 11))

export default function App() {

  const [currentView, setCurrentView] = useState(POSSIBLE_VIEWS.RESULT);
  const [passengers, setPassengers] = useState(passengerArr);

  function toggleView(){
    setCurrentView((currentView) => currentView === POSSIBLE_VIEWS.MAIN ? POSSIBLE_VIEWS.RESULT : POSSIBLE_VIEWS.MAIN);
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
