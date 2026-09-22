import { StyleSheet } from 'react-native';
import { themeType } from '@/constants/Colors';

export const index = (Color: themeType) => StyleSheet.create({
    topbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
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
    },
	drawer: {backgroundColor: Color.background, width: "65%"}
});

export const settings = (Color: themeType) => StyleSheet.create({
	text: {
		color: Color.text,
		fontSize: 17,
		alignSelf: 'center',
		fontWeight: '500'
	},
	item: {
		padding: 7,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 15
	},
	sheet: {
		flex: 1,
		marginTop: 20,
	},
	option: {
        minHeight: 52,
        alignItems: 'center',
		paddingHorizontal: 15,
        flexDirection: 'row',
        gap: 8,
	},
	optionPressed: {
        backgroundColor: Color.selected,
    },

})

export const drawer = (Color: themeType) => StyleSheet.create({
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

export const bottomSheets = (Color: themeType) => StyleSheet.create({
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
