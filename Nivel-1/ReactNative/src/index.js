import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet,StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then( response =>{
            setProjects([response.data]);
        });
    },[]);

    async function handleAddProject(){
        const response await api.post('/projects', {
            title: 'Novo projeto',
            owner: 'Muriel Lima'
        })
        setProjects([...projects, project]);
    }
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
            <SafeAreaView  style={StyleSheet.container}>
                <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item }) => (
                    <Text style={styles.project}>{item.title}</Text>
                )}
            />
            <TouchableOpacity activeOpacity={0.6} style={styles.buttonText} onPress={handleAddProject}>
                <Text style={styles.buttonText}>
                    Adicionar projeto
                </Text>
            </TouchableOpacity>

            </SafeAreaView>
        </>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    project: {
        color: '#FFF',
        fontSize: 28,
    },
    button:{
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,

    }
});