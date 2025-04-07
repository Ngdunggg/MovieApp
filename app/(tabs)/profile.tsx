import { View, Text, Image, TextInput, TouchableOpacity, LayoutAnimation, Keyboard } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
import { useFocusEffect } from 'expo-router';

const Profile = () => {
    const [status, setStatus] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }
    const toggleStatus = (value: boolean) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setStatus(value);
    }
    // Kích hoạt animation mỗi khi màn hình được focus (quay lại)
    
  
    return (
        <View className='flex-1'>
            <SafeAreaView className='px-5'>
                {!status && (
                    <Text className='text-3xl font-bold'>Search</Text>   
                )}      
                <View className='flex-row items-center'>
                    {status && ( 
                        <TouchableOpacity 
                            onPress={() => {  
                                toggleStatus(false);
                                setTimeout(() => {
                                    Keyboard.dismiss();
                                }, 100); 
                            }} 
                            className='mr-2'
                        >
                            <Image source={icons.arrow} className="size-6 rotate-180 top-3" resizeMode='contain' tintColor="#000000" />
                        </TouchableOpacity>
                    )}
                    <View className='flex-row items-center bg-gray-200 rounded-full px-5 py-4 top-3 flex-1'>
                
                        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#000000"/>

                        <TextInput
                            placeholder='Search for movies, actors, or directors'
                            placeholderTextColor="#000000"
                            value={searchTerm}
                            onChangeText={handleSearch}
                            onFocus={() => toggleStatus(true)}
                            className='flex-1 ml-2 text-black' 
                        />
                    </View>
                </View>                
                <View className=''>
                    <Text>{searchTerm}</Text>
                </View>
                <View className='flex-row items-center px-4 py-4'>
                    <Image source={{ uri: 'https://static01.nyt.com/images/2022/09/16/arts/16CAMERON1/16CAMERON1-mediumSquareAt3X.jpg' }} className='w-10 h-10 rounded-full'/> 
                    <View className='flex-1 gap-1 ml-4' >
                        <Text className='text-sm font-bold'>Dung</Text>
                        <Text className='text-sm text-gray-500'>@Zug158</Text>
                        <Text className='text-sm'>100000 followers</Text>
                    </View>
                    <TouchableOpacity className='py-2 px-6 rounded-lg border border-gray-300'>
                        <Text className='font-bold'>Follow</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Profile;