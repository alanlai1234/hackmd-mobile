import markdown_css from './github-markdown-dark';
import { type themeType } from '@/constants/Colors';

export default function viewHTML(Color: themeType){
	return `
<!DOCTYPE html>
<style>
html,
body,
* {
  touch-action: pan-y pan-x;
}
${markdown_css(Color)}
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
	</body>
</html>
	`
}
