import { Color } from '../constants/Colors';

export default function markdown_css(): string{
return `
body{
  overflow-wrap: break-word;
  letter-spacing: 2px;
  line-height: 170%;
  margin: 20px;
  font-size: 45px;
  color: black;
  font-weight: 500;
  font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Helvetica,Roboto,Arial,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol;
}
blockquote{
  border-left: 6px solid ${Color.borderSelected};
  padding-left: 30px;
  margin-left: 0px;
}
ul{
  margin-left: 2%;
}
ol{
  margin-left: 3%;
}
li{
  margin-bottom: 10px;
  margin-top: 10px;
}
h1, h2, h3, h4, h5, h6{
  border-bottom: 6px solid ${Color.border};
  padding-bottom: 20px;
}
div{
  padding-left: 35px;
  padding-right: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
  border-radius: 10px;
}
.success{
  background-color: ${Color.successbg};
  color: rgb(111, 180, 137);
  border-left: 8px solid rgb(111, 180, 137);
}
.info{
  background-color: ${Color.infobg};
  color: rgb(75, 162, 227);;
  border-left: 8px solid rgb(75, 162, 227);
}
.warning{
  background-color: ${Color.warningbg};
  color: rgb(233, 162, 59);
  border-left: 8px solid rgb(233, 162, 59);
}
.danger{
  background-color: ${Color.dangerbg};
  color: rgb(221, 82, 76);
  border-left: 8px solid rgb(221, 82, 76);
}
img{
  max-width: 100%;
  max-height: 100vh;
}
details{
  background-color: ${Color.secondary};
  padding: 20px;
  border-radius: 10px;
  -webkit-tap-highlight-color: transparent;
}
summary{
  user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}
a{
  color: ${Color.link};
  text-decoration: none;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}


.hljs {
  color: ${Color.text};
  background: transparent;
}

.hljs-comment,
.hljs-meta {
  color: #969896;
}

.hljs-string,
.hljs-variable,
.hljs-template-variable,
.hljs-strong,
.hljs-emphasis,
.hljs-quote {
  color: #df5000;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-type {
  color: #a71d5d;
}

.hljs-number,
.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-attribute {
  color: #0086b3;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #005cc5;
}

.hljs-section,
.hljs-name {
  color: #63a35c;
}

.hljs-tag {
  color: #333333;
}

.hljs-title,
.hljs-attr,
.hljs-selector-id,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo {
  color: #795da3;
}

.hljs-addition {
  color: #55a532;
  background-color: #eaffea;
}

.hljs-deletion {
  color: #bd2c00;
  background-color: #ffecec;
}

.hljs-link {
  text-decoration: underline;
}


.markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #555;
    vertical-align: middle;
    // background-color: #fcfcfc;
    // border: solid 1px #ccc;
    // border-bottom-color: #bbb;
    border-radius: 3px;
    // box-shadow: inset 0 -1px 0 #bbb;
}

.markdown-body .loweralpha {
    list-style-type: lower-alpha;
}

.markdown-body h1 tt,
.markdown-body h1 code,
.markdown-body h2 tt,
.markdown-body h2 code,
.markdown-body h3 tt,
.markdown-body h3 code,
.markdown-body h4 tt,
.markdown-body h4 code,
.markdown-body h5 tt,
.markdown-body h5 code,
.markdown-body h6 tt,
.markdown-body h6 code {
    font-size: inherit;
}

.markdown-body h1 {
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid #eee;
}

.markdown-body h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #eee;
}

.markdown-body h3 {
    font-size: 1.25em;
}

.markdown-body h4 {
    font-size: 1em;
}

.markdown-body h5 {
    font-size: 0.875em;
}

.markdown-body h6 {
    font-size: 0.85em;
    color: #777
}



.markdown-body ul,
.markdown-body ol {
    padding-left: 2em
}

.markdown-body ul.no-list,
.markdown-body ol.no-list {
    padding: 0;
    list-style-type: none;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0
}

.markdown-body li>p {
    margin-top: 16px
}

.markdown-body li+li {
    margin-top: 0.25em;
}

.markdown-body dl {
    padding: 0;
}

.markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
}

.markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
}

.markdown-body table {
    display: block;
    width: 100%;
    overflow: auto;
    word-break: normal;
    word-break: keep-all;
}

.markdown-body table th {
    font-weight: bold
}

.markdown-body table th,
.markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #ddd;
}

.markdown-body table tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
}
.night .markdown-body table tr {
    background-color: #5f5f5f;
}

.markdown-body table tr:nth-child(2n) {
    background-color: #f8f8f8;
}

.night .markdown-body table tr:nth-child(2n){

    background-color: #4f4f4f;
}

.markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
}

.markdown-body img[align=right] {
    padding-left: 20px;
}

.markdown-body img[align=left] {
    padding-right: 20px;
}

.markdown-body .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
}

.markdown-body span.frame {
    display: block;
    overflow: hidden;
}

.markdown-body span.frame>span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #ddd;
}

.markdown-body span.frame span img {
    display: block;
    float: left;
}

.markdown-body span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #333;
}

.markdown-body span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
}

.markdown-body span.align-center>span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
}

.markdown-body span.align-center span img {
    margin: 0 auto;
    text-align: center;
}

.markdown-body span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
}

.markdown-body span.align-right>span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
}

.markdown-body span.align-right span img {
    margin: 0;
    text-align: right;
}

.markdown-body span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
}

.markdown-body span.float-left span {
    margin: 13px 0 0;
}

.markdown-body span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
}

.markdown-body span.float-right>span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
}

.markdown-body code,
.markdown-body tt {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 3px;
}

.night .markdown-body code,
.night .markdown-body tt {

    color: #eee;
    background-color: rgba(230, 230, 230, 0.36);

}

.markdown-body code::before,
.markdown-body code::after,
.markdown-body tt::before,
.markdown-body tt::after {
    letter-spacing: -0.2em;
    content: "\0\0a0";
}

.markdown-body code br,
.markdown-body tt br {
    display: none;
}

.markdown-body del code {
    text-decoration: inherit;
}

.markdown-body .highlight {
    margin-bottom: 16px;
}

.markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
}

.markdown-body .highlight pre,
.markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 70%;
    line-height: 1.45;
    word-wrap: normal;
    background-color: ${Color.secondary};
    border: inherit !important;
    border-radius: 3px;
}

.markdown-body pre>code,
.markdown-body pre code,
.markdown-body pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    font-size: 100%;
    line-height: inherit;
    word-break: normal;
    word-wrap: normal;
    white-space: pre;
    background-color: transparent;
    border: 0;
}

.markdown-body pre code::before,
.markdown-body pre code::after,
.markdown-body pre tt::before,
.markdown-body pre tt::after {
    content: normal;
}

.markdown-body .csv-data td,
.markdown-body .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
}

.markdown-body .csv-data .blob-line-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #fff;
    border: 0;
}

.markdown-body .csv-data tr {
    border-top: 0;
}

.markdown-body .csv-data th {
    font-weight: bold;
    background: #f8f8f8;
    border-top: 0;
}

.markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #555;
    vertical-align: middle;
    background-color: #fcfcfc;
    border: solid 1px #ccc;
    border-bottom-color: #bbb;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #bbb;
}

.markdown-body pre code .wrapper {
    display: inline-flex;
    line-height: 1.45;
}

.markdown-body pre code .gutter {
    flex: 0 0 auto;
    overflow: hidden;
    user-select: none;
}

.markdown-body pre code .gutter.linenumber {
    min-width: 20px;
    padding-right: 8px;
    box-sizing: content-box;
    color: #afafaf !important;
    text-align: right;
    border-right: 5px solid ${Color.link} !important;
}


.markdown-body pre code .gutter.linenumber > span {
    display: block;
    min-height: 1.45em;
}

.markdown-body pre code .gutter.linenumber > span::before {
    content: attr(data-linenumber);
}

.markdown-body pre code .code {
    margin-left: 16px;
    line-height: inherit;
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    font-weight: 500;
}

.markdown-body .gist .line-numbers {
    border-left: none;
    border-top: none;
    border-bottom: none;
}
`;
}
