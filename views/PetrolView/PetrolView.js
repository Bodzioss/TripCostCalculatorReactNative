import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/AppConstants';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Address from '../../classes/Address';
import { Image } from 'react-native';

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

          <View
            style={{
              ...styles.stationCard,
              paddingVertical: 8,
            }}
          >
            <Text style={styles.whiteBoldMargin}>Legenda:</Text>
            <View style={{ ...styles.stationData, paddingLeft: 0 }}>
              <View style={{ ...styles.stationGas, marginBottom: 4 }}>
                <Image
                  style={{ width: 64, height: 64 }}
                  source={require('../../assets/icons/lpg1.png')}
                />
                <Text style={styles.white}>
                  - występuje obrót gazem płynnym LPG
                </Text>
              </View>
              <View style={styles.stationGas}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 8,
                    marginRight: 8,
                  }}
                  source={require('../../assets/icons/oil.png')}
                />
                <Text style={styles.white}>
                  - występuje obrót olejami napędowymi
                </Text>
              </View>
              <View style={styles.stationGas}>
                <Image
                  style={{
                    width: 44,
                    height: 44,
                    marginLeft: 28,
                    marginRight: 12,
                  }}
                  source={require('../../assets/icons/pertol.png')}
                />
                <Text style={styles.white}>
                  - występuje obrót benzynami silnikowymi
                </Text>
              </View>
            </View>
          </View>

          {/* Petrol stations */}
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Stacje paliw w okolicy:</Text>
            {/* List */}
            {stationsLoading ? (
              <Text>Ładowanie</Text>
            ) : (
              petrolStations?.map((station, index) => (
                <View key={index} style={styles.stationCard}>
                  <View style={styles.stationData}>
                    <Text style={styles.whiteBold}>{station.nazwa}</Text>
                    <Text style={{ ...styles.white, marginTop: 8 }}>
                      {station.adres}
                    </Text>
                    <Text style={styles.white}>{station.miejscowosc}</Text>
                  </View>
                  <View style={styles.stationGas}>
                    {station.gazPlynnyLPG == '1' && (
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../assets/icons/lpg1.png')}
                      />
                    )}
                    {station.olejeNapedowe == '1' && (
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../../assets/icons/oil.png')}
                      />
                    )}
                    {station.benzynySilnikowe == '1' && (
                      <Image
                        style={{ width: 36, height: 36, marginHorizontal: 8 }}
                        source={require('../../assets/icons/pertol.png')}
                      />
                    )}
                  </View>
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
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAIN_BLUE,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  stationData: {
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    paddingBottom: 10,
    width: '100%',
  },
  whiteBoldMargin: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 16,
  },
  whiteBold: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  white: {
    textAlign: 'center',
    color: 'white',
  },
  stationGas: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PetrolView;
