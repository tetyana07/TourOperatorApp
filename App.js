import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [screen, setScreen] = useState("tours");
  const [darkTheme, setDarkTheme] = useState(false);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("Усі");

  const theme = darkTheme ? darkStyles : lightStyles;

  const tours = [
  
  {
    id: 1,
    title: "Середньовічне містечко в Бургундії",
    country: "Франція",
    price: 900,
    image:
      "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france20.jpg?w=800&ssl=1",
  },

 
  {
    id: 2,
    title: "Вежа Галата",
    country: "Туреччина",
    price: 810,
    image:
      "https://tripmydream.cc/travelhub/travel/block_gallery/10/2236/gallery_big_102236.jpg",
  },

  
  {
    id: 3,
    title: "Валь-д’Орча",
    country: "Італія",
    price: 750,
    image:
      "https://www.journeys6senses.com/wp-content/uploads/2023/09/IMG_0523-2.jpg",
  },

  
  {
    id: 4,
    title: "Севілья",
    country: "Іспанія",
    price: 820,
    image:
      "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082412.jpg?202106151016&w=1200&h=800&fit=cover&output=webp",
  },

  
  {
    id: 5,
    title: "Прованс",
    country: "Франція",
    price: 880,
    image:
      "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france01.jpg?ssl=1",
  },

  
  {
    id: 6,
    title: "Каппадокія",
    country: "Туреччина",
    price: 860,
    image:
      "https://tripmydream.cc/travelhub/travel/block_gallery/10/2237/gallery_big_102237.jpg",
  },

 
  {
    id: 7,
    title: "Тоскан",
    country: "Італія",
    price: 820,
    image:
      "https://www.journeys6senses.com/wp-content/uploads/2022/07/IMG_0155.jpg",
  },

  
  {
    id: 8,
    title: "Пеніскола",
    country: "Іспанія",
    price: 900,
    image:
      "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082448.jpg?202106152804&w=1200&h=675&fit=cover&output=webp",
  },

  
  {
    id: 9,
    title: "Париж — столиця Франції",
    country: "Франція",
    price: 970,
    image:
      "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france44.jpg?ssl=1",
  },

  
  {
    id: 10,
    title: "Памуккале",
    country: "Туреччина",
    price: 880,
    image:
      "https://tripmydream.cc/travelhub/travel/block_gallery/10/2238/gallery_big_102238.jpg",
  },

  
  {
    id: 11,
    title: "Пляж Чефалу",
    country: "Італія",
    price: 680,
    image:
      "https://www.journeys6senses.com/wp-content/uploads/2020/02/image-7.png",
  },

 
  {
    id: 12,
    title: "Королівський палац у Мадриді",
    country: "Іспанія",
    price: 950,
    image:
      "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082454.jpg?202106153008&w=3000&h=2000&fit=cover&output=webp",
  },

  
  {
    id: 13,
    title: "Руан — столиця Нормандії",
    country: "Франція",
    price: 850,
    image:
      "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france12.jpg?ssl=1",
  },

 
  {
    id: 14,
    title: "Мардін",
    country: "Туреччина",
    price: 820,
    image:
      "https://tripmydream.cc/travelhub/travel/block_gallery/10/2241/gallery_big_102241.jpg",
  },

  
  {
    id: 15,
    title: "Болонья",
    country: "Італія",
    price: 990,
    image:
      "https://www.journeys6senses.com/wp-content/uploads/2022/10/IMG_5545.jpg",
  },

  
  {
    id: 16,
    title: "Місто мистецтв і наук у Валенсії",
    country: "Іспанія",
    price: 870,
    image:
      "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082462.jpg?202106153231&w=1248&h=770&fit=cover&output=webp",
  },

  
  {
    id: 17,
    title: "Міст Олександра III в Парижі",
    country: "Франція",
    price: 890,
    image:
      "https://i0.wp.com/mandry.club/wp-content/uploads/2019/02/france07.jpg?ssl=1",
  },

  
  {
    id: 18,
    title: "Червона вежа",
    country: "Туреччина",
    price: 840,
    image:
      "https://tripmydream.cc/travelhub/travel/block_gallery/10/2244/gallery_big_102244.jpg",
  },

  
  {
    id: 19,
    title: "Міланський собор",
    country: "Італія",
    price: 720,
    image:
      "https://www.journeys6senses.com/wp-content/uploads/2023/02/IMG_7796.jpg",
  },


  {
    id: 20,
    title: "Храм Спокути Святої Родини ",
    country: "Іспанія",
    price: 890,
    image:
      "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082465.jpg?202106153459&w=1200&h=697&fit=cover&output=webp",
  },
];

  const filteredTours = tours.filter(
  (tour) =>
    (tour.title.toLowerCase().includes(search.toLowerCase()) ||
     tour.country.toLowerCase().includes(search.toLowerCase())) && 
    (countryFilter === "Усі" || tour.country === countryFilter)
);

  return (
    <View style={[styles.container, theme.background]}>
      {/* Навігація */}
      <View style={styles.nav}>
        <NavButton
          icon="airplane"
          active={screen === "tours"}
          onPress={() => setScreen("tours")}
        />
        <NavButton
          icon="settings"
          active={screen === "settings"}
          onPress={() => setScreen("settings")}
        />
      </View>

      {screen === "tours" ? (
        <ToursScreen
          tours={filteredTours}
          theme={theme}
          search={search}
          setSearch={setSearch}
          countryFilter={countryFilter}
          setCountryFilter={setCountryFilter}
        />
      ) : (
        <SettingsScreen
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          theme={theme}
        />
      )}
    </View>
  );
}


