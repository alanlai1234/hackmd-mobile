import { AnimatedBtn } from '@/components/animtedBtn';
import { useAuth } from '@/components/authProvider';
import { Color } from '@/constants/Colors';
import Octicons from '@expo/vector-icons/Octicons';
import { type GetUserNotes } from '@hackmd/api';
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { Ref, RefObject, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
    option: {
        minHeight: 52,
        alignItems: 'center',
        padding: 18,
        flexDirection: 'row',
        gap: 8,
    },
    optionPressed: {
        backgroundColor: Color.selected,
    },
    optionText: {
        color: Color.text,
        fontSize: 18,
        fontWeight: '600',
    },
    empty: {
        padding: 20,
        color: Color.borderSelected,
        textAlign: 'center',
    },
    tagSheet: {
        paddingHorizontal: 16,
        paddingTop: 15,
        gap: 10
    },
    tagSearchContainer: {
        height: 52,
        paddingHorizontal: 16,
        backgroundColor: Color.background,
        borderRadius: 10,
        color: Color.text,
        borderWidth: 1,
        borderColor: Color.border
    },
    tagControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 16,
    },
    tagControl: {
        height: 40,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        borderWidth: 2,
        borderRadius: 7,
    },
    tagText: {
        color: Color.text,
        fontSize: 16,
    },
    matchControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    matchControlLeft: {
        height: 40,
        paddingHorizontal: 14,
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        borderColor: Color.border,
        borderRightWidth: 0,
    },
    matchControlRight: {
        height: 40,
        paddingHorizontal: 14,
        borderWidth: 2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        borderColor: Color.border,
        borderLeftWidth: 0,
    },
    radioSelected: {
        backgroundColor: Color.link,
    },
    tagRow: {
        flex: 1,
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 8,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    tagSelected: {
        backgroundColor: 'rgb(65, 63, 130)'
    },
    tagName: {
        flex: 1,
        color: Color.text,
        fontSize: 16,
    },
    tagCount: {
        color: Color.borderSelected,
        fontSize: 16,
    },
});

type Workspace = {
    name: string;
    id: string;
    logo: string;
};

type WorkspaceSheetProp = {
    ref: Ref<TrueSheet>;
    select: number;
    setSelect: any;
}

type TagSheetProp = {
    ref: Ref<TrueSheet>;
    notes: GetUserNotes;
};

type TagOption = {
    name: string;
    count: number;
};

export const WorkspaceSheet = ({ref, select, setSelect}: WorkspaceSheetProp) => {
    const { aboutMe } = useAuth();
    const [ list, setList ] = useState<Workspace[]>();
    useEffect(() => {
        setList([{name: "My Workspace", id: "", logo: aboutMe?.photo??""}, ...aboutMe?.teams.map(({name, id, logo}) => ({name, id, logo}))??[]]);
    }, []);
    return (
        <TrueSheet
            ref={ref}
            detents={['auto', 0.6]}
            style={{ paddingTop: 15 }}
        >
                <FlatList
                    data={list}
                    keyExtractor={(team) => team.id}
                    renderItem={({item, index}) => (
                        <Pressable
                            accessibilityRole="button"
                            android_ripple={{color: Color.selected}}
                            onPress={() => setSelect(index)}
                            style={({pressed}) => [
                                styles.option,
                                pressed && styles.optionPressed,
                            ]}
                        >
                            <View style={{width:24, height:24}}>
                                {index==select && <Octicons name="check" size={24} color={Color.text}/>}
                            </View>
                            <View style={{borderRadius: 20, overflow: 'hidden'}}>
                                {item.logo.startsWith("data:image/svg")?
                                    <SvgXml xml={atob(item.logo.split(',')[1])} width={24} height={24}/>
                                    : <Image src={item.logo} width={24} height={24}/>
                                }

                            </View>
                            <Text style={styles.optionText}>{item.name}</Text>
                        </Pressable>
                    )}
                />
        </TrueSheet>
    )
}

export const TagSheet = ({ref, notes}: TagSheetProp) => {
    const [query, setQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    const [matchMode, setMatchMode] = useState<'and' | 'or'>('or');

    const tags = useMemo<TagOption[]>(() => {
        const counts = new Map<string, number>();
        let untagged = 0;

        notes.forEach((note) => {
            if (note.tags.length === 0) {
                untagged += 1;
            }
            note.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
        });
        return [
            {name: 'Untagged', count: untagged},
            ...Array.from(counts, ([name, count]) => ({name, count})).sort((a, b) => a.name.localeCompare(b.name)),
        ];
    }, [notes]);

    const visibleTags = tags.filter((tag) => tag.name.toLowerCase().includes(query.trim().toLowerCase()));
    const toggleTag = (tag: string) => {
        setSelectedTags((current) => {
            const next = new Set(current);
            next.has(tag) ? next.delete(tag) : next.add(tag);
            return next;
        });
    };

    return (
        <TrueSheet
            ref={ref}
            detents={[0.4, 0.7]}
            style={styles.tagSheet}
        >
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search tag"
                placeholderTextColor={Color.borderSelected}
                style={styles.tagSearchContainer}
            />
            <View style={styles.tagControls}>
                <AnimatedBtn style={styles.tagControl} onPress={() => setSelectedTags(new Set(tags.map((tag) => tag.name)))}>
                    <Octicons name="check" size={18} color={Color.text}/>
                    <Text style={styles.tagText}>Select all</Text>
                </AnimatedBtn>
                <AnimatedBtn style={styles.tagControl} onPress={() => setSelectedTags(new Set())}>
                    <Octicons name="x" size={20} color={Color.text}/>
                    <Text style={styles.tagText}>Clear</Text>
                </AnimatedBtn>
                <View style={styles.matchControl}>
                    <TouchableOpacity
                        style={[styles.matchControlLeft, matchMode === 'and' && styles.radioSelected]}
                        onPress={() => setMatchMode('and')}
                    >
                        <Text style={styles.tagText}>AND</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.matchControlRight, matchMode === 'or' && styles.radioSelected]}
                        onPress={() => setMatchMode('or')}
                    >
                        <Text style={styles.tagText}>OR</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={visibleTags}
                numColumns={2}
                keyExtractor={(tag) => tag.name}
                renderItem={({item: tag}) => {
                    const selected = selectedTags.has(tag.name);
                    return (
                        <TouchableOpacity style={[styles.tagRow, selected&&styles.tagSelected]} onPress={() => toggleTag(tag.name)}>
                            <Text numberOfLines={1} style={styles.tagName}>{tag.name}</Text>
                            <Text style={styles.tagCount}>{tag.count}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </TrueSheet>
    );
};

const Selection = ({ onPress, children }: {onPress?: () => void, children: React.ReactNode}) => {
    return (
        <Pressable
            accessibilityRole="button"
            android_ripple={{color: Color.selected}}
            onPress={onPress}
            style={({pressed}) => [
                styles.option,
                pressed && styles.optionPressed,
            ]}
        >
            {children}
        </Pressable>
    );
}

export const AddSheet = ({ ref }: {ref: RefObject<TrueSheet|null>}) => {
    const router = useRouter();
    const { client } = useAuth();
    const addEmpty = async () => {
        ref.current?.dismiss();
        const ret = await client?.createNote({title: "untitled"})
        if (ret == undefined) return;
        router.push({pathname: "/[id]/view", params:{id: ret.id, title: ret.title}});
    }
    const addFile = async () => {
        ref.current?.dismiss();
    }

    return (
        <TrueSheet
            ref={ref}
            detents={['auto']}
            style={{ paddingTop: 15}}
        >
            <Selection onPress={addEmpty}>
                <Text style={styles.optionText}>Add Empty Note</Text>
            </Selection>
            <Selection onPress={addFile}>
                <Text style={styles.optionText}>Add From Markdown File</Text>
            </Selection>
        </TrueSheet>
    )
}

type menuProp = {
    ref: RefObject<TrueSheet|null>;
    id: RefObject<string>;
    refresh: () => void;
}

export const ItemMenu = ({ ref, id, refresh }: menuProp) => {
    const { client } = useAuth();
    const delNote = () => {
        if (id.current == '') Alert.alert("No id chosen");
        Alert.alert("Proceed Delete?",
            "",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => {
                    ref.current?.dismiss();
                    client?.deleteNote(id.current);
                    refresh();
                }},
            ],
        )
    }
    const rename = () => {
        if (id.current == '') Alert.alert("No id chosen");
        Alert.prompt("Enter New Name",
            "",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", style: "default", onPress: (value: any) => {
                    ref.current?.dismiss();
                    client?.updateNote(id.current, {title: value})
                    refresh();
                }},
            ],
        )
    }

    return (
        <TrueSheet
            ref={ref}
            detents={['auto', 0.7]}
            style={{ paddingTop: 15}}
        >
            <ScrollView>
                <Selection onPress={rename}>
                    <Text style={styles.optionText}>Rename</Text>
                </Selection>
                <Selection onPress={delNote}>
                    <Text style={[styles.optionText, {color: 'red'}]}>Delete Note</Text>
                </Selection>
            </ScrollView>
        </TrueSheet>
    )
}
