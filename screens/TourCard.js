import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Pressable } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";

export default function TourCard({ tour, openTour, toggleFavorite, isFavorite, index = 0 }) {
  const theme = useTheme();


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;


  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80, 
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => openTour(tour)}
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
                marginTop: 12,
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
    </Animated.View>
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
