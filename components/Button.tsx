import { Text, Image, TouchableOpacity } from 'react-native';

interface Props {
    icon: any;
    value: number;

}
const formatNumber = (num : number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
};

const Button = ({ icon, value } : Props) => {
    return(
        <TouchableOpacity className="flex-row items-center">
            <Image source={icon} className='size-6' />
            <Text className='text-sm font-normal ml-1' >{formatNumber(value)}</Text>
        </TouchableOpacity>
    )
}

export default Button;