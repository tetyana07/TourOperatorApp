// screens/FavoritesScreen.jsx
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import TourCard from "./TourCard";
import { useApp } from "../context/AppContext";

export default function FavoritesScreen({ tours = [], openTour, toggleFavorite }) {
  const theme = useTheme();
  const { user } = useApp(); // якщо знадобиться в майбутньому

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.onSurface }]}
      >
        Обрані тури 
      </Text>

      <FlatList
        data={tours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TourCard
            tour={item}
            openTour={openTour}
            toggleFavorite={toggleFavorite}
            isFavorite={true}
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.colors.onSurfaceVariant }]}>
            Ви ще не додали жодного туру в обране
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { 
    margin: 20, 
    fontWeight: "bold", 
    textAlign: "center" 
  },
  content: { 
    paddingBottom: 30 
  },
  empty: { 
    textAlign: "center", 
    marginTop: 100, 
    fontSize: 17 
  },
});