import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
import Button from '@/components/Button';
import Followers from '@/components/Follower';
import Feed from '@/components/Feed';

const Activity = () => {
    const Tabs = [
        { name: 'Tất cả'},
        { name: 'Lượt theo dõi'},
        { name: 'Bài đăng lại'},
        { name: 'Follow'},
    ];
    const Threads = {
        threadid: 1,
        content: "Nội dung bài viết",
        mediaFiles: [
            {
                id: 1,
                imageUrl: 'https://static01.nyt.com/images/2022/09/16/arts/16CAMERON1/16CAMERON1-mediumSquareAt3X.jpg',
            },
            {
                id: 2,
                imageUrl: 'https://static01.nyt.com/images/2022/09/16/arts/16CAMERON1/16CAMERON1-mediumSquareAt3X.jpg',
            },
            {
                id: 3,
                imageUrl: 'https://static01.nyt.com/images/2022/09/16/arts/16CAMERON1/16CAMERON1-mediumSquareAt3X.jpg',
            },
        ], 
        likeCount: 124, 
        commentCount: 67, 
        retweetCount: 12,
        sendCount: 3,
        // creator: User,
        date: '2025-05-04',
        userid: 1,
        firstName: "Nguyen",
        lastName: "Dũng",
        avatar_path: 'https://static01.nyt.com/images/2022/09/16/arts/16CAMERON1/16CAMERON1-mediumSquareAt3X.jpg',
    }
    const [tabIndex, setTabIndex] = useState("Tất cả");
    
    return (
        <View className='flex-1 bg-white px-5'>
            <ScrollView
                className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%" , paddingBottom: 10}}
            >
            <SafeAreaView>
  
                <Text className='text-3xl font-bold mb-4'>Activity</Text>   
                
                <FlatList
                    horizontal
                    data={Tabs}
                    contentContainerStyle={{gap: 10, padding: 4, flexDirection: 'row', alignItems: 'center'}}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                            <TouchableOpacity 
                                activeOpacity={0.7}
                                className={`py-2 px-6 rounded-full border border-gray-300 transition-colors ${
                                    tabIndex === item.name ? 'bg-gray-500' : 'bg-white'
                                }`}
                                onPress={() => setTabIndex(item.name)}
                            >
                                <Text className={`font-bold transition-colors ${tabIndex === item.name ? 'text-white' : 'text-black'}`}>{item.name}</Text>
                            </TouchableOpacity>
                    )} 
                />
                
                <Text className='text-xl font-bold px-2 py-2'>Trước đó</Text>
                {/* Hiện người follow mình */}
               <Followers 
                    uri={'https://static01.nyt.com/images/2022/09/16/arts/16CAMERON1/16CAMERON1-mediumSquareAt3X.jpg'} 
                    username={'Nguyen Dung'} 
                    date={'10 giờ'} 
                    status={false}
                />

                
                {/* Hiện bài viết người dùng */}
                <Feed thread={Threads} />
            
           
            </SafeAreaView>
            </ScrollView>
        </View>
    )
}

export default Activity;