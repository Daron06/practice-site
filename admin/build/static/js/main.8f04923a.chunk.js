(this.webpackJsonppractice=this.webpackJsonppractice||[]).push([[0],{132:function(e,a,t){e.exports=t(220)},219:function(e,a,t){},220:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),c=t(11),r=t.n(c),i=t(29),s=t(40),o=t(7),d=t(15),m=t(46),u=t(51),E=t.n(u),_=(t(141),t(144),{apiKey:"AIzaSyB8bzdzxrTeMg3yFk83R2gMVHk0Zrh1GI0",authDomain:"daron-b15b1.firebaseapp.com",databaseURL:"https://daron-b15b1.firebaseio.com",projectId:"daron-b15b1",storageBucket:"daron-b15b1.appspot.com",messagingSenderId:"875304473033",appId:"1:875304473033:web:b0697833a48537eff41818"});E.a.apps.length?E.a.app():E.a.initializeApp(_);var v=E.a.firestore(),f=v.collection("users"),p=v.collection("tasks"),b=v.collection("messages"),h=v.collection("lesson"),g=v.collection("resources"),y=t(65),k=t.n(y),S=t(277),N=t(267),O=t(274),j=t(262),C=t(263),w=t(79),I=t.n(w),x=function(){var e=l.a.useState([]),a=Object(o.a)(e,2),t=a[0],n=a[1],c=l.a.useState(""),r=Object(o.a)(c,2),i=r[0],s=r[1],d=l.a.useState([]),u=Object(o.a)(d,2),_=u[0],v=u[1],f=l.a.useState(""),p=Object(o.a)(f,2),b=p[0],h=p[1],y=l.a.useState([]),w=Object(o.a)(y,2),x=w[0],T=w[1],A=l.a.useState(""),M=Object(o.a)(A,2),U=M[0],W=M[1],L=l.a.useState(""),P=Object(o.a)(L,2),z=P[0],D=P[1],R=l.a.useState(""),B=Object(o.a)(R,2),F=B[0],K=B[1],H=l.a.useState(""),V=Object(o.a)(H,2),G=V[0],J=V[1],X=l.a.useState(""),Z=Object(o.a)(X,2),q=Z[0],Q=Z[1],Y=l.a.useState(""),$=Object(o.a)(Y,2),ee=$[0],ae=$[1];l.a.useEffect((function(){g.onSnapshot((function(e){var a=[];e.forEach((function(e){var t=[];for(var n in e.data())t.push(e.data()[n]);a.push({id:e.id,title:t})})),n(a)}))}),[]),l.a.useEffect((function(){x.length&&(ae(x[0].text),Q(x[0].title))}),[x]);return l.a.createElement("div",{className:"admin_resources"},l.a.createElement("div",{className:"admin_resources__title"},l.a.createElement("div",{className:"admin_resources__accordion"},l.a.createElement(O.a,null,l.a.createElement(j.a,{expandIcon:l.a.createElement(I.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},l.a.createElement(C.a,null,"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e")),l.a.createElement("div",{style:{padding:15}},l.a.createElement("div",null,l.a.createElement(S.a,{value:z,onChange:function(e){D(String(e.target.value)||"")},fullWidth:!0,label:"\u041d\u0430\u0437\u043e\u0432\u0438\u0442\u0435 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e",variant:"outlined"})),l.a.createElement("div",{className:"admin_resources__accordion--btn"},l.a.createElement(N.a,{variant:"contained",color:"secondary",onClick:function(){return D("")}},"\u041e\u0442\u043c\u0435\u043d\u0430"),l.a.createElement(N.a,{onClick:function(){g.doc(z).set({}),D("")},variant:"contained",color:"secondary",disabled:!z},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"))))),l.a.createElement("div",{className:"admin_resources__title__nav"},t.map((function(e){return l.a.createElement("div",{key:e.id},l.a.createElement(N.a,{onClick:function(){return a=e.id,W(""),T([]),h(a),void g.doc(a).onSnapshot((function(e){var a=[];for(var t in e.data())a.push(t);v(a)}));var a},fullWidth:!0,color:"secondary"},e.id))}))),l.a.createElement("div",null,l.a.createElement("h2",null,"\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438"),l.a.createElement(S.a,{value:i,onChange:function(e){s(String(e.target.value)||"")},fullWidth:!0,label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438",variant:"outlined"}),l.a.createElement(N.a,{disabled:!i,onClick:function(){g.doc(i).get().then((function(e){e.exists?(g.doc(i).delete().then((function(){console.log("Document successfully deleted!")})).catch((function(e){console.error("Error removing document: ",e)})),h(""),T([])):alert("\u0422\u0430\u043a\u043e\u0439 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438 \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442")}))},fullWidth:!0,color:"secondary"},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e"))),l.a.createElement("div",{className:"admin_resources__items"},l.a.createElement("div",{className:"admin_resources__accordion"},l.a.createElement(O.a,null,l.a.createElement(j.a,{expandIcon:l.a.createElement(I.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},l.a.createElement(C.a,null,"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0434\u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e")),l.a.createElement("div",{style:{padding:15}},b?l.a.createElement("div",null,l.a.createElement("div",{style:{paddingBottom:10}},"\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f: ",b),l.a.createElement("div",null,l.a.createElement(S.a,{value:F,onChange:function(e){K(String(e.target.value)||"")},fullWidth:!0,label:"Title - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0434\u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438",variant:"outlined"})),l.a.createElement("div",{style:{marginTop:30}},l.a.createElement(S.a,{value:G,onChange:function(e){J(String(e.target.value)||"")},fullWidth:!0,placeholder:"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u0437\u043d\u0430\u043d\u0438\u044f\u043c\u0438, \u0441\u0435\u043d\u0441\u0435\u0439",multiline:!0,label:"\u0422\u0435\u043a\u0441\u0442 - \u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0443\u0440\u043e\u043a\u0430",variant:"outlined"})),l.a.createElement("div",{className:"admin_resources__accordion--btn"},l.a.createElement(N.a,{onClick:function(){K(""),J("")},variant:"contained",color:"secondary"},"\u041e\u0442\u043c\u0435\u043d\u0430"),l.a.createElement(N.a,{onClick:function(){g.doc(b).set(Object(m.a)({},F,{title:F,text:G}),{merge:!0}),K(""),J("")},variant:"contained",color:"secondary",disabled:!F},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"))):l.a.createElement("div",null,"\u0412\u044b \u0435\u0449\u0451 \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043b\u0438 \u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e")))),_.map((function(e){return l.a.createElement("div",{key:e},l.a.createElement(N.a,{onClick:function(){return function(e){W(e),g.doc(b).get().then((function(a){a.exists?T([a.data()[e]]):console.log("No such document!")}))}(e)},fullWidth:!0,color:"primary"},e))}))),l.a.createElement("div",{className:"admin_resources__content"},l.a.createElement("div",{className:"admin_resources__accordion"},l.a.createElement(O.a,null,l.a.createElement(j.a,{expandIcon:l.a.createElement(I.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},l.a.createElement(C.a,null,"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e\u0434\u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e")),l.a.createElement("div",{style:{padding:15}},x.length?l.a.createElement("div",null,l.a.createElement("div",{style:{paddingBottom:10}},"\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044f: ",x[0].title),l.a.createElement("div",null,l.a.createElement(S.a,{value:q,onChange:function(e){Q(String(e.target.value)||"")},fullWidth:!0,label:"Title - \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0434\u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438",variant:"outlined"})),l.a.createElement("div",{style:{marginTop:30}},l.a.createElement(S.a,{value:ee,onChange:function(e){ae(String(e.target.value)||"")},fullWidth:!0,placeholder:"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u0437\u043d\u0430\u043d\u0438\u044f\u043c\u0438, \u0441\u0435\u043d\u0441\u0435\u0439",multiline:!0,label:"\u0422\u0435\u043a\u0441\u0442 - \u043a\u043e\u043d\u0442\u0435\u043d\u0442 \u0443\u0440\u043e\u043a\u0430",variant:"outlined"})),l.a.createElement("div",{className:"admin_resources__accordion--btn"},l.a.createElement(N.a,{onClick:function(){Q(x[0].title),ae(x[0].text)},variant:"contained",color:"secondary"},"\u041e\u0442\u043c\u0435\u043d\u0430"),l.a.createElement(N.a,{onClick:function(){g.doc(b).update(Object(m.a)({},U,E.a.firestore.FieldValue.delete())),g.doc(b).set(Object(m.a)({},q,{title:q,text:ee}),{merge:!0}),T([{title:q,text:ee}]),W(q)},variant:"contained",color:"secondary"},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"))):l.a.createElement("div",null,"\u0412\u044b \u0435\u0449\u0451 \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043b\u0438 \u043f\u043e\u0434\u043a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u044e")))),!!x.length&&l.a.createElement("div",{key:x[0].title,className:"admin_resources__content__wrapper"},l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},l.a.createElement("h2",null,x[0].title),l.a.createElement(N.a,{onClick:function(){return x[0].title,g.doc(b).update(Object(m.a)({},U,E.a.firestore.FieldValue.delete())),T([]),void W("")},color:"secondary"},"Delete")),l.a.createElement("div",null,l.a.createElement(k.a,{source:x[0].text})))))},T=t(124),A=t(275),M=t(221),U=t(118),W=t.n(U),L=function(){var e=l.a.useState([]),a=Object(o.a)(e,2),t=a[0],n=a[1],c=l.a.useState(""),r=Object(o.a)(c,2),i=r[0],s=r[1],d=l.a.useState(""),m=Object(o.a)(d,2),u=m[0],E=m[1],_=l.a.useState(""),v=Object(o.a)(_,2),f=v[0],p=v[1],b=l.a.useState(""),g=Object(o.a)(b,2),y=g[0],k=g[1],O=l.a.useState(!1),j=Object(o.a)(O,2),C=j[0],w=j[1];l.a.useEffect((function(){h.onSnapshot((function(e){var a=[];E(String(e.docs.length+1)),e.forEach((function(e){a.push({number:e.data().number,text:e.data().text,videoPath:e.data().videoPath})})),n(a)}))}),[]);var I=function(e,a){"clickaway"!==a&&w(!1)};return l.a.createElement("div",{className:"admin__lesson"},l.a.createElement("div",{className:"admin__lesson__nav"},l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",{className:"admin__lesson__nav__item--first"},l.a.createElement(N.a,{onClick:function(){s(u),p(""),k("")},color:"secondary",variant:"outlined"},"New lesson")),!!t.length&&t.map((function(e){return l.a.createElement("li",{key:e.number},l.a.createElement(N.a,{onClick:function(){return function(e){var a=t.find((function(a){return a.number===e}));console.log(a),s(a.number),p(a.videoPath),k(a.text)}(e.number)},color:"secondary",variant:"outlined"},"Lesson \u2116",e.number))}))))),l.a.createElement("div",{className:"admin__lesson__content"},l.a.createElement("div",{className:"admin__lesson__content"},l.a.createElement("div",{style:{display:"flex"}},l.a.createElement("div",{className:"admin__lesson__textField"},l.a.createElement(S.a,{value:i,onChange:function(e){s(String(e.target.value)||"")},label:"Lesson Number",variant:"outlined"})),l.a.createElement("div",{className:"admin__lesson__textField"},l.a.createElement(S.a,{style:{width:770},value:f,onChange:function(e){p(String(e.target.value)||"")},label:"Lesson Video Path",variant:"outlined"}))),l.a.createElement("div",{className:"admin__message__button"},l.a.createElement(N.a,{color:"primary",disabled:0===y.length||!i||!f,variant:"contained",onClick:function(){h&&h.doc(i).set({number:i,text:y,videoPath:f,newLesson:!0}),k(""),s(""),p(""),w(!0)}},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"))),l.a.createElement("div",{className:"admin__lesson__field"},l.a.createElement(T.a,{className:"scrollbar",value:y,onChange:function(e){k(e.target.value)},fullWidth:!0,inputProps:{"aria-label":"naked"},multiline:!0,placeholder:"\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u044f\u0437\u044b\u043a \u0440\u0430\u0437\u043c\u0435\u0442\u043a\u0438 - Markdown"}))),l.a.createElement(A.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:C,autoHideDuration:6e3,onClose:I,message:"\u0423\u0440\u043e\u043a \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d",action:l.a.createElement(l.a.Fragment,null,l.a.createElement(N.a,{color:"secondary",size:"small",onClick:I},"\u0421\u043a\u0440\u044b\u0442\u044c"),l.a.createElement(M.a,{size:"small","aria-label":"close",color:"inherit",onClick:I},l.a.createElement(W.a,{fontSize:"small"})))}))},P=t(24),z=t(281),D=t(270),R=t(271),B=t(119),F=t.n(B),K=t(76),H=t.n(K),V=t(268),G=t(273),J=t(279),X=t(280),Z=t(272),q=t(264),Q=function(e){var a=e.taskCurrentUser,t=e.setUserMessages,n=e.setCurrentTaskInfo,c=l.a.useState(""),r=Object(o.a)(c,2),i=r[0],s=r[1],d=l.a.useState(!1),m=Object(o.a)(d,2),u=m[0],E=m[1],_=l.a.useState(),v=Object(o.a)(_,2),f=v[0],h=v[1],g=function(){E(!1),s("")};return l.a.createElement("div",{className:"admin__table__content--task admin__".concat(a.status)},l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},l.a.createElement("div",null,l.a.createElement("span",{style:{fontWeight:500,fontSize:24}},a.status),l.a.createElement("span",{style:{color:"gray",fontWeight:500,fontSize:19,paddingLeft:10}},Object(R.a)(a.createdAt.toDate(),"dd.MM.yyyy - HH:mm"))),l.a.createElement("span",{style:{fontWeight:600,fontSize:24}},"\u0423\u0440\u043e\u043a \u2116"+a.number),"pending"===a.status&&l.a.createElement("div",null,l.a.createElement(N.a,{onClick:function(){s(""),E(!0)},variant:"outlined",color:"secondary"},"\u0440\u0435\u0448\u0435\u043d\u0438\u0435"))),l.a.createElement("p",null,"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0433\u0438\u0442\u0445\u0430\u0431:",a.reference),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},l.a.createElement(N.a,{variant:"contained",color:"primary",onClick:function(){n(a),b.where("taskId","==",a.taskId).orderBy("createdAt","asc").onSnapshot((function(e){var a=[];e.forEach((function(e){a.push(Object(P.a)(Object(P.a)({},e.data()),{},{messageId:e.id}))})),t(a)}))}},"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f",l.a.createElement(V.a,{style:{color:"grey",marginLeft:5},color:"secondary",badgeContent:0,variant:"dot"},l.a.createElement(F.a,null))),l.a.createElement(N.a,{color:"secondary",onClick:function(){p.doc(a.taskId).delete(),b.where("taskId","==",a.taskId).get().then((function(e){e.forEach((function(e){e.ref.delete()}))}))},startIcon:l.a.createElement(H.a,null)},"DELETE")),l.a.createElement(G.a,{className:"admin_activities__modal",open:u,onClose:g,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description"},l.a.createElement("div",{className:"item-wrapper admin__modal"},l.a.createElement(J.a,{className:"admin_activities__formControl"},l.a.createElement(X.a,{htmlFor:"demo-dialog-native"},"\u0420\u0435\u0448\u0435\u043d\u0438\u0435"),l.a.createElement(Z.a,{native:!0,value:f,onChange:function(e){h(String(e.target.value)||"")},input:l.a.createElement(q.a,{id:"demo-dialog-native"})},l.a.createElement("option",{"aria-label":"None",value:""}),l.a.createElement("option",{value:"completed"},"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e"),l.a.createElement("option",{value:"rejected"},"\u041e\u0442\u043a\u043b\u043e\u043d\u0435\u043d\u043e"))),l.a.createElement("p",null,"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439: "),l.a.createElement("div",{className:"admin__modal-field"},l.a.createElement(T.a,{className:"scrollbar",rows:8,value:i,onChange:function(e){s(e.target.value)},fullWidth:!0,inputProps:{"aria-label":"naked"},multiline:!0,placeholder:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"})),l.a.createElement("div",{className:"admin__modal-button"},l.a.createElement("div",{className:"button--cancel"},l.a.createElement(N.a,{onClick:g,variant:"contained"},"\u041e\u0442\u043c\u0435\u043d\u0430")),l.a.createElement("div",{className:"button--send"},l.a.createElement(N.a,{onClick:function(){return e=f,p.doc(a.taskId).set({status:e,number:a.number,createdAt:a.createdAt,decision:i,reference:"",newTask:!0,responseAt:new Date,uid:a.uid}),void E(!1);var e},disabled:!f,variant:"contained"},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"))))))},Y=t(276),$=t(269);function ee(e){var a=e.taskId,t=l.a.useState(""),n=Object(o.a)(t,2),c=n[0],r=n[1],i=l.a.useState(!1),s=Object(o.a)(i,2),d=s[0],m=s[1],u=l.a.useState([]),E=Object(o.a)(u,2),_=E[0],v=E[1],f=l.a.useState([]),h=Object(o.a)(f,2),g=h[0],y=h[1],k=l.a.useRef(null);l.a.useEffect((function(){if(d){var e=k.current;null!==e&&e.focus()}}),[d]);var S=function(){c&&b.add({name:"\u0426\u0430\u0440\u0435\u0432\u0438\u0447",text:c,profilePicUrl:ge,createdAt:new Date,newMessage:!0,uid:he,taskId:a}),r("")};return l.a.createElement("div",null,l.a.createElement(N.a,{color:"secondary",onClick:function(){m(!0),b.where("taskId","==",a).orderBy("createdAt","asc").onSnapshot((function(e){var a=[];e.forEach((function(e){a.push(Object(P.a)(Object(P.a)({},e.data()),{},{messageId:e.id}))})),v(a)})),p.doc(a).get().then((function(e){e.exists&&y(e.data())}))}},"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433"),l.a.createElement(Y.a,{open:d,onClose:function(){m(!1),b.where("taskId","==",a).where("uid","!=",he).where("newMessage","==",!0).get().then((function(e){e.forEach((function(e){b.doc(e.id).update({newMessage:!1})}))}))},maxWidth:"lg",scroll:"body","aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description"},l.a.createElement($.a,null,l.a.createElement("div",{className:"admin__table__content--task admin__".concat(g.status)},l.a.createElement("h2",null,"\u0417\u0430\u0434\u0430\u043d\u0438\u0435 \u2116",g.number),l.a.createElement("p",null,"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0433\u0438\u0442\u0445\u0430\u0431: ",g.reference||"\u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"),l.a.createElement("p",null,"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043a \u0437\u0430\u0434\u0430\u043d\u0438\u044e: ",g.decision||"\u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442")),!!_.length&&_.map((function(e){return l.a.createElement(te,{key:e.messageId,message:e,newMessages:!1})})),l.a.createElement("div",{className:"admin__message__chat"},l.a.createElement("div",{className:"admin__message__chat-field"},l.a.createElement(T.a,{className:"scrollbar",rows:4,rowsMax:10,value:c,onChange:function(e){r(e.target.value)},onKeyUp:function(e){e.shiftKey||"Enter"!==e.key||S()},fullWidth:!0,inputProps:{"aria-label":"naked"},multiline:!0,placeholder:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"})),l.a.createElement("div",{className:"admin__message__button"},l.a.createElement(N.a,{color:"primary",disabled:0===c.length,variant:"contained",onClick:S,endIcon:l.a.createElement(D.a,null,"send")},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"))))))}var ae,te=function(e){var a=e.message,t=e.newMessage;return l.a.createElement("div",{className:"admin__message__item"},l.a.createElement("h3",null,"\u0417\u0430\u0434\u0430\u043d\u0438\u0435 \u21162"),l.a.createElement("br",null),l.a.createElement("div",{className:"admin__message__user"},l.a.createElement("div",{className:"admin__message__user--info"},l.a.createElement(z.a,{className:"admin__message__avatar",alt:"user avatar",src:a.profilePicUrl||void 0}),l.a.createElement("div",{className:"admin__message__title"},l.a.createElement("span",{className:"admin__message__name"},a.name),l.a.createElement("span",{className:"admin__message__info"},"\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e ",Object(R.a)(a.createdAt.toDate(),"dd.MM.yyyy, \u0432 HH.mm.ss")))),l.a.createElement("div",null,t?l.a.createElement(ee,{taskId:a.taskId}):l.a.createElement(N.a,{color:"secondary",onClick:function(){return e=a.messageId,void b.doc(e).delete();var e},startIcon:l.a.createElement(H.a,null)},"DELETE"))),l.a.createElement("div",{className:"admin__message__item-text"},l.a.createElement(k.a,{source:a.text})))},ne=function(e){return function(e){return e.users}(e).items},le=function(){var e=l.a.useState([]),a=Object(o.a)(e,2),t=a[0],n=a[1],c=l.a.useState([]),r=Object(o.a)(c,2),s=r[0],d=r[1],m=l.a.useState(),u=Object(o.a)(m,2),E=u[0],_=u[1],v=l.a.useState(""),f=Object(o.a)(v,2),h=f[0],g=f[1],y=Object(i.c)(ne),k=function(){h&&(console.log(E),b.add({name:"\u0426\u0430\u0440\u0435\u0432\u0438\u0447",text:h,profilePicUrl:ge,createdAt:new Date,newMessage:!0,uid:he,taskId:E.taskId})),g("")};return l.a.createElement("div",null,l.a.createElement("div",{className:"admin__table"},l.a.createElement("div",{className:"admin__table__header"},y.filter((function(e){return e.accepted})).map((function(e){return l.a.createElement("div",{className:"admin__table__header--item",key:e.uid||0},l.a.createElement(N.a,{startIcon:l.a.createElement(z.a,{src:e.photoURL||void 0}),variant:"contained",color:"primary",onClick:function(){return a=e.uid,d([]),_(void 0),void p.where("uid","==",a).orderBy("createdAt","asc").onSnapshot((function(e){var a=[];e.forEach((function(e){a.push(Object(P.a)(Object(P.a)({},e.data()),{},{taskId:e.id}))})),n(a)}));var a}},e.displayName||e.email||e.uid))}))),l.a.createElement("div",{className:"admin__table__content"},l.a.createElement("div",{className:"admin__table__content--tasks scrollbar"},!!t.length&&t.map((function(e){return l.a.createElement(Q,{key:e.taskId,taskCurrentUser:e,setUserMessages:d,setCurrentTaskInfo:_})}))),l.a.createElement("div",{className:"admin__table__content--messages scrollbar"},E&&l.a.createElement("div",{className:"admin__table__content--messages--info"},l.a.createElement("div",null,"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0433\u0438\u0442\u0445\u0430\u0431: ",E.reference||"\u041e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"),l.a.createElement("div",null,"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f: ",E.decision||"\u041e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442")),!!s.length&&s.map((function(e){return l.a.createElement(te,{key:e.messageId,newMessage:!1,message:e})})),E&&l.a.createElement("div",{className:"admin__message__chat"},l.a.createElement("div",{className:"admin__message__chat-field"},l.a.createElement(T.a,{className:"scrollbar",rows:4,rowsMax:10,value:h,onChange:function(e){g(e.target.value)},onKeyUp:function(e){e.shiftKey||"Enter"!==e.key||k()},fullWidth:!0,inputProps:{"aria-label":"naked"},multiline:!0,placeholder:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"})),l.a.createElement("div",{className:"admin__message__button"},l.a.createElement(N.a,{color:"primary",disabled:0===h.length||!E,variant:"contained",onClick:k,endIcon:l.a.createElement(D.a,null,"send")},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))))))},ce=function(){return l.a.createElement("div",{className:"admin__nav"},l.a.createElement(s.b,{to:"/"},l.a.createElement(N.a,null,"\u041d\u043e\u0432\u043e\u0441\u0442\u0438")),l.a.createElement(s.b,{to:"/users"},l.a.createElement(N.a,null,"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438")),l.a.createElement(s.b,{to:"/lesson"},l.a.createElement(N.a,null,"\u0412\u0438\u0434\u0435\u043e \u0443\u0440\u043e\u043a\u0438")),l.a.createElement(s.b,{to:"/resources"},l.a.createElement(N.a,null,"\u0420\u0435\u0441\u0443\u0440\u0441\u044b")))},re=t(282),ie=t(96),se=t.n(ie),oe=function(){var e=l.a.useState([]),a=Object(o.a)(e,2),t=a[0],n=a[1],c=l.a.useState([]),r=Object(o.a)(c,2),s=r[0],d=r[1],m=Object(i.c)(ne);l.a.useEffect((function(){n(m.filter((function(e){return!1===e.accepted}))),d(m.filter((function(e){return!0===e.accepted})))}),[m]);var u=function(e){e.accepted&&f.doc(e.uid).update({accepted:!1}),e.accepted||f.doc(e.uid).update({accepted:!0})};return m?l.a.createElement("div",{className:"admin__users"},l.a.createElement("div",{className:"admin__users__auth"},l.a.createElement("h2",null,"\u041d\u0435 \u043e\u043f\u043b\u0430\u0442\u0438\u0432\u0448\u0438\u0435 \u043a\u0443\u0440\u0441 (",t.length,"):"),l.a.createElement("div",{className:"admin__users__list"},t.length?t.map((function(e){return l.a.createElement("div",{key:e.uid,className:"admin__users__list__item"},l.a.createElement(re.a,{variant:"outlined",label:e.displayName||e.email||e.uid,color:"secondary",avatar:l.a.createElement(z.a,{src:e.photoURL})}),l.a.createElement(M.a,{onClick:function(){return u(e)}},l.a.createElement(se.a,null)))})):l.a.createElement("div",null,"\u041a\u0430\u0436\u0438\u0441\u044c \u043f\u0443\u0441\u0442\u043e..."))),l.a.createElement("div",{className:"admin__users__accepted"},l.a.createElement("h2",null," \u041e\u043f\u043b\u0430\u0442\u0438\u0432\u0448\u0438\u0435 \u043a\u0443\u0440\u0441 (",s.length,"):"),l.a.createElement("div",{className:"admin__users__list__accepted"},s.length?s.map((function(e){return l.a.createElement("div",{key:e.uid,className:"admin__users__list__item"},l.a.createElement(re.a,{variant:"outlined",label:e.displayName||e.email,color:"secondary",avatar:l.a.createElement(z.a,{src:e.photoURL})}),l.a.createElement(M.a,{onClick:function(){return u(e)}},l.a.createElement(se.a,null)))})):l.a.createElement("div",null,"\u041a\u0430\u0436\u0438\u0441\u044c \u043f\u0443\u0441\u0442\u043e...")))):l.a.createElement("div",null,"\u0413\u0440\u0443\u0437\u0438\u043c, \u0433\u0440\u0443\u0437\u0438\u043c...")},de=function(e){return function(e){return e.tasks}(e).items},me=function(){var e=l.a.useState([]),a=Object(o.a)(e,2),t=a[0],n=a[1],c=Object(i.c)(de);return l.a.useEffect((function(){n(c.filter((function(e){return"pending"===e.status})))}),[c]),l.a.createElement("div",{className:"admin__table__content--tasks scrollbar"},l.a.createElement("h2",{style:{position:"sticky",top:0,backgroundColor:"#fff",zIndex:500}},"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0442\u0430\u0441\u043a\u043e\u0432 \u0432 \u043e\u0436\u0438\u0434\u0430\u043d\u0438\u0438: ",t.length),!!t.length&&t.map((function(e){return l.a.createElement(Q,{key:e.taskId,taskCurrentUser:e})})))},ue=function(){var e=l.a.useState([]),a=Object(o.a)(e,2),t=a[0],n=a[1];return l.a.useEffect((function(){b.where("newMessage","==",!0).where("uid","!=",he).orderBy("uid","asc").orderBy("createdAt","asc").onSnapshot((function(e){var a=[];e.forEach((function(e){a.push(Object(P.a)(Object(P.a)({},e.data()),{},{messageId:e.id}))})),n(a)}))}),[]),l.a.createElement("div",{className:"admin__table__content--messages scrollbar"},l.a.createElement("h2",{style:{position:"sticky",top:0,backgroundColor:"#fff",zIndex:500}},"\u041d\u0435\u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043d\u044b\u0445 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439: ",t.length),!!t.length&&t.map((function(e){return l.a.createElement(te,{key:e.messageId,newMessage:!0,message:e})})))};!function(e){e.SET_TASKS="tasks/SET_TASKS"}(ae||(ae={}));var Ee;!function(e){e.SET_USERS="users/SET_USERS"}(Ee||(Ee={}));var _e=t(120),ve=t(121),fe=E.a.auth(),pe=new E.a.auth.GithubAuthProvider,be=new(function(){function e(){Object(_e.a)(this,e)}return Object(ve.a)(e,[{key:"signIn",value:function(){fe.signInWithPopup(pe)}},{key:"signOut",value:function(){E.a.auth().signOut()}}]),e}()),he="12086860",ge="https://avatars3.githubusercontent.com/u/12086860?v=4";function ye(){var e=l.a.useState(!1),a=Object(o.a)(e,2),t=a[0],n=a[1],c=Object(i.b)();l.a.useEffect((function(){E.a.auth().onAuthStateChanged((function(e){e&&f.doc(e.uid).get().then((function(e){var a;e.exists&&n((null===(a=e.data())||void 0===a?void 0:a.admin)||!1)}))})),p.onSnapshot((function(e){var a,t=[];e.forEach((function(e){var a,n,l;t.push({number:e.data().number,status:e.data().status,taskId:e.id,createdAt:e.data().createdAt,responseAt:null===(a=e.data())||void 0===a?void 0:a.responseAt,newTask:e.data().newTask,description:null===(n=e.data())||void 0===n?void 0:n.description,reference:null===(l=e.data())||void 0===l?void 0:l.reference})})),c((a=t,{type:ae.SET_TASKS,payload:a}))}))}),[c]),l.a.useEffect((function(){f.onSnapshot((function(e){var a,t=[];e.forEach((function(e){var a,n,l;t.push({accepted:e.data().accepted,displayName:null===(a=e.data())||void 0===a?void 0:a.displayName,email:null===(n=e.data())||void 0===n?void 0:n.email,learningFlow:e.data().learningFlow,photoURL:null===(l=e.data())||void 0===l?void 0:l.photoURL,uid:e.data().uid})})),c((a=t,{type:Ee.SET_USERS,payload:a}))}))}),[c]);return t?l.a.createElement("div",{className:"App"},l.a.createElement(ce,null),l.a.createElement(d.a,{exact:!0,path:"/lesson"},l.a.createElement(L,null)),l.a.createElement(d.a,{exact:!0,path:"/resources"},l.a.createElement(x,null)),l.a.createElement(d.a,{exact:!0,path:"/users"},l.a.createElement(le,null)),l.a.createElement(d.a,{exact:!0,path:"/"},l.a.createElement(oe,null),l.a.createElement("div",{className:"admin__table__content"},l.a.createElement(me,null),l.a.createElement(ue,null)))):l.a.createElement("div",{className:"signin__item"},l.a.createElement("h1",null,"\u0412\u0445\u043e\u0434 \u0432 \u043a\u0430\u0431\u0438\u043d\u0435\u0442"),l.a.createElement("button",{onClick:function(){be.signIn()}},"\u0412\u043e\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 GitHub"))}t(219);var ke=t(37),Se=t(122),Ne=t(77),Oe=Object(Ne.a)((function(e,a){switch(a.type){case ae.SET_TASKS:e.items=a.payload}}),{items:[]}),je=Object(Ne.a)((function(e,a){switch(a.type){case Ee.SET_USERS:e.items=a.payload}}),{items:[]}),Ce=Object(ke.c)({tasks:Oe,users:je}),we="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ke.d,Ie=Object(ke.e)(Ce,we(Object(ke.a)(Se.a))),xe=document.getElementById("root");r.a.render(l.a.createElement(i.a,{store:Ie},l.a.createElement(s.a,null,l.a.createElement(ye,null))),xe)}},[[132,1,2]]]);
//# sourceMappingURL=main.8f04923a.chunk.js.map