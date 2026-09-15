import { useAuth } from '@/components/authProvider';
import { useWeb } from '@/components/viewProvider';
import { Color } from '@/constants/Colors';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';
import { View, Button } from 'react-native';
import { callback } from 'react-native-nitro-modules';
import { SharedWebView } from 'react-native-shared-webview';

const text = `
\`\`\`
`;

export default function Note() {
	const { session, update, mdview } = useWeb();
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
		// update(mdview.render(text));
		// if (!client || !id) return;
		// if(id != "-1"){
		// 	load()
		// }
		// ref.current?.reattach();
	}, []))

	return(
		<View style={{flex: 1, backgroundColor: "white"}}>
			<SharedWebView hybridRef={callback((r:any) => ref.current=r)} session={session} style={{flex: 1}}/>
		</View>
	)
}
