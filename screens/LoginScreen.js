import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card, useTheme } from "react-native-paper";

const users = [
  { username: "admin", password: "1234", name: "Адміністратор" },
  { username: "user", password: "1111", name: "Користувач" },
  { username: "student", password: "password", name: "Студент" },
];

export default function LoginScreen({ onLogin }) {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.username === username.trim() && u.password === password
    );
    if (foundUser) {
      onLogin(foundUser);
    } else {
      Alert.alert("Помилка", "Невірний логін або пароль!");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text 
            variant="headlineMedium" 
            style={[styles.title, { color: theme.colors.onSurface }]}
          >
            Вхід у додаток
          </Text>

          <TextInput
            label="Логін"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            textColor={theme.colors.onSurface}
          />

          <TextInput
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
            textColor={theme.colors.onSurface}
          />

          <Button 
            mode="contained" 
            onPress={handleLogin} 
            style={styles.button}
          >
            Увійти
          </Button>

          <Text style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Тестові дані:{"\n"}
            admin / 1234{"\n"}
            user / 1111{"\n"}
            student / password
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20 
  },
  card: { 
    padding: 10, 
    elevation: 4 
  },
  title: { 
    textAlign: "center", 
    marginBottom: 20 
  },
  input: { 
    marginBottom: 12 
  },
  button: { 
    marginTop: 10, 
    paddingVertical: 6 
  },
  hint: { 
    marginTop: 25, 
    textAlign: "center", 
    lineHeight: 22 
  },
});