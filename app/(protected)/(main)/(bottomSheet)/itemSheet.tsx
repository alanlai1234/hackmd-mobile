import { useAuth } from '@/components/authProvider';
import {  Pressable, Text, View, ScrollView, Alert } from 'react-native';
import { useApp } from '@/components/viewProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import useData from '@/components/dataState';

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

export default function ItemMenu(){
	const setRefresh = useData((state) => state.setRefresh);
	const styles = useTheme((state) => state.bottomSheetsStyle);
    const { client } = useAuth();
	const { addID } = useLocalSearchParams<{addID:string}>();
	const router = useRouter();
    const delNote = () => {
        if (addID == '') Alert.alert("No id chosen");
        Alert.alert("Proceed Delete?",
            "",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => {
					router.back();
					client?.deleteNote(addID);
					setRefresh(true);
                }},
            ],
        )
    }
    const rename = () => {
        if (addID == '') Alert.alert("No id chosen");
        Alert.prompt("Enter New Name",
            "",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", style: "default", onPress: (value: any) => {
					router.back();
                    client?.updateNote(addID, {title: value})
					setRefresh(true);
                }},
            ],
        )
    }

    return (
        <View style={{ paddingTop: 15}}>
            <ScrollView>
                <Selection onPress={rename}>
                    <Text style={styles.optionText}>Rename</Text>
                </Selection>
                <Selection onPress={delNote}>
                    <Text style={[styles.optionText, {color: 'red'}]}>Delete Note</Text>
                </Selection>
            </ScrollView>
        </View>
    )
}

