import { DocumentIcon } from '@/assets/icons';
import { AddBtn, AnimatedBtn } from '@/components/animtedBtn';
import { DrawerContent } from '@/components/drawer';
import Octicons from '@expo/vector-icons/Octicons';
import { GetUserNotes, Note } from '@hackmd/api';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { TextInput, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/components/viewProvider';
import { LegendList } from "@legendapp/list/react-native"
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import Animated, { useSharedValue, withSpring, cancelAnimation } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import useData from '@/components/dataState';

interface noteItem {
    id: string;
    title: string;
    time: string;
};

const ListItem = ({id, title, time}: noteItem) => {
    const router = useRouter();
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.indexStyle, Color: state.Color})));

    return (
        <AnimatedBtn
            onPress={() => {
                router.push({pathname: "/[id]/view", params:{id: id, title: title}});
            }}
            onLongPress={() => {
				router.push({pathname: "/itemSheet", params:{addID: id}});
            }}
            style={styles.note}
        >
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', padding: 8}}>
                    <View style={{width: 20, marginRight: 10}}>
                        <DocumentIcon/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <Text style={{color: Color.text, fontSize: 17}}>{title}</Text>
                        <Text style={{color: "grey"}}>{time}</Text>
                    </View>
                </View>
                {/*<AnimatedBtn style={styles.itemMenu} onPress={() => menuRef.current?.present()}>
                    <Octicons name="kebab-horizontal" size={20} color={Color.text} />
                </AnimatedBtn>*/}
            </View>
        </AnimatedBtn>
    );
}

const List = memo(({selectedNotes}:{selectedNotes: GetUserNotes}) => {
	const { fetchList } = useApp();
	const { refresh, setRefresh } = useData(useShallow((s)=>({refresh:s.refresh, setRefresh:s.setRefresh})));
	const onRefresh = useCallback(() => {
		setRefresh(true);
		fetchList();
	}, []);

	return <LegendList
		data={selectedNotes}
		renderItem={({item}) => {
			return (<ListItem
				id={item.id} title={item.title}
				time={new Date(item.lastChangedAt).toLocaleDateString()} />)
		}}
		refreshControl={
			<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
		}
		recycleItems
	/>
})

export default function Home(){
    // tmp
    // let notes: GetUserNotes[] = [];
    // for(let i=0; i<20; i++){
    //     notes.push({
    //         id: i.toString(),
    //         title: `note ${i}`,
    //         time: "2024-06-01",
    //         tags: [""]
    //     });
    // }
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.indexStyle, Color: state.Color})));
	const { fetchList } = useApp();
	const { notes, title, refresh, selectedTags} = useData(useShallow((s)=>({notes:s.notes, title:s.title, refresh:s.refresh, setRefresh:s.setRefresh, selectedTags:s.selectedTags})));
	const [selectedNotes, setSelectedNotes] = useState<GetUserNotes>([]);
	const taggedNotes = useRef<GetUserNotes>([]);
	const updateSelectedNotes = () => {
		if(query == "") setSelectedNotes(taggedNotes.current);
		else setSelectedNotes(taggedNotes.current.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())))
	}

	useEffect(() => {
		if(refresh){
			fetchList();
		}
	}, [refresh])
	useEffect(() => {
		taggedNotes.current = notes
		updateSelectedNotes();
	}, [notes])
	useEffect(() => {
		if(selectedTags.size == 0){
			taggedNotes.current = notes
			updateSelectedNotes();
			return;
		}
		taggedNotes.current = notes.filter((item: Note) => {
			if(item.tags == undefined) return false;
			let found = false;
			item.tags.every((tag: string) => {
				if(selectedTags.has(tag)){
					found = true;
					return false;
				}
				return true
			})
			return found;
		}) 
		updateSelectedNotes();
	}, [selectedTags])
    const [drawerOpen, setDrawerOpen] = useState(false);
	const router = useRouter();
    const [query, setQuery] = useState('');
	const top = useSharedValue(-55);
	const searchOpen = () => {
		cancelAnimation(top);
		top.value = withSpring(0, {velocity: 1500});
	}
	const close = () => setQuery("");
	const searchClose = () => {
		top.value = withSpring(-55, {velocity: 1500}, () => {scheduleOnRN(close)});
	}
	useEffect(() => {
		updateSelectedNotes();
	}, [query])

    return (
		<SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
			<Stack.Screen options={{headerShown: false}}/>
            <Drawer
                open={drawerOpen}
                onOpen={() => setDrawerOpen(true)}
                onClose={() => setDrawerOpen(false)}
                renderDrawerContent={DrawerContent}
                drawerStyle={styles.drawer}
            >
                <View style={styles.topbar}>
                    <View style={{width: 90, alignItems: 'flex-start'}}>
                        <AnimatedBtn onPress={() => setDrawerOpen(true)} style={styles.drawerBtn}>
                            <Octicons name="three-bars" size={24} color={Color.titleText} />
                        </AnimatedBtn>
                    </View>
                    <TouchableOpacity
						style={styles.title}
						onPress={() => router.push("/teamsSheet")}
					>
                        <Text style={{color: Color.titleText, fontSize: 22, fontWeight: "bold"}}>
							{title}
						</Text>
                        <Octicons name="chevron-down" size={23} color={Color.titleText} />
                    </TouchableOpacity>
                    <View style={{width: 90,flexDirection: 'row', gap: 8, alignItems: 'flex-end'}}>
                        <AnimatedBtn onPress={() => router.push("/tagSheet")} style={styles.tagBtn}>
                            <Octicons name="tag" size={24} color={Color.titleText} />
                        </AnimatedBtn>
                        <AnimatedBtn onPress={searchOpen} style={styles.tagBtn}>
                            <Octicons name="search" size={24} color={Color.titleText} />
                        </AnimatedBtn>
                    </View>
                </View>
				<Animated.View style={[styles.searchBarContainer, {top}]}>
					<View style={styles.searchBarContainer2}>
						<TextInput
							value={query}
							onChangeText={setQuery}
							placeholder="Search Title"
							placeholderTextColor={Color.text2}
							style={styles.searchBar}
						/>
						<TouchableOpacity style={{padding: 10}} onPress={searchClose}>
							<Octicons name="x" size={24} color={Color.text2} />
						</TouchableOpacity>
					</View>
				</Animated.View>
                <View style={{flex: 1}}>
					<List selectedNotes={selectedNotes}/>
                </View>
                <AddBtn
                    style={styles.addBtn}
                    onPress={() => router.push("/addSheet")}
                >
                    <Octicons name="plus" size={28} color={Color.text2}/>
                </AddBtn>
            </Drawer>
		</SafeAreaView>
    );
}
