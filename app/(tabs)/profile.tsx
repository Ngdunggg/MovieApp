import { View, Text, Image, TextInput, TouchableOpacity, LayoutAnimation, Keyboard } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
import { useFocusEffect } from 'expo-router';

const Profile = () => {
    
    return (
        <View className='flex-1 mt-[50px]'>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile;