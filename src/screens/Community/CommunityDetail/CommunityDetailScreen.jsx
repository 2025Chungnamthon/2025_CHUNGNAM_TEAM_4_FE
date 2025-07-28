// screens/Community/CommunityDetail.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCommunityDetail, clearDetail, toggleLike } from '../../../redux/slices/communitySlice';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CommunityDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { postDetail, loading, error } = useSelector((state) => state.community);

  useEffect(() => {
    dispatch(fetchCommunityDetail(postId));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, postId]);

  const handleToggleLike = () => {
    dispatch(toggleLike(postId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
  if (error) {
    Alert.alert("오류", error.message || "게시글을 불러오는데 실패했습니다.");
    return null;
  }
  if (!postDetail) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SKTelecom</Text>
        <Text style={styles.headerStatus}>54%</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 제목 */}
        <Text style={styles.title}>{postDetail?.title}</Text>
        
        {/* 작성자 & 날짜 */}
        <Text style={styles.meta}>
          {postDetail?.userNickname}님 / {formatDate(postDetail?.createdAt)}
        </Text>

        {/* 내용 */}
        <Text style={styles.content}>{postDetail?.content}</Text>
        
        {/* 이미지 */}
        {postDetail?.images && postDetail.images.length > 0 && (
          <View style={styles.imageContainer}>
            {postDetail.images.map((image, index) => (
              <Image 
                key={image.id} 
                source={{ uri: image.url }} 
                style={styles.image} 
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* 하단 추천 버튼 */}
      <View style={styles.likeContainer}>
        <TouchableOpacity
          style={[
            styles.likeButton,
            postDetail?.liked && styles.likedButton,
          ]}
          onPress={handleToggleLike}
        >
          <FontAwesome
            name={postDetail?.liked ? 'thumbs-up' : 'thumbs-o-up'}
            size={20}
            color={postDetail?.liked ? '#ffffff' : '#4CAF50'}
          />
          <Text
            style={[
              styles.likeText,
              postDetail?.liked ? styles.likedText : styles.unlikedText,
            ]}
          >
            {postDetail?.likeCount || 0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
    lineHeight: 22,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 8,
  },
  likeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#4CAF50',
  },
  likedButton: {
    backgroundColor: '#4CAF50',
  },
  likeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  unlikedText: {
    color: '#4CAF50',
  },
  likedText: {
    color: '#fff',
  },
});
