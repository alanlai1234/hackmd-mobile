import { useAuth } from '@/components/authProvider';
import Octicons from '@expo/vector-icons/Octicons';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useApp } from '@/components/viewProvider';
import { useRouter } from 'expo-router';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import useData from '@/components/dataState';

type Workspace = {
    name: string;
    id: string;
    logo: string;
};

export default function WorkspaceSheet (){
	const { curTeam } = useApp();
	const setRefresh = useData((s)=>s.setRefresh);
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.bottomSheetsStyle, Color: state.Color})));
    const { aboutMe } = useAuth();
    const [ list, setList ] = useState<Workspace[]>();
	const router = useRouter();
    useEffect(() => {
        setList([{name: "My Workspace", id: "", logo: aboutMe?.photo??""}, ...aboutMe?.teams.map(({name, id, logo}) => ({name, id, logo}))??[]]);
    }, []);
	const onpress = (index: number) => {
		if(curTeam.current != index-1){
			curTeam.current = index-1;
			router.back();
			setRefresh(true);
		}
	}

    return (
        <View style={{ paddingVertical: 15 }}>
			<FlatList
				data={list}
				keyExtractor={(team) => team.id}
				renderItem={({item, index}) => (
					<Pressable
						accessibilityRole="button"
						android_ripple={{color: Color.selected}}
						onPress={() => onpress(index)}
						style={({pressed}) => [
							styles.option,
							pressed && styles.optionPressed,
						]}
					>
						<View style={{width:24, height:24}}>
							{index==curTeam.current+1 && <Octicons name="check" size={24} color={Color.text}/>}
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
        </View>
    )
}
