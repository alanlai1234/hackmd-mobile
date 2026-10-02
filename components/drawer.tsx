import Octicons from '@expo/vector-icons/Octicons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/components/authProvider';
import { useRouter } from 'expo-router'
import { useApp } from '@/components/viewProvider';
import { useEffect, useState } from 'react';
import { ApiFolder } from '@hackmd/api';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';

type folder = {
	info: ApiFolder;
	child: folder[];
}

const FolderItem = ({item} : {item: folder}) => {
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.drawerStyle, Color: state.Color})));
	const { setNotes } = useApp();
	const { client } = useAuth();

	const onpress = () => {
		// setNotes(await client?.getNote)
	}

	return(
		<TouchableOpacity style={[styles.treeRow, {marginLeft: 28}]} onPress={onpress}>
			{item.child.length>0 && <Octicons name="chevron-down" size={16} color={Color.accent}/>}
			<Octicons name="file-directory-open-fill" size={18} color={Color.text2}/>
			<Text style={styles.drawerText}>{item.info.name}</Text>
		</TouchableOpacity>
	)
}

export const DrawerContent = () => {
	const { aboutMe, client } = useAuth();
	const router = useRouter();
	const { styles, Color } = useTheme(useShallow((state)=>({styles: state.drawerStyle, Color: state.Color})));
	const [folders, setFolders] = useState<folder[]>([]);

	async function getfolders(){
		let map = new Map<string, ApiFolder[]>();
		let root: ApiFolder[] = [];
		let list = await client?.getFolderList();
		if(!list) return;
		list.forEach((item) => {
			map.set(item.id, []);
			if(item.parentFolderId == null) root.push(item);
		});
		list.forEach((item) => {
			if(item.parentFolderId) map.get(item.parentFolderId)!.push(item)
		});
		function build(id: string) : folder[]{
			return map.get(id)!.map((item: ApiFolder) : folder => {
				return {info: item, child: build(item.id)};
			})
		}
		root.forEach((item) => {
			setFolders(cur => [...cur, {info:item, child: build(item.id)}])
		})
	}
	useEffect(() => {
		getfolders()
	}, [])

    return (
        <View style={styles.drawerContent}>
			<View>
				<TouchableOpacity style={[styles.treeRow, {backgroundColor: Color.selected}]}>
					{folders.length>0 && <Octicons name="chevron-down" size={16} color={Color.accent}/>}
					<Octicons name="file-directory-open-fill" size={18} color={Color.text2}/>
					<Text style={styles.drawerText}>My Notes</Text>
				</TouchableOpacity>
				{folders.map((item, index) => <FolderItem key={index} item={item}/>)}
			</View>
                {/*<TouchableOpacity style={[styles.treeRow, styles.treeIndentOne]}>
                    <Octicons name="chevron-down" size={16} color={Color.text2} style={{opacity: 0}}/>
                    <Octicons name="file" size={17} color={Color.text2}/>
                    <Text style={styles.drawerText}>test</Text>
                </TouchableOpacity>*/}

            <View style={styles.drawerFooter}>
                {/* <TouchableOpacity style={styles.drawerAction}> */}
                {/*     <Octicons name="trash" size={18} color={Color.text}/> */}
                {/*     <Text style={styles.drawerText}>Trash</Text> */}
                {/* </TouchableOpacity> */}

                <View style={styles.drawerFooterRow}>
                    <TouchableOpacity style={[styles.drawerAction, styles.drawerHalfAction]}>
                        <Octicons name="person" size={18} color={Color.text}/>
                        <Text style={styles.drawerText}>{aboutMe?.name}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/settings")} style={[styles.drawerAction]}>
                        <Octicons name="gear" size={18} color={Color.text}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

[
	{
		"child": [],
		"info": {"color": null, "createdAt": 1789417503347, "description": null, "icon": null, "id": "ed5e8fa8-294c-4ad9-b15f-60872cf1796e", "name": "test1", "parentFolderId": null, "updatedAt": 1789417503347}
	},
	{"child": [], "info": {"color": null, "createdAt": 1790568705790, "description": null, "icon": null, "id": "7ebb2324-c188-48b7-a4b9-9cbaf36870ae", "name": "tt", "parentFolderId": null, "updatedAt": 1790568705790}}, {"child": [], "info": {"color": null, "createdAt": 1789417499228, "description": null, "icon": null, "id": "c811a749-8b13-466c-8185-82b50ad36a0a", "name": "test", "parentFolderId": null, "updatedAt": 1789417499228}}]
