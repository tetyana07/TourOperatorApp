import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { StatusBar, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginScreen from "./screens/LoginScreen";
import MainTabs from "./screens/MainTabs";
import TourDetailScreen from "./screens/TourDetailScreen";
import { AppContext } from "./context/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000 },
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const customDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: "#c084fc",
      background: "#0a0a0a",
      onBackground: "#f0f0f0",
      surface: "#121212",
      onSurface: "#e0e0e0",
    },
  };

  const paperTheme = darkTheme ? customDarkTheme : MD3LightTheme;

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedTheme = await AsyncStorage.getItem("darkTheme");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        }
        if (savedTheme !== null) setDarkTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.log("Помилка завантаження:", e);
      } finally {
        setLoading(false);
      }
    };
    loadState();
  }, []);

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

  const contextValue = {
    user,
    darkTheme,
    toggleTheme,
    onLogout: handleLogout,
    handleLogin,
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0a0a" }}>
        <ActivityIndicator size="large" color="#c084fc" />
      </View>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={paperTheme}>
          <StatusBar barStyle={darkTheme ? "light-content" : "dark-content"} backgroundColor={darkTheme ? "#0a0a0a" : "#6200ee"} />
          
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!isLoggedIn ? (
                <Stack.Screen name="Login" component={LoginScreen} />
              ) : (
                <>
                  <Stack.Screen name="Main" component={MainTabs} />
                  <Stack.Screen 
                    name="TourDetail" 
                    component={TourDetailScreen}
                    options={{ headerShown: true, title: "Деталі туру" }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}