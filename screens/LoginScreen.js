import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card, useTheme } from "react-native-paper";
import { useApp } from "../context/AppContext";

export default function LoginScreen() {
  const theme = useTheme();
  const { handleLogin } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BEECEPTOR_URL = "https://tour-app-login.free.beeceptor.com";

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Помилка", "Введіть email та пароль");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BEECEPTOR_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        }),
      });

      
      const data = await response.json();

      console.log("Відповідь від Beeceptor:", data); 

      if (response.ok && data.success) {
        const user = {
          id: Date.now(),
          name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
          username: email,
          token: data.token || "mock-token-12345",
        };

        handleLogin(user);
        Alert.alert("Успіх", `Вітаємо, ${user.name}!`);
      } else {
        Alert.alert(
          "Помилка входу", 
          data.message || "Невірний email або пароль"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      
      Alert.alert(
        "Помилка підключення"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Вхід
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />

          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            style={styles.button}
            loading={loading}
            disabled={loading}
          >
            {loading ? "Вхід..." : "Увійти"}
          </Button>

      
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: { padding: 10, elevation: 4 },
  title: { textAlign: "center", marginBottom: 24 },
  input: { marginBottom: 12 },
  button: { marginTop: 20, paddingVertical: 8 },
  hint: { marginTop: 30, textAlign: "center", color: "#666", lineHeight: 22 },
});