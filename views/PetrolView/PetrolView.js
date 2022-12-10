import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/AppConstants';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Address from '../../classes/Address';

function PetrolView() {
  const [userLocation, setUserLocation] = useState(null);
  const [petrolStations, setPetrolStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stationsLoading, setStationsLoading] = useState(false);

  async function GetCurrentLocation() {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        setUserLocation(
          new Address(item.street, item.name, item.postalCode, item.city)
        );
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    // Petrol stations call
    setStationsLoading(true);
    fetch(
      `https://api.ure.gov.pl/api/InfrastructureFuelStation?Miejscowosc=${userLocation.city}`
    )
      .then((response) => response.json())
      .then((stations) => {
        setStationsLoading(false);
        setPetrolStations(stations);
      });
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Location */}
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Twoja lokalizacja to:</Text>
            <Text>{loading ? 'Ładowanie...' : userLocation?.toString()}</Text>
          </View>

          {/* Petrol stations */}
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Stacje w okolicy:</Text>
            {/* List */}
            {stationsLoading ? (
              <Text>Ładowanie</Text>
            ) : (
              petrolStations?.map((station, index) => (
                <View key={index} style={styles.stationCard}>
                  <Text style={styles.white}>{station.nazwa}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take all remaining space
    backgroundColor: '#00000055',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  sectionHeader: {
    paddingTop: 10,
    fontWeight: '600',
  },
  card: {
    marginTop: 10,
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationCard: {
    backgroundColor: COLORS.MAIN_BLUE,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  white: {
    color: 'white',
  },
});

export default PetrolView;
