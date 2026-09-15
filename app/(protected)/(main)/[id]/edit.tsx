import { Color } from '@/constants/Colors';
import markdownit from 'markdown-it';
import { useEffect, useState } from 'react';
import { Text, TextInput } from 'react-native';

const text = `
e\`rg\`er
`;

const mdblock = new markdownit().disable(['inline'])
const mdline = new markdownit();

const renderInline = (tokens: any[]) => {
	let stack: ((sibling: React.ReactNode) => React.ReactNode)[] = [(sibling: React.ReactNode) => sibling];
	tokens.forEach((token) => {
		if(token.type == "strong_close"){
			const cur = stack.pop();
			const top = stack.pop();
			stack.push((sibling) => top!( <><Text style={{fontWeight: "bold"}}>**{cur!(<></>)}**</Text>{sibling}</> ) );
		}
		else if(token.type == "em_close"){
			const cur = stack.pop();
			const top = stack.pop();
			stack.push((sibling) => top!( <><Text style={{fontStyle: "italic"}}>*{cur!(<></>)}*</Text>{sibling}</> ) );
		}
		else if(token.type == "s_close"){
			const cur = stack.pop();
			const top = stack.pop();
			stack.push((sibling) => top!( <><Text style={{textDecorationLine: "line-through"}}>~~{cur!(<></>)}~~</Text>{sibling}</> ) );
		}
		else if(token.type == "code_inline"){
			const top = stack.pop();
			stack.push((sibling) => top!(<><Text style={{color: 'grey'}}>`{token.content}`</Text>{sibling}</>));
		}
		else if(token.type == "text"){
			const top = stack.pop();
			stack.push((sibling) => top!(<>{token.content}{sibling}</>));
		}
		else if(token.type == "softbreak"){
			const top = stack.pop();
			stack.push((sibling) => top!(<>{'\n'}{sibling}</>));
		}
		else{
			stack.push((sibling) => sibling);
		}
	});
	return stack.pop()!(<></>);
}

const Parsed = ({content}: {content: string}) => {
	let [texts, setTexts] = useState<any[]>([]);
	useEffect(() => {
		let cur = 0;
		const lines = content.split('\n');
		let res: React.ReactNode[] = [];
		mdblock.parse(content, {}).forEach((token: any) => {
			if(token.map == null) return;
			if(token.map[0]<cur) return;
			if(token.map[0]>cur){
				res.push(<Text>{lines.slice(cur, token.map[0]).join('\n')}</Text>)
				cur = token.map[0];
			}
			if(token.type == "heading_open"){
				res.push(
					<Text style={{color: "rgb(226, 166, 106)", fontWeight: "bold"}}>
						{renderInline(mdline.parseInline(
							lines.slice(token.map[0], token.map[1]).join('\n'), {}
						)[0].children)}
					</Text>
				)
			}
			else if(token.tag == "code"){
				res.push(
					<Text style={{color: "grey"}}>
						{lines.slice(token.map[0], token.map[1]).join('\n')}
					</Text>
				)
			}
			else{
				res.push(renderInline(mdline.parseInline(
						lines.slice(token.map[0], token.map[1]).join('\n'), {}
					)[0].children))
			}
			cur = token.map[1];
		})
		if(cur<lines.length)
			res.push(<Text>{lines.slice(cur).join('\n')}</Text>)
		setTexts(res);
	}, [content])
	return(
		<Text style={{color: Color.text, fontFamily: "monospace"}}>
			{texts?.map((value, index) => 
				<Text key={index}>{index?"\n":""}{value}</Text>
			)}
		</Text>
	)
}


export default function Edit() {
	const [content, setContent] = useState(text);
	const [select, setSelect] = useState({ start: 0, end: 0 })

	const onPress = (e: any) => {
		if(e.nativeEvent.key == "Enter" && select.start==select.end){
			//todo
		}
	}
	return (
		<TextInput
			style={{flex: 1, backgroundColor: Color.codeEditorbg, padding: 15, fontSize: 20}}
			onChangeText={setContent}
			onKeyPress={onPress}
			onSelectionChange={(e) => setSelect(e.nativeEvent.selection)}
			multiline
		>
			<Parsed content={content}/>
		</TextInput>
	);
}
