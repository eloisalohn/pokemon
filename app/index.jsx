import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Pokemon = () => {
    const [pokemon, setPokemon] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {

        fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then(data => setPokemonTypes(data.results))
            .catch(error => console.log('Error fetching Pokémon types:', error));


        fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
            .then(response => response.json())
            .then(data => setFilteredPokemons(data.results))
            .catch(error => console.log('Error fetching Pokémon list:', error));
    }, []);

    useEffect(() => {
        if (selectedType) {

            fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
                .then(response => response.json())
                .then(data => {
                    const pokemonOfType = data.pokemon.map(p => p.pokemon);
                    setFilteredPokemons(pokemonOfType);
                })
                .catch(error => console.log('Error fetching Pokémon by type:', error));
        } else {

            fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
                .then(response => response.json())
                .then(data => setFilteredPokemons(data.results))
                .catch(error => console.log('Error fetching Pokémon list:', error));
        }
    }, [selectedType]);

    return (
    
        <View style={styles.container}>
             <Image 
            source={require('./Imagens/pokemon.png')} style={styles.Image}
            />
        <View style={styles.container2}>
            <Text style={styles.text}>Selecione o Tipo</Text>
            <Picker
                style={styles.pix}
                selectedValue={selectedType}
                onValueChange={(itemValue) => setSelectedType(itemValue)}
            >
                <Picker.Item label="Tipos" value="" />
                {pokemonTypes.map(type => (
                    <Picker.Item key={type.name} label={type.name} value={type.name} />
                ))}
            </Picker>

            <Text style={styles.text}>Selecione o Pokémon</Text>
            <Picker
                style={styles.pix}
                selectedValue={pokemon}
                onValueChange={(itemValue) => setPokemon(itemValue)}
            >
                <Picker.Item label="Pokémons" value="" />
                {filteredPokemons.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.name} />
                ))}
            </Picker>

            {pokemon ? <Text style={styles.text}>Você selecionou {pokemon}</Text> : null}
        </View>
        </View>
       
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ffc700',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    container2: {
      marginBottom: 100,
    },
   
    pix: {
        width: 500,
        borderRadius: 30,
        marginBottom: 20,
        fontSize: 16,
        color: '#161dc4'
    },
    Image: {
        marginBottom:100,
        marginTop:100,
        width:310,
        height:110

    },

    text:{
      color: '#161dc4',
      fontWeight: "bold"
    }
});

export default Pokemon;