(this["webpackJsonpexchange-rate"]=this["webpackJsonpexchange-rate"]||[]).push([[0],{108:function(e,a,t){},161:function(e,a,t){},238:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(38),u=t.n(r),i=(t(108),t(102)),s=t(56),l=t(103),o=t.n(l),d=t(37),j=t.n(d),b=[{cur_unit:"KRW",curruncyName:"\uc6d0",curruncySign:"\uffe6",emoji:"\ud83c\uddf0\ud83c\uddf7"},{countryName:"\ubbf8\uad6d",cur_unit:"USD",curruncyName:"\ub2ec\ub7ec",curruncySign:"$",emoji:"\ud83c\uddfa\ud83c\uddf8"},{cur_unit:"EUR",curruncyName:"\uc720\ub85c",curruncySign:"\u20ac",emoji:"\ud83c\uddea\ud83c\uddfa"},{cur_unit:"CNH",curruncyName:"\uc704\uc548",curruncySign:"\xa5",emoji:"\ud83c\udde8\ud83c\uddf3"},{cur_unit:"JPY(100)",curruncyName:"\uc5d4",curruncySign:"\xa5",emoji:"\ud83c\uddef\ud83c\uddf5"}],h=(t(161),t(69)),m=t(136),g=t(243),x=t(131),f=t(39),y=t(242),O=t(137),v=t(138),p=t(244),N=t(23),_=h.a.Option;var C=function(){var e=Object(n.useState)(),a=Object(s.a)(e,2),t=a[0],c=a[1],r=Object(n.useState)([]),u=Object(s.a)(r,2),l=u[0],d=u[1],C=Object(n.useState)(b[1]),S=Object(s.a)(C,2),k=S[0],w=S[1],Y=Object(n.useState)(!1),I=Object(s.a)(Y,2),F=I[0],D=I[1],z=Object(n.useState)(0),M=Object(s.a)(z,2),R=M[0],P=M[1],B=Object(n.useState)(0),E=Object(s.a)(B,2),J=E[0],K=E[1],L=Object(n.useState)(),T=Object(s.a)(L,2),U=T[0],W=T[1],A=[{title:"",dataIndex:"emoji",width:"40px"},{title:"\uad6d\uac00",key:"countryName",dataIndex:"countryName"},{title:"\ud1b5\ud654\uba85",key:"curruncyName",dataIndex:"curruncyName"},{title:"\ud1b5\ud654\ucf54\ub4dc",dataIndex:"cur_unit"},{title:"\ub9e4\ub9e4 \uae30\uc900\uc728",dataIndex:"deal_bas_r"},{title:"\uc804\uc77c\ub300\ube44",key:"netChange",dataIndex:"netChange",render:function(e,a){return Object(N.jsx)("div",{children:e<0?Object(N.jsxs)(m.a,{color:"red",children:[Object(N.jsx)(O.a,{})," ",e]},a):Object(N.jsxs)(m.a,{color:"blue",children:[Object(N.jsx)(v.a,{})," ",e]},a)})}}];return Object(n.useEffect)((function(){var e=j()(U),a=e.day(),t=e,n=e;6===a?(t=e.clone().subtract(1,"days"),n=e.clone().subtract(2,"days")):0===a?(t=e.clone().subtract(2,"days"),n=e.clone().subtract(3,"days")):1===a?(t=e,n=e.clone().subtract(3,"days")):(t=e,n=e.clone().subtract(1,"days"));var c=t.format("YYYYMMDD"),r=n.format("YYYYMMDD"),u=[];o.a.get("https://rhv2mfccrf.execute-api.ap-northeast-2.amazonaws.com/prod/exchange/"+c).then((function(e){o.a.get("https://rhv2mfccrf.execute-api.ap-northeast-2.amazonaws.com/prod/exchange/"+r).then((function(a){for(var t=0;t<e.data.length;t++)if(a.data[t].cur_unit===e.data[t].cur_unit){var n=(a.data[t].deal_bas_r.replace(/,/g,"")-e.data[t].deal_bas_r.replace(/,/g,"")).toFixed(2);Object.assign(e.data[t],{netChange:n})}else alert("netChange error");var c,r=-1,s=Object(i.a)(b);try{var l=function(){var a=c.value,t=e.data.filter((function(e){return e.cur_unit===a.cur_unit}));if(0!==t.length){r+=1;var n=t[0].cur_nm.split(" ");"\uc704\uc548\ud654"===n[0]&&(n[0]="\uc911\uad6d",n[1]="\uc704\uc548"),"\uc720\ub85c"===n[0]&&(n[0]="\uc720\ub7fd\uc5f0\ud569",n[1]="\uc720\ub85c");var i={key:r,countryName:n[0],curruncyName:n[1]};Object.assign(i,a,t[0]),u.push(i),e.data.splice(e.data.indexOf(t[0]),1)}};for(s.s();!(c=s.n()).done;)l()}catch(x){s.e(x)}finally{s.f()}var o,j=Object(i.a)(e.data);try{for(j.s();!(o=j.n()).done;){var h=o.value;r+=1;var m=h.cur_nm.split(" "),g={key:r,countryName:m[0],curruncyName:m[1]};Object.assign(g,h),u.push(g)}}catch(x){j.e(x)}finally{j.f()}d(u)}))}))}),[U]),Object(N.jsx)("div",{className:"exchange-container",children:Object(N.jsxs)("div",{className:"exchange-form",children:[Object(N.jsx)("div",{className:"datepicker",children:Object(N.jsx)(g.a,{size:"large",bordered:!1,value:U,onChange:function(e){if(j()().isBefore(e)||null===e)return alert("\uc624\ub298 \ub0a0\uc9dc\ubcf4\ub2e4 \uc774\uc804 \ub0a0\uc9dc\ub9cc \uc870\ud68c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),void W(j()());W(e)}})}),Object(N.jsxs)("div",{className:"exchange-edit",children:[Object(N.jsx)(h.a,{className:"exchange-select",value:k.countryName,onChange:function(e){var a=l[e];w(a),c(a.deal_bas_r.replace(/,/g,""))},children:l.map((function(e,a){return Object(N.jsx)(_,{value:a,children:e.countryName},e.countryName)}))}),Object(N.jsx)(x.a,{className:"exchange-input",allowClear:!0,id:"exchangeRate",value:t,type:"number",onChange:function(e){c(e.target.value)},disabled:!F}),Object(N.jsx)(f.a,{className:"exchange-button",onClick:function(e){D((function(e){return!e}))},type:F?"":"primary",children:F?"\ucde8\uc18c":"\ud3b8\uc9d1"})]}),Object(N.jsxs)("div",{className:"result-edit",children:[Object(N.jsx)("label",{htmlFor:"currency",children:k.cur_unit.length>3?k.cur_unit.substring(0,3):k.cur_unit}),Object(N.jsx)(x.a,{allowClear:!0,id:"currency",value:R,type:"number",onChange:function(e){P(e.target.value),K(e.target.value*t)},prefix:k.curruncySign,suffix:k.curruncyName})]}),Object(N.jsx)(p.a,{className:"swap-icon"}),Object(N.jsxs)("div",{className:"result-edit",children:[Object(N.jsx)("label",{htmlFor:"krw",children:"KRW"}),Object(N.jsx)(x.a,{allowClear:!0,id:"krw",value:J,type:"number",onChange:function(e){K(e.target.value),P(e.target.value/t)},prefix:"\uffe6",suffix:"\uc6d0"})]}),Object(N.jsx)(y.a,{className:"exchange-table",columns:A,dataSource:l,size:"middle",scroll:{y:"500px"},pagination:{defaultPageSize:50,position:["none","none"]},onRow:function(e,a){return{onClick:function(){var a=e.deal_bas_r.replace(/,/g,"");c(a),w(e)}}}})]})})};var S=function(){return Object(N.jsx)("div",{className:"App",children:Object(N.jsx)(C,{})})},k=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,245)).then((function(a){var t=a.getCLS,n=a.getFID,c=a.getFCP,r=a.getLCP,u=a.getTTFB;t(e),n(e),c(e),r(e),u(e)}))};t(237);u.a.render(Object(N.jsx)(c.a.StrictMode,{children:Object(N.jsx)(S,{})}),document.getElementById("root")),k()}},[[238,1,2]]]);
//# sourceMappingURL=main.b183a922.chunk.js.map