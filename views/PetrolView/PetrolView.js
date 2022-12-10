import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/AppConstants';

function PetrolView() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text>PetrolView works!</Text>
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
  content: {},
});

export default PetrolView;
