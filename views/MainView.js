import { ScrollView, StyleSheet, Text, View } from 'react-native';

function MainView(){

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
                    <Text>Main View</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MainView;