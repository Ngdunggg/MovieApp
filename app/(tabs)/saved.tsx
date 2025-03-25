import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { images } from '@/constants/images';
import { getSavedMovies } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { icons } from '@/constants/icons';
import MovieCard from '@/components/MovieCard';
import { useFocusEffect } from 'expo-router';

const Saved = () => {
    
    const {
        data: saveMovies = [],
        loading: saveLoading,
        error: saveError,
        refetch: loadSavedMovies,
    } = useFetch(getSavedMovies);

    useFocusEffect(
        useCallback(() => {
            loadSavedMovies(); // Cập nhật danh sách khi quay lại màn hình
        }, [])
    );


    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className='absolute w-full z-0' resizeMode='cover'/>

            <ScrollView 
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                 <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                    {saveLoading ? (
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            className="mt-10 self-center"
                        />
                        ) : saveError ? (
                        <Text>Error: {saveError.message}</Text>
                        ) : (
                        <View className="flex-1 mt-5">
                            <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">
                                Latest Movies
                            </Text>

                            <FlatList
                                data={saveMovies}
                                renderItem={({ item }) => <MovieCard {...item} />}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                justifyContent: "flex-start",
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10,
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                            </>
                        </View>
                )}   
            </ScrollView>
        </View>
    )
}

export default Saved;