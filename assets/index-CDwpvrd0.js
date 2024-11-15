import{aB as _e,aC as j,aD as he,B as Ie,C as re,D as xe,E as ie,d as ve,aE as oe,aF as we,aG as ye,G as Ce,H as Te,aH as Ee,J as M,aI as Ne,aJ as Oe,i as z,L as le,Q as Le,M as ze,b as F,e as ce,w as I,j as f,ar as Re,g as x,N as g,f as n,ak as ue,aK as Se,x as D,ah as O,aL as Me,c as J,F as fe,aM as Ae,aN as $e,aO as Be,aP as Ve,ag as Xe,aQ as Fe,aR as De,k as Pe,aS as We,aT as Ye,r as He,aU as je,P as Ue,U as H,aV as A,W as Ge}from"./app-BkYZ_hAF.js";var Ke=/\s/;function Je(e){for(var r=e.length;r--&&Ke.test(e.charAt(r)););return r}var Qe=/^\s+/;function Ze(e){return e&&e.slice(0,Je(e)+1).replace(Qe,"")}var de=NaN,qe=/^[-+]0x[0-9a-f]+$/i,ea=/^0b[01]+$/i,aa=/^0o[0-7]+$/i,na=parseInt;function me(e){if(typeof e=="number")return e;if(_e(e))return de;if(j(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=j(r)?r+"":r}if(typeof e!="string")return e===0?e:+e;e=Ze(e);var l=ea.test(e);return l||aa.test(e)?na(e.slice(2),l?2:8):qe.test(e)?de:+e}var Q=function(){return he.Date.now()},ta="Expected a function",sa=Math.max,ra=Math.min;function ia(e,r,l){var d,s,p,T,t,w,y=0,$=!1,E=!1,b=!0;if(typeof e!="function")throw new TypeError(ta);r=me(r)||0,j(l)&&($=!!l.leading,E="maxWait"in l,p=E?sa(me(l.maxWait)||0,r):p,b="trailing"in l?!!l.trailing:b);function m(i){var k=d,C=s;return d=s=void 0,y=i,T=e.apply(C,k),T}function R(i){return y=i,t=setTimeout(S,r),$?m(i):T}function c(i){var k=i-w,C=i-y,Y=r-k;return E?ra(Y,p-C):Y}function P(i){var k=i-w,C=i-y;return w===void 0||k>=r||k<0||E&&C>=p}function S(){var i=Q();if(P(i))return B(i);t=setTimeout(S,c(i))}function B(i){return t=void 0,b&&d?m(i):(d=s=void 0,T)}function W(){t!==void 0&&clearTimeout(t),y=0,d=w=s=t=void 0}function U(){return t===void 0?T:B(Q())}function V(){var i=Q(),k=P(i);if(d=arguments,s=this,w=i,k){if(t===void 0)return R(w);if(E)return clearTimeout(t),t=setTimeout(S,r),m(w)}return t===void 0&&(t=setTimeout(S,r)),T}return V.cancel=W,V.flush=U,V}var oa="Expected a function";function Z(e,r,l){var d=!0,s=!0;if(typeof e!="function")throw new TypeError(oa);return j(l)&&(d="leading"in l?!!l.leading:d,s="trailing"in l?!!l.trailing:s),ia(e,r,{leading:d,maxWait:r,trailing:s})}const la=e=>Object.keys(e),ca=Ie({urlList:{type:re(Array),default:()=>xe([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:Boolean,teleported:Boolean,closeOnPressEscape:{type:Boolean,default:!0},zoomRate:{type:Number,default:1.2},minScale:{type:Number,default:.2},maxScale:{type:Number,default:7},crossorigin:{type:re(String)}}),ua={close:()=>!0,switch:e=>ie(e),rotate:e=>ie(e)},fa=ve({name:"ElImageViewer"}),da=ve({...fa,props:ca,emits:ua,setup(e,{expose:r,emit:l}){var d;const s=e,p={CONTAIN:{name:"contain",icon:oe(we)},ORIGINAL:{name:"original",icon:oe(ye)}},{t:T}=Ce(),t=Te("image-viewer"),{nextZIndex:w}=Ee(),y=M(),$=M([]),E=Ne(),b=M(!0),m=M(s.initialIndex),R=Oe(p.CONTAIN),c=M({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),P=M((d=s.zIndex)!=null?d:w()),S=z(()=>{const{urlList:a}=s;return a.length<=1}),B=z(()=>m.value===0),W=z(()=>m.value===s.urlList.length-1),U=z(()=>s.urlList[m.value]),V=z(()=>[t.e("btn"),t.e("prev"),t.is("disabled",!s.infinite&&B.value)]),i=z(()=>[t.e("btn"),t.e("next"),t.is("disabled",!s.infinite&&W.value)]),k=z(()=>{const{scale:a,deg:u,offsetX:o,offsetY:v,enableTransition:_}=c.value;let h=o/a,N=v/a;const X=u*Math.PI/180,te=Math.cos(X),se=Math.sin(X);h=h*te+N*se,N=N*te-o/a*se;const K={transform:`scale(${a}) rotate(${u}deg) translate(${h}px, ${N}px)`,transition:_?"transform .3s":""};return R.value.name===p.CONTAIN.name&&(K.maxWidth=K.maxHeight="100%"),K});function C(){ge(),l("close")}function Y(){const a=Z(o=>{switch(o.code){case A.esc:s.closeOnPressEscape&&C();break;case A.space:ee();break;case A.left:ae();break;case A.up:L("zoomIn");break;case A.right:ne();break;case A.down:L("zoomOut");break}}),u=Z(o=>{const v=o.deltaY||o.deltaX;L(v<0?"zoomIn":"zoomOut",{zoomRate:s.zoomRate,enableTransition:!1})});E.run(()=>{H(document,"keydown",a),H(document,"wheel",u)})}function ge(){E.stop()}function pe(){b.value=!1}function be(a){b.value=!1,a.target.alt=T("el.image.error")}function ke(a){if(b.value||a.button!==0||!y.value)return;c.value.enableTransition=!1;const{offsetX:u,offsetY:o}=c.value,v=a.pageX,_=a.pageY,h=Z(X=>{c.value={...c.value,offsetX:u+X.pageX-v,offsetY:o+X.pageY-_}}),N=H(document,"mousemove",h);H(document,"mouseup",()=>{N()}),a.preventDefault()}function q(){c.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function ee(){if(b.value)return;const a=la(p),u=Object.values(p),o=R.value.name,_=(u.findIndex(h=>h.name===o)+1)%a.length;R.value=p[a[_]],q()}function G(a){const u=s.urlList.length;m.value=(a+u)%u}function ae(){B.value&&!s.infinite||G(m.value-1)}function ne(){W.value&&!s.infinite||G(m.value+1)}function L(a,u={}){if(b.value)return;const{minScale:o,maxScale:v}=s,{zoomRate:_,rotateDeg:h,enableTransition:N}={zoomRate:s.zoomRate,rotateDeg:90,enableTransition:!0,...u};switch(a){case"zoomOut":c.value.scale>o&&(c.value.scale=Number.parseFloat((c.value.scale/_).toFixed(3)));break;case"zoomIn":c.value.scale<v&&(c.value.scale=Number.parseFloat((c.value.scale*_).toFixed(3)));break;case"clockwise":c.value.deg+=h,l("rotate",c.value.deg);break;case"anticlockwise":c.value.deg-=h,l("rotate",c.value.deg);break}c.value.enableTransition=N}return le(U,()=>{Le(()=>{const a=$.value[0];a!=null&&a.complete||(b.value=!0)})}),le(m,a=>{q(),l("switch",a)}),ze(()=>{var a,u;Y(),(u=(a=y.value)==null?void 0:a.focus)==null||u.call(a)}),r({setActiveItem:G}),(a,u)=>(F(),ce(n(je),{to:"body",disabled:!a.teleported},{default:I(()=>[f(Re,{name:"viewer-fade",appear:""},{default:I(()=>[x("div",{ref_key:"wrapper",ref:y,tabindex:-1,class:g(n(t).e("wrapper")),style:ue({zIndex:P.value})},[x("div",{class:g(n(t).e("mask")),onClick:Se(o=>a.hideOnClickModal&&C(),["self"])},null,10,["onClick"]),D(" CLOSE "),x("span",{class:g([n(t).e("btn"),n(t).e("close")]),onClick:C},[f(n(O),null,{default:I(()=>[f(n(Me))]),_:1})],2),D(" ARROW "),n(S)?D("v-if",!0):(F(),J(fe,{key:0},[x("span",{class:g(n(V)),onClick:ae},[f(n(O),null,{default:I(()=>[f(n(Ae))]),_:1})],2),x("span",{class:g(n(i)),onClick:ne},[f(n(O),null,{default:I(()=>[f(n($e))]),_:1})],2)],64)),D(" ACTIONS "),x("div",{class:g([n(t).e("btn"),n(t).e("actions")])},[x("div",{class:g(n(t).e("actions__inner"))},[f(n(O),{onClick:o=>L("zoomOut")},{default:I(()=>[f(n(Be))]),_:1},8,["onClick"]),f(n(O),{onClick:o=>L("zoomIn")},{default:I(()=>[f(n(Ve))]),_:1},8,["onClick"]),x("i",{class:g(n(t).e("actions__divider"))},null,2),f(n(O),{onClick:ee},{default:I(()=>[(F(),ce(Xe(n(R).icon)))]),_:1}),x("i",{class:g(n(t).e("actions__divider"))},null,2),f(n(O),{onClick:o=>L("anticlockwise")},{default:I(()=>[f(n(Fe))]),_:1},8,["onClick"]),f(n(O),{onClick:o=>L("clockwise")},{default:I(()=>[f(n(De))]),_:1},8,["onClick"])],2)],2),D(" CANVAS "),x("div",{class:g(n(t).e("canvas"))},[(F(!0),J(fe,null,Pe(a.urlList,(o,v)=>We((F(),J("img",{ref_for:!0,ref:_=>$.value[v]=_,key:o,src:o,style:ue(n(k)),class:g(n(t).e("img")),crossorigin:a.crossorigin,onLoad:pe,onError:be,onMousedown:ke},null,46,["src","crossorigin"])),[[Ye,v===m.value]])),128))],2),He(a.$slots,"default")],6)]),_:3})]),_:3},8,["disabled"]))}});var ma=Ue(da,[["__file","image-viewer.vue"]]);const ga=Ge(ma);export{ga as E,ca as i};