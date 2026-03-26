import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TextInput, Chip, Text, useTheme } from "react-native-paper";
import TourCard from "./TourCard";

export default function ToursScreen({ tours, openTour, toggleFavorite, favorites }) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("Усі");
  const theme = useTheme();

  const countries = ["Усі", "Франція", "Італія", "Іспанія", "Туреччина"];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = 
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.country.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = countryFilter === "Усі" || tour.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        label="Пошук турів..."
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        style={styles.search}
        left={<TextInput.Icon icon="magnify" />}
        textColor={theme.colors.onSurface}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        theme={{
          colors: {
            text: theme.colors.onSurface,
            placeholder: theme.colors.onSurfaceVariant,
            background: theme.colors.surface,
            outline: theme.colors.border || "#333333",
          }
        }}
      />

      <View style={styles.chipsContainer}>
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
                  backgroundColor: countryFilter === item 
                    ? theme.colors.primary 
                    : theme.colors.surfaceVariant 
                }
              ]}
              textStyle={{ 
                color: countryFilter === item 
                  ? theme.colors.onPrimary 
                  : theme.colors.onSurface,
                fontWeight: countryFilter === item ? "600" : "400"
              }}
              mode={countryFilter === item ? "flat" : "outlined"}
            >
              {item}
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
          <Text style={[styles.empty, { color: theme.colors.onSurfaceVariant }]}>
            Тури не знайдено
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { margin: 16 },
  chipsContainer: { paddingHorizontal: 16, marginBottom: 12 },
  chip: { marginRight: 8, borderRadius: 20 },
  content: { paddingBottom: 30 },
  empty: { textAlign: "center", marginTop: 100, fontSize: 18 },
});