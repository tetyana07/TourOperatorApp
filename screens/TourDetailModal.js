import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Text, Button, IconButton, Card, useTheme } from "react-native-paper";

export default function TourDetailModal({ 
  visible, 
  tour, 
  onClose, 
  isFavorite, 
  toggleFavorite, 
  onDelete 
}) {
  const theme = useTheme();

  if (!tour) return null;

  return (
    <Modal 
      visible={visible} 
      onDismiss={onClose} 
      contentContainerStyle={[styles.modalContainer, { backgroundColor: "rgba(0,0,0,0.85)" }]}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: tour.image }} style={styles.image} />
        
        <Card.Content style={styles.content}>
          <Text 
            variant="headlineMedium" 
            style={[styles.title, { color: theme.colors.onSurface }]}
          >
            {tour.title}
          </Text>
          
          <View style={styles.infoRow}>
            <Text 
              variant="titleMedium" 
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {tour.country}
            </Text>
            <Text 
              variant="headlineSmall" 
              style={{ color: theme.colors.primary, fontWeight: "bold" }}
            >
              {tour.price} $
            </Text>
          </View>

          <View style={[styles.favoriteRow, { borderColor: theme.colors.border }]}>
            <Text style={{ color: theme.colors.onSurface }}>Додати в обране</Text>
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
            buttonColor="#e74c3c" 
            onPress={onDelete}
            style={styles.button}
          >
            Видалити тур
          </Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: "85%",
  },
  image: { height: 260 },
  content: { padding: 20 },
  title: { marginBottom: 12, fontWeight: "bold" },
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
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
  },
});