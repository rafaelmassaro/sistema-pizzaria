import React from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    TextInput
 } from 'react-native';

import { Feather } from "@expo/vector-icons";

import { api } from '../../services/api';

type RouteDetailProps = {
    Order: {
        number: number | string;
        order_id: string;
    };
}

type OrderRouteProps = RouteProp<RouteDetailProps, 'Order'>;

export default function Order(){
    const navigation = useNavigation();

    const route = useRoute<OrderRouteProps>();

    async function handleCloseOrder(){
        try{
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id,
                }
            });

            navigation.goBack();

        }catch(error){
            console.log('Erro', error);
        }


    }

    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>
                    Mesa {route.params.number}
                </Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name="trash-2" size={28} color="#ff3f4b" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={{color: '#fff'}} >Pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
                <Text style={{color: '#fff'}}>Pizza de Calabresa</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, {width: '60%', textAlign: 'center'}]}
                    placeholder='1'
                    placeholderTextColor="#f0f0f0"
                    keyboardType='numeric' 
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14,
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20,
    },
    qtdContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});