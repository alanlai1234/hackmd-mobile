import { create } from 'zustand';
import { type themeType, dark} from '@/constants/Colors';
import * as styles from '@/components/stylesheets';

interface theme{
	Color: themeType;
	setColor(color: themeType): void;
	indexStyle: any;
	settingsStyle: any;
	drawerStyle: any;
	bottomSheetsStyle: any;
	notePageStyle: any;
}

const useTheme = create<theme>((set) => ({
	Color: dark,
	setColor: (color) => set({Color: color, indexStyle: styles.index(color), settingsStyle: styles.settings(color), drawerStyle: styles.drawer(color), bottomSheetsStyle: styles.bottomSheets(color), notePageStyle: styles.notePage(color)}),
	indexStyle: styles.index(dark),
	settingsStyle: styles.settings(dark),
	drawerStyle: styles.drawer(dark),
	bottomSheetsStyle: styles.bottomSheets(dark),
	notePageStyle: styles.notePage(dark),
}))

export default useTheme;
