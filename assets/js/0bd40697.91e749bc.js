(self.webpackChunkkmm_icerock_dev=self.webpackChunkkmm_icerock_dev||[]).push([[9002],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return s},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=n.createContext({}),l=function(e){var t=n.useContext(a),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(a.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,a=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),m=l(r),f=o,d=m["".concat(a,".").concat(f)]||m[f]||p[f]||c;return r?n.createElement(d,i(i({ref:t},s),{},{components:r})):n.createElement(d,i({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,i=new Array(c);i[0]=m;var u={};for(var a in t)hasOwnProperty.call(t,a)&&(u[a]=t[a]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var l=2;l<c;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3661:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return i},metadata:function(){return u},toc:function(){return a},default:function(){return s}});var n=r(2122),o=r(9756),c=(r(7294),r(3905)),i={},u={unversionedId:"libs/coroutines",id:"libs/coroutines",isDocsHomePage:!1,title:"kotlinx.coroutines",description:"- \u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u044f",source:"@site/docs/libs/coroutines.md",sourceDirName:"libs",slug:"/libs/coroutines",permalink:"/docs/libs/coroutines",editUrl:"https://github.com/icerockdev/kmm.icerock.dev/tree/docusaurus/docs/libs/coroutines.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ktor",permalink:"/docs/libs/ktor-client"},next:{title:"kotlinx.serialization",permalink:"/docs/libs/serialization"}},a=[{value:"Structured Concurrency",id:"structured-concurrency",children:[]}],l={toc:a};function s(e){var t=e.components,r=(0,o.Z)(e,["components"]);return(0,c.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://kotlinlang.org/docs/coroutines-overview.html"},"\u041e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u044f")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://habr.com/ru/company/alfa/blog/336228/"},"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0442\u0438\u0432\u043d\u0430\u044f \u0441\u0442\u0430\u0442\u044c\u044f \u043f\u0440\u043e \u0431\u0430\u0437\u043e\u0432\u044b\u0435 \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0438\u0438 \u0438 \u043f\u043e\u0434\u0445\u043e\u0434\u044b \u0432 coroutines")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=ffIVVWHpups"},"\u0412\u044b\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0410\u043d\u0434\u0440\u0435\u044f \u0411\u0440\u0435\u0441\u043b\u0430\u0432\u0430 \u043f\u0440\u043e coroutines")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=b4mBmi1QNF0"},"\u0412\u044b\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0420\u043e\u043c\u0430\u043d\u0430 \u0415\u043b\u0438\u0437\u0430\u0440\u043e\u0432\u0430 \u043f\u0440\u043e coroutines"))),(0,c.kt)("h2",{id:"structured-concurrency"},"Structured Concurrency"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://elizarov.medium.com/structured-concurrency-722d765aa952"},"Structured Concurrency (Medium)")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://elizarov.medium.com/structured-concurrency-anniversary-f2cc748b2401"},"Structured Concurrency Anniversary (Medium)")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://proandroiddev.com/structured-concurrency-in-action-97c749a8f755?gi=85a83dfe8ceb"},"Structured Concurrency in action! (using Kotlin coroutines) (Medium)")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("a",{parentName:"li",href:"https://www.youtube.com/watch?v=Mj5P47F6nJg"},"Roman Elizarov \u2014 Structured concurrency (YouTube)"))))}s.isMDXComponent=!0}}]);