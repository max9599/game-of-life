(this.webpackJsonplife=this.webpackJsonplife||[]).push([[0],{100:function(e,t,n){e.exports=n(291)},105:function(e,t,n){},290:function(e,t,n){},291:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(92),l=n.n(r),o=(n(105),n(33)),s=n(30),c=n(31);function u(){var e=Object(s.a)(["\n    position: absolute;\n    overflow: auto;\n    max-height: 100vh;\n    right: 0;\n    top: 0;\n    height: 100vh;\n    width: calc(100vw - 250px);\n    background: rgba(0,0,0,0.01);\n    \n    canvas {\n        border: 1px solid rgba(0,0,0,.05);\n        background: rgba(0,0,0,0.0\xa7);\n        cursor: ",";\n    }\n"]);return u=function(){return e},e}var d=c.a.div(u(),(function(e){return e.paused?"pointer":"default"})),g=a.a.memo((function(e){var t=e.game,n=t.grid,r=t.config,l=t.paused,o=t.toggleCellState,s=r.unit,c=r.size,u=r.cellRGBA,g=Object(i.useRef)(null),f=c*s,p=Object(i.useCallback)((function(e){if(l&&g.current){var t=g.current.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;o(~~(n/s)+~~(i/s)*c)}}),[c,s,l,o]);return Object(i.useEffect)((function(){if(g.current){var e=g.current.getContext("2d");if(e){for(var t=e.createImageData(f,f),i=t.data,a=0,r=c*c;a<r;a++)if(n[a])for(var l=~~(a%c)*s,o=~~(a/c)*s,d=0,p=s*s;d<p;d++){var h=4*(l+~~(d%s)+(o+~~(d/s))*f);i[h]=u[0],i[h+1]=u[1],i[h+2]=u[2],i[h+3]=u[3]}e.putImageData(t,0,0)}}})),a.a.createElement(d,{"data-testid":"board-renderer",paused:l},a.a.createElement("canvas",{ref:g,onClick:p,width:f,height:f}))})),f=n(95),p=n(98),h=n(96),b=n.n(h),m=function(e){var t=e.label,n=Object(p.a)(e,["label"]);return a.a.createElement("div",null,a.a.createElement("label",null,t),a.a.createElement(b.a,n))};function v(){var e=Object(s.a)(["\n    position: absolute;\n    left: 0;\n    top: 0;\n    height: 100vh;\n    width: 250px;\n    display: flex;\n    flex-direction: column;\n    padding: 12px 32px 12px 32px;\n    background: rgba(0,0,0,0.05);\n    box-shadow: 0 0 1px 2px rgba(0,0,0,0.05);\n    h2 {\n        margin: 0\n    }\n    > div {\n        margin-top: 2rem;\n        position: relative;\n        padding-top: 32px;\n    }\n    label {\n        font-size: 12px;\n        font-weight: 500;\n        position: absolute;\n        bottom: -1rem;\n        left: 0;\n        right: 0;\n        margin: 0 auto;\n        width: 100%;\n        text-align: center;\n    }\n    \n    \n    button {\n        margin-top: 3rem;\n        font-size: .75rem;\n        padding: .4rem;\n        height: 2rem;\n        color: white;\n        border: 1px solid rgba(0,0,0,0.05);\n        cursor: pointer;\n        &.paused {\n            background: #ff3e5b;\n        }\n        &.start {\n            background: #3e51b5;\n            &.re {\n                margin-top: .5rem;\n                margin-bottom: .5rem;\n            }\n        }\n        &.reset {\n            border: 1px solid rgba(0,0,0,0.15);\n            background: white;\n            color: black;\n        }\n    }\n    \n    .helper {\n        font-size: .7rem;\n        color: gray;\n        transition: all .3s ease-in-out;\n        visibility: hidden;\n        opacity: 0;\n        &.paused {\n            visibility: visible;\n            opacity: 1;\n        }\n    }\n"]);return v=function(){return e},e}var C=c.a.div(v()),k=a.a.memo((function(e){var t,n=e.game,r=Object(i.useState)(n.config),l=Object(o.a)(r,2),s=l[0],c=l[1],u=n.paused,d=Object(i.useCallback)((function(){return n.restart()}),[n]),g=Object(i.useCallback)((function(){return n.start()}),[n]),p=Object(i.useCallback)((function(){n.stop(),n.reset()}),[n]),h=Object(i.useCallback)((function(){return n.stop()}),[n]),b=Object(i.useCallback)((function(e){n.stop(),c(n.config.setSize(e))}),[n]),v=Object(i.useCallback)((function(e){n.stop(),c(n.config.setUnit(e))}),[n]),k=Object(i.useCallback)((function(e){n.stop(),c(n.config.setIntervalMs(e))}),[n]),x=Object(i.useCallback)((function(e){n.stop(),c(n.config.setIterations(e))}),[n]),I=Object(i.useCallback)((function(e){n.stop(),c(n.config.setCellRGBA(function(e){return[e.r,e.g,e.b,255*(e.a||0)]}(e.rgb)))}),[n]);return a.a.createElement(C,null,a.a.createElement("h2",null,n.iteration),a.a.createElement(m,{label:"Size",maxValue:300,minValue:10,step:5,value:s.size,onChangeComplete:d,onChange:b}),a.a.createElement(m,{label:"Unit",maxValue:30,minValue:1,step:1,value:s.unit,onChangeComplete:g,onChange:v}),a.a.createElement(m,{label:"Interval (ms)",maxValue:1e3,minValue:5,step:1,value:s.intervalMs,onChangeComplete:g,onChange:k}),a.a.createElement(m,{label:"Iterations total",maxValue:1e4,minValue:1,step:1,value:s.iterations,onChangeComplete:g,onChange:x}),a.a.createElement("div",null,a.a.createElement(f.SliderPicker,{onChange:I,onChangeComplete:g,color:(t=s.cellRGBA,{r:t[0],g:t[1],b:t[2],a:t[3]/255})})),a.a.createElement("button",{className:u?"start":"paused",onClick:u?g:h},u?"Start":"Pause"),a.a.createElement("button",{className:"re start",onClick:d},"Restart"),a.a.createElement("span",{className:"helper ".concat(u?"paused":"")},"Click on canvas to toggle cell state"),a.a.createElement("button",{className:"reset",onClick:p},"Reset"))})),x=n(32),I=function e(){var t=this;Object(x.a)(this,e),this.size=100,this.unit=10,this.cellRGBA=[0,0,0,255],this.iterations=10,this.intervalMs=100,this.initialAliveCells=[],this.initialAliveCellsIndexes=[],this.fillInitialAliveCellsMap=function(){t.initialAliveCellsIndexes=t.initialAliveCells.reduce((function(e,n){return e.concat([n.y*t.size+n.x])}),[])},this.setUnit=function(e){return t.unit=e,t},this.setCellRGBA=function(e){return e.find((function(e){return!function(e){return e>=0&&e<=255}(e)}))?console.warn("RGBA is not properly specified, e.g.: [0,0,0,255]"):t.cellRGBA=e,t},this.setSize=function(e){return t.size=e,t},this.setIterations=function(e){return t.iterations=e,t},this.setIntervalMs=function(e){return t.intervalMs=e,t},this.addInitialAliveCell=function(e,n){if(!t.isXYInRange(e,n))throw Error("X / Y is not in specified range");return t.initialAliveCells.push({x:e,y:n}),t},this.isXYInRange=function(e,n){return e>=0&&e<t.size&&n>=0&&n<t.size}},A=function e(t){var n=this;Object(x.a)(this,e),this.config=new I,this.iteration=0,this.paused=!0,this.grid=[],this.interval=void 0,this.update=void 0,this.initGame=function(){n.paused=!0,n.iteration=0,n.grid=[],n.config.fillInitialAliveCellsMap();for(var e=n.config.size,t=0,i=e*e;t<i;t++)n.initXYCell(t)},this.start=function(e){return e&&n.initGame(),n.paused=!1,n.interval=setInterval(n.tick,n.config.intervalMs),n.tick(),n},this.reset=function(){n.stop(),n.initGame(),n.doUpdate()},this.onUpdate=function(e){return n.update=e,n},this.stop=function(){n.paused=!0,clearInterval(n.interval),n.doUpdate()},this.restart=function(){n.stop(),n.start(!0)},this.tick=function(){if(n.iteration>=n.config.iterations)n.stop();else{n.iteration++;for(var e=[],t=0,i=n.grid.length;t<i;t++){var a=n.getTotalAliveNeighbours(t);e[t]=2!==a?3===a?1:0:n.grid[t]}n.grid=e,n.doUpdate()}},this.doUpdate=function(){n.update&&n.update(n.getGameState())},this.getGameState=function(){return{paused:n.paused,grid:n.grid,iteration:n.iteration,config:n.config,start:n.start,stop:n.stop,restart:n.restart,reset:n.reset,toggleCellState:n.toggleCellState}},this.toggleCellState=function(e){n.grid[e]=1===n.grid[e]?0:1,n.doUpdate()},this.getTotalAliveNeighbours=function(e){var t=n.config.size;return n.grid[e-1-t]+n.grid[e-t]+n.grid[e+1-t]+n.grid[e-1]+n.grid[e+1]+n.grid[e-1+t]+n.grid[e+t]+n.grid[e+1+t]},this.initXYCell=function(e){var t=n.config.initialAliveCellsIndexes.indexOf(e)>=0;n.grid[e]=t?1:0},this.config=t,this.initGame()},E=(n(288),n(289),n(290),(new I).setSize(160).setUnit(5).setIntervalMs(1e3).setCellRGBA([245,55,136,255]).setIterations(4e3).addInitialAliveCell(52,26).addInitialAliveCell(52,26).addInitialAliveCell(52,27).addInitialAliveCell(51,27).addInitialAliveCell(52,28).addInitialAliveCell(53,28)),O=function(){var e=function(e){var t=Object(i.useMemo)((function(){return new A(e)}),[e]),n=Object(i.useState)(t.getGameState()),a=Object(o.a)(n,2),r=a[0],l=a[1],s=Object(i.useCallback)((function(e){return l(e)}),[]);return Object(i.useEffect)((function(){return t.onUpdate(s),function(){t.stop()}}),[t,s]),r}(E);return a.a.createElement(a.a.Fragment,null,a.a.createElement(k,{game:e}),a.a.createElement(g,{game:e}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[100,1,2]]]);
//# sourceMappingURL=main.6b6444db.chunk.js.map