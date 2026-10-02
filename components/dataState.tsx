import { GetUserTeams, GetUserNotes } from '@hackmd/api';
import { RefObject } from 'react';
import { create } from 'zustand';

interface data{
	colorscheme: number;
	setColorscheme(num: number): void;
	teams: GetUserTeams
	setTeams(get: GetUserTeams): void;
	refresh: boolean;
	setRefresh(re: boolean): void;
	notes: GetUserNotes;
	setNotes(notes: GetUserNotes): void;
	selectedTags: Set<string>;
	setSelectedTags(tags: Set<string>): void;
	title: string;
	setTitle(text: string) : void;
}

const useData = create<data>((set) => ({
	colorscheme: -1,
	setColorscheme: (num) => set({colorscheme: num}),
	teams: [],
	setTeams: (get) => set({teams: get}),
	refresh: false,
	setRefresh: (re) => set({refresh: re}),
	notes: [],
	setNotes: (notes) => set({notes: notes}),
	selectedTags: new Set(),
	setSelectedTags: (tags) => set({selectedTags: tags}),
	title: "My Workspace",
	setTitle: (text) => set({title: text})
}))

export default useData;
