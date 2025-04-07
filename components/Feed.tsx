import { icons } from '@/constants/icons';
import React from 'react';
import { Text, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import Button from './Button';
import { Link } from 'expo-router';

// interface User {
//     id: number;
//     username: string;
//     firstName: string;
//     lastName: string;
//     avatar_path: string | null;
// }

interface Threads {
    threadid: number,
    content: string,
    mediaFiles?:{ 
        id: number,
        imageUrl: string,
    }[], 
    likeCount: number, 
    commentCount: number, 
    retweetCount: number,
    sendCount: number,
    // creator: User,
    date: string,
    userid: number,
    firstName: string,
    lastName: string,
    avatar_path: string,
}

type ThreadProps = {
    thread: Threads;
}

const Feed = ({ thread }: ThreadProps) => {
    return(
        <View className='flex-row items-center px-3 py-4 gap-1'>
        <Image source={{ uri: thread.avatar_path }} className='w-14 h-14 rounded-full self-start'/> 
        <View className='flex-1 gap-1 ml-4' >
            <View className='flex-row items-center'>
                <View className='flex-row items-center flex-1 gap-1'>
                    <Text className='text-sm font-bold' numberOfLines={1} style={{ flexShrink: 1 }}>{thread.firstName} {thread.lastName}</Text>
                    <Text className='text-xs text-gray-500' >{thread.date}</Text>    
                </View>
                <Image source={icons.more} className='size-6 self-end' tintColor="gray"/>
            </View>
               <Text className='text-sm text-gray-500'>Được chọn cho bạn</Text>
               <Text className='text-sm mb-3'>{thread.content}</Text>

               {thread.mediaFiles && thread.mediaFiles.length > 0 && (
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: 'row', gap: 14, paddingRight: 40,}}
                    >
                        {thread.mediaFiles.map((media) => (
                            <Link href={'/(tabs)/search'} key={media.id} asChild>
                                <TouchableOpacity>
                                   <Image source={{ uri: media.imageUrl}} className='h-60 w-60 rounded-xl mb-3'/>
                                </TouchableOpacity>
                            </Link>
                        )) }
                    </ScrollView>
               )}       
            
            <View className='flex-row mt-3 gap-4'>
                <Button icon={icons.star} value={thread.likeCount} />
                <Button icon={icons.star} value={thread.commentCount} />
                <Button icon={icons.star} value={thread.retweetCount} />
                <Button icon={icons.star} value={thread.sendCount} />
            </View>
        </View>

        
    </View>
    )
}

export default Feed;