import { useAuth } from '@/components/authProvider';
import { useRouter } from 'expo-router';
import { type RefObject, createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { Linking, useColorScheme, Appearance } from 'react-native';
import { BrowserSessionConstructor } from 'react-native-shared-webview';
import { mdviewInit } from '@/components/markdownit';
import viewHTML from '@/components/viewhtml';
import { light, dark} from '@/constants/Colors';
import { createMMKV } from 'react-native-mmkv'
import { GetUserNotes, GetUserTeams } from '@hackmd/api';
import * as SplashScreen from 'expo-splash-screen';
import useTheme from '@/components/themeState';
import { useShallow } from 'zustand/react/shallow';
import useData from '@/components/dataState';

export const storage = createMMKV()

type appContextType = {
	session: any;
	update(content: string): void;
	mdview: any;
	teams: RefObject<GetUserTeams>;
	curTeam: RefObject<number>;
	fetchList() : void;
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
	const { setColor, Color } = useTheme(useShallow((state)=>({setColor: state.setColor, Color: state.Color})));
	const { setNotes, setTitle, colorscheme, setColorscheme, setRefresh} = useData(useShallow((s)=>({setNotes:s.setNotes, setTitle:s.setTitle, colorscheme: s.colorscheme, setColorscheme: s.setColorscheme, setRefresh: s.setRefresh})));
	const tmp = useRef("");
	const router = useRouter();
	const systemColor = useColorScheme();

	const session = useMemo(() => new BrowserSessionConstructor(), []);
	const loaded = useRef(false);
	const teams = useRef<GetUserTeams>([]);
	const curTeam = useRef(-1);
	const update = (content: string) => {
		if(!loaded.current){
			tmp.current = content;
		}
		else{
			session.postMessage(content);
		}
	}

    async function fetchList(){
		if(curTeam.current == -1){
			setTitle("My Workspace");
			const list = await client?.getNoteList();
			if(list) setNotes(list);
		}
		else{
			setTitle(teams.current[curTeam.current].name);
			const list = await client?.getTeamNotes(teams.current[curTeam.current].path)
			if(list) setNotes(list);
		}
		setRefresh(false);
    }

	useEffect(() => {
		(async () => {
			let get = storage.getNumber("colorscheme")
			if(get == null) setColorscheme(0);
			else setColorscheme(get);

			teams.current = (await client?.getTeams())??[];

			session.loadhtml(viewHTML(Color));
			session.onMessage = (event: any) => {
				if(event.nativeEvent.data == 1){
					if(tmp.current.length>0) session.postMessage(tmp.current);
					tmp.current = "";
					loaded.current = true;
				}
			};
			session.onShouldStartLoadWithRequest = async (event: any) => {
				if(event.url == "about:blank") {
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
			await fetchList();
			SplashScreen.hide();
		})();
	}, []);

	useEffect(() => {
		if(colorscheme == 0){
			setColor(Appearance.getColorScheme() == "dark"? dark: light);
			Appearance.setColorScheme("unspecified");
			storage.set("colorscheme", 0);
		}
		else if(colorscheme == 1){
			setColor(dark);
			Appearance.setColorScheme("dark");
			storage.set("colorscheme", 1);
		}
		else{
			setColor(light);
			Appearance.setColorScheme("light");
			storage.set("colorscheme", 2);
		}
	}, [colorscheme])
	useEffect(() => {
		if(colorscheme == 0){
			setColor(Appearance.getColorScheme() == "dark"? dark: light);
		}
	}, [systemColor])

	return (
		<AppContext.Provider value={{session, update, mdview, teams, curTeam, fetchList}}>
			{children}
		</AppContext.Provider>
	)
}
