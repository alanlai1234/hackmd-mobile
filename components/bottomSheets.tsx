import { AnimatedBtn } from '@/components/animtedBtn';
import { useAuth } from '@/components/authProvider';
import Octicons from '@expo/vector-icons/Octicons';
import { type GetUserNotes } from '@hackmd/api';
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { Ref, RefObject, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useApp } from '@/components/viewProvider';

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

export const TagSheet = ({ref, notes}: TagSheetProp) => {
	const { Color, bottomSheetsStyle: styles } = useApp();
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
