import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Feather} from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import io from 'socket.io-client';

const socket = io("https://7f5d-2407-c00-d001-d39a-c1ea-aa74-a2a6-84f5.ngrok-free.app");

const ChatScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { item, username, room } = route.params;
    console.log(item.driverName);

    const [stage, setStage] = useState(1); // Start directly at chat stage
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        socket.on('register_response', response => {
            if (response.error) {
                alert(response.error);
            } else {
                setUserId(response.user_id);
            }
        });

        socket.on('room_status', response => {
            console.log(response.msg);
        });

        socket.on('load_messages', data => {
            setMessages(data.messages); // Load past messages upon room entry
        });

        socket.on('receive_message', data => {
            setMessages(prevMessages => [data, ...prevMessages ]); // Append new messages
        });

        socket.emit('check_register', { username });
        socket.emit('join', { room, username });

        return () => {
            socket.off('register_response');
            socket.off('room_status');
            socket.off('load_messages');
            socket.off('receive_message');
        };
    }, [username, room]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        if (!userId) {
            console.log("User not identified. Please re-enter your username.");
            setStage(1);
            return;
        }
        socket.emit('send_message', { user_id: userId, username, message, room });
        setMessage('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack() }> 
                    <Feather style={GlobalStyles.iconHeader} name="arrow-left" size={20} color="white"/>
                </TouchableOpacity>
                <Image source={{ uri: item.photo }} style={styles.profileImage} />
                <Text style={styles.headerText}>{item.driverName}</Text>
            </View>
            <ScrollView style={styles.messagesContainer}>
                {messages.slice().reverse().map((msg, index) => (
                    <View key={index} style={msg.username === username ? styles.myMessage : styles.theirMessage}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.messageText}> {msg.message}</Text>
                        <Text style={styles.timestamp}> {msg.timestamp}</Text>
                    </View>
                    </View>
                ))}
            </ScrollView>
                <KeyboardAvoidingView style={styles.inputContainer}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Ionicons name="send" size={27} color="#e5ddd5" />
                </TouchableOpacity>
                </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#e5ddd5',
    },
    header: {
        paddingTop:"5%",
        height: 90,
        backgroundColor: '#132939',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcf8c6',
        borderRadius: 10,
        borderTopRightRadius: 0,
        padding: 10,
        marginVertical: 5,
        maxWidth: '70%',
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 10,
        borderTopLeftRadius: 0,
        padding: 10,
        marginVertical: 5,
        maxWidth: '70%',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#132939',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    timestamp: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'right',
    marginTop: 10,
    paddingLeft:"2%",
    },
 
};

export default ChatScreen;
