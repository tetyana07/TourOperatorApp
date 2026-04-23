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

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tours, setTours] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [sessionOnly, setSessionOnly] = useState(false);

  const theme = darkTheme ? MD3DarkTheme : MD3LightTheme;

  
  useEffect(() => {
    const load = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedFav = await AsyncStorage.getItem("favorites");
        const savedTheme = await AsyncStorage.getItem("theme");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        }

        if (savedFav) setFavorites(JSON.parse(savedFav));
        if (savedTheme !== null) setDarkTheme(JSON.parse(savedTheme));

      } catch (e) {
        console.log("Load error:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  useEffect(() => {
    if (!sessionOnly) {
      AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  
  const handleLogin = async (u) => {
    setUser(u);
    setIsLoggedIn(true);
    await AsyncStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("user");
  };

  
  const toggleFavorite = (id) => {
    if (!user) return;

    setFavorites((prev) => {
      const userFavs = prev[user.username] || [];

      const updated = userFavs.includes(id)
        ? userFavs.filter((i) => i !== id)
        : [...userFavs, id];

      return {
        ...prev,
        [user.username]: updated,
      };
    });
  };

  
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <ActivityIndicator size="large" color="#c084fc" />
      </View>
    );
  }

  
  const contextValue = {
    user,
    handleLogin,
    onLogout: handleLogout,

    darkTheme,
    toggleTheme: () => setDarkTheme((prev) => !prev),

    tours,
    setTours,

    favorites,
    setFavorites,
    toggleFavorite,

    sessionOnly,
    setSessionOnly,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <StatusBar
            barStyle={darkTheme ? "light-content" : "dark-content"}
            backgroundColor={darkTheme ? "#0a0a0a" : "#6200ee"}
          />

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