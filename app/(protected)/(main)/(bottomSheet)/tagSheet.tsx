import { AnimatedBtn } from '@/components/animtedBtn';
import Octicons from '@expo/vector-icons/Octicons';
import { type Note } from '@hackmd/api';
import { useMemo, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useApp } from '@/components/viewProvider';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import useData from '@/components/dataState';

type TagOption = {
    name: string;
    count: number;
};

export default function TagSheet(){
	const { notes, selectedTags, setSelectedTags} = useData(useShallow((s)=>({notes:s.notes, selectedTags:s.selectedTags, setSelectedTags:s.setSelectedTags})));
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.bottomSheetsStyle, Color: state.Color})));
    const [query, setQuery] = useState('');
    // const [matchMode, setMatchMode] = useState<'and' | 'or'>('or');

    const tags = useMemo<TagOption[]>(() => {
        const counts = new Map<string, number>();

        notes.forEach((note: Note) => {
            note.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
        });
        return Array.from(counts, ([name, count]) => ({name, count})).sort((a, b) => a.name.localeCompare(b.name));
        
    }, [notes]);

    const visibleTags = useMemo(() => {
		return tags.filter((tag) => tag.name.toLowerCase().includes(query.trim().toLowerCase()));
	}, [tags, query]) 
    const toggleTag = (tag: string) => {
		const next = new Set(selectedTags);
		next.has(tag) ? next.delete(tag) : next.add(tag);
		setSelectedTags(next);
    };

    return (
        <View style={styles.tagSheet}>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search tag"
                placeholderTextColor={Color.borderSelected}
                style={styles.tagSearchContainer}
            />
            {/* <View style={styles.tagControls}> */}
            {/*     <AnimatedBtn style={styles.tagControl} onPress={() => setSelectedTags(new Set(tags.map((tag) => tag.name)))}> */}
            {/*         <Octicons name="check" size={18} color={Color.text}/> */}
            {/*         <Text style={styles.tagText}>Select all</Text> */}
            {/*     </AnimatedBtn> */}
            {/*     <AnimatedBtn style={styles.tagControl} onPress={() => setSelectedTags(new Set())}> */}
            {/*         <Octicons name="x" size={20} color={Color.text}/> */}
            {/*         <Text style={styles.tagText}>Clear</Text> */}
            {/*     </AnimatedBtn> */}
            {/*     <View style={styles.matchControl}> */}
            {/*         <TouchableOpacity */}
            {/*             style={[styles.matchControlLeft, matchMode === 'and' && styles.radioSelected]} */}
            {/*             onPress={() => setMatchMode('and')} */}
            {/*         > */}
            {/*             <Text style={styles.tagText}>AND</Text> */}
            {/*         </TouchableOpacity> */}
            {/*         <TouchableOpacity */}
            {/*             style={[styles.matchControlRight, matchMode === 'or' && styles.radioSelected]} */}
            {/*             onPress={() => setMatchMode('or')} */}
            {/*         > */}
            {/*             <Text style={styles.tagText}>OR</Text> */}
            {/*         </TouchableOpacity> */}
            {/*     </View> */}
            {/* </View> */}
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
        </View>
    );
};
