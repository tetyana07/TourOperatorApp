// screens/SettingsScreen.jsx
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Button, Card, Switch, useTheme } from "react-native-paper";
import { useApp } from "../context/AppContext";

export default function SettingsScreen() {
  const theme = useTheme();
  const { user, darkTheme, toggleTheme, onLogout } = useApp();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.onSurface }]}
      >
        Мій профіль
      </Text>

      {user && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
              {user.name} ({user.username})
            </Text>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.themeRow}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              Темна тема
            </Text>
            <Switch value={darkTheme} onValueChange={toggleTheme} />
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        icon="logout"
        onPress={onLogout}
        style={styles.logoutButton}
        buttonColor="#d32f2f"
      >
        Вийти з облікового запису
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 24, fontWeight: "bold" },
  card: { marginBottom: 16 },
  themeRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    paddingVertical: 8 
  },
  logoutButton: { marginTop: 40 },
});