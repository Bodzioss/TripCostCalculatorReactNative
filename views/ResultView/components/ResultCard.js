import { StyleSheet, Text, View } from 'react-native';
import Passenger from '../../../classes/Passenger';
import { COLORS } from '../../../constants/AppConstants';


function ResultCard({passenger}){

    let sumOfCosts = passenger.fuelCost + passenger.additionalCosts.reduce((sum, additionalCost) => sum + additionalCost.price, 0);

    return (
        <>
            <View style={styles.cardWrapper}>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.passengerName}>{passenger.name}</Text>
                    <Text style={styles.mileage}>{passenger.mileage} km</Text>
                </View>

                {/* Label - fuel costs */}
                <View style={styles.label}>
                    <Text style={styles.labelText}>Koszty paliwa</Text>
                </View>

                {/* Sublabel */}
                <View style={styles.cost}>
                    <Text>Paliwo</Text>
                    <Text>{passenger.fuelCost.toFixed(2)} zł</Text>
                </View>

                {/* Label - additional costs (if exists) */}
                {passenger.additionalCosts.length !== 0 && 
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Koszty dodatkowe</Text>
                    </View>
                }

                {/* Additional costs */}
                {passenger.additionalCosts.map((additionalCost) => {
                    return(
                        <View key={additionalCost.id} style={styles.cost}>
                            <Text>{additionalCost.name}</Text>
                            <Text>{additionalCost.price.toFixed(2)} zł</Text>
                        </View>
                    );
                })}

                {/* Sum label */}
                <View style={[styles.label, styles.sumLabel]}>
                    <Text style={styles.sumLabelText}>SUMA</Text>
                    <Text style={styles.sumLabelPrice}>{sumOfCosts.toFixed(2)} zł</Text>
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    
    cardWrapper: {
        padding: 24,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginVertical: 10,
        borderRadius: 24,
        elevation: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        paddingBottom: 8
    },
    passengerName: {
        fontSize: 24,
        fontWeight: '500',
        color: COLORS.MAIN_BLUE
    },
    mileage: {
        fontWeight: '500',
        opacity: 0.6,
        fontSize: 20
    },
    label: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginVertical: 5,
        borderRadius: 1000,
        backgroundColor: COLORS.MAIN_GREY,
    },
    labelText: {
        opacity: 0.45,
        fontWeight: '600'
    },
    cost: {
        marginTop: 6,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 26,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderBottomColor: 'grey'
    },
    sumLabel: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

export default ResultCard;