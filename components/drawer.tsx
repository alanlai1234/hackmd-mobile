import { Color } from '@/constants/Colors';
import Octicons from '@expo/vector-icons/Octicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useAuth } from '@/components/authProvider';

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    treeRow: {
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 6,
        marginBottom: 5,
        padding: 4,
    },
    treeIndentOne: {
        marginLeft: 10,
    },
    drawerText: {
        color: Color.text,
        fontSize: 15,
    },
    drawerFooter: {
        gap: 8,
        paddingTop: 12,
    },
    drawerFooterRow: {
        flexDirection: 'row',
        gap: 8,
    },
    drawerAction: {
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: Color.secondary,
    },
    drawerHalfAction: {
        flex: 1,
    }
});

export const DrawerContent = () => {

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
                <TouchableOpacity style={styles.drawerAction}>
                    <Octicons name="trash" size={18} color={Color.text}/>
                    <Text style={styles.drawerText}>Trash</Text>
                </TouchableOpacity>

                <View style={styles.drawerFooterRow}>
                    <TouchableOpacity style={[styles.drawerAction, styles.drawerHalfAction]}>
                        <Octicons name="person" size={18} color={Color.text}/>
                        <Text style={styles.drawerText}>User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.drawerAction]}>
                        <Octicons name="gear" size={18} color={Color.text}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