function NavButton({ icon, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.navIcon, active && styles.activeNavIcon]}
    >
      <Ionicons name={icon} size={28} color={active ? "white" : "#555"} />
    </Pressable>
  );
}


function TourCard({ tour, theme }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.card,
        theme.card,
        { transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
    >
      <Image source={{ uri: tour.image }} style={styles.image} />
      <View>
        <Text style={[styles.title, theme.text]}>{tour.title}</Text>
        <Text style={theme.text}>Країна: {tour.country}</Text>
        <Text style={theme.text}>Ціна: {tour.price}$</Text>
      </View>
    </Pressable>
  );
}


function ToursScreen({
  tours,
  theme,
  search,
  setSearch,
  countryFilter,
  setCountryFilter,
}) {
  const countries = ["Усі", "Італія", "Іспанія", "Франція", "Туреччина"];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Пошук */}
      <View style={[styles.searchBox, theme.card]}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Пошук путівки..."
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, theme.text]}
          placeholderTextColor="#888"
        />
      </View>

      {/* Фільтри */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15 }}
      >
        {countries.map((country) => (
          <Pressable
            key={country}
            onPress={() => setCountryFilter(country)}
            style={[
              styles.filterChip,
              countryFilter === country && styles.activeChip,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                countryFilter === country && styles.activeChipText,
              ]}
            >
              {country}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Список турів */}
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} theme={theme} />
      ))}
    </ScrollView>
  );
}


function SettingsScreen({ darkTheme, setDarkTheme, theme }) {
  return (
    <View>
      <Text style={[styles.title, theme.text]}>Налаштування</Text>

      <Pressable
        style={styles.toggleBtn}
        onPress={() => setDarkTheme(!darkTheme)}
      >
        <Ionicons name="color-palette" size={20} color="white" />
        <Text style={styles.toggleText}>
          {darkTheme ? "Світла тема" : "Темна тема"}
        </Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 15,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  navIcon: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
  },
  activeNavIcon: {
    backgroundColor: "#3498db",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
    gap: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeChip: {
    backgroundColor: "#3498db",
  },
  chipText: {
    color: "#333",
  },
  activeChipText: {
    color: "white",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#9b59b6",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  toggleText: {
    color: "white",
    fontWeight: "bold",
  },
});

const lightStyles = {
  background: { backgroundColor: "#f4f6f7" },
  card: { backgroundColor: "white" },
  text: { color: "black" },
};

const darkStyles = {
  background: { backgroundColor: "#121212" },
  card: { backgroundColor: "#1e1e1e" },
  text: { color: "white" },
};