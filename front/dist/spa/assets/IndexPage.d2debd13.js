import{L as h,Y as f,a as v,N as s,Z as a,U as c,_ as p,$ as y,a0 as C,r as $,d as B,O as b,P as g,Q as u,a1 as k,a2 as w,a3 as x,a4 as S,V as m}from"./index.c3b04e32.js";const N={class:"parent"},V=["src"],q={key:0,class:"image2",src:"src/assets/battery/b.png"},L={key:1,class:"image2",src:"src/assets/battery/frame_white.png"},O={key:2,class:"image2",src:"src/assets/battery/frame_red.png"},P=h({__name:"BatteryStatus",props:{percentage:{type:Number,default:0},isCharging:{type:Boolean,default:!1}},setup(d){const l=d,{percentage:r,isCharging:t}=f(l),n=v(()=>`src/assets/battery/${Math.floor(6*r.value/100)}.png`);return(e,o)=>(s(),a("div",N,[c("img",{class:"image1",src:n.value},null,8,V),p(t)?(s(),a("img",q)):y("",!0),p(r)>29?(s(),a("img",L)):(s(),a("img",O))]))}});var Q=C(P,[["__scopeId","data-v-079e963e"]]);const D=c("div",{class:"text-h6"},"Overview:",-1),E={class:"row"},I=["onClick"],M={class:"text-h6"},J=h({__name:"IndexPage",setup(d){const r=`ws://${window.location.hostname}/script`,t=new WebSocket(r),n=$({});return t.onopen=e=>{t.send(""),console.log(e)},t.addEventListener("message",e=>{console.log(e.data);const o=JSON.parse(e.data);o.type==="getCurrentBatStats"&&(n.value=o.data)}),B(()=>{t.close()}),(e,o)=>(s(),b(S,{class:"q-ma-md"},{default:g(()=>[u(x,{class:"q-pa-md"},{default:g(()=>[D,c("div",E,[(s(!0),a(w,null,k(n.value,(i,_)=>(s(),a("div",{onClick:U=>e.$router.push(`/battery/${_}`),class:"col-3 q-pa-sm cursor-pointer",key:_},[c("div",M,m(_)+": "+m(Math.round(i.percentage*100))+" %",1),u(Q,{percentage:i.percentage*100,isCharging:i.is_charging},null,8,["percentage","isCharging"])],8,I))),128))])]),_:1})]),_:1}))}});export{J as default};
