import { useState } from "react";
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { API_URL } from '@env';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

const DetailsScreen = ({ route, navigation }) => {

    const { entry } = route.params;
    console.log("Entry Details from Route Params: ", entry);

    const [title, setTitle] = useState(entry.title);
    const [content, setContent] = useState(entry.content);
    const [mood, setMood] = useState(entry.mood);
    const [tag, setTag] = useState(entry.tag);
    const [date, setDate] = useState(entry.created_at);
    const [isEditing, setIsEditing] = useState(false);

    const MOODTYPES = ["Positive", "Neutral", "Negative"];
    const formattedMoodTypes = MOODTYPES.map((item) => ({
        label: item, value: item
    }));

    const TAGTYPES = ["Thoughts", "Goals", "Work", "School", "Family", "Love", "Travel", "Others"];
    const formattedTagTypes = TAGTYPES.map((item) => ({
        label: item, value: item
    }));

    const handleSaveEntry = async () => {
        console.log("Saving Entry...");

        // Input Validation
        if (!title || !content || !mood || !tag) {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }

        try {
            const res = await axios.put(
                `${API_URL}/entries/${entry.id}`,
                {
                    title: title,
                    content: content,
                    mood: mood,
                    tag: tag
                }
            );

            if (res.status === 200) {
                Alert.alert("Success", "Your entry has been updated");
            }
        } catch (err) {
            console.error("Error updating entry: ", err);
            Alert.alert("Error", "Failed to update the entry");
        }
    }

    const handleDeleteEntry = async () => {
        console.log("Deleting Entry...");

        try {
            const res = await axios.delete(
                `${API_URL}/entries/${entry.id}`
            );

            if (res.status === 200) {
                Alert.alert("Success", "Entry Deleted");
                navigation.goBack();
            }
        } catch (err) {
            console.error("Error Deleting Entry");
            Alert.alert("Error", "Deleting Entry Failed");
        }
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.input}
                data={formattedTagTypes}
                labelField='label'
                valueField='value'
                value={tag}
                onChange={(item) => {
                    setTag(item.value);
                }}
                placeholder="Select Tag"
                editable={isEditing}
            />
            <Dropdown
                style={styles.input}
                data={formattedMoodTypes}
                labelField='label'
                valueField='value'
                value={mood}
                onChange={(item) => {
                    setMood(item.value);
                }}
                placeholder="Select Mood"
                editable={isEditing}
            />
            <TextInput
                value={title}
                onChangeText={setTitle}
                editable={isEditing}
                style={styles.input}
            />
            <TextInput
                value={content}
                onChangeText={setContent}
                editable={isEditing}
                style={[styles.input, { height: 200, textAlignVertical: "top" }]}
            />
            <Text style={styles.input}>
                {new Date(date).toLocaleString()}
            </Text>
            <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                    if (isEditing) {
                        handleSaveEntry();
                    }
                    setIsEditing(!isEditing);
                }}
            >
                <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => Alert.alert(
                    "Delete Entry",
                    "Are you sure you want to delete this entry?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                        {
                            text: "Delete",
                            onPress: () => handleDeleteEntry(),
                            style: "destructive",
                        },
                    ]
                )}
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Add')}
            >
                <Ionicons name='add' size={28} color='black' />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#E9ECEF",
        padding: 12,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    updateButton: {
        backgroundColor: "#4A90E2",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
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
})

export default DetailsScreen;