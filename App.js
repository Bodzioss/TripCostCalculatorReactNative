import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TopBar from './shared/TopBar';
import MainView from './views/MainView';
import ResultView from './views/ResultView/ResultView';
import { COLORS, POSSIBLE_VIEWS } from './constants/AppConstants';
import AdditionalCost from './classes/AdditionalCost';
import { IconButton } from 'react-native-paper';
import PetrolView from './views/PetrolView/PetrolView';

export default function App() {
  const [currentView, setCurrentView] = useState(POSSIBLE_VIEWS.MAIN);
  const [passengers, setPassengers] = useState([]);
  const [additionalCosts, setAdditionalCosts] = useState([]);
  const [fuelPrice, setFuelPrice] = useState(0.0);
  const [combustion, setCombustion] = useState(0.0);

  function calculateCosts() {
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

        {/* --- Changing content (Main/Result/Petrol) --- */}
        {/* Main view */}
        {currentView === POSSIBLE_VIEWS.MAIN && (
          <MainView
            passengers={passengers}
            setPassengers={setPassengers}
            additionalCosts={additionalCosts}
            setAdditionalCosts={setAdditionalCosts}
            fuelPrice={fuelPrice}
            setFuelPrice={setFuelPrice}
            combustion={combustion}
            setCombustion={setCombustion}
          />
        )}
        {/* Result view */}
        {currentView === POSSIBLE_VIEWS.RESULT && (
          <ResultView passengers={passengers} />
        )}
        {/* Petrol view */}
        {currentView === POSSIBLE_VIEWS.PETROL && <PetrolView />}

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
