import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ResultCard from './components/ResultCard'

function ResultView({passangers}){

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>

                    {/* Passangers list */}
                    <View style={styles.passangersList}>
                        {passangers.map(passanger => {
                            return (
                                <ResultCard key={passanger.id} passanger={passanger} />
                            );
                        })}
                    </View>

                    <View style={styles.divider}></View>

                    <Text style={{textAlign: 'center', fontWeight: '500'}}>Podsumowanie</Text>
                   
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        // Take all remaining space
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: 'red'
    },
    passangersList: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: 'blue'
    },
    divider: {
        height: 3,
        backgroundColor: 'blue',
        marginBottom: 20,
        marginTop: 10
    }
})

export default ResultView;