import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Reat, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { saveMovie } from '@/services/appwrite';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

interface MovieInfoProps{
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value} : MovieInfoProps ) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A" }
        </Text>
    </View>
)

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const MovieDetail = () => {
    const { id } = useLocalSearchParams();
    const [isSaved, setIsSaved] = useState(false);
    
    const {
        data: movies,
        loading
    } = useFetch(() => fetchMovieDetails(id as string));
    
    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const response = await database.listDocuments(DATABASE_ID, 'saveMovie', [
                    Query.equal("id", Number(id))
                ]);
                if (response.documents.length > 0) {
                    setIsSaved(true);
                }
            } catch (error) {
                console.error("Error checking saved status:", error);
            }
        };
        checkIfSaved();
    }, [id]);

    const toggleSaveMovie = async () => {
        try { 
            setIsSaved(!isSaved); 
            if (movies) {   
                await saveMovie(movies);
            }
        } catch (error) {
            console.error("Error saving/removing movie:", error);
            setIsSaved(!isSaved); 
        }
    };
    

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Image source={{ uri:  `https://image.tmdb.org/t/p/w500${movies?.poster_path}`}} className="w-full h-[550px]" resizeMode="stretch"/>

                <View className="flex-col items-start justify-center mt-5 px-5">
                <View className='flex flex-row justify-between w-full items-center'>
                        <Text className="text-white font-bold text-xl flex-1">{movies?.title}</Text>

                        <TouchableOpacity onPress={() => toggleSaveMovie()}>
                            {isSaved ? (
                                <ImageBackground
                                    source={images.highlight}
                                    className="w-14 h-14 flex items-center justify-center rounded-full overflow-hidden"
                                >
                                    <Image source={icons.save} tintColor="#151312" className="size-6" />
                                </ImageBackground>
                            ) : (
                                <View className="w-14 h-14 flex items-center justify-center rounded-full bg-transparent">
                                    <Image source={icons.save} tintColor="#A8B5DB" className="size-6" />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm ">{movies?.release_date?.split("-")[0]}</Text>
                        <Text className="text-light-200 text-sm">{movies?.runtime}m</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className='size-4'/>
                        <Text className="text-white font-bold text-sm"> {Math.round(movies?.vote_average ?? 0)}/10</Text>
                        <Text className="text-light-200 text-sm">({movies?.vote_count} votes)</Text>
                    </View>

                    <MovieInfo label="Overview" value={movies?.overview} />
                    
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo label="Release date" value={movies?.release_date} />
                        <MovieInfo label="Status" value={movies?.status} />    
                    </View> 
                    
                    <MovieInfo label="Generes" value={movies?.genres?.map((g) => g.name).join(' - ') || "N/A"} />

                    <MovieInfo label="Countries" value={movies?.production_countries?.map((p) => p.name).join('  ●  ') || "N/A"} />
                    
                    <View className="flex flex-row justify-between w-1/2 gap-5">
                        <MovieInfo label="Budget" value={`$${movies?.budget! / 1_000_000} million`} />
                        <MovieInfo label="Revenue" value={`$${movies?.revenue! / 1_000_000} million`} />
                    </View>

                    <MovieInfo label="Tagline" value={movies?.tagline} />

                    <MovieInfo label="Production Companies" value={movies?.production_companies?.map((p) => p.name).join("  ●  ") || "N/A"} />
                </View>
            </ScrollView>

            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50" onPress={router.back}>
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
                    <Text className='text-white font-semibold text-base '>Visit Homepage</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MovieDetail;