import { Alert, TouchableOpacity, TextInput, View, ScrollView, Text} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import { AnimatedBtn } from '@/components/animtedBtn';
import { useAuth } from '@/components/authProvider';
import { useState } from 'react';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import useData from '@/components/dataState';

export default function Settings(){
	const router = useRouter();
	const colorscheme = useData((state) => state.colorscheme);
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.settingsStyle, Color: state.Color})));
	const { login } = useAuth();
	const [key, setKey] = useState("");
	const onChangeKey = async () => {
		const ret = await login(key);
		if(ret == false) Alert.alert("Invalid API key");
		else Alert.alert("API key changed")
	}

	return(
		<View style={{flex: 1, backgroundColor: Color.background}}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: Color.background},
                headerBackButtonDisplayMode: 'minimal',
                headerTintColor: Color.text,
				headerTitle: "Settings",
                headerShadowVisible: true,
            }}/>
			<ScrollView style={{flex: 1, gap: 5}} bounces={false} overScrollMode="never">
				<AnimatedBtn style={styles.item} onPress={() => router.push("/colorschemeSheet")} backgroundColor={Color.background}>
					<Text style={styles.text}>Select Colorscheme</Text>
					<View style={styles.item}>
						<Text style={[styles.text, {color: Color.text2}]}>{
							colorscheme == 0 ? "System" :
							colorscheme == 1 ? "Dark" : "Light"
						}</Text>
						<Octicons name="chevron-right" size={23} color={Color.text}/>
					</View>
				</AnimatedBtn>
				<View style={[styles.item, {flexDirection: 'column'}]}>
					<View style={{width: "100%"}}>
						<Text style={[styles.text, {alignSelf: "flex-start"}]}>Set New API Key</Text>
					</View>
					<TextInput
					  placeholder="API key"
					  value={key}
					  secureTextEntry
					  onChangeText={setKey}
					  autoCapitalize="none"
					  autoCorrect={false}
					  style={styles.input}
					/>
					<TouchableOpacity style={styles.button} onPress={onChangeKey}>
						<Text style={styles.text}>Comfirm Change</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}
