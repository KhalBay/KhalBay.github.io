import{d as q,a as x,o as f,c as p,b as R,w as z,T as U,n as W,t as J,e as H,r as m,f as B,g as G,h as P,i as Q,j as d,k as X,l as N,F as L,m as Y,p as Z,q as tt,s as et}from"./index-ab916b9f.js";const D=(n,v)=>{const o=n.__vccOpts||n;for(const[i,u]of v)o[i]=u;return o};q("store",()=>({generate:(i,u)=>Math.floor(i+Math.random()*(u+1-i)),shuffle:i=>i.sort(()=>Math.random()-.5),addEmptyItems:(i,u)=>{for(let r=1;r<=i;r++)u.find(l=>l.id===r)||u.push({id:r,type:"Empty"})}}));const st={class:"tile"},ot=x({__name:"TileNumbers",props:{value:{type:Number,default:0},animationType:{type:String,default:""}},setup(n){return(v,o)=>(f(),p("div",st,[R(U,{name:n.animationType,mode:"out-in",appear:""},{default:z(()=>[n.value?(f(),p("p",{key:0,class:W(`tile-${n.value}`)},J(n.value),3)):H("",!0)]),_:1},8,["name"])]))}});const at=D(ot,[["__scopeId","data-v-b97d3d66"]]),F=n=>(tt("data-v-9b77c46b"),n=n(),et(),n),it={class:"info-wrap"},nt={class:"count-result"},ut={class:"count-result-item"},ct=F(()=>d("div",{class:"item-title"}," Score ",-1)),rt={class:"item-result"},lt={class:"count-result-item"},dt=F(()=>d("div",{class:"item-title"}," Best ",-1)),mt={class:"item-result"},vt=["onKeyup"],ft=x({__name:"GameNumbers",setup(n){const v=m(),o=m([]),i=m([]),u=m(0),r=m(0),l=m(""),k=m(!1),w=m(!1),T=B(()=>o.value.some(t=>t.num>=2048)),_=B(()=>o.value.some(t=>t.num===0)),A=()=>{localStorage.getItem("bestScore2048")&&(r.value=Number(localStorage.getItem("bestScore2048")))},O=(t,s,e=1)=>{let a=[];for(let S=0;S<e;S++)a.push(Math.trunc(Math.random()*(s-t)+t));return a},C=()=>{const t=O(0,16,2);t[0]===t[1]&&t[1]++;for(let s=0;s<16;s++)o.value.push({id:s,position:+`${Math.trunc(s/4)%4}${s%4}`+11,num:t.includes(s)?2:0,isSum:!1})},g=()=>{l.value="creat";const t=O(0,5)[0]===4?4:2,s=o.value.filter(a=>!a.num),e=O(0,s.length);s[e[0]].num=t,o.value.forEach(a=>{a.isSum=!1})},b=(t,s)=>{t.num*=2,u.value+=t.num,t.isSum=!0,s.num=0},y=(t,s,e)=>{s.num=e.num,e.num=0,h(t,s)},h=(t,s)=>{let e;switch(t){case"up":if(s.position<20)break;if(e=o.value.find(a=>a.position===s.position-10),(e==null?void 0:e.num)===s.num&&!e.isSum){b(e,s);break}!(e!=null&&e.num)&&e&&y("up",e,s);break;case"down":if(s.position>40)break;if(e=o.value.find(a=>a.position===s.position+10),(e==null?void 0:e.num)===s.num&&!e.isSum){b(e,s);break}!(e!=null&&e.num)&&e&&y("down",e,s);break;case"left":if(s.position%10===1)break;if(e=o.value.find(a=>a.position===s.position-1),(e==null?void 0:e.num)===s.num&&!e.isSum){b(e,s);break}!(e!=null&&e.num)&&e&&y("left",e,s);break;case"right":if(s.position%10===4)break;if(e=o.value.find(a=>a.position===s.position+1),(e==null?void 0:e.num)===s.num&&!e.isSum){b(e,s);break}!(e!=null&&e.num)&&e&&y("right",e,s);break}},I=()=>{l.value="up",i.value=JSON.parse(JSON.stringify(o.value)),o.value=o.value.sort((t,s)=>t.id-s.id),o.value.forEach(t=>{t.num&&t.position>20&&h("up",t)}),JSON.stringify(i.value)!==JSON.stringify(o.value)&&_.value&&setTimeout(g,50)},E=()=>{l.value="down",i.value=JSON.parse(JSON.stringify(o.value)),o.value=o.value.sort((t,s)=>s.id-t.id),o.value.forEach(t=>{t.num&&t.position<40&&h("down",t)}),o.value=o.value.sort((t,s)=>t.id-s.id),JSON.stringify(i.value)!==JSON.stringify(o.value)&&_.value&&setTimeout(g,50)},M=()=>{l.value="left",i.value=JSON.parse(JSON.stringify(o.value)),o.value=o.value.sort((t,s)=>t.position%10-s.position%10),o.value.forEach(t=>{t.num&&t.position%10!==1&&h("left",t)}),o.value=o.value.sort((t,s)=>t.id-s.id),JSON.stringify(i.value)!==JSON.stringify(o.value)&&_.value&&setTimeout(g,50)},$=()=>{l.value="right",i.value=JSON.parse(JSON.stringify(o.value)),o.value=o.value.sort((t,s)=>s.position%10-t.position%10),o.value.forEach(t=>{t.num&&t.position%10!==4&&h("right",t)}),o.value=o.value.sort((t,s)=>t.id-s.id),JSON.stringify(i.value)!==JSON.stringify(o.value)&&_.value&&setTimeout(g,50)},K=()=>{o.value.filter(e=>[1,3,4,6,9,11,12,14].includes(e.id)).map(e=>V(e)).every(e=>!e)&&!_.value&&(k.value=!0,r.value<u.value&&(localStorage.setItem("bestScore2048",u.value.toString()),r.value=u.value))},V=t=>{const s=o.value.some(c=>c.position===t.position-1&&c.num===t.num),e=o.value.some(c=>c.position===t.position+1&&c.num===t.num),a=o.value.some(c=>c.position===t.position+10&&c.num===t.num),S=o.value.some(c=>c.position===t.position-10&&c.num===t.num);return s||e||a||S},j=()=>{l.value="create",o.value=[],u.value=0,k.value=!1,C()};return G(T,()=>{w.value=!0,setTimeout(()=>w.value=!1,3e3)}),G(_,K),P(()=>{var t;A(),C(),(t=v.value)==null||t.focus()}),(t,s)=>{const e=Q("touch");return f(),p(L,null,[d("div",it,[d("div",nt,[d("div",ut,[ct,d("div",rt,J(u.value),1)]),d("div",lt,[dt,d("div",mt,J(r.value),1)])]),d("div",{class:"button-relaunch",onClick:j}," New game ")]),X((f(),p("div",{ref_key:"tileWrapper",ref:v,class:W(["wrap",{"game-over":k.value,"game-win":w.value}]),tabindex:"0",onKeyup:[N(I,["up"]),N(E,["down"]),N(M,["left"]),N($,["right"])]},[(f(!0),p(L,null,Y(o.value,a=>(f(),Z(at,{id:a.position,key:a.id,value:a.num,"animation-type":l.value},null,8,["id","value","animation-type"]))),128))],42,vt)),[[e,I,"swipe",{top:!0}],[e,E,"swipe",{bottom:!0}],[e,M,"swipe",{left:!0}],[e,$,"swipe",{right:!0}]])],64)}}});const _t=D(ft,[["__scopeId","data-v-9b77c46b"]]),gt=x({__name:"GameLayout",setup(n){return(v,o)=>(f(),p("main",null,[R(_t)]))}});export{gt as default};
