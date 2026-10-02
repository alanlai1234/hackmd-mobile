import { View, Text, Pressable } from 'react-native';
import { useApp } from '@/components/viewProvider';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import useData from '@/components/dataState';

export default function Settings(){
	const setColorscheme = useData((state)=>state.setColorscheme);
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.settingsStyle, Color: state.Color})));

	return(
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
	)
}
