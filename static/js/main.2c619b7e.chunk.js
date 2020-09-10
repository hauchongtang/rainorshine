(this["webpackJsonprain-or-shine"]=this["webpackJsonprain-or-shine"]||[]).push([[0],{32:function(e,t,a){e.exports=a(62)},55:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(14),c=a.n(o),l=a(12),u=a.n(l),i=a(15),s=a(9),m=a(69),p=a(70),h=a(67),f=a(68),d=a(71),g=a(65),E=a(66),b=a(29),v=a.n(b),w=function(){var e=Object(i.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",e.next=4,v.a.get("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast");case 4:return t=e.sent,a={area:t.data.area_metadata,info:t.data.items[0]},e.abrupt("return",a);case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),O=(a(55),function(){var e=Object(n.useState)([]),t=Object(s.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)([]),l=Object(s.a)(c,2),b=l[0],v=l[1],O=Object(n.useState)([]),j=Object(s.a)(O,2),y=j[0],S=j[1],k=Object(n.useState)([1.3521,103.8198]),_=Object(s.a)(k,2),x=_[0],C=_[1],F=Object(n.useState)({}),I=Object(s.a)(F,2),M=I[0],z=I[1],D=Object(n.useState)(!1),H=Object(s.a)(D,2),J=H[0],L=H[1];Object(n.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(e){var t=[e.coords.latitude,e.coords.longitude];C(t),z({lat:e.coords.latitude,long:e.coords.longitude})})),function(){var e=Object(i.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:t=e.sent,a=t.area,n=t.info,o(a),v(n.forecasts),S(n.valid_period);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]),a.map((function(e,t){return e.weather=b[t]}));var P=function(e){return e*Math.PI/180},T=function(e,t,a,n){e=P(e),a=P(a),t=P(t);var r=(n=P(n))-t,o=a-e;return 6371*Math.sqrt(r*r+o*o)},q=function(e,t){for(var n,r=99999,o=0;o<a.length;++o){var c=T(e,t,a.map((function(e){return e.label_location.latitude}))[o],a.map((function(e){return e.label_location.longitude}))[o]);c<r&&(n=o,r=c)}return n}(M.lat,M.long),B=b.map((function(e){return e.area})),G=b.map((function(e){return e.forecast}));return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{id:"weather"},"2 Hourly Forecast"),r.a.createElement("div",null,r.a.createElement(g.a,null,r.a.createElement(E.a,null,r.a.createElement("h3",null,B[q]),r.a.createElement("p",{id:"timestamp"},new Date(y.start).toLocaleTimeString(),"\xa0to\xa0",new Date(y.end).toLocaleTimeString()),r.a.createElement("h6",null,G[q])))),r.a.createElement("h5",null),r.a.createElement(m.a,{center:x,zoom:12},r.a.createElement(p.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),r.a.createElement(h.a,{position:x}),a.map((function(e){return r.a.createElement(f.a,{key:e.name,center:[e.label_location.latitude,e.label_location.longitude],onClick:function(){return L(e)},radius:12,color:"purple"})})),J&&r.a.createElement(d.a,{position:[J.label_location.latitude,J.label_location.longitude],onClose:function(){return L(!1)}},r.a.createElement("h1",null,J.name),r.a.createElement("p",null,J.weather.forecast))),r.a.createElement("h5",null),r.a.createElement(g.a,null,r.a.createElement(E.a,null,r.a.createElement("h3",null,"Features"),r.a.createElement("p",null,"- Quick check of the weather before heading out for outdoor activities."),r.a.createElement("p",null,"- If you enable location, you can see your nearest weather station."),r.a.createElement("h3",null,"Source"),"- ",r.a.createElement("a",{href:"https://data.gov.sg/"},"data.gov.sg"),r.a.createElement("h3",null,"Code"),"- ",r.a.createElement("a",{href:"https://github.com/hauchongtang/rainorshine"},"GitHub"))))}),j=(a(60),a(61),function(){return r.a.createElement("div",{className:"container"},r.a.createElement(O,null))});c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.2c619b7e.chunk.js.map