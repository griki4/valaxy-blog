import{d as L,a as J,b as g,c as T,g as y,h as N,f as p,J as A,L as D,Q as Y,i as B,A as W,X as z,M as G,p as O,aj as X,aw as K,ax as Q,e as S,O as q,x as U,ay as Z,r as ee,az as te,u as ne,$ as re,v as oe,w as x,j as w,t as R,ad as se,F as ie,k as ae,a7 as le,a8 as ce,aA as ue,a9 as de,aa as fe,ab as pe}from"./app-BkYZ_hAF.js";import{i as me,E as _e}from"./index-CDwpvrd0.js";import{E as ve}from"./index-D3G4ipXL.js";function F(e){return typeof e=="string"}function ge(e){return typeof e=="number"}function H(e,t="px"){return F(e)||ge(e)?F(e)&&/\D/g.test(e)?e:e+t:""}const ye={class:"mb-15"},he={class:"flex items-center justify-end mt-2"},be=["data-path"],we=L({__name:"HairyPostFooter",setup(e){const t=J();return(r,n)=>(g(),T("div",ye,[n[3]||(n[3]=y("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1)),y("div",he,[n[0]||(n[0]=y("div",{class:"i-ri-eye-fill mr-2"},null,-1)),n[1]||(n[1]=N(" 阅读次数 ")),y("span",{class:"waline-pageview-count mx-2","data-path":p(t).path},null,8,be),n[2]||(n[2]=N(" 次 "))])]))}});typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Ee=e=>typeof e<"u";function Pe(e){return JSON.parse(JSON.stringify(e))}function xe(e,t,r,n={}){var o,s,i;const{clone:c=!1,passive:u=!1,eventName:l,deep:a=!1,defaultValue:m,shouldEmit:h}=n,d=W(),E=r||(d==null?void 0:d.emit)||((o=d==null?void 0:d.$emit)==null?void 0:o.bind(d))||((i=(s=d==null?void 0:d.proxy)==null?void 0:s.$emit)==null?void 0:i.bind(d==null?void 0:d.proxy));let P=l;t||(t="modelValue"),P=P||`update:${t.toString()}`;const $=f=>c?typeof c=="function"?c(f):Pe(f):f,v=()=>Ee(e[t])?$(e[t]):m,b=f=>{h?h(f)&&E(P,f):E(P,f)};if(u){const f=v(),V=A(f);let j=!1;return D(()=>e[t],C=>{j||(j=!0,V.value=$(C),Y(()=>j=!1))}),D(V,C=>{!j&&(C!==e[t]||a)&&b(C)},{deep:a}),V}else return B({get(){return v()},set(f){b(f)}})}var M="unified-overlay";function Le(e="",t=document.body){const r=document.createElement("div");return e&&(r.id=e),t!==!1&&t.appendChild(r),r}var _={position:null,spaces:{}};function $e(e=M,t=!0){return _.spaces[e]||(_.spaces[e]=0),t?`${e}--${++_.spaces[e]}`:e}function je(e=M){return _.spaces[e]||0}function Ce(){let e,t;const r=new Promise((n,o)=>{e=n,t=o});return r.resolve=n=>(e(n),r),r.reject=t,r}function Re(){typeof window>"u"&&typeof document>"u"||document.addEventListener("click",e=>{if(e.target instanceof Element){const{left:t,top:r,width:n,height:o}=e.target.getBoundingClientRect();t>0||r>0?_.position={x:t+n/2,y:r+o/2}:_.position=null}else _.position=null;setTimeout(()=>_.position=null,64)})}function Ie(e){function t(n,o){function s(l,a){const m=Ce(),h=$e(a.id,a.autoIncrement),d=je(a.id),E=Le(h,a.root);return e(n,l,Object.assign(a,{position:_.position,id:h,deferred:m,index:d,container:E})),m}let i;function c(l,a){return i||(i=s(l,a),i.finally(()=>i=void 0)),i}function u(l,a){const m={...o,...a};return m.only?c(l,m):s(l,m)}return u}function r(n,o,s){return t(n,s)(o)}return{define:t,render:r}}Re();function Se(){}function Te(e){return new Promise(t=>setTimeout(t,e))}const Ve=new RegExp("([\\p{Ll}\\d])(\\p{Lu})","gu"),He=new RegExp("(\\p{Lu})([\\p{Lu}][\\p{Ll}])","gu"),Ne=new RegExp("(\\d)(\\p{Ll})","gu"),Ue=new RegExp("(\\p{L})(\\d)","gu"),ke=/[^\p{L}\d]+/giu,I="$1\0$2";function Oe(e,t={}){let r=e.replace(Ve,I).replace(He,I);t.separateNumbers&&(r=r.replace(Ne,I).replace(Ue,I)),r=r.replace(ke,"\0");let n=0,o=r.length;for(;r.charAt(n)==="\0";)n++;if(n===o)return[];for(;r.charAt(o-1)==="\0";)o--;return r.slice(n,o).split(/\0/g)}function De(e){return t=>t.toLocaleLowerCase(e)}function Fe(e){return t=>t.toLocaleUpperCase(e)}function Ae(e,t){const r=De(t==null?void 0:t.locale),n=Fe(t==null?void 0:t.locale);return Oe(e,t).map((o,s)=>{const i=o[0];return(s>0&&i>="0"&&i<="9"?"_"+i:n(i))+r(o.slice(1))}).join("")}var Be={appContext:null},k=Symbol("OverlayScripts");function We(e={}){const{duration:t=0,immediate:r=!0,model:n="visible",automatic:o=!0}=e,s=z(k,Ge(n,e)),i=Reflect.get(s,"in_dec"),{visible:c,deferred:u,vanish:l}=s;async function a(){return c.value=!1,await Te(t),l==null||l(),Promise.resolve()}return!i&&o&&(u==null||u.then(a).catch(a)),!i&&r&&G(()=>c.value=!0),O(k,null),s}function Ge(e,t={}){const{reject:r="reject",resolve:n="resolve"}=t.events||{},o=W();if(!o)throw new Error("Please use usePrograms in component setup");const s=xe(o.props,e,o.emit,{passive:!0});return{reject:u=>{o==null||o.emit(r,u),s.value=!1},resolve:u=>{o==null||o.emit(n,u),s.value=!1},vanish:Se,visible:s,in_dec:!0}}function Me(e){const{reject:t}=e.deferred||{},{vanish:r}=e,n=A(!1);function o(){r==null||r(),t==null||t()}return{resolve:e.deferred.resolve,reject:e.deferred.reject,deferred:e.deferred,visible:n,vanish:o}}function Je(e,t){var r;const n=(t==null?void 0:t.app)||((r=Be.appContext)==null?void 0:r.app);n&&(e.config.globalProperties=n.config.globalProperties,Object.assign(e._context,n._context))}var Ye=Ie((e,t,r)=>{const{container:n,id:o,deferred:s,appContext:i}=r;function c(){l.unmount(),n.remove()}const u=L({name:Ae(o),setup:()=>{const a=Me({vanish:c,deferred:s});O(k,a)},render:()=>X(e,t)}),l=K(u);return Je(l,i),l.mount(n),c}),ze=Ye.render;const Xe={class:"HairyImageViewer fixed inset-0 z-2000"},Ke=L({__name:"HairyImageViewer",props:me,setup(e){const t=e,{visible:r,resolve:n}=We({duration:1e3});return G(()=>{document.body.style.overflow="hidden"}),Q(()=>{document.body.style.overflow=""}),(o,s)=>(g(),T("div",Xe,[p(r)?(g(),S(p(_e),q({key:0},t,{onClose:s[0]||(s[0]=i=>p(n)())}),null,16)):U("v-if",!0)]))}}),Qe=L({__name:"HairyImageGlobal",props:{row:{default:"auto"},col:{default:"auto"},gap:{default:10},justify:{default:"space-evenly"},align:{default:"initial"}},setup(e){const t=e;Z(()=>({width:H(t.row),height:H(t.col),gap:H(t.gap),justify:t.justify,align:t.align}));function r(n){ze(Ke,{urlList:[n],initialIndex:0})}return O("HairyImageGroup:preview",r),(n,o)=>ee(n.$slots,"default")}}),qe={class:"flex gap-2"},Ze={key:0,class:"tags flex-center gap-2 mt-2"},rt=L({__name:"post",props:{header:{}},setup(e){const t=te(),r=B(()=>t.value.addons["valaxy-addon-waline"]),n=ne(),o=re();function s(i){n.push(`/tags/${i}`)}return(i,c)=>{const u=le,l=ce,a=oe("router-view"),m=Qe,h=we,d=ue,E=de,P=fe,$=pe;return g(),S($,null,{default:x(()=>[w(u),w(l,{title:p(o).title},{description:x(()=>{var v;return[y("div",qe,[y("span",null,"发表于 "+R(p(se)(p(o).date).format("YYYY-MM-DD")),1),y("span",null,"本文字数 "+R(p(o).wordCount)+" 字",1),y("span",null,"阅读时长 "+R(p(o).readingTime)+" 分钟",1)]),(v=p(o).tags)!=null&&v.length?(g(),T("div",Ze,[(g(!0),T(ie,null,ae(p(o).tags,b=>(g(),S(p(ve),{key:b,class:"dark:bg-dark-50 cursor-pointer",onClick:f=>s(b)},{default:x(()=>[N(R(b?i.$t(b,{},{missingWarn:!1}):""),1)]),_:2},1032,["onClick"]))),128))])):U("v-if",!0)]}),_:1},8,["title"]),w(E,null,{default:x(()=>{var v;return[w(m,null,{default:x(()=>[w(a)]),_:1}),(v=r.value.options)!=null&&v.pageview?(g(),S(h,{key:0})):U("v-if",!0)]}),slide:x(()=>[w(d)]),_:1}),w(P)]),_:1})}}});export{rt as default};
