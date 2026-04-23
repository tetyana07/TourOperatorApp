import React, { useState, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  TextInput,
  Chip,
  Text,
  useTheme,
  SegmentedButtons,
} from "react-native-paper";
import TourCard from "./TourCard";

export default function ToursScreen({
  tours,
  openTour,
  toggleFavorite,
  favorites,
}) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("Усі");
  const [sortType, setSortType] = useState("none");

  const theme = useTheme();

  const countries = ["Усі", "Франція", "Італія", "Іспанія", "Туреччина"];

  const filteredTours = useMemo(() => {
    let result = [...tours];

   
    result = result.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(search.toLowerCase()) ||
        tour.country.toLowerCase().includes(search.toLowerCase());

      const matchesCountry =
        countryFilter === "Усі" || tour.country === countryFilter;

      return matchesSearch && matchesCountry;
    });

    
    switch (sortType) {
      case "price_asc":
        return result.sort((a, b) => a.price - b.price);

      case "price_desc":
        return result.sort((a, b) => b.price - a.price);

      case "name_asc":
        return result.sort((a, b) =>
          a.title.localeCompare(b.title, "uk")
        );

      case "name_desc":
        return result.sort((a, b) =>
          b.title.localeCompare(a.title, "uk")
        );

      default:
        return result;
    }
  }, [tours, search, countryFilter, sortType]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
     
      <TextInput
        label="Пошук турів..."
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        style={styles.search}
        left={<TextInput.Icon icon="magnify" />}
      />

   
      <View style={styles.section}>
        <Text
          style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
        >
          🌍 Країни
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={countries}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Chip
              selected={countryFilter === item}
              onPress={() => setCountryFilter(item)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    countryFilter === item
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                },
              ]}
              textStyle={{
                color:
                  countryFilter === item
                    ? theme.colors.onPrimary
                    : theme.colors.onSurface,
              }}
            >
              {item}
            </Chip>
          )}
        />
      </View>

     
     <View style={styles.section}>
  <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
    🔄 Сортування
  </Text>

  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={[
      { label: "За замовч.", value: "none" },
      { label: "💰 Дешеві", value: "price_asc" },
      { label: "💎 Дорогі", value: "price_desc" },
      { label: "🔤 А-Я", value: "name_asc" },
      { label: "🔤 Я-А", value: "name_desc" },
    ]}
    keyExtractor={(item) => item.value}
    renderItem={({ item }) => (
      <Chip
        selected={sortType === item.value}
        onPress={() => setSortType(item.value)}
        style={[
          styles.chip,
          {
            backgroundColor:
              sortType === item.value
                ? theme.colors.primary
                : theme.colors.surfaceVariant,
          },
        ]}
        textStyle={{
          color:
            sortType === item.value
              ? theme.colors.onPrimary
              : theme.colors.onSurface,
        }}
      >
        {item.label}
      </Chip>
    )}
  />
</View>

     
      <FlatList
        data={filteredTours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TourCard
            tour={item}
            openTour={openTour}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(item.id)}
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            😕 Тури не знайдено
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  search: { margin: 16 },

  section: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  chip: {
    marginRight: 8,
    borderRadius: 20,
  },

  content: {
    paddingBottom: 30,
  },

  empty: {
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
  },
});