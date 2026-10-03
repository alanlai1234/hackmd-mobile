import Octicons from '@expo/vector-icons/Octicons';
import { Stack, useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import { useApp } from '@/components/viewProvider';
import { useAuth } from '@/components/authProvider';
import { MenuView } from '@expo/ui/community/menu';
import useNote from '@/components/notePageState';
import { useShallow } from 'zustand/react/shallow'
import useTheme from '@/components/themeState';
import useData from '@/components/dataState';

export const unstable_settings = {
  initialRouteName: 'view',
};

const Tablist = ({select, setSelect, id}: {select: number, setSelect: any, id: string}) => {
    const router = useRouter();
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.notePageStyle, Color: state.Color})));

    return(
        <View style={styles.tablist}>
            <TouchableOpacity
                style={styles.tabtrigger}
                onPress={() => {
                    router.navigate({pathname: "/[id]/view", params:{id}});
                    setSelect(2);
                }}
            >
                <View style={{backgroundColor: (select === 2 ? Color.borderSelected : 'transparent'), padding: 6, borderRadius: 20}}>
                    <Octicons name="eye" size={20} color={select === 2 ? Color.text2 : Color.text}/>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity */}
            {/*     style={styles.tabtrigger} */}
            {/*     onPress={() => { */}
            {/*         router.navigate({pathname: "/[id]/easyEdit", params:{id}}); */}
            {/*         setSelect(1); */}
            {/*     }} */}
            {/* > */}
            {/*     <View style={{padding: 6, borderRadius: 20, backgroundColor: (select === 1 ? Color.borderSelected : 'transparent')}}> */}
            {/*         <Octicons name="pencil" size={20} color={select === 1 ? Color.text2 : Color.text}/> */}
            {/*     </View> */}
            {/* </TouchableOpacity> */}
            <TouchableOpacity 
                style={styles.tabtrigger}
                onPress={() => {
                    router.navigate({pathname: "/[id]/edit", params:{id}});
                    setSelect(0);
                }}
            >
                <View style={{backgroundColor: (select === 0 ? Color.borderSelected : 'transparent'), padding: 6, borderRadius: 20}}>
                    <Octicons name="code" size={20} color={select === 0 ? Color.text2 : Color.text}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Menu = ({id}: {id: string}) => {
	const setRefresh = useData((state) => state.setRefresh);
    const { client } = useAuth();
	const router = useRouter();
	const actionfunc = {
		del: () => {
			if (id == '') Alert.alert("No id chosen");
			Alert.alert("Proceed Delete?",
				"",
				[
					{ text: "Cancel", style: "cancel" },
					{ text: "Delete", style: "destructive", onPress: () => {
						router.back();
						client?.deleteNote(id);
						setRefresh(true);
					}},
				],
			)
		},
		rename: () => {
			if (id == '') Alert.alert("No id chosen");
			Alert.prompt("Enter New Name",
				"",
				[
					{ text: "Cancel", style: "cancel" },
					{ text: "Confirm", style: "default", onPress: (value: any) => {
						client?.updateNote(id, {title: value})
						setRefresh(true);
					}},
				],
			)
		}
	}

	return(
		<MenuView
			actions={[
				{ id: 'rename', title: 'Rename'},
				{ id: "del", title: 'Delete', attributes: { destructive: true }},
			]}
			onPressAction={e => actionfunc[e.nativeEvent.event as keyof typeof actionfunc]()}
		>
			<Octicons name="three-bars" size={24} />
		</MenuView>
	)
}

const updateFreq = 2000;

export default function Layout() {
    const [select, setSelect] = useState(2);
    const { id, title } = useLocalSearchParams<{id: string, title: string}>();
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.notePageStyle, Color: state.Color})));
	const { client } = useAuth();
	const { etag, setEtag, setRaw } = useNote(useShallow((state:any) => ({etag: state.etag, setEtag: state.setEtag, raw: state.raw, setRaw: state.setRaw})));
	async function initload(){
		const ret = await client?.getNote(id, {unwrapData: false});
		setEtag(ret?.headers.etag);
		setRaw(ret?.data.content);
	}

	useFocusEffect(useCallback(() => {
		if (!client || !id) return;
		if(id == "-1") return;
		setRaw("");
		initload();
		const stream = setInterval(() => {
			client?.getNote(id, {unwrapData: false, etag:etag})
			.then((val) => {
				if(val.status == 200){
					setEtag(val.headers.etag);
					setRaw(val.data.content);
				}
			})
			.catch((err) => console.log(err))
		}, updateFreq)
		return () => {
			clearInterval(stream);
		}
	}, []))

    return (
    <>
        <Tabs>
            <TabSlot/>
            <TabList>
                <TabTrigger name="view" href={{pathname:'/[id]/view', params:{id}}} style={styles.tabtrigger}/>
                <TabTrigger name="edit" href={{pathname:'/[id]/edit', params:{id}}} style={styles.tabtrigger}/>
                <TabTrigger name="easy edit" href={{pathname:'/[id]/easyEdit', params:{id}}} style={styles.tabtrigger}/>
            </TabList>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: Color.background},
                headerBackButtonDisplayMode: 'minimal',
                headerTintColor: Color.text,
                headerTitle: title,
				headerRight: () => <Menu id={id}/>
            }}/>
			<Tablist select={select} setSelect={setSelect} id={id}/>
        </Tabs>
    </>
    );
}
