import React, { useRef, useEffect } from "react";
import { ScrollView, StyleSheet, View, Animated } from "react-native";
import {
  Text,
  Button,
  Switch,
  useTheme,
  Divider,
  Avatar,
} from "react-native-paper";
import { useApp } from "../context/AppContext";
import { BlurView } from "expo-blur";

export default function SettingsScreen() {
  const theme = useTheme();

  const {
    user,
    darkTheme,
    toggleTheme,
    onLogout,
    sessionOnly,
    setSessionOnly,
  } = useApp();

 
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideIn = useRef(new Animated.Value(30)).current;

 
  const themeRotate = useRef(new Animated.Value(darkTheme ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(themeRotate, {
        toValue: darkTheme ? 1.2 : -0.2,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(themeRotate, {
        toValue: darkTheme ? 1 : 0,
        useNativeDriver: true,
        bounciness: 8,
      }),
    ]).start();
  }, [darkTheme]);

  const themeIconScale = themeRotate.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const glassStyle = {
    backgroundColor: theme.dark
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.04)",
    borderWidth: 1,
    borderColor: theme.dark
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.1)",
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeIn,
        transform: [{ translateY: slideIn }],
      }}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          ⚙️ Налаштування
        </Text>

        {user && (
          <BlurView
            intensity={40}
            tint={theme.dark ? "dark" : "light"}
            style={[styles.glass, glassStyle]}
          >
            <View style={styles.profile}>
              <Avatar.Text
                size={60}
                label={user.name?.[0]?.toUpperCase() || "U"}
                style={{ backgroundColor: theme.colors.primary }}
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={[styles.name, { color: theme.colors.onSurface }]}>
                  {user.name}
                </Text>
                <Text
                  style={[styles.email, { color: theme.colors.onSurfaceVariant }]}
                >
                  {user.username}
                </Text>
              </View>
            </View>
          </BlurView>
        )}

        {}
        <BlurView
          intensity={40}
          tint={theme.dark ? "dark" : "light"}
          style={[styles.glass, glassStyle]}
        >
          <View style={styles.row}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Animated.Text
                style={{
                  fontSize: 22,
                  marginRight: 10,
                  transform: [{ scale: themeIconScale }],
                }}
              >
                {darkTheme ? "🌙" : "☀️"}
              </Animated.Text>
              <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Темна тема
              </Text>
            </View>
            <Switch value={darkTheme} onValueChange={toggleTheme} />
          </View>
        </BlurView>

        {}
        <BlurView
          intensity={40}
          tint={theme.dark ? "dark" : "light"}
          style={[styles.glass, glassStyle]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            🔒 Дані
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text style={{ color: theme.colors.onSurface }}>
              Тільки поточна сесія
            </Text>
            <Switch value={sessionOnly} onValueChange={setSessionOnly} />
          </View>

          <Text
            style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}
          >
            Дані не зберігаються після закриття додатку
          </Text>
        </BlurView>

        <Button
          mode="contained"
          icon="logout"
          onPress={onLogout}
          style={styles.logoutButton}
          contentStyle={{ paddingVertical: 8 }}
        >
          Вийти
        </Button>

        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: theme.colors.onSurfaceVariant,
            fontSize: 12,
          }}
        >
          Версія 1.0.0
        </Text>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  glass: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  divider: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hint: {
    marginTop: 10,
    fontSize: 12,
  },
  logoutButton: {
    marginTop: 20,
    borderRadius: 12,
  },
});
