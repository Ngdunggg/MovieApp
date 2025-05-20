import React, { useCallback } from 'react';
import { View, Text, Image, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import useFetch from '@/services/useFetch';
import { getSavedMovies } from '@/services/appwrite';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';

const ProfileScreen = () => {
  const router = useRouter();

  // Lấy danh sách phim đã lưu từ Appwrite
  const {
    data: savedMovies,
    loading: saveLoading,
    error: saveError,
    refetch: loadSavedMovies,
  } = useFetch(getSavedMovies);

//  Cập nhật danh sách phim khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadSavedMovies();
    }, [])
  );

  // Giả định thông tin người dùng (có thể thay bằng dữ liệu thực từ Appwrite hoặc API)
  const user = {
    name: 'Nguyễn Dũng',
    email: 'user@example.com',
    avatar: 'https://mtv.vn/uploads/2023/02/25/meo-gg.jpg', // Thay bằng URL ảnh thật nếu có
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Hình nền */}
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 80 }}
      >
        {/* Logo */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* Thông tin người dùng */}
        <View className="flex-row items-center mb-5 mt-5">
          <Image
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full mr-4"
          />
          <View>
            <Text className="text-2xl text-white font-bold">{user.name}</Text>
            <Text className="text-lg text-light-200">{user.email}</Text>
          </View>
        </View>

        {/* Nút đăng xuất (giả định) */}
        <TouchableOpacity
          className="bg-red-500 rounded-lg py-3.5 items-center mt-5"
          onPress={() => {
            // Xử lý đăng xuất (thêm logic nếu có hệ thống đăng nhập)
            console.log('Đăng xuất');
          }}
        >
          <Text className="text-white font-semibold text-base">Đăng xuất</Text>
        </TouchableOpacity>

        {/* Danh sách phim đã lưu */}
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Phim đã lưu
        </Text>

        {saveLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : saveError ? (
          <Text className="text-red-500">Lỗi: {saveError.message}</Text>
        ) : savedMovies.length === 0 ? (
          <Text className="text-base text-light-200 text-center">
            Chưa có phim nào được lưu.
          </Text>
        ) : (
          <FlatList
            data={savedMovies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-2 pb-32"
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;