import { Color } from '@/constants/Colors';
import Octicons from '@expo/vector-icons/Octicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'view',
};

const styles = StyleSheet.create({
    tablist: {
        flexDirection: 'row',
        width: 110,
    },
    tabtrigger: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const Tablist = ({select, setSelect, id}: {select: number, setSelect: Dispatch<SetStateAction<number>>, id: string}) => {
    const router = useRouter();

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
            <TouchableOpacity
                style={styles.tabtrigger}
                onPress={() => {
                    router.navigate({pathname: "/[id]/easyEdit", params:{id}});
                    setSelect(1);
                }}
            >
                <View style={{padding: 6, borderRadius: 20, backgroundColor: (select === 1 ? Color.borderSelected : 'transparent')}}>
                    <Octicons name="pencil" size={20} color={select === 1 ? Color.text2 : Color.text}/>
                </View>
            </TouchableOpacity>
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

export default function Layout() {
    // const router = useRouter();
    const [select, setSelect] = useState(2);
    // const onPressed = () => {
    //     router.back();
    // }

    // const Button = () => {
    //     return(
    //         <Pressable onPress={onPressed}>
    //             <Octicons name="chevron-left" size={28} color={Color.text}/>
    //         </Pressable>
    //     )
    // }
    const { id, title } = useLocalSearchParams<{id: string, title: string}>();

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
                headerShadowVisible: true,
                headerRight: () => <Tablist select={select} setSelect={setSelect} id={id}/>,
            }}/>
        </Tabs>
    </>
    );
}
