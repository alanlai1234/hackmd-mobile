import { create } from 'zustand'

interface note{
	title: string,
	id: string,
	raw: string,
	etag: string,
	setTitle(text: string) : void,
	setId(text: string) : void,
	setRaw(text: string) : void,
	setEtag(text: string) : void,
}

const useNote = create<note>((set) => ({
	title: "",
	id: "",
	raw: "",
	etag: "",
	setTitle: (text: string) => set({title:text}),
	setId: (text: string) => set({id:text}),
	setRaw: (text: string) => set({raw:text}),
	setEtag: (text: string) => set({etag:text}),
}))

export default useNote;
