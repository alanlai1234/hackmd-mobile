import Octicons from '@expo/vector-icons/Octicons';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '@/components/authProvider';
import { useRouter } from 'expo-router'
import { useApp } from '@/components/viewProvider';

export const DrawerContent = () => {
	const { aboutMe } = useAuth();
	const router = useRouter();
	const { Color, drawerStyle: styles } = useApp();

    return (
        <View style={styles.drawerContent}>
            <View>
                <TouchableOpacity style={[styles.treeRow, {backgroundColor: Color.selected}]}>
                    {/*<Octicons name="chevron-down" size={16} color={Color.text2}/>*/}
                    <Octicons name="file-directory-open-fill" size={18} color={Color.text2}/>
                    <Text style={styles.drawerText}>My Notes</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity style={[styles.treeRow, styles.treeIndentOne]}>
                    <Octicons name="chevron-down" size={16} color={Color.text2} style={{opacity: 0}}/>
                    <Octicons name="file" size={17} color={Color.text2}/>
                    <Text style={styles.drawerText}>test</Text>
                </TouchableOpacity>*/}
            </View>

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
