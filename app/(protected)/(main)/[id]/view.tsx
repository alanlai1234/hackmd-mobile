import { useAuth } from '@/components/authProvider';
import { useApp } from '@/components/viewProvider';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { callback } from 'react-native-nitro-modules';
import { SharedWebView } from 'react-native-shared-webview';

const text = `
oijweoifw
`;

export default function Note() {
	const { session, update, mdview, Color } = useApp();
	const { client } = useAuth();
	const { id } = useLocalSearchParams<{id: string}>();
	const ref = useRef<any>(null);
	async function load(){
		update("");
		try{
			update(mdview.render((await client?.getNote(id))?.content));
		} catch(error){
			console.error(error);
		}
	}
	useFocusEffect(useCallback(() => {
		update(mdview.render(text));
		// if (!client || !id) return;
		// if(id != "-1"){
		// 	load()
		// }
		// ref.current?.reattach();
	}, []))

	return(
		<View style={{flex: 1, backgroundColor: Color.background}}>
			<SharedWebView hybridRef={callback((r:any) => ref.current=r)} session={session} style={{flex: 1}}/>
		</View>
	)
}
