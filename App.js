// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { StatusBar, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import MainTabs from "./screens/MainTabs";
import { AppContext } from "./context/AppContext";   // ← Імпорт контексту

const Stack = createNativeStackNavigator();

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==================== КАСТОМНА ТЕМА ====================
  const customDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: "#c084fc",
      primaryContainer: "#6b21a8",
      onPrimary: "#ffffff",

      background: "#0a0a0a",
      onBackground: "#f0f0f0",

      surface: "#121212",
      onSurface: "#e0e0e0",
      surfaceVariant: "#1f1f1f",
      onSurfaceVariant: "#aaaaaa",

      card: "#181818",
      border: "#333333",

      error: "#ff4d6d",
    },
    roundness: 16,
  };

  const paperTheme = darkTheme ? customDarkTheme : MD3LightTheme;

  // Завантаження даних з AsyncStorage
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedTheme = await AsyncStorage.getItem("darkTheme");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        }

        if (savedTheme !== null) {
          setDarkTheme(JSON.parse(savedTheme));
        }
      } catch (e) {
        console.log("Помилка завантаження стану:", e);
      } finally {
        setLoading(false);
      }
    };
    loadState();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a0a" }}>
        <ActivityIndicator size="large" color="#c084fc" />
      </View>
    );
  }

  const toggleTheme = async () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    await AsyncStorage.setItem("darkTheme", JSON.stringify(newTheme));
  };

  const handleLogin = async (loggedUser) => {
    setUser(loggedUser);
    setIsLoggedIn(true);
    await AsyncStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const handleLogout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("user");
  };

  // Значення, яке буде доступне через useApp() в усьому додатку
  const contextValue = {
    user,
    darkTheme,
    toggleTheme,
    onLogout: handleLogout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <PaperProvider theme={paperTheme}>
        <StatusBar 
          barStyle={darkTheme ? "light-content" : "dark-content"} 
          backgroundColor={darkTheme ? "#0a0a0a" : "#6200ee"} 
          translucent={false}
        />
        
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name="Login">
                {() => <LoginScreen onLogin={handleLogin} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen 
                name="Main" 
                component={MainTabs}   // ← Змінили з children на component (чистіше)
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
}