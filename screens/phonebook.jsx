import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';

const phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  const fetchContacts = async () => {
    if (permission) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  if (permission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (permission === false) {
    return <Text>Permission to access contacts was denied.</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fetchButton} onPress={fetchContacts}>
        <Text style={styles.fetchButtonText}>Fetch Contacts</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && (
              <Text style={styles.contactInfo}>Phone: {item.phoneNumbers[0].number}</Text>
            )}
            {item.emails && (
              <Text style={styles.contactInfo}>Email: {item.emails[0].email}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  fetchButton: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  fetchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 16,
  },
});

export default phonebook

