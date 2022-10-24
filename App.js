import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import TopBar from './shared/TopBar';
import MainView from './views/MainView';
import ResultView from './views/ResultView/ResultView';
import { POSSIBLE_VIEWS } from './constants/constants';
import Passanger  from './classes/Passanger';
import AdditionalCost from './classes/AdditionalCost';

// Mock data
const passangerArr = [
  new Passanger("Wiktor", 100),
  new Passanger("Marcin", 200),
  new Passanger("Marcin", 200),
  new Passanger("Marcin", 200),
  new Passanger("Marcin", 200)
]

passangerArr[0].additionalCosts = [ new AdditionalCost('Autostrada', 3.0), new AdditionalCost('Parking', 4.0)]
passangerArr[1].additionalCosts = [ new AdditionalCost('Autostrada', 3.0)]

passangerArr[0].calculateFuelCost(7.9, 11);
passangerArr[1].calculateFuelCost(7.9, 11);


export default function App() {

  const [currentView, setCurrentView] = useState(POSSIBLE_VIEWS.MAIN);
  const [passangers, setPassangers] = useState(passangerArr);

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
          {currentView === POSSIBLE_VIEWS.MAIN ? <MainView /> : <ResultView passangers={passangers}/>}

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
