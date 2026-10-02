import { useAuth } from '@/components/authProvider';
import { useRouter } from 'expo-router';
import { View, Pressable, Text } from 'react-native';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';

const Selection = ({ onPress, children }: {onPress?: () => void, children: React.ReactNode}) => {
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.bottomSheetsStyle, Color: state.Color})));
    return (
        <Pressable
            accessibilityRole="button"
            android_ripple={{color: Color.selected}}
            onPress={onPress}
            style={({pressed}) => [
                styles.option,
                pressed && styles.optionPressed,
            ]}
        >
            {children}
        </Pressable>
    );
}

export default function AddSheet (){
	const styles = useTheme((state) => state.bottomSheetsStyle);
    const router = useRouter();
    const { client } = useAuth();
    const addEmpty = async () => {
		router.back();
        const ret = await client?.createNote({title: "untitled"})
        if (ret == undefined) return;
		router.push({pathname: "/[id]/view", params:{id: ret.id, title: ret.title}});
    }
    const addFile = async () => {
    }

    return (
        <View
            style={{ paddingTop: 10}}
        >
            <Selection onPress={addEmpty}>
                <Text style={styles.optionText}>Add Empty Note</Text>
            </Selection>
            <Selection onPress={addFile}>
                <Text style={styles.optionText}>Add From Markdown File</Text>
            </Selection>
        </View>
    )
}
