import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/AppConstants';
import ResultCard from './components/ResultCard'

function ResultView({passengers}){

    const getSumOfFuelCosts = (passengers) => {
        return passengers
                    .reduce((sum, passenger) => sum + passenger.fuelCost, 0)
    }

    const getSumOfPassengerAdditionalCosts = (passenger) => {
        return passenger.additionalCosts
                            .reduce((sum, additionalCost) => sum + additionalCost.price, 0);
    }

    const getSumOfAdditionalCosts = (passengers) => {
        return passengers
                    .reduce((sum, passenger) => sum + getSumOfPassengerAdditionalCosts(passenger), 0)
    }

    const sumOfFuelCosts = getSumOfFuelCosts(passengers);
    const sumOfAdditionalCosts = getSumOfAdditionalCosts(passengers);
    const allCosts = sumOfFuelCosts + sumOfAdditionalCosts;

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>

                    {/* Passangers list */}
                    <View style={styles.passengersList}>
                        {passengers.map(passenger => {
                            return (
                                <ResultCard key={passenger.id} passenger={passenger} />
                            );
                        })}
                    </View>
                    
                    {/* Summary wrapper */}
                    <View style={styles.summaryWrapper}>
                        
                        {/* Summary label */}
                        <View style={styles.summaryLabel}>
                            <Text style={styles.summaryText}>Podsumowanie</Text>
                        </View>

                        {/* Summary content */}
                        <View style={styles.summaryContent}>
                            
                            {/* Summary - fuel cost */}
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Koszty paliwa</Text>
                                <Text style={styles.labelPrice}>{sumOfFuelCosts.toFixed(2)} zł</Text>
                            </View>

                            {/* Summary - additional costs */}
                            <View style={styles.label}>
                                <Text style={styles.labelText}>Koszty dodatkowe</Text>
                                <Text style={styles.labelPrice}>{sumOfAdditionalCosts.toFixed(2)} zł</Text>
                            </View>

                            {/* Summary - all */}
                            <View style={[styles.label, styles.sumLabel]}>
                                <Text style={styles.sumLabelText}>SUMA</Text>
                                <Text style={styles.sumLabelPrice}>{allCosts.toFixed(2)} zł</Text>
                            </View>

                        </View>

                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,  // Take all remaining space
        backgroundColor: '#00000055'
    },
    content: {
        flex: 1,
    },
    passengersList: {
        flex: 1,
        marginVertical: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    // Summary
    summaryWrapper: {
        backgroundColor: 'white',
        paddingVertical: 16,
    },
    summaryLabel: {
        padding: 16,
        borderColor: COLORS.MAIN_BLUE,
        borderBottomWidth: 4,
        borderStyle: 'solid',
        marginHorizontal: 28
    },
    summaryText: {
        textAlign: 'center', 
        fontWeight: '500', 
        fontSize: 18,
    },
    summaryContent: {
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    // Default label
    label: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginVertical: 5,
        borderRadius: 1000,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.MAIN_GREY
    },
    labelText: {
        opacity: 0.45,
        fontWeight: '600'
    },
    labelPrice: {
        fontWeight:'700', 
        opacity: 0.8
    },
    // Sum label (use always with label class)
    sumLabel: {
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.MAIN_BLUE,
        paddingRight: 26,
    },
    sumLabelText: {
        color: 'white', 
        fontWeight: '500'
    },
    sumLabelPrice: {
        color: 'white', 
        fontWeight:'700'
    }
})

export default ResultView;