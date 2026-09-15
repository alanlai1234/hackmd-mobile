import { useAuth } from '@/components/authProvider';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { BrowserSessionConstructor } from 'react-native-shared-webview';
import { mdviewInit } from '../components/markdownit';
import markdown_css from './github-markdown-dark';

const html = `
<!DOCTYPE html>
<style>
html,
body,
* {
  touch-action: pan-y pan-x;
}
${markdown_css()}
</style>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css" integrity="sha384-1vdNCNel6Tx/NQa8IR1mGOGKsbGreCkOPfbtPPnUURJ5Tu2PRVfQ/7KLZC+Pi1p1" crossorigin="anonymous">
		<script defer src="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.js" integrity="sha384-ycJ6GAwiS15LoUPipwJOrWTvkUHl/YqELValBwI5I4awP1EeEQJYarj+w85ntcz7" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/@viz-js/viz@3.30.0/dist/viz-global.min.js"></script>
		<script>
		function updateMathjax() {
			$('span.mathjax.raw')
				.removeClass('raw')
				.each(function (key, value) {
				const $value = $(value);
				const $ele = $(value).parent().parent();
				$value.unwrap();

				let result;
				if ($(value).hasClass('display')) {
					result = katex.renderToString($value.text(), {
					throwOnError: false,
					displayMode: true,
					});
				} else {
					result = katex.renderToString($value.text(), {
					throwOnError: false,
					});
				}

				$value.html(result);
				$value.children().unwrap();
				});
		}
		function updateLineNumbers() {
			const linenumberdivs = $('.gutter.linenumber').toArray();
			for (let i = 0; i < linenumberdivs.length; i++) {
				if ($(linenumberdivs[i]).hasClass('continue')) {
				const startnumber = linenumberdivs[i - 1]
					? parseInt(
						$(linenumberdivs[i - 1])
						.find('> span')
						.last()
						.attr('data-linenumber')
					)
					: 0;
				$(linenumberdivs[i])
					.find('> span')
					.each((key, value) => {
					$(value).attr('data-linenumber', startnumber + key + 1);
					});
				}
			}
		}
		function updateGraphviz() {
			let viz = new Viz({ Module, render });
			const graphvizs = $('span.graphviz.raw');
			graphvizs.removeClass('raw');
			graphvizs.each(function (key, value) {
				try {
				const $value = $(value);
				const $ele = $(value).parent().parent();
				$value.unwrap();
				const option = {
					engine: $value.attr('data-engine') || undefined,
				};
				viz
					.renderString($value.text(), option)
					.then((result) => {
					if (!result) {
						throw Error('viz.js output empty graph');
					}
					$value.html(result);
					$ele.addClass('graphviz');
					$value.children().unwrap();
					})
					.catch((err) => {
						viz = new Viz({ Module, render: init });
					});
				} catch (err) {
				}
			});
		}


		window.addEventListener('message', function(event) {
			document.body.innerHTML = event.data;
			updateMathjax();
			updateLineNumbers();
			updateGraphviz();
		});
		window.ReactNativeWebView.postMessage(1);
		</script>
	</head>
	<body class="markdown-body">
	owiejfw
	owejfoiwef
	awefjaowef
	awefoijawe
	oidsjcs
	</body>
</html>
`;

type webContextType = {
	session: any
	update(content: string): void
	mdview: any
}

const WebContext = createContext<webContextType | null>(null);
export const useWeb = () => {
  const ctx = useContext(WebContext);
  if (!ctx) throw new Error('useWeb must be used within WebViewProvider');
  return ctx;
};

const mdview = mdviewInit();

export const ViewProvider = ({children}: {children: React.ReactNode}) => {
	const { client } = useAuth();

	const [session] = useState(() => new BrowserSessionConstructor());
	const [loaded, setLoaded] = useState(false);
	const [tmp, setTmp] = useState("");
	const router = useRouter();
	const update = (content: string) => {
		if(!loaded){
			setTmp(content);
		}
		else{
			session.postMessage(content);
		}
	}

	useEffect(() => {
		session.loadhtml(html);
		// session.onMessage = (event: any) => {
		// 	if(event.nativeEvent.data == 1){
		// 		// session.postMessage(tmp);
		// 		console.log("wefhwief")
		// 		// session.loadhtml("loaded react")
		// 		setLoaded(true);
		// 	}
		// };
		// session.onShouldStartLoadWithRequest = async (event: any) => {
		// 	if(event.url == "about:blank") {
		// 		session.postMessage(tmp);
		// 		setLoaded(true);
		// 		return true;
		// 	}
		// 	if(event.url.startsWith("https://") || event.url.startsWith("http://")) {
		// 		Linking.openURL(event.url);
		// 	}
		// 	else if(event.url.startsWith("/")) {
		// 		let id = event.url.slice(1);
		// 		let title = (await client?.getNote(id))?.title;
		// 		router.push({pathname: "/[id]/view", params: {id: id, title: title ?? ""}});
		// 	}
		// 	return false;
		// }
	}, []);

	return (
		<WebContext.Provider value={{session, update, mdview}}>
			{children}
		</WebContext.Provider>
	)
}
