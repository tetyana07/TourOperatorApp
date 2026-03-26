// screens/TourCard.jsx
import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";

export default function TourCard({ tour, openTour, toggleFavorite, isFavorite }) {
  const [pressed, setPressed] = useState(false);
  const theme = useTheme();

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => openTour(tour)}
      style={{ transform: [{ scale: pressed ? 0.97 : 1 }] }}
    >
      <Card
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card || theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
        mode="outlined"
      >
        <Card.Cover 
          source={{ uri: tour.image }} 
          style={styles.image} 
        />

        <Card.Content style={styles.content}>
          <Text 
            variant="titleLarge" 
            style={{ color: theme.colors.onSurface, fontWeight: "700" }}
            numberOfLines={2}
          >
            {tour.title}
          </Text>

          <Text 
            variant="bodyLarge" 
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 6 }}
          >
            {tour.country}
          </Text>

          <Text 
            variant="headlineMedium" 
            style={{ 
              color: theme.colors.primary, 
              fontWeight: "bold", 
              marginTop: 12 
            }}
          >
            {tour.price} $
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <IconButton
            icon={isFavorite ? "heart" : "heart-outline"}
            iconColor={isFavorite ? "#ff4d94" : theme.colors.onSurfaceVariant}
            size={28}
            onPress={() => toggleFavorite(tour.id)}
          />
        </Card.Actions>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    elevation: 8,
  },
  image: {
    height: 215,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  actions: {
    justifyContent: "flex-end",
    paddingRight: 8,
  },
});