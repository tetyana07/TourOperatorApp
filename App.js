import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Modal,
  Switch,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [screen, setScreen] = useState("tours");
  const [darkTheme, setDarkTheme] = useState(false);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("Усі");
  const [selectedTour, setSelectedTour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]); 

  const [tours, setTours] = useState([
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
      title: "Храм Спокути Святої Родини",
      country: "Іспанія",
      price: 890,
      image: "https://travel.24tv.ua/resources/photos/news/202106/1656275_15082465.jpg?202106153459&w=1200&h=697&fit=cover&output=webp",
    },
  ]);

  const theme = darkTheme ? darkStyles : lightStyles;

  const filteredTours = tours.filter(
    (tour) =>
      (tour.title.toLowerCase().includes(search.toLowerCase()) ||
        tour.country.toLowerCase().includes(search.toLowerCase())) &&
      (countryFilter === "Усі" || tour.country === countryFilter)
  );

  const favoriteTours = tours.filter((tour) => favorites.includes(tour.id));

  const openTour = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const toggleFavorite = (tourId) => {
    setFavorites((prev) =>
      prev.includes(tourId)
        ? prev.filter((id) => id !== tourId)
        : [...prev, tourId]
    );
  };

  const deleteTour = () => {
    if (selectedTour) {
      setTours((prev) => prev.filter((t) => t.id !== selectedTour.id));
      setFavorites((prev) => prev.filter((id) => id !== selectedTour.id));
      setModalVisible(false);
    }
  };

  const isFavorite = selectedTour ? favorites.includes(selectedTour.id) : false;

  return (
    <View style={[styles.container, theme.background]}>
      <View style={{ paddingHorizontal: 15, marginBottom: 10, marginTop: 40 }}>
        <CustomPicker
          selectedValue={screen}
          onValueChange={setScreen}
          items={[
            { label: "Тури", value: "tours" },
            { label: "Обране", value: "favorites" },
            { label: "Налаштування", value: "settings" },
            { label: "Додати тур", value: "add" },
          ]}
          theme={theme}
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
          openTour={openTour}
        />
      ) : screen === "favorites" ? (
        <FavoritesScreen
          tours={favoriteTours}
          theme={theme}
          openTour={openTour}
        />
      ) : screen === "settings" ? (
        <SettingsScreen
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          theme={theme}
        />
      ) : (
        <AddTourScreen setTours={setTours} setScreen={setScreen} theme={theme} />
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={[styles.container, theme.background]}>
          {selectedTour ? (
            <>
              <Text style={[styles.title, theme.text]}>
                {selectedTour.title}
              </Text>

              <Image
                source={{ uri: selectedTour.image }}
                style={{ width: "100%", height: 220, borderRadius: 12 }}
              />

              <Text style={[theme.text, { marginTop: 10 }]}>
                Країна: {selectedTour.country}
              </Text>
              <Text style={theme.text}>Ціна: {selectedTour.price}$</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 30,
                }}
              >
                <Text style={[theme.text, { marginRight: 12, fontSize: 16 }]}>
                  В обране
                </Text>
                <Switch
                  value={isFavorite}
                  onValueChange={() => toggleFavorite(selectedTour.id)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isFavorite ? "#f5dd4b" : "#f4f3f4"}
                />
              </View>

              <Pressable
                style={[styles.toggleBtn, { marginTop: 10 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.toggleText}>Закрити</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.toggleBtn,
                  { backgroundColor: "#e74c3c", marginTop: 12 },
                ]}
                onPress={deleteTour}
              >
                <Text style={styles.toggleText}>Видалити тур</Text>
              </Pressable>
            </>
          ) : (
            <Text style={theme.text}>Тур не обрано</Text>
          )}
        </View>
      </Modal>
    </View>
  );
}


function CustomPicker({ selectedValue, onValueChange, items, theme }) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel =
    items.find((item) => item.value === selectedValue)?.label || "Оберіть...";

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: theme.card.backgroundColor,
          borderRadius: 10,
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      >
        <Text style={{ color: theme.text.color, fontSize: 16 }}>
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.text.color} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: theme.card.backgroundColor,
              margin: 20,
              borderRadius: 12,
              padding: 20,
              maxHeight: "70%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.text.color,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Оберіть розділ
            </Text>

            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                  style={{
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        selectedValue === item.value
                          ? "#3498db"
                          : theme.text.color,
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 15,
                padding: 12,
                backgroundColor: "#e74c3c",
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Закрити
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

function ToursScreen({
  tours = [],
  theme,
  search,
  setSearch,
  countryFilter,
  setCountryFilter,
  openTour,
}) {
  const countries = ["Усі", "Італія", "Іспанія", "Франція", "Туреччина"];

  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
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
              theme.card,
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

      <FlatList
        data={tours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TourCard tour={item} theme={theme} openTour={openTour} />
        )}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            Тури не знайдено
          </Text>
        }
      />
    </ScrollView>
  );
}

function FavoritesScreen({ tours = [], theme, openTour }) {
  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <Text style={[styles.title, theme.text, { marginTop: 20, marginBottom: 10 }]}>
        Обрані тури
      </Text>

      <FlatList
        data={tours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TourCard tour={item} theme={theme} openTour={openTour} />
        )}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 60, color: "#888", fontSize: 16 }}>
            Ви ще нічого не додали в обране
          </Text>
        }
      />
    </ScrollView>
  );
}

function TourCard({ tour, theme, openTour }) {
  if (!tour) return null;

  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => openTour(tour)}
      style={[
        styles.card,
        theme.card,
        { transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
    >
      <Image source={{ uri: tour.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.cardTitle, theme.text]}>{tour.title}</Text>
        <Text style={theme.text}>Країна: {tour.country}</Text>
        <Text style={theme.text}>Ціна: {tour.price}$</Text>
      </View>
    </Pressable>
  );
}

function AddTourScreen({ setTours, setScreen, theme }) {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addTour = () => {
    if (!title.trim() || !country.trim() || !price.trim()) {
      alert("Заповніть усі обов’язкові поля!");
      return;
    }

    const newTour = {
      id: Date.now(),
      title: title.trim(),
      country: country.trim(),
      price: Number(price),
      image: image.trim() || "https://via.placeholder.com/150",
    };

    setTours((prev) => [...prev, newTour]);
    setTitle("");
    setCountry("");
    setPrice("");
    setImage("");
    setScreen("tours");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={[styles.title, theme.text]}>Додати новий тур</Text>

      <TextInput
        placeholder="Назва туру *"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Країна *"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Ціна ($) *"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Посилання на фото (необов’язково)"
        value={image}
        onChangeText={setImage}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <Pressable style={styles.toggleBtn} onPress={addTour}>
        <Text style={styles.toggleText}>Додати тур</Text>
      </Pressable>

      <Pressable
        style={[styles.toggleBtn, { backgroundColor: "#e74c3c", marginTop: 12 }]}
        onPress={() => setScreen("tours")}
      >
        <Text style={styles.toggleText}>Скасувати</Text>
      </Pressable>
    </ScrollView>
  );
}

function SettingsScreen({ darkTheme, setDarkTheme, theme }) {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={[styles.title, theme.text]}>Налаштування</Text>

      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Pressable
          style={[styles.toggleBtn, { width: "80%" }]}
          onPress={() => setDarkTheme(!darkTheme)}
        >
          <Ionicons name="color-palette" size={24} color="white" />
          <Text style={[styles.toggleText, { marginLeft: 12 }]}>
            {darkTheme ? "Перейти на світлу тему" : "Перейти на темну тему"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
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
  },
activeChip: {
    backgroundColor: "#3498db",
  },
  chipText: {
    color: "#475753",  
  },
  activeChipText: {
     fontWeight: "bold", 
     color: "#0f886c",     
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
    marginRight: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  toggleBtn: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#9b59b6",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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