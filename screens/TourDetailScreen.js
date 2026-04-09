import React, { useState, useEffect } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  Alert, 
  View, 
  Image, 
  Platform 
} from "react-native";

import { Text, Button, Card, useTheme } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Calendar from "expo-calendar";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TourDetailScreen() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { tour } = route.params || {};

  const [selectedImage, setSelectedImage] = useState(null);

  
  useEffect(() => {
    if (!tour) {
      Alert.alert("Помилка", "Тур не знайдено", [
        { text: "Назад", onPress: () => navigation.goBack() }
      ]);
      return;
    }
    loadSavedImage(tour.id);
  }, [tour]);   

  const loadSavedImage = async (tourId) => {
    try {
      const saved = await AsyncStorage.getItem(`tour_image_${tourId}`);
      if (saved) setSelectedImage(saved);
    } catch (e) {
      console.log("Не вдалося завантажити фото", e);
    }
  };


  const addToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Доступ заборонено", "Дозвольте доступ до календаря в налаштуваннях пристрою.");
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

      
      let targetCalendar = calendars.find(cal =>
        cal?.title?.toLowerCase().includes("google") ||
        cal?.title?.toLowerCase().includes("primary") ||
        cal?.title?.toLowerCase().includes("особистий") ||
        cal?.isPrimary === true
      );

   
      if (!targetCalendar) {
        Alert.alert("Створення календаря", "Не знайдено системний календар. Створюємо новий...");

        let source = null;

        if (Platform.OS === 'ios') {
          try {
            const defaultCalendar = await Calendar.getDefaultCalendarAsync();
            if (defaultCalendar?.source) {
              source = defaultCalendar.source;
            }
          } catch (e) {
            console.log("Не вдалося отримати default calendar на iOS", e);
          }
        } else {
          
          source = { isLocalAccount: true, name: "TourApp Calendar" };
        }

        const newCalendarId = await Calendar.createCalendarAsync({
          title: "Подорожі з тур-додатку",
          color: "#c084fc",
          entityType: Calendar.EntityTypes.EVENT,
          source: source || undefined,
          name: "TourAppCalendar",
          ownerAccount: "personal",
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        targetCalendar = { id: newCalendarId };
        Alert.alert("Календар створено", "Новий календар успішно додано.");
      }

      if (!targetCalendar?.id) {
        Alert.alert("Помилка", "Не вдалося отримати або створити календар.");
        return;
      }

      const startDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

      await Calendar.createEventAsync(targetCalendar.id, {
        title: `Подорож: ${tour.title}`,
        startDate,
        endDate: new Date(startDate.getTime() + 3 * 60 * 60 * 1000),
        location: tour.country,
        notes: `Ціна: ${tour.price}$\nКраїна: ${tour.country}\nНе забудь підготуватися!`,
        alarms: [
          { relativeOffset: -1440 },
          { relativeOffset: -60 }
        ],
      });

      Alert.alert(
        "✅ Подію додано!",
        `Нагадування про тур "${tour.title}"\nДата: ${startDate.toLocaleDateString('uk-UA')}`
      );
    } catch (error) {
      console.error("Calendar error:", error);
      Alert.alert("Помилка", "Не вдалося додати подію в календар.\n\n" + (error.message || ""));
    }
  };


  const pickImage = async (useCamera = false) => {
    try {
      const permissionResult = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.status !== "granted") {
        Alert.alert("Доступ заборонено", `Дозвольте доступ до ${useCamera ? "камери" : "галереї"}`);
        return;
      }

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8 })
        : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8 });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        await AsyncStorage.setItem(`tour_image_${tour.id}`, uri);
        Alert.alert("Фото прикріплено", "Збережено для цього туру");
      }
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося обрати фото");
    }
  };

  const removeImage = async () => {
    setSelectedImage(null);
    try {
      await AsyncStorage.removeItem(`tour_image_${tour.id}`);
      Alert.alert("Фото відкріплено");
    } catch (e) {}
  };

  if (!tour) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: tour.image }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            {tour.title}
          </Text>
          <View style={styles.infoRow}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {tour.country}
            </Text>
            <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "bold" }}>
              {tour.price} $
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        icon="calendar-plus"
        onPress={addToCalendar}
        style={styles.button}
      >
        Додати нагадування в календар (через 7 днів)
      </Button>

      <Card style={[styles.card, { marginTop: 24 }]}>
        <Card.Content>
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>
            Прикріпити зображення до туру
          </Text>

          {selectedImage && (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.attachedImage} 
            />
          )}

          <View style={styles.imageButtons}>
            <Button
              mode="outlined"
              icon="camera"
              onPress={() => pickImage(true)}
              style={styles.smallButton}
            >
              Камера
            </Button>
            <Button
              mode="outlined"
              icon="image"
              onPress={() => pickImage(false)}
              style={styles.smallButton}
            >
              Галерея
            </Button>

            {selectedImage && (
              <Button
                mode="contained"
                icon="delete"
                buttonColor="#e74c3c"
                onPress={removeImage}
                style={styles.smallButton}
              >
                Відкріпити
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { 
    marginBottom: 16, 
    borderRadius: 20, 
    elevation: 6, 
    overflow: "hidden" 
  },
  image: { height: 280 },
  content: { padding: 20 },
  title: { fontWeight: "bold", marginBottom: 8 },
  infoRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 12 
  },
  button: { marginTop: 12 },
  attachedImage: { 
    width: "100%", 
    height: 240, 
    borderRadius: 16, 
    marginBottom: 16 
  },
  imageButtons: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    gap: 8 
  },
  smallButton: { flex: 1, margin: 4 },
});