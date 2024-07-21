// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Button, StyleSheet, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
    const [heroes, setHeroes] = useState('');
    const [villains, setVillains] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        setStory('');
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
                    {
                        role: 'user',
                        content: `Create a fairy tale featuring Heroes: ${heroes}, Villains: ${villains}, and Plot: ${plot}`
                    }
                ],
                model: 'gpt-4o'
            });
            const { data } = response;
            setStory(data.response);
        } catch (error) {
            setStory('Failed to generate story. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Heroes"
                    value={heroes}
                    onChangeText={setHeroes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Villains"
                    value={villains}
                    onChangeText={setVillains}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Story" onPress={generateStory} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {story && <View style={styles.storyContainer}><Text style={styles.story}>{story}</Text></View>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    scrollContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
    },
    storyContainer: {
        marginTop: 20,
    },
    story: {
        fontSize: 16,
        textAlign: 'justify',
    },
});