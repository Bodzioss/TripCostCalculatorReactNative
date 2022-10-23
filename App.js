import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import TopBar from './shared/TopBar';
import MainView from './views/MainView';
import ResultView from './views/ResultView';
import { POSSIBLE_VIEWS } from './constants/constants';


export default function App() {

  const [currentView, setCurrentView] = useState(POSSIBLE_VIEWS.MAIN);

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
          {currentView === POSSIBLE_VIEWS.MAIN ? <MainView /> : <ResultView />}

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
