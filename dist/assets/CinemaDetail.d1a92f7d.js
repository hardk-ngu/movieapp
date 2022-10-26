import{r as N,f as p,ag as oe,al as le,am as ce,an as ie,_ as C,R as g,F as _,G as f,M as n,N as d,J as b,K as D,b as v,$ as A,O as P,a0 as X,a as O,w as re,Y as B,Z as V,ab as L,a2 as q,a3 as ue,ak as de,T as me,U as _e,o as fe,Q as he}from"./index.b6e75293.js";const j=N({}),F=N({}),I=N([]);let c={year:null,month:null,date:null},x=p(null);function ve(e){x.value=e}oe(()=>{x.value&&(ye(),Fe())});W();M();function W(){let e=new Date;c.year=e.getFullYear(),c.month=e.getMonth()+1,c.date=e.getDate(),c.timestamp=e.getTime()}function M(e){const a=new Date,o=a.getMonth()+1;a.setMonth(e||o),a.setDate(0),c.lastDate=a.getDate()}function pe(){const e=new Date;return e.setMonth(c.month-1),e.setDate(c.date),e.getTime()}function ge(e){const o=new Date().getTime();let t="",i=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"];const l=`${c.month}\u6708${c.date}\u65E5`;if(e-o<=864e5&&(t=`\u4ECA\u5929${l}`),e-o>=864e5&&(t=`\u660E\u5929${l}`),e-o>=864e5*2&&(t=`\u540E\u5929${l}`),e-o>=864e5*3){const s=new Date(e).getDay();t=`\u5468${i[s]}${l}`}return t}async function ye(){const e=await le({url:"/gateway",cinemaId:x.value,k:3931720});Object.assign(j,e.cinema)}async function Fe(){const e=await ce({url:"/gateway",cinemaId:x.value,k:8437150});I.push(...e.films),H(I[0].filmId)}async function H(e){const a=new Date(`${c.year}/${c.month}/${c.date}`).getTime(),o=await ie({url:"/gateway",filmId:e,cinemaId:x.value,date:(a/1e3).toFixed(),k:7955761});if(o){const i=ge(pe());F[e]||(F[e]={}),F[e][i]||(F[e][i]={},F[e][i].data=[]),F[e][i].data.push(...o.schedules)}c.date===c.lastDate&&(c.month+=1,c.date=0,M(c.month)),c.month>11&&(c.year+=1,c.month=1,M(c.month)),Object.keys(F[e]).length<4&&(c.date+=1,H(e))}function we(){W()}const ke={class:"detail-info"},Ie={class:"detail-info_name"},be={class:"detail-info_services"},$e={class:"detail-info_address"},Se={class:"text"},De={props:{detail:{type:Object,default:()=>{}},modelValue:Boolean},emits:["update:modelValue"],setup(e,{emit:a}){const o=e;function t(){a("update:modelValue",!o.modelValue)}return(i,l)=>{const s=g("van-icon");return _(),f("div",ke,[n("div",Ie,d(e.detail.name),1),n("ul",be,[(_(!0),f(b,null,D(e.detail.services,(r,h)=>(_(),f("li",{key:h,class:"service-item"},d(r.name),1))),128)),v(s,{"class-prefix":"myicon",name:"more",color:"orange",onClick:t})]),n("div",$e,[v(s,{"class-prefix":"myicon",name:"map"}),n("span",Se,d(e.detail.address),1),v(s,{"class-prefix":"myicon",name:"phone",class:"phone-icon"})])])}}};var Ce=C(De,[["__scopeId","data-v-04b8e03c"]]);const xe={class:"showcase-box"},Te=["onClick"],Oe=["src"],Be={props:{curFilmId:Number,curFilm:{type:Object,default:()=>{}},films:{type:Array,default:()=>[]},translateX:String},emits:["changeFilmInfo"],setup(e,{expose:a,emit:o}){const t=p(null);a({cover:t});function i(l,s){o("changeFilmInfo",l,s)}return(l,s)=>(_(),f("div",xe,[e.curFilm?(_(),f("div",{key:0,class:"bg-image",style:A({backgroundImage:`url(${e.curFilm.poster})`})},null,4)):P("",!0),n("div",{class:"showcase",style:A({transform:`translateX(${e.translateX})`})},[(_(!0),f(b,null,D(e.films,(r,h)=>(_(),f("div",{key:r.filmId,class:X(["case-item",{active:e.curFilmId===r.filmId}]),onClick:w=>i(r.filmId,h)},[n("img",{ref_for:!0,ref_key:"cover",ref:t,src:r.poster,class:"img",alt:""},null,8,Oe)],10,Te))),128))],4)]))}};var Ve=C(Be,[["__scopeId","data-v-4e02d9ee"]]);const Le={key:0,class:"film-info"},je={class:"info-header"},Me={class:"film-name"},Ne={class:"grade"},Pe={class:"film-introduce"},Xe={class:"no-break"},He={class:"no-break"},Ee={class:"no-break ellipsis"},ze={class:"actors ellipsis"},Ae={props:{curFilm:{type:Object,default:()=>{}}},emits:["toFilmDetail"],setup(e,{emit:a}){function o(i){let l="";return i.forEach((s,r)=>{r===i.length-1?l+=s.name:l+=`${s.name} `}),l}function t(){a("toFilmDetail")}return(i,l)=>{const s=g("van-icon");return e.curFilm?(_(),f("div",Le,[n("div",je,[n("span",Me,d(e.curFilm.name),1),n("span",Ne,d(e.curFilm.grade)+"\u5206",1)]),n("div",Pe,[n("span",Xe,d(e.curFilm.category)+"\xA0|\xA0",1),n("span",He,d(e.curFilm.runtime)+"\u5206\u949F\xA0|\xA0",1),n("span",Ee,d(e.curFilm.director)+"\xA0|\xA0",1),n("span",ze,d(o(e.curFilm.actors)),1)]),v(s,{"class-prefix":"myicon",name:"more",class:"moreIcon",onClick:t})])):P("",!0)}}};var Re=C(Ae,[["__scopeId","data-v-16cc117b"]]);const Ue={class:"schedule-list"},qe={class:"schedule-item_left"},We={class:"time"},Ye={class:"showTime"},Ge={class:"g-to-g"},Je={class:"type"},Ke={class:"language"},Qe={class:"g-to-g"},Ze={class:"schedule-item_right o-to-g"},et={class:"price"},tt={class:"text o-to-g"},nt={props:{schedules:{type:Object,default:()=>{}}},setup(e){const a=e,o=p(null),t=O(()=>Object.keys(a.schedules).length===4);re(()=>t.value,l=>{l&&(o.value=Object.keys(a.schedules)[0])});function i(l){const s=new Date(l*1e3),r=s.getHours(),h=s.getMinutes()<10?`0${s.getMinutes()}`:s.getMinutes();return`${r}:${h}`}return(l,s)=>{const r=g("van-tab"),h=g("van-tabs"),w=g("my-loading");return _(),f(b,null,[B(n("div",Ue,[v(h,{active:o.value,"onUpdate:active":s[0]||(s[0]=m=>o.value=m),shrink:"",color:"#ee3b3b","title-active-color":"#ee3b3b","line-height":"2px"},{default:q(()=>[(_(!0),f(b,null,D(e.schedules,(m,k)=>(_(),ue(r,{title:k,key:k,"title-style":{fontSize:"15px"},name:k},null,8,["title","name"]))),128))]),_:1},8,["active"]),e.schedules[o.value]?(_(!0),f(b,{key:0},D(e.schedules[o.value].data,m=>(_(),f("div",{class:X([{active:!m.isOnsell},"schedule-item"]),key:m.scheduleId},[n("div",qe,[n("div",We,[n("span",Ye,d(i(m.showAt)),1),n("span",Ge,d(i(m.endAt))+"\u6563\u573A",1)]),n("div",Je,[n("span",Ke,d(m.filmLanguage)+d(m.imagery),1),n("span",Qe,d(m.hallName),1)])]),n("div",Ze,[n("span",et,"\uFFE5"+d(L(de)(m.salePrice)),1),n("span",tt,d(m.isOnsell?"\u8D2D\u7968":"\u505C\u552E"),1)])],2))),128)):P("",!0)],512),[[V,L(t)]]),B(v(w,{position:"fixed",top:"80%"},null,512),[[V,!L(t)]])],64)}}};var st=C(nt,[["__scopeId","data-v-4f4ba704"]]);const E={name:"CinemaDetail",components:{CinemaInfo:Ce,FilmShowcase:Ve,FilmInfo:Re,ScheduleList:st},setup(e){const a=me(),o=_e(),t=p(null),i=p(null),l=p(null),s=p(!1),r=p(null),h=p(null),w=p("36%"),m=p(null),k=p(!1);let S=0,y=0;const $=O({get(){return!r.value&&I[0]?I[0].filmId:r.value},set(u){r.value=u}}),Y=O(()=>{const u=I.find(T=>T.filmId===$.value);return u||I[0]}),G=O(()=>F[$.value]||{});ve(a.query.cinemaId),fe(()=>{window.addEventListener("scroll",J)});function J(){const u=document.documentElement.scrollTop;K(u),Q(u)}function K(u){i.value||(i.value=`${t.value.$el.offsetHeight}px`,y=t.value.$el.offsetHeight),u>=y?h.value=j.name:h.value=""}function Q(u){S||(S=l.value.$el.offsetTop),u>=S?s.value=!0:s.value=!1}function Z(u,T){if(u!==$.value){$.value=u;const se=m.value.cover[T].offsetWidth/2;let ae=15,z=null;z=se*2+ae,w.value=`calc(36% - ${z*T}px)`,we(),ee(u)}}function ee(u){F[u]||H(u)}function te(){o.back()}function ne(){o.push({path:"/filmDetail",query:{filmId:$.value}})}return{navBar:t,navBarHeight:i,filmInfo:l,isSticky:s,detail:j,title:h,films:I,curFilmId:$,curFilm:Y,curFilmSchedule:G,translateX:w,coverImg:m,showServicesPopup:k,changeFilmInfo:Z,goBack:te,toFilmDetail:ne}}},R=()=>{he(e=>({"45c9d464":e.navBarHeight}))},U=E.setup;E.setup=U?(e,a)=>(R(),U(e,a)):R;const at=E,ot={class:"detail-view"},lt={class:"p_services"},ct={class:"p_service-item"},it={class:"service"},rt={class:"desc"};function ut(e,a,o,t,i,l){const s=g("my-nav-bar"),r=g("cinema-info"),h=g("film-showcase"),w=g("film-info"),m=g("schedule-list"),k=g("van-popup"),S=g("my-loading");return _(),f(b,null,[B(n("div",ot,[v(s,{ref:"navBar",title:t.title,isShowLeftText:!1,leftIconName:"back",leftIconSize:20,onOnClickLeft:t.goBack},null,8,["title","onOnClickLeft"]),v(r,{detail:t.detail,modelValue:t.showServicesPopup,"onUpdate:modelValue":a[0]||(a[0]=y=>t.showServicesPopup=y)},null,8,["detail","modelValue"]),v(h,{ref:"coverImg",curFilmId:t.curFilmId,curFilm:t.curFilm,films:t.films,translateX:t.translateX,onChangeFilmInfo:t.changeFilmInfo},null,8,["curFilmId","curFilm","films","translateX","onChangeFilmInfo"]),v(w,{ref:"filmInfo",curFilm:t.curFilm,onToFilmDetail:t.toFilmDetail,class:X({active:t.isSticky})},null,8,["curFilm","onToFilmDetail","class"]),v(m,{schedules:t.curFilmSchedule},null,8,["schedules"]),v(k,{class:"popup",show:t.showServicesPopup,"onUpdate:show":a[1]||(a[1]=y=>t.showServicesPopup=y),position:"bottom",style:{width:"100%"}},{default:q(()=>[n("ul",lt,[(_(!0),f(b,null,D(t.detail.services,y=>(_(),f("li",ct,[n("span",it,d(y.name)+"\uFF1A",1),n("span",rt,d(y.description),1)]))),256))])]),_:1},8,["show"])],512),[[V,t.films.length>0]]),B(v(S,{position:"fixed"},null,512),[[V,t.films.length===0]])],64)}var _t=C(at,[["render",ut],["__scopeId","data-v-6abd736d"]]);export{_t as default};
