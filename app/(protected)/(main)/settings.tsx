import { View, ScrollView, Text, Pressable, Appearance, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useRef } from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import { AnimatedBtn } from '@/components/animtedBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@/components/viewProvider';

export default function Settings(){
	const themeMenuRef = useRef<TrueSheet>(null);
	const { Color, settingsStyle: styles, setColorscheme, colorscheme } = useApp();

	return(
		<View style={{flex: 1, backgroundColor: Color.background}}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: Color.background},
                headerBackButtonDisplayMode: 'minimal',
                headerTintColor: Color.text,
				headerTitle: "Settings",
                headerShadowVisible: true,
            }}/>
			<ScrollView style={{flex: 1}} bounces={false} overScrollMode="never">
				<AnimatedBtn style={styles.item} onPress={() => themeMenuRef.current?.present()} backgroundColor={Color.background}>
					<Text style={styles.text}>Choose Color Scheme</Text>
					<View style={styles.item}>
						<Text style={[styles.text, {color: Color.text2}]}>{
							colorscheme == 0 ? "System" :
							colorscheme == 1 ? "Dark" : "Light"
						}</Text>
						<Octicons name="chevron-right" size={23} color={Color.text}/>
					</View>
				</AnimatedBtn>
			</ScrollView>

			{/* bottom sheets */}
			<TrueSheet ref={themeMenuRef} detents={['peek']}>
				<View style={styles.sheet}>
					<Pressable
						accessibilityRole="button"
						android_ripple={{color: Color.selected}}
						onPress={() => setColorscheme(0)}
						style={({pressed}) => [
							styles.option,
							pressed && styles.optionPressed,
						]}
					>
						<Text style={styles.text}>Use System Default</Text>
					</Pressable>
					<Pressable
						accessibilityRole="button"
						android_ripple={{color: Color.selected}}
						onPress={() => setColorscheme(1)}
						style={({pressed}) => [
							styles.option,
							pressed && styles.optionPressed,
						]}
					>
						<Text style={styles.text}>Dark</Text>
					</Pressable>
					<Pressable
						accessibilityRole="button"
						android_ripple={{color: Color.selected}}
						onPress={() => setColorscheme(2)}
						style={({pressed}) => [
							styles.option,
							pressed && styles.optionPressed,
						]}
					>
						<Text style={styles.text}>Light</Text>
					</Pressable>
				</View>
			</TrueSheet>
		</View>
	)
}
