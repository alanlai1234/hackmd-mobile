import hljs from 'highlight.js/lib/core';
import MarkdownIt from 'markdown-it';
// import { solidity } from 'highlightjs-solidity';
const markdownitContainer = require('markdown-it-container');

hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('clojure', require('highlight.js/lib/languages/clojure'));
hljs.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'));
hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('c', require('highlight.js/lib/languages/c'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('cs', require('highlight.js/lib/languages/csharp'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('elm', require('highlight.js/lib/languages/elm'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'));
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'));
hljs.registerLanguage('prolog', require('highlight.js/lib/languages/prolog'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('ruby', require('highlight.js/lib/languages/ruby'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('swift', require('highlight.js/lib/languages/swift'));
hljs.registerLanguage('diff', require('highlight.js/lib/languages/diff'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('lua', require('highlight.js/lib/languages/lua'));
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
hljs.registerLanguage('perl', require('highlight.js/lib/languages/perl'));
hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'));
hljs.registerLanguage('julia', require('highlight.js/lib/languages/julia'));
hljs.registerLanguage('ocaml', require('highlight.js/lib/languages/ocaml'));
hljs.registerLanguage('verilog', require('highlight.js/lib/languages/verilog'));
// hljs.registerLanguage('solidity', solidity);
hljs.registerLanguage('vb', require('highlight.js/lib/languages/vbnet'));

type fenceParams = {
  id?: string;
  class?: string[];
  [key: string]: string | string[] | undefined;
};

function parseFenceCodeParams(lang: string) {
  const attrMatch = lang.match(/{(.*)}/);
  const params: fenceParams = {};
  if (attrMatch && attrMatch.length >= 2) {
    const attrs = attrMatch[1];
    const paraMatch = attrs.match(/([#.](\S+?)\s)|((\S+?)\s*=\s*("(.+?)"|'(.+?)'|\[[^\]]*\]|\{[}]*\}|(\S+)))/g);

    if (paraMatch) {
      paraMatch.forEach((param) => {
        param = param.trim();
        if (param[0] === '#') {
          params.id = param.slice(1);
        } else if (param[0] === '.') {
            if (!params.class) {
                params.class = [];
            }
            params.class = params.class.concat(param.slice(1));
        } else {
          const offset = param.indexOf('=');
          const id = param.substring(0, offset).trim().toLowerCase();
          let val = param.substring(offset + 1).trim();
          const valStart = val[0];
          const valEnd = val[val.length - 1];
          if (['"', "'"].indexOf(valStart) !== -1 && ['"', "'"].indexOf(valEnd) !== -1 && valStart === valEnd) {
            val = val.substring(1, val.length - 1);
          }
          if (id === 'class') {
            if (!params.class) {
              params.class = [];
            }
            params['class'] = params.class.concat(val);
          } else {
            params.id = val;
          }
        }
      });
    }
  }
  return params;
}

let highlight: any;

function highlightRender(code: string, lang: string, md: any) {
  if (!lang || /no(-?)highlight|plain|text/.test(lang)) {
    // fallback
    return ""
  }
  // support adding extra attributes for fence code block
  // ex: ```graphviz {engine="neato"}
  const params = parseFenceCodeParams(lang) as Record<string, any>;
  lang = lang.split(/\s+/g)[0];
  const escaped = md.utils.escapeHtml(code);
  if (lang === 'sequence') {
    return `<span class="sequence-diagram raw">${escaped}</span>`;
  } else if (lang === 'flow') {
    return `<span class="flow-chart raw">${escaped}</span>`;
  } else if (lang === 'graphviz') {
    // support to specify layout engine of graphviz
    let dataAttrs = '';
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty('engine')) {
      dataAttrs = ' data-engine="' + params.engine + '"';
    }
    return `<span class="graphviz raw"${dataAttrs}>${escaped}</span>`;
  } else if (lang === 'mermaid') {
    return `<span class="mermaid raw">${escaped}</span>`;
  } else if (lang === 'abc') {
    return `<span class="abc raw">${escaped}</span>`;
  }
    const result = {
        value: "",
    };
    const showline = lang.match(/=$|=\d+$|=\+$/);
    const realLang = showline ? lang.slice(0, showline.index): lang
    if (!hljs.listLanguages().includes(realLang)) {
      result.value = hljs.highlightAuto(code).value;
    } else {
      result.value = hljs.highlight(code, {language: realLang}).value;
    }

  if (showline) {
    let startnumber = 1;
    const matches = lang.match(/=(\d+)$/);
    if (matches) {
      startnumber = parseInt(matches[1]);
    }
    const lines = result.value.split('\n');
    const linenumbers = [];
    for (let i = 0; i < lines.length - 1; i++) {
      linenumbers[i] = `<span data-linenumber='${startnumber + i}'></span>`;
    }
    const continuelinenumber = /=\+$/.test(lang);
    const linegutter = `<div class='gutter linenumber${continuelinenumber ? ' continue' : ''}'>${linenumbers.join(
      '\n'
    )}</div>`;
    result.value = `<div class='wrapper'>${linegutter}<div class='code'>${result.value}</div></div>`;
  }

  return result.value;
}

export const mdviewInit = () => {
    const mdview = new MarkdownIt();
    mdview.use(markdownitContainer, 'success');
    mdview.use(markdownitContainer, 'info');
    mdview.use(markdownitContainer, 'warning');
    mdview.use(markdownitContainer, 'danger');
    mdview.use(markdownitContainer, 'spoiler', {
        validate: function (params:string) {
            return params.trim().match(/^spoiler(\s+.*)?$/);
        },
        render: function (tokens:any, idx:number) {
            const m = tokens[idx].info.trim().match(/^spoiler(\s+.*)?$/);

            if (tokens[idx].nesting === 1) {
                if(m[1] == undefined){
                    return '<details><summary>Details</summary>\n';
                }
                return '<details><summary>' + mdview.utils.escapeHtml(m[1].trim()) + '</summary>\n';
            } else {
                return '</details>\n';
            }
        },
    });
    mdview.use(require('markdown-it-mathjax')({
      beforeMath: '<span class="mathjax raw">',
      afterMath: '</span>',
      beforeInlineMath: '<span class="mathjax raw">',
      afterInlineMath: '</span>',
      beforeDisplayMath: '<span class="mathjax raw display">',
      afterDisplayMath: '</span>',
    })
    );
    mdview.options.linkify = true;
    mdview.options.typographer = true;
    mdview.options.highlight = (code:string, lang:string) => highlightRender(code, lang, mdview);

    return mdview;
};
