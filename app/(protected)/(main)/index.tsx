import { DocumentIcon } from '@/assets/icons';
import { AddBtn, AnimatedBtn } from '@/components/animtedBtn';
import { useAuth } from '@/components/authProvider';
import { AddSheet, TagSheet, WorkspaceSheet, ItemMenu } from '@/components/bottomSheets';
import { DrawerContent } from '@/components/drawer';
import { Color } from '@/constants/Colors';
import Octicons from '@expo/vector-icons/Octicons';
import { type GetUserNotes } from '@hackmd/api';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Stack, useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router/build/react-navigation';
import { useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWeb } from '@/components/viewProvider';

const styles = StyleSheet.create({
    topbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 7,
        // elevation: 8,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    note: {
        height: 85,
		margin: 12,
		marginBottom: 6,
		// padding: 9,
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Color.border,
    },
    drawerBtn: {
        backgroundColor: Color.secondary,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1
    },
    tagBtn: {
        backgroundColor: Color.secondary,
        flexDirection: 'row',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1
    },
    addBtn: {
        position: 'absolute',
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    dialogBackdrop: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    dialog: {
        gap: 16,
        padding: 20,
        backgroundColor: Color.secondary,
        borderWidth: 1,
        borderColor: Color.border,
        borderRadius: 14,
    },
    dialogTitle: {
        color: Color.text,
        fontSize: 20,
        fontWeight: '700',
    },
    dialogInput: {
        height: 48,
        paddingHorizontal: 12,
        color: Color.text,
        backgroundColor: Color.background,
        borderWidth: 1,
        borderColor: Color.borderSelected,
        borderRadius: 8,
        fontSize: 16,
    },
    dialogError: {
        color: '#fca5a5',
        fontSize: 14,
    },
    dialogActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    dialogButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    dialogButtonPrimary: {
        backgroundColor: Color.link,
    },
    dialogButtonText: {
        color: Color.text,
        fontSize: 16,
        fontWeight: '600',
    },
    itemMenu: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    }
});

interface noteItem {
    id: string;
    title: string;
    time: string;
    ref: React.RefObject<TrueSheet|null>;
    setMenuId: React.RefObject<string>;
};

const ListItem = ({id, title, time, ref, setMenuId}: noteItem) => {
    const router = useRouter();

    return (
        <AnimatedBtn
            onPress={() => {
                router.push({pathname: "/[id]/view", params:{id: id, title: title}});
            }}
            onLongPress={() => {
                setMenuId.current = id;
                ref.current?.present();
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

export default function Home(){
    // tmp
    let notes: GetUserNotes[] = [];
    for(let i=0; i<20; i++){
        notes.push({
            id: i.toString(),
            title: `note ${i}`,
            time: "2024-06-01",
            tags: [""]
        });
    }
    const { client } = useAuth();
    const [ select, setSelect ] = useState(0);
    const { session } = useWeb();
    // const [notes, setNotes] = useState<GetUserNotes>([]);
    async function fetchList(){
        // const list = await client?.getNoteList();
        // if(list){
        //     setNotes(list);
        // }
    }
    useFocusEffect(useCallback(() => {
        // fetchList();
    }, []))
    const [drawerOpen, setDrawerOpen] = useState(false);
    const workspaceRef = useRef<TrueSheet>(null);
    const tagRef = useRef<TrueSheet>(null);
    const addRef = useRef<TrueSheet>(null);
    const menuRef = useRef<TrueSheet>(null);
    const menuId = useRef("");

    return (
		<SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
			<Stack.Screen options={{headerShown: false}}/>
            <Drawer
                open={drawerOpen}
                onOpen={() => setDrawerOpen(true)}
                onClose={() => setDrawerOpen(false)}
                renderDrawerContent={DrawerContent}
                drawerStyle={{backgroundColor: Color.background, width: "65%"}}
            >
                <View style={styles.topbar}>
                    <View style={{width: 90, alignItems: 'flex-start'}}>
                        <AnimatedBtn onPress={() => setDrawerOpen(true)} style={styles.drawerBtn}>
                            <Octicons name="three-bars" size={24} color="rgb(161,161,169)" />
                        </AnimatedBtn>
                    </View>
                    <TouchableOpacity style={styles.title} onPress={() => workspaceRef.current?.present()}>
                        <Text style={{color: "rgb(161,161,169)", fontSize: 22, fontWeight: "bold"}}>My Workspace </Text>
                        <Octicons name="chevron-down" size={23} color="rgb(161,161,169)" />
                    </TouchableOpacity>
                    <View style={{width: 90, alignItems: 'flex-end'}}>
                        <AnimatedBtn onPress={() => tagRef.current?.present()} style={styles.tagBtn}>
                            <Octicons name="tag" size={24} color="rgb(161,161,169)" />
                            <Text style={{color: "rgb(161,161,169)", fontWeight: 'bold', fontSize: 15}}> Tags</Text>
                        </AnimatedBtn>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={notes}
                        renderItem={({item}) => (
                            <ListItem ref={menuRef} setMenuId={menuId}
                                id={item.id} title={item.title}
                                time={new Date(item.lastChangedAt).toLocaleDateString()} />
                        )}
                    />
                </View>
                <AddBtn
                    style={styles.addBtn}
                    onPress={() => addRef.current?.present()}
                >
                    <Octicons name="plus" size={28} color={Color.text}/>
                </AddBtn>
     			<Button title="press" onPress={() => session.loadhtml("heyhey")}/>
            </Drawer>
            <WorkspaceSheet ref={workspaceRef} select={select} setSelect={setSelect}/>
            <TagSheet ref={tagRef} notes={notes}/>
            <AddSheet ref={addRef}/>
            <ItemMenu ref={menuRef} id={menuId} refresh={fetchList} />
		</SafeAreaView>
    );
}
