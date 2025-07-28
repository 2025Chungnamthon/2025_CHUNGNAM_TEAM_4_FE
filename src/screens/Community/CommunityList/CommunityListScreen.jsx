import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert, StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts, clearPosts } from "../../../redux/slices/communitySlice";

const CommunityListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { posts, loading, error, pagination } = useSelector((state) => state.community);
  
  const [sortType, setSortType] = useState('date'); // 'date' or 'like'
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadPosts();
    return () => {
      dispatch(clearPosts());
    };
  }, []);

  const loadPosts = (page = 0) => {
    dispatch(fetchCommunityPosts({ 
      page, 
      limit: 10, 
      sort: sortType 
    }));
  };

  const handleSortChange = (newSortType) => {
    if (newSortType !== sortType) {
      setSortType(newSortType);
      setCurrentPage(0);
      // 기존 데이터 초기화 후 새로운 정렬로 데이터 로드
      dispatch(clearPosts());
      dispatch(fetchCommunityPosts({ 
        page: 0, 
        limit: 10, 
        sort: newSortType 
      }));
    }
  };

  const handleLoadMore = () => {
    if (pagination.hasNext && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadPosts(nextPage);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CommunityDetailScreen', { postId: item.id })}
    >
      {item.imageUrls && item.imageUrls.length > 0 && (
        <Image source={{ uri: item.imageUrls[0] }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardAuthor}>{item.userNickname}님</Text>
        <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4CAF50" />
      </View>
    );
  };

  if (error) {
    Alert.alert("오류", error.message || "게시글을 불러오는데 실패했습니다.");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SKTelecom</Text>
        <Text style={styles.headerStatus}>54%</Text>
      </View>

      {/* 제목 */}
      <Text style={styles.screenTitle}>커뮤니티</Text>

      {/* 정렬 버튼 */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortType === 'date' && styles.activeSortButton]}
          onPress={() => handleSortChange('date')}
        >
          <Text style={[styles.sortText, sortType === 'date' && styles.activeSortText]}>
            날짜순
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortType === 'like' && styles.activeSortButton]}
          onPress={() => handleSortChange('like')}
        >
          <Text style={[styles.sortText, sortType === 'like' && styles.activeSortText]}>
            추천순
          </Text>
        </TouchableOpacity>
      </View>

      {/* 게시글 목록 */}
      {posts && (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          refreshing={loading && currentPage === 0}
          onRefresh={() => {
            setCurrentPage(0);
            loadPosts(0);
          }}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CommunityWriteScreen")}
      >
        <MaterialIcons name="edit" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerStatus: {
    fontSize: 14,
    color: '#666',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    gap: 8,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeSortButton: {
    backgroundColor: '#4CAF50',
  },
  sortText: {
    fontSize: 14,
    color: '#333',
  },
  activeSortText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: '#333',
  },
  cardAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#999",
  },
  fab: {
    position: 'absolute',
    bottom: 100,
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
