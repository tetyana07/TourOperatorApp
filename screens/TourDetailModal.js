import React from "react";
import { Modal as RNModal, ScrollView, StyleSheet, View } from "react-native";
import { Text, Button, IconButton, Card, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function TourDetailModal({
  visible,
  tour,
  onClose,
  isFavorite,
  toggleFavorite,
  onDelete
}) {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleDetailPress = () => {
    onClose();
    navigation.navigate("TourDetail", { tour });
  };

  if (!tour) return null;

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: tour.image }} style={styles.image} />

          <Card.Content style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              {tour.title}
            </Text>

            <View style={styles.infoRow}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                {tour.country}
              </Text>
              <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "bold" }}>
                {tour.price} $
              </Text>
            </View>

            <View style={[styles.favoriteRow, { borderColor: theme.colors.border || "#333" }]}>
              <Text style={{ color: theme.colors.onSurface }}>В обране</Text>
              <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                iconColor={isFavorite ? "#e91e63" : theme.colors.onSurfaceVariant}
                size={32}
                onPress={() => toggleFavorite(tour.id)}
              />
            </View>
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <Button mode="outlined" onPress={onClose} style={styles.button}>
              Закрити
            </Button>
            <Button 
              mode="contained" 
              onPress={handleDetailPress}
              style={styles.button}
            >
              Детальніше
            </Button>
            <Button 
              mode="contained" 
              buttonColor="#e74c3c" 
              onPress={onDelete}
              style={styles.button}
            >
              Видалити
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
  },
  image: { 
    height: 260 
  },
  content: { 
    padding: 20 
  },
  title: { 
    marginBottom: 12, 
    fontWeight: "bold" 
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  favoriteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  actions: {
    padding: 16,
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});