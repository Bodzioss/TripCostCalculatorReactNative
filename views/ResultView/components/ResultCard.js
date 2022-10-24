import { ScrollView, StyleSheet, Text, View } from 'react-native';


function ResultCard({passanger}){
    return (
        <>
            <View style={styles.cardWrapper}>
                <Text>{passanger.name}</Text>
                <Text>{passanger.mileage} km</Text>
                <Text>{passanger.fuelCost.toFixed(2)} zł</Text>
                <Text>Koszty dodatkowe</Text>
                {passanger.additionalCosts.map((cost) => <Text key={cost.id}>{cost.name} - {cost.price.toFixed(2)} zł</Text>)}
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    cardWrapper: {

        padding: 16,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'purple',
        borderRadius: 6
    }
})

export default ResultCard;