import{_ as p,U as k,R as f,F as c,G as _,M as l,N as m,O as g,ab as x,ak as C,a3 as v,a5 as y,f as u,r as T,w as I,a2 as w,K as D,J as F}from"./index.fdc8b467.js";const b={class:"cinema-item_left"},B={class:"name"},E={key:0,class:"ticket-type"},N={class:"address"},$={class:"cinema-item_right"},V={key:0,class:"price-box"},O=y(" \uFFE5"),P={class:"price"},R=y("\u8D77 "),U={class:"distance"},j={props:{item:{type:Object}},setup(e){const d=k();function o(t){let s="";return t.forEach((i,a)=>{a%2===1?s+=` | ${i.name}`:s+=i.name}),s}function n(t){return`${t.toFixed(1)}km`}function r(t){d.push({path:"/CinemaDetail",query:{cinemaId:t}})}return(t,s)=>{const i=f("van-icon");return c(),_("li",{class:"cinema-item",onClick:s[0]||(s[0]=a=>r(e.item.cinemaId))},[l("div",b,[l("div",B,m(e.item.name),1),e.item.ticketTypes?(c(),_("div",E,m(o(e.item.ticketTypes)),1)):g("",!0),l("div",N,m(e.item.address),1)]),l("div",$,[e.item.ticketTypes?(c(),v(i,{key:1,"class-prefix":"myicon",name:"map",class:"location-icon"})):(c(),_("div",V,[O,l("span",P,m(x(C)(e.item.lowPrice)),1),R])),l("div",U,m(n(e.item.Distance)),1)])])}}};var q=p(j,[["__scopeId","data-v-765d86ad"]]);const A={components:{CinemaItem:q},props:{cinemaList:{type:Array,default:()=>[]}},setup(e,d){const o=u(!1),n=u(!1),r=u(null);let t=0;const s=30,i=T([]);function a(){if(i.length===e.cinemaList.length)n.value=!0;else{o.value=!0;const h=e.cinemaList.slice(t*s,(t+1)*s);i.push(...h),t+=1,o.value=!1}}function L(){t=0,n.value=!1,i.splice(0,i.length),r.value.$el.scrollTop=0}return I(()=>e.cinemaList,(h,J)=>{L(),a()},{deep:!0}),{clEle:r,isLoading:o,isFinished:n,cinemaList_:i,curTimes:t,onLoad:a}}};function G(e,d,o,n,r,t){const s=f("cinema-item"),i=f("van-list");return c(),v(i,{ref:"clEle",class:"cinema-list",loading:n.isLoading,"onUpdate:loading":d[0]||(d[0]=a=>n.isLoading=a),finished:n.isFinished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:n.onLoad},{default:w(()=>[(c(!0),_(F,null,D(n.cinemaList_,a=>(c(),v(s,{key:a.cinemaId,item:a},null,8,["item"]))),128))]),_:1},8,["loading","finished","onLoad"])}var M=p(A,[["render",G],["__scopeId","data-v-41b82a5f"]]);export{M as C};