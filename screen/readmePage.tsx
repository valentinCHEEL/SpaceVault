import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const ReadmePage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>NASA Image Gallery</Text>

      <Text style={styles.sectionTitle}>Présentation rapide du projet</Text>
      <Text style={styles.text}>
        NASA Image Gallery est une application qui permet aux utilisateurs de découvrir,
        rechercher et partager des images de la NASA via son API officielle.
      </Text>

      <Text style={styles.sectionTitle}>Fonctionnalités :</Text>
      <Text style={styles.text}>• Parcourir une galerie d'images aléatoires de la NASA.</Text>
      <Text style={styles.text}>• Rechercher des photos spécifiques avec des mots-clés.</Text>
      <Text style={styles.text}>• Prendre des photos personnelles et les ajouter à la galerie.</Text>

      <Text style={styles.sectionTitle}>Numéro de groupe</Text>
      <Text style={styles.text}>Groupe : 6</Text>

      <Text style={styles.sectionTitle}>Développeurs et rôles</Text>
      <Text style={styles.text}>
        • Valentin – Responsable de la navigation, du readme, de la page d'accueil et de la page de recherche.
      </Text>
      <Text style={styles.text}>
        • Arnaud – Responsable du login, de l'inscription et de la fonctionnalité de la caméra.
      </Text>
      <Text style={styles.text}>
        • Hélène – Responsable de la conception du design du site.
      </Text>

      <Text style={styles.sectionTitle}>API utilisée</Text>
      <Text style={styles.text}>
        L'application utilise l'API officielle de la NASA pour récupérer les images. 
      </Text>

      <Text style={styles.sectionTitle}>Description des pages</Text>
      <Text style={styles.text}>
        • Home Page : Galerie d'images aléatoires de la NASA.{'\n'}
        • Search Page : Recherche d'images par mots-clés.{'\n'}
        • Login / Register : Création et connexion de compte.{'\n'}
        • Caméra : Prendre des photos et les ajouter à la galerie.
      </Text>
    </ScrollView>
  );
};

export default ReadmePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141A26',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5833A6',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8679D9',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22,
  },
});
