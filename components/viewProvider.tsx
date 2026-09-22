import { useAuth } from '@/components/authProvider';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Linking, useColorScheme, Appearance } from 'react-native';
import { BrowserSessionConstructor } from 'react-native-shared-webview';
import { mdviewInit } from '@/components/markdownit';
import viewHTML from '@/components/viewhtml';
import { type themeType, light, dark} from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as styles from '@/components/stylesheets';

SplashScreen.preventAutoHideAsync();

type appContextType = {
	session: any;
	update(content: string): void;
	mdview: any;
	colorscheme: number;
	setColorscheme: any;
	Color: themeType;
	indexStyle: any;
	settingsStyle: any;
	drawerStyle: any;
	bottomSheetsStyle: any;
}

const AppContext = createContext<appContextType | null>(null);
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

const mdview = mdviewInit();

export const AppProvider = ({children}: {children: React.ReactNode}) => {
	const { client } = useAuth();
	const [tmp, setTmp] = useState("");
	const router = useRouter();
	const systemColor = useColorScheme();

	const [session] = useState(() => new BrowserSessionConstructor());
	const [loaded, setLoaded] = useState(false);
	const [colorscheme, setColorscheme] = useState(0);
	const update = (content: string) => {
		if(!loaded){
			setTmp(content);
		}
		else{
			session.postMessage(content);
		}
	}
	const [Color, setColor] = useState(dark);
	const indexStyle = useMemo(() => styles.index(Color), [Color])
	const settingsStyle = useMemo(() => styles.settings(Color), [Color])
	const drawerStyle = useMemo(() => styles.drawer(Color), [Color])
	const bottomSheetsStyle = useMemo(() => styles.bottomSheets(Color), [Color])

	useEffect(() => {
		async function init(){
			let get = await AsyncStorage.multiGet(["colorscheme"])
			if(get[0][1] == null){
				await AsyncStorage.setItem("colorscheme", "0");
				setColorscheme(0);
			}
			else setColorscheme(parseInt(get[0][1]));

			session.loadhtml(viewHTML(Color));
			session.onMessage = (event: any) => {
				if(event.nativeEvent.data == 1){
					session.postMessage(tmp);
					setLoaded(true);
				}
			};
			session.onShouldStartLoadWithRequest = async (event: any) => {
				if(event.url == "about:blank") {
					session.postMessage(tmp);
					setLoaded(true);
					return true;
				}
				if(event.url.startsWith("https://") || event.url.startsWith("http://")) {
					Linking.openURL(event.url);
				}
				else if(event.url.startsWith("/")) {
					let id = event.url.slice(1);
					let title = (await client?.getNote(id))?.title;
					router.push({pathname: "/[id]/view", params: {id: id, title: title ?? ""}});
				}
				return false;
			}
			SplashScreen.hide();
		}

		init();
	}, []);

	useEffect(() => {
		if(colorscheme == 0){
			Appearance.setColorScheme(null);
			setColor(Appearance.getColorScheme() == "dark"? dark: light);
			AsyncStorage.setItem("colorscheme", "0");
		}
		else if(colorscheme == 1){
			setColor(dark);
			Appearance.setColorScheme("dark");
			AsyncStorage.setItem("colorscheme", "1");
		}
		else{
			setColor(light);
			Appearance.setColorScheme("light");
			AsyncStorage.setItem("colorscheme", "2");
		}
	}, [colorscheme])
	useEffect(() => {
		if(colorscheme == 0){
			setColor(Appearance.getColorScheme() == "dark"? dark: light);
		}
	}, [systemColor])

	return (
		<AppContext.Provider value={{session, update, mdview, colorscheme, setColorscheme, Color, indexStyle, settingsStyle, drawerStyle, bottomSheetsStyle}}>
			{children}
		</AppContext.Provider>
	)
}
