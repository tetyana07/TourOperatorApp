import React from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Назва повинна містити мінімум 3 символи")
    .required("Назва туру обов'язкова"),
  country: Yup.string()
    .min(2, "Назва країни повинна містити мінімум 2 символи")
    .required("Країна обов'язкова"),
  price: Yup.number()
    .typeError("Ціна повинна бути числом")
    .positive("Ціна повинна бути більше 0")
    .required("Ціна обов'язкова"),
  image: Yup.string().url("Введіть коректне посилання").optional(),
});

export default function AddTourScreen({ setTours }) {
  const theme = useTheme();

  const handleAdd = (values, { resetForm }) => {
    const newTour = {
      id: Date.now(),
      title: values.title.trim(),
      country: values.country.trim(),
      price: parseInt(values.price),
      image: values.image.trim() || "https://via.placeholder.com/600x400/6200ee/ffffff?text=Тур",
    };

    setTours((prev) => [...prev, newTour]);
    resetForm();
    Alert.alert("Успіх", "Новий тур успішно додано!");
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.onSurface }]}
      >
        Створити новий тур
      </Text>

      <Formik
        initialValues={{ title: "", country: "", price: "", image: "" }}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Назва туру *"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              mode="outlined"
              style={styles.input}
              error={touched.title && !!errors.title}
            />
            {touched.title && errors.title && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.title}</Text>
            )}

            <TextInput
              label="Країна *"
              value={values.country}
              onChangeText={handleChange("country")}
              onBlur={handleBlur("country")}
              mode="outlined"
              style={styles.input}
              error={touched.country && !!errors.country}
            />
            {touched.country && errors.country && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.country}</Text>
            )}

            <TextInput
              label="Ціна в $ *"
              value={values.price}
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
              error={touched.price && !!errors.price}
            />
            {touched.price && errors.price && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.price}</Text>
            )}

            <TextInput
              label="Посилання на фото (необов'язково)"
              value={values.image}
              onChangeText={handleChange("image")}
              onBlur={handleBlur("image")}
              mode="outlined"
              style={styles.input}
              error={touched.image && !!errors.image}
            />
            {touched.image && errors.image && (
              <Text style={[styles.error, { color: theme.colors.error }]}>{errors.image}</Text>
            )}

            <Button 
              mode="contained" 
              onPress={handleSubmit} 
              style={styles.button}
            >
              Додати тур
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 24, fontWeight: "bold" },
  input: { marginBottom: 8 },
  button: { marginTop: 20, paddingVertical: 8 },
  error: { fontSize: 12, marginBottom: 8, marginLeft: 4 },
});