import{C as V}from"./CinemaList.57a265d1.js";import{c as p}from"./getCinemaList.88ed5cf0.js";import{_ as S,U as L,f as I,a as h,R as f,F as r,G as l,b as v,Y as m,Z as d,M as s,J as w,K as g,a6 as x,a7 as D,N as k}from"./index.f793904c.js";const y={components:{CinemaList:V},setup(t){const n=L(),o=I(""),e=h(()=>p[1].slice(0,5)),u=h(()=>o.value?p[1].filter(a=>a.name.includes(o.value)):[]);function _(){}function c(a){const C=a.target.dataset.cinemaid;n.push({path:"/cinemaDetail",query:{cinemaId:C}})}function i(){n.back()}return{inputValue:o,recommendList:e,resultList:u,onSearch:_,toCinemaDetail:c,onCancel:i}}},b=t=>(x("data-v-294a63a2"),t=t(),D(),t),B={class:"search-view"},N={class:"recommend-content"},F=b(()=>s("span",{class:"text"},"\u79BB\u4F60\u6700\u8FD1",-1)),R=["data-cinemaId"],U={class:"no-result"};function q(t,n,o,e,u,_){const c=f("van-search"),i=f("cinema-list");return r(),l("div",B,[v(c,{class:"search-box",modelValue:e.inputValue,"onUpdate:modelValue":n[0]||(n[0]=a=>e.inputValue=a),"show-action":"",placeholder:"\u8BF7\u8F93\u5165\u5F71\u9662\u540D\u79F0",autocomplete:"off",onSearch:e.onSearch,onCancel:e.onCancel},null,8,["modelValue","onSearch","onCancel"]),m(s("div",N,[F,s("ul",{class:"recommend-list",onClickCapture:n[1]||(n[1]=(...a)=>e.toCinemaDetail&&e.toCinemaDetail(...a))},[(r(!0),l(w,null,g(e.recommendList,a=>(r(),l("li",{key:a.cinemaId,class:"recommend-item","data-cinemaId":a.cinemaId},k(a.name),9,R))),128))],32)],512),[[d,!e.inputValue]]),m(v(i,{cinemaList:e.resultList},null,8,["cinemaList"]),[[d,e.resultList.length]]),m(s("div",U," \u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u7ED3\u679C ",512),[[d,e.inputValue&&!e.resultList.length]])])}var K=S(y,[["render",q],["__scopeId","data-v-294a63a2"]]);export{K as default};
