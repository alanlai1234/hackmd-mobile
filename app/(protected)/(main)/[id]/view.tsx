import { useApp } from '@/components/viewProvider';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { callback } from 'react-native-nitro-modules';
import { SharedWebView } from 'react-native-shared-webview';
import useNote from '@/components/notePageState';
import useTheme from '@/components/themeState';

const text = `
oijweoifw
`;

export default function Note() {
	const { session, update, mdview } = useApp();
	const Color = useTheme((state) => state.Color);
	const raw = useNote((state) => state.raw);
	const ref = useRef<any>(null);
	useEffect(() => {
		update(mdview.render(raw));
	}, [raw])
	useFocusEffect(useCallback(() => {
		// update(mdview.render(text));
		update(mdview.render(raw));
		ref.current?.reattach();
	}, []))

	return(
		<View style={{flex: 1, backgroundColor: Color.background}}>
			<SharedWebView hybridRef={callback((r:any) => ref.current=r)} session={session} style={{flex: 1}}/>
		</View>
	)
}
