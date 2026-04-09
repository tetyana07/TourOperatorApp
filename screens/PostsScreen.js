import React, { useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { Text, Card, ActivityIndicator, useTheme } from "react-native-paper";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PostsScreen() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    "https://jsonplaceholder.typicode.com/posts?_limit=15",
    fetcher
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await mutate();        
    setRefreshing(false);
  };

  if (isLoading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 16, color: theme.colors.onSurfaceVariant }}>
          Завантаження постів...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: theme.colors.error }}>Помилка завантаження даних</Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
          Потягніть вниз, щоб спробувати ще раз
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    >
      <Text variant="headlineMedium" style={styles.title}>
        Останні пости (JSONPlaceholder)
      </Text>

      {data?.map((post) => (
        <Card key={post.id} style={styles.postCard}>
          <Card.Content>
            <Text variant="titleMedium" style={{ fontWeight: "bold", marginBottom: 8 }}>
              {post.title}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {post.body}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 20, fontWeight: "bold" },
  postCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});