import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';

interface Props {
    uri: string;
    username: string;
    date: string;
    handleFollow?: () => void;
    status?: boolean;
}

const Followers = ({ uri, username, date, handleFollow, status } : Props) => {
    return(
            <View className='flex-row items-center px-3 py-4 gap-1'>
                <Image source={{ uri: uri }} className='w-14 h-14 rounded-full'/> 
                <View className='flex-1 gap-1 ml-4' >
                    <View className='flex-row items-center gap-1'>
                        <Text className='text-sm font-bold' numberOfLines={1} style={{ flexShrink: 1 }}>{username}</Text>
                        <Text className='text-xs text-gray-500' >{date}</Text>
                    </View>
                       <Text className='text-sm text-gray-500'>Đã theo dõi bạn</Text>
                </View>
                {status === true ? (
                <TouchableOpacity className='py-2 px-6 rounded-lg border border-gray-300' onPress={handleFollow}>
                    <Text className='font-bold text-gray-400'>Đang theo dõi</Text>
                </TouchableOpacity>
                ) : (
                    <TouchableOpacity className='py-2 px-6 rounded-lg border border-gray-300' onPress={handleFollow}>
                        <Text className='font-bold'>Theo dõi lại</Text>
                    </TouchableOpacity>
                )}
            </View>
    )
}

export default Followers;