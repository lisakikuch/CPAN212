import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEntryData = async () => {
        try {
            setIsLoading(true);

            const res = await axios.get(
                `${API_URL}/entries`
            );

            setEntries(res.data);
            console.log(res.data);

        } catch (err) {
            console.error("Error fetching entries data: ", err);

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEntryData();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ alignItems: 'flex-end', marginBottom: 16 }}
                onPress={() => fetchEntryData()}
            >
                <Ionicons name="refresh" size={28} color="black" />
            </TouchableOpacity>

            {isLoading ? (
                <ActivityIndicator />
            ) : entries.length === 0 ? (
                <View style={styles.noDataText}>
                    <Text style={{ textAlign: 'center' }}>No Entry Data to Show</Text>
                </View>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const createdAt = new Date(item.created_at);
                        const updatedAt = new Date(item.updated_at);
                        const showDate = updatedAt > createdAt ? updatedAt : createdAt;

                        return (
                            <TouchableOpacity
                            style={styles.entryCard}
                                onPress={() => navigation.navigate('Details', { entry: item })}
                            >
                                <Text style={styles.entryTitle}>{item.title}</Text>
                                <Text style={styles.entryTag}>{item.tag}</Text>
                                <Text style={styles.entryDate}>{showDate.toLocaleString()}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />)}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Add')}
            >
                <Ionicons name='add' size={28} color='black' />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#4A90E2',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 10,
    },
    noDataText: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    entryCard: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    entryTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333",
    },
    entryTag: {
        fontSize: 14,
        color: "#6a5acd",
        marginBottom: 4,
    },
    entryDate: {
        fontSize: 12,
        color: "#888",
    },
});

export default HomeScreen;