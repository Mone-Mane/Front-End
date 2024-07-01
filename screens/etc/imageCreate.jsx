import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const imageCreate = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerateImage = () => {
    fetch('http://127.0.0.1:5000/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setImageUrl(data.image_url);
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to fetch image.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button
        title="Generate Image"
        onPress={handleGenerateImage}
      />
      {error ? <Text>{error}</Text> : null}
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default imageCreate;
