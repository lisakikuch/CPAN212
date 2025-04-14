import { useState } from "react";
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { API_URL } from '@env';
import axios from "axios";
import { Dropdown } from 'react-native-element-dropdown';

const AddScreen = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [tag, setTag] = useState("");

    const MOODTYPES = ["Positive", "Neutral", "Negative"];
    const formattedMoodTypes = MOODTYPES.map((item) => ({
        label: item, value: item
    }));

    const TAGTYPES = ["Thoughts", "Goals", "Work", "School", "Family", "Love", "Travel", "Others"];
    const formattedTagTypes = TAGTYPES.map((item) => ({
        label: item, value: item
    }));

    const handleAddEntry = async () => {
        console.log("Adding Entry...");

        if (!title || !content || !mood || !tag) {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }

        try {
            const res = await axios.post(
                `${API_URL}/entries`,
                {
                    title: title,
                    content: content,
                    mood: mood,
                    tag: tag
                }
            );

            if (res.status === 201) {
                Alert.alert("Success", "Entry added");

                setTitle("");
                setContent("");
                setTag("");
                setMood("");
            }

        } catch (err) {
            console.error("Error Adding Entry: ", err);
            Alert.alert("Error", "Adding Entry Failed");
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
            />
            <TextInput
                style={styles.input}
                placeholder="Title"
                keyboardType="default"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: 380, textAlignVertical: "top" }]}
                placeholder="Content"
                keyboardType="default"
                value={content}
                onChangeText={setContent}
            />
            <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleAddEntry()}
            >
                <Text style={styles.buttonText}>Add</Text>
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

export default AddScreen;