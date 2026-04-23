import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import TourDetailModal from "./TourDetailModal";
import ToursScreen from "./ToursScreen";
import FavoritesScreen from "./FavoritesScreen";
import AddTourScreen from "./AddTourScreen";
import SettingsScreen from "./SettingsScreen";
import PostsScreen from "./PostsScreen";

import { useApp } from "../context/AppContext";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const theme = useTheme();

  const {
    darkTheme,
    tours,
    setTours,
    favorites,
    toggleFavorite,
    user,
  } = useApp();

  const [selectedTour, setSelectedTour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

 
  const userFavorites = user ? favorites[user.username] || [] : [];

  const initialTours = [
    {
      id: 1,
      title: "Середньовічне містечко в Бургундії",
      country: "Франція",
      price: 900,
      image: "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france20.jpg?w=800&ssl=1",
    },
    {
      id: 2,
      title: "Вежа Галата",
      country: "Туреччина",
      price: 810,
      image: "https://tripmydream.cc/travelhub/travel/block_gallery/10/2236/gallery_big_102236.jpg",
    },
    {
      id: 3,
      title: "Валь-д’Орча",
      country: "Італія",
      price: 750,
      image: "https://www.journeys6senses.com/wp-content/uploads/2023/09/IMG_0523-2.jpg",
    },
    {
      id: 4,
      title: "Севілья",
      country: "Іспанія",
      price: 820,
      image: "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082412.jpg?202106151016&w=1200&h=800&fit=cover&output=webp",
    },
    {
      id: 5,
      title: "Прованс",
      country: "Франція",
      price: 880,
      image: "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france01.jpg?ssl=1",
    },
    {
      id: 6,
      title: "Каппадокія",
      country: "Туреччина",
      price: 860,
      image: "https://tripmydream.cc/travelhub/travel/block_gallery/10/2237/gallery_big_102237.jpg",
    },
    {
      id: 7,
      title: "Тоскана",
      country: "Італія",
      price: 820,
      image: "https://www.journeys6senses.com/wp-content/uploads/2022/07/IMG_0155.jpg",
    },
    {
      id: 8,
      title: "Пеніскола",
      country: "Іспанія",
      price: 900,
      image: "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082448.jpg?202106152804&w=1200&h=675&fit=cover&output=webp",
    },
    {
      id: 9,
      title: "Париж — столиця Франції",
      country: "Франція",
      price: 970,
      image: "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france44.jpg?ssl=1",
    },
    {
      id: 10,
      title: "Памуккале",
      country: "Туреччина",
      price: 880,
      image: "https://tripmydream.cc/travelhub/travel/block_gallery/10/2238/gallery_big_102238.jpg",
    },
    {
      id: 11,
      title: "Пляж Чефалу",
      country: "Італія",
      price: 680,
      image: "https://www.journeys6senses.com/wp-content/uploads/2020/02/image-7.png",
    },
    {
      id: 12,
      title: "Королівський палац у Мадриді",
      country: "Іспанія",
      price: 950,
      image: "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082454.jpg?202106153008&w=3000&h=2000&fit=cover&output=webp",
    },
    {
      id: 13,
      title: "Руан — столиця Нормандії",
      country: "Франція",
      price: 850,
      image: "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france12.jpg?ssl=1",
    },
    {
      id: 14,
      title: "Мардін",
      country: "Туреччина",
      price: 820,
      image: "https://tripmydream.cc/travelhub/travel/block_gallery/10/2241/gallery_big_102241.jpg",
    },
    {
      id: 15,
      title: "Болонья",
      country: "Італія",
      price: 990,
      image: "https://www.journeys6senses.com/wp-content/uploads/2022/10/IMG_5545.jpg",
    },
    {
      id: 16,
      title: "Місто мистецтв і наук у Валенсії",
      country: "Іспанія",
      price: 870,
      image: "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082462.jpg?202106153231&w=1248&h=770&fit=cover&output=webp",
    },
    {
      id: 17,
      title: "Міст Олександра III в Парижі",
      country: "Франція",
      price: 890,
      image: "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france07.jpg?ssl=1",
    },
    {
      id: 18,
      title: "Червона вежа",
      country: "Туреччина",
      price: 840,
      image: "https://tripmydream.cc/travelhub/travel/block_gallery/10/2244/gallery_big_102244.jpg",
    },
    {
      id: 19,
      title: "Міланський собор",
      country: "Італія",
      price: 720,
      image: "https://www.journeys6senses.com/wp-content/uploads/2023/02/IMG_7796.jpg",
    },
    {
      id: 20,
      title: "Храм Спокути Святої Родини",
      country: "Іспанія",
      price: 890,
      image: "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082465.jpg?202106153459&w=1200&h=697&fit=cover&output=webp",
    },
  ];

 
  useEffect(() => {
    if (tours.length === 0) {
      setTours(initialTours);
    }
  }, []);

  const openTour = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const deleteTour = () => {
    if (!selectedTour) return;

    const id = selectedTour.id;

    setTours((prev) => prev.filter((t) => t.id !== id));

    
    if (user) {
      toggleFavorite(id); 
    }

    setModalVisible(false);
    setSelectedTour(null);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          headerStyle: {
            backgroundColor: darkTheme ? "#0a0a0a" : "#6200ee",
          },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: darkTheme ? "#121212" : "#ffffff",
          },
        }}
      >
        
        <Tab.Screen
          name="Тури"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass-outline" size={size} color={color} />
            ),
          }}
        >
          {() => (
            <ToursScreen
              tours={tours}
              openTour={openTour}
              toggleFavorite={toggleFavorite}
              favorites={userFavorites}
            />
          )}
        </Tab.Screen>

     
        <Tab.Screen
          name="Обране"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={24} color={color} />
            ),
          }}
        >
          {() => (
            <FavoritesScreen
              tours={tours.filter((t) => userFavorites.includes(t.id))}
              openTour={openTour}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>

        
        <Tab.Screen
          name="Пости"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />

       
        <Tab.Screen
          name="Додати"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle-outline" size={24} color={color} />
            ),
          }}
        >
          {() => <AddTourScreen setTours={setTours} />}
        </Tab.Screen>

        
        <Tab.Screen
          name="Налаштування"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      
      <TourDetailModal
        visible={modalVisible}
        tour={selectedTour}
        onClose={() => {
          setModalVisible(false);
          setSelectedTour(null);
        }}
        isFavorite={
          selectedTour ? userFavorites.includes(selectedTour.id) : false
        }
        toggleFavorite={toggleFavorite}
        onDelete={deleteTour}
      />
    </>
  );
}