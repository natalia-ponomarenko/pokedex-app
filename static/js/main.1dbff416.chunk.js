(this["webpackJsonppokedex-app"]=this["webpackJsonppokedex-app"]||[]).push([[0],{20:function(e,t,n){},23:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(6),r=n.n(s),o=(n(20),n(3)),i=n.n(o),l=n(4),u=n(2),d=(n(22),n(23),n(0)),j=function(e){var t=e.action,n=e.className,a=e.children;return Object(d.jsx)("button",{className:n,onClick:t,children:a})};function m(){return Object(d.jsx)("div",{className:"loader__container",children:Object(d.jsx)("div",{className:"loader"})})}j.defaultProps={className:"button"};var p=n(7),b=n.n(p),h={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"},overlay:{zIndex:4}},f=(n(36),function(e){var t=e.pokemon,n=e.closeModal;return Object(d.jsxs)("div",{className:"stats__container",onClick:n,children:[Object(d.jsx)("div",{className:"stats__image-container",children:Object(d.jsx)("img",{src:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(t.id,".png"),onError:function(e){e.target.src="../images/Poke_ball.png"},alt:t.name,className:"stats__image"})}),Object(d.jsx)("div",{className:"stats__name",children:"".concat(t.name)}),Object(d.jsx)("div",{className:"stats__stats",children:t.stats.map((function(e){return Object(d.jsxs)("div",{className:"stats__stat-container",children:[Object(d.jsx)("div",{className:"stats__stat-name",children:e.stat.name}),Object(d.jsx)("div",{className:"stats__base-stat"}),Object(d.jsx)("div",{className:"stats__base-stat-value",children:e.base_stat})]},e.stat.name)}))})]})});function O(e){var t=e.pokemon,n=e.modalIsOpen,a=e.closeModal;return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(b.a,{isOpen:n,onRequestClose:a,style:h,contentLabel:"Example Modal",closeTimeoutMS:300,children:Object(d.jsx)("div",{children:t.map((function(e){return Object(d.jsx)(f,{pokemon:e,closeModal:a},e.id)}))})})})}f.defaultProps={pokemon:{}},b.a.setAppElement("#root"),O.defaultProps={pokemon:null};var v={normal:"#A8A77A",fire:"#EE8130",water:"#6390F0",electric:"#F7D02C",grass:"#7AC74C",ice:"#96D9D6",fighting:"#C22E28",poison:"#A33EA1",ground:"#E2BF65",flying:"#A98FF3",psychic:"#F95587",bug:"#A6B91A",rock:"#B6A136",ghost:"#735797",dragon:"#6F35FC",dark:"#705746",steel:"#B7B7CE",fairy:"#D685AD",unknown:"#F3FF89",shadow:"#9467B5"},x=(n(37),function(e){var t=e.pokemon,n=e.selectPokemon,a=e.openModal;return Object(d.jsx)("div",{className:"card",children:Object(d.jsxs)("div",{className:"card__card",onClick:function(){n(t.id),a()},children:[Object(d.jsxs)("div",{className:"card__container-wrapper",children:[Object(d.jsx)("div",{className:"card__height-container",children:Object(d.jsxs)("span",{className:"card__height",children:[Object(d.jsx)("div",{children:"Height:"}),Object(d.jsx)("div",{children:"".concat(t.height/10," m")})]})}),Object(d.jsx)("div",{className:"card__weight-container",children:Object(d.jsxs)("span",{className:"card__weight",children:[Object(d.jsx)("div",{children:"Weight:"}),Object(d.jsx)("div",{children:"".concat(t.weight/100," kg")})]})})]}),Object(d.jsx)("div",{className:"card__name",children:"".concat(t.name)}),Object(d.jsx)("div",{className:"card__image-container",children:Object(d.jsx)("img",{className:"card__image",src:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(t.id,".png"),onError:function(e){e.target.src="../images/Poke_ball.png"},alt:t.name})}),Object(d.jsx)("div",{className:"card__types",children:t.types.map((function(e){return Object(d.jsx)("div",{className:"card__type",style:{backgroundColor:v[e.type.name]},children:e.type.name},e.slot)}))}),Object(d.jsx)("div",{className:"card__moves",children:"Total moves: ".concat(t.moves.length)})]})})});function g(e){var t=e.filteredData,n=e.openModal,a=e.handlePokemonSelection;return t.map((function(e){return Object(d.jsx)(x,{pokemon:e,openModal:n,selectPokemon:a},e.id)}))}function k(e){var t=e.setFilteredData,n=e.pokemonData,c=Object(a.useState)(""),s=Object(u.a)(c,2),r=s[0],o=s[1];return Object(a.useEffect)((function(){if(r){var e=r.toLowerCase(),a=r?n.filter((function(t){return t.name.toLowerCase().startsWith(e)})):n;t(a)}else t(n)}),[r,n]),Object(d.jsx)("input",{type:"text",id:"search-query",className:"input is-success",placeholder:"Start filter the pokemons!",value:r,onChange:function(e){var t=e.currentTarget.value;return o(t)}})}x.defaultProps={pokemon:{}},k.defaultProps={pokemon:null};n(38);function _(){return Object(d.jsxs)("div",{className:"header",children:[Object(d.jsx)("img",{src:"./images/pokemon-logo.png",alt:"Pokemon Logo",className:"header__image"}),Object(d.jsx)("a",{href:"https://pokeapi.co/",target:"_blank",rel:"noreferrer",className:"header__link",children:"PokeAPI"})]})}n(39);function N(e){var t=e.types,n=e.filter;return Object(d.jsx)("div",{children:t.map((function(e){return Object(d.jsx)("button",{id:e.name,onClick:function(){return n(e.name)},className:"type-button",style:{backgroundColor:v[e.name]},children:e.name},e.name)}))})}function y(e){var t=e.text;return Object(d.jsx)("div",{className:"main__message",id:"message",children:t})}function w(e){var t=e.handleSelectChange,n=e.value;return Object(d.jsx)("div",{className:"select is-success",children:Object(d.jsxs)("select",{value:n,onChange:function(e){return t(e)},className:"is-hovered",children:[Object(d.jsx)("option",{value:"10",children:"load 10"}),Object(d.jsx)("option",{value:"20",children:"load 20"}),Object(d.jsx)("option",{value:"50",children:"load 50"}),Object(d.jsx)("option",{value:"all",children:"load all"})]})})}function C(e){var t=e.side;return Object(d.jsx)("span",{children:Object(d.jsx)("i",{className:"fa-solid fa-caret-".concat(t," main__icon")})})}var P="https://pokeapi.co/api/v2/pokemon/?limit=10",S="https://pokeapi.co/api/v2/pokemon/?limit=1118",A=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(e,t).then((function(e){if(!e.ok)throw new Error("Pokemons weren't loaded");return e.json()}))};var E=function(){var e=Object(a.useState)(P),t=Object(u.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),r=Object(u.a)(s,2),o=r[0],p=r[1],b=Object(a.useState)(""),h=Object(u.a)(b,2),f=h[0],v=h[1],x=Object(a.useState)(""),E=Object(u.a)(x,2),F=E[0],D=E[1],M=Object(a.useState)(!0),B=Object(u.a)(M,2),I=B[0],L=B[1],T=Object(a.useState)(!1),q=Object(u.a)(T,2),J=q[0],R=q[1],W=Object(a.useState)([]),z=Object(u.a)(W,2),H=z[0],G=z[1],K=Object(a.useState)([]),Q=Object(u.a)(K,2),U=Q[0],V=Q[1],X=Object(a.useState)([]),Y=Object(u.a)(X,2),Z=Y[0],$=Y[1],ee=Object(a.useState)(o),te=Object(u.a)(ee,2),ne=te[0],ae=te[1],ce=Object(a.useState)(""),se=Object(u.a)(ce,2),re=se[0],oe=se[1],ie=Object(a.useState)(""),le=Object(u.a)(ie,2),ue=le[0],de=le[1],je=function(){var e=Object(l.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all(t.map(function(){var e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url).then((function(e){return e.json()})).then((function(e){return e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:n=e.sent,p(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),de(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,L(!0),e.next=4,fetch(t);case 4:return n=e.sent,e.next=7,n.json();case 7:a=e.sent,je(a.results),D(a.previous),v(a.next),A("https://pokeapi.co/api/v2/type/").then((function(e){return e.results})).then((function(e){return V(e)})),L(!1),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),de(e.t0.message);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t){return e.apply(this,arguments)}})()(n),$([])}),[n]);var me=function(e){c(e)};return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(_,{}),I?Object(d.jsx)(m,{}):Object(d.jsxs)("div",{className:"main",children:[Object(d.jsx)("div",{className:"main__types-buttons",children:Object(d.jsx)(N,{types:U,filter:function(e){if(document.getElementById(e).classList.toggle("pressed"),Z.includes(e)){var t=Z.indexOf(e);t>-1&&Z.splice(t,1)}else Z.push(e);if($(Z),Z.length){var n=o.filter((function(e){return e.types.some((function(e){return Z.includes(e.type.name.toLowerCase())}))}));ae(n)}else ae(o)}})}),Object(d.jsxs)("div",{className:"main__query-wrapper",children:[Object(d.jsx)(w,{value:re,handleSelectChange:function(e){switch(e.target.value){case"10":me(P),oe(e.target.value);break;case"20":me("https://pokeapi.co/api/v2/pokemon/?limit=20"),oe(e.target.value);break;case"50":me("https://pokeapi.co/api/v2/pokemon/?limit=50"),oe(e.target.value);break;case"all":me(S),oe(e.target.value);break;default:me(P),oe("10")}}}),Object(d.jsx)(k,{setFilteredData:ae,pokemonData:o})]}),Object(d.jsx)("div",{className:"main__container",children:ne.length?Object(d.jsx)(g,{filteredData:ne,openModal:function(){R(!0)},handlePokemonSelection:function(e){G(o.filter((function(t){return t.id===e})))}}):Object(d.jsx)(y,{text:ue||"No pokemons here. Try to load more!"})}),Object(d.jsxs)("div",{className:"main__button-container",children:[F&&Object(d.jsxs)(j,{action:function(){return me(F)},className:"button is-warning is-focused",children:[Object(d.jsx)(C,{side:"left"}),"Back"]}),f&&Object(d.jsxs)(j,{action:function(){return me(f)},className:"button is-warning is-focused",children:["Next",Object(d.jsx)(C,{side:"right"})]})]}),Object(d.jsx)(O,{pokemon:H,modalIsOpen:J,closeModal:function(){R(!1)}})]})]})};r.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(E,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.1dbff416.chunk.js.map