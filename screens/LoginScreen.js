import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import { useApp } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const { handleLogin } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("rememberedEmail");
      if (saved) {
        setEmail(saved);
        setRememberMe(true);
      }
    };
    load();
  }, []);

  const validateEmail = (v) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) return "Введіть email";
    if (!regex.test(v)) return "Невірний email";
    return "";
  };

  const validatePassword = (v) => {
    if (!v) return "Введіть пароль";
    if (v.length < 6) return "Мін 6 символів";
    return "";
  };

  const handleSubmit = async () => {
    const e = validateEmail(email);
    const p = validatePassword(password);

    setEmailError(e);
    setPasswordError(p);

    if (e || p) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://tour-app-login.free.beeceptor.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json().catch(() => ({}));

      console.log("Response:", res.status, data);

      if (!res.ok || !data.success) {
        Alert.alert(
          "Помилка входу",
          data.message || "Невірний email або пароль\n\nСпробуй: test@test.com / 123456"
        );
        return;
      }

      const user = {
        id: data.user?.id || Date.now(),
        name: data.user?.name || email.split("@")[0],
        username: email,
      };

      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      handleLogin(user);
      Alert.alert("Успіх", "Вхід виконано");

    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Проблема з'єднання",
        "Не вдалося підключитися до сервера.\n\nПеревір інтернет або спробуй пізніше.\n\n(Beeceptor часто нестабільний)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#1e1e2f", "#2a2a40"]} style={styles.container}>
      <View style={styles.glass}>
        <Text style={styles.title}>Вхід</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          autoCapitalize="none"
          error={!!emailError}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <TextInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          mode="outlined"
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          error={!!passwordError}
        />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}

        <View style={styles.row}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={{ color: "#ddd" }}>Запам'ятати мене</Text>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Увійти
        </Button>

        <Text style={{ color: "#888", textAlign: "center", marginTop: 15, fontSize: 12 }}>
          Beeceptor: test@test.com / 123456
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  glass: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  button: {
    marginTop: 15,
    borderRadius: 10,
  },
  error: {
    color: "#ff6b6b",
    fontSize: 12,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});