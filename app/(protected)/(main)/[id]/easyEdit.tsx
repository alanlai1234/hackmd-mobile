import { Text, View } from 'react-native';
import { useApp } from '@/components/viewProvider';

export default function EasyEdit() {
	const { Color } = useApp();

    return (
        <View style={{flex: 1, backgroundColor: Color.background}}>
            <Text style={{flex: 1, color: Color.text}}>Coming Soon</Text>
         </View>
     );
}
