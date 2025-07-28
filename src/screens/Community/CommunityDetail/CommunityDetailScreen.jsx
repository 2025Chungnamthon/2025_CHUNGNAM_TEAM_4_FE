// screens/Community/CommunityDetail.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunityDetail, clearDetail, toggleLike } from '../../../redux/slices/communitySlice';
import { FontAwesome } from '@expo/vector-icons'; // or react-native-vector-icons

const CommunityDetailScreen = ({ route }) => {
  const { postId } = route.params;
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

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
  if (error) return <Text style={{ marginTop: 20 }}>에러: {error}</Text>;
  if (!postDetail) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{postDetail?.title}</Text>
      <Text style={styles.meta}>{postDetail?.author} / {postDetail?.date}</Text>
      <Text>asdfsda</Text>

      <Text style={styles.content}>{postDetail?.content}</Text>
      {postDetail?.imageUrl && (
        <Image source={{ uri: postDetail?.imageUrl }} style={styles.image} />
      )}
      <View style={styles.bottomBar}>
  <TouchableOpacity
    style={[
      styles.iconButton,
      styles.likeButton,
      postDetail?.likedByMe && styles.liked,
    ]}
    onPress={handleToggleLike}
  >
    <FontAwesome
      name={postDetail?.likedByMe ? 'thumbs-up' : 'thumbs-o-up'}
      size={24}
      color={postDetail?.likedByMe ? '#ffffff' : '#2ecc71'}
    />
    <Text
      style={[
        styles.iconText,
        postDetail?.likedByMe ? styles.likedText : styles.likeText,
      ]}
    >
      {postDetail?.likeCount || 15}
    </Text>
  </TouchableOpacity>

  <View style={[styles.iconButton, styles.commentButton]}>
    <FontAwesome name="comment-o" size={24} color="#888" />
    <Text style={[styles.iconText, styles.commentText]}>
      {postDetail?.commentCount || 16}
    </Text>
  </View>
</View>
    </ScrollView>
  );
};

export default CommunityDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  content: {
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  bottomBar: {
  flexDirection: 'row',
  justifyContent: 'center', // 가운데 정렬
  marginTop: 32,
  gap: 20,
},
iconButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderWidth: 2,
  borderRadius: 12,
},
likeButton: {
  borderColor: '#2ecc71',
},
commentButton: {
  borderColor: '#ccc',
},
liked: {
  backgroundColor: '#2ecc71',
},
iconText: {
  marginLeft: 8,
  fontSize: 18,
  fontWeight: '600',
},
likeText: {
  color: '#2ecc71',
},
likedText: {
  color: '#fff',
},
commentText: {
  color: '#555',
},

});
