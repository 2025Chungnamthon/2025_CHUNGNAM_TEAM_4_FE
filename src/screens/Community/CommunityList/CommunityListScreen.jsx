import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "../../../redux/slices/communitySlice";


const CommunityListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.community);

  useEffect(() => {
    dispatch(fetchCommunityPosts());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('CommunityDetailScreen', { postId: item.id })}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.preview}>{item.preview}</Text>
    </View>
  </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
  if (error) return <Text>에러: {error}</Text>;

  return (
    <View style={styles.container}>
      {/* 날짜순 정렬 (UI만) */}
      <Text style={styles.sortText}>날짜순 ▼</Text>

      {/* 배너 */}
      <TouchableOpacity style={styles.banner}>
        <Text style={styles.bannerText}>
          금일의 인기 게시물 - 쌍용공원 플로깅 체험
        </Text>
      </TouchableOpacity>
      {posts && (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CommunityWriteScreen")} // 글쓰기 페이지로 이동
      >
        <MaterialIcons name="edit" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  sortText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "500",
  },
  banner: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  bannerText: {
    color: "white",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  preview: {
    fontSize: 13,
    color: "#666",
  },
  fab: {
  position: 'absolute',
  bottom: 30,
  right: 20,
  backgroundColor: '#4CAF50',
  borderRadius: 30,
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
});
