(this.webpackJsonplife=this.webpackJsonplife||[]).push([[0],{100:function(e,t,n){e.exports=n(291)},105:function(e,t,n){},290:function(e,t,n){},291:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(92),l=n.n(r),o=(n(105),n(33)),s=n(30),c=n(31);function u(){var e=Object(s.a)(["\n    position: absolute;\n    overflow: auto;\n    max-height: 100vh;\n    right: 0;\n    top: 0;\n    height: 100vh;\n    width: calc(100vw - 250px);\n    background: rgba(0,0,0,0.01);\n    \n    canvas {\n        border: 1px solid rgba(0,0,0,.05);\n        background: rgba(0,0,0,0.0\xa7);\n    }\n"]);return u=function(){return e},e}var d=c.a.div(u()),f=a.a.memo((function(e){var t=e.game,n=t.grid,r=t.config,l=r.unit,o=r.size,s=r.cellRGBA,c=Object(i.useRef)(null),u=o*l;return Object(i.useEffect)((function(){if(c.current){var e=c.current.getContext("2d");if(e){for(var t=e.createImageData(u,u),i=t.data,a=0,r=o*o;a<r;a++)if(n[a])for(var d=~~(a%o)*l,f=~~(a/o)*l,g=0,h=l*l;g<h;g++){var p=4*(d+~~(g%l)+(f+~~(g/l))*u);i[p]=s[0],i[p+1]=s[1],i[p+2]=s[2],i[p+3]=s[3]}e.putImageData(t,0,0)}}})),a.a.createElement(d,{"data-testid":"board-renderer"},a.a.createElement("canvas",{ref:c,width:u,height:u}))})),g=n(95),h=n(98),p=n(96),v=n.n(p),m=function(e){var t=e.label,n=Object(h.a)(e,["label"]);return a.a.createElement("div",null,a.a.createElement("label",null,t),a.a.createElement(v.a,n))};function b(){var e=Object(s.a)(["\n    position: absolute;\n    left: 0;\n    top: 0;\n    height: 100vh;\n    width: 250px;\n    display: flex;\n    flex-direction: column;\n    padding: 12px 32px 12px 32px;\n    background: rgba(0,0,0,0.05);\n    box-shadow: 0 0 1px 2px rgba(0,0,0,0.05);\n    h2 {\n        margin: 0\n    }\n    > div {\n        margin-top: 2rem;\n        position: relative;\n        padding-top: 32px;\n    }\n    label {\n        font-size: 12px;\n        font-weight: 500;\n        position: absolute;\n        bottom: -1rem;\n        left: 0;\n        right: 0;\n        margin: 0 auto;\n        width: 100%;\n        text-align: center;\n    }\n    \n    \n    button {\n        margin-top: 3rem;\n        font-size: .75rem;\n        padding: .4rem;\n        color: white;\n        border: 1px solid rgba(0,0,0,0.05);\n        cursor: pointer;\n        &.stop {\n            background: #ff3e5b;\n        }\n        &.start {\n            background: #3e51b5;\n            &.re {\n                margin-top: .5rem;\n            }\n        }\n    }\n"]);return b=function(){return e},e}var C=c.a.div(b()),x=a.a.memo((function(e){var t,n=e.game,r=Object(i.useState)(n.config),l=Object(o.a)(r,2),s=l[0],c=l[1],u=n.paused,d=Object(i.useCallback)((function(){return n.restart()}),[n]),f=Object(i.useCallback)((function(){return n.start()}),[n]),h=Object(i.useCallback)((function(){return n.stop()}),[n]),p=Object(i.useCallback)((function(e){n.stop(),c(n.config.setSize(e))}),[n]),v=Object(i.useCallback)((function(e){n.stop(),c(n.config.setUnit(e))}),[n]),b=Object(i.useCallback)((function(e){n.stop(),c(n.config.setIntervalMs(e))}),[n]),x=Object(i.useCallback)((function(e){n.stop(),c(n.config.setIterations(e))}),[n]),I=Object(i.useCallback)((function(e){n.stop(),c(n.config.setCellRGBA(function(e){return[e.r,e.g,e.b,255*(e.a||0)]}(e.rgb)))}),[n]);return a.a.createElement(C,null,a.a.createElement("h2",null,n.iteration),a.a.createElement(m,{label:"Size",maxValue:300,minValue:10,step:5,value:s.size,onChangeComplete:d,onChange:p}),a.a.createElement(m,{label:"Unit",maxValue:30,minValue:1,step:1,value:s.unit,onChangeComplete:f,onChange:v}),a.a.createElement(m,{label:"Interval (ms)",maxValue:1e3,minValue:5,step:1,value:s.intervalMs,onChangeComplete:f,onChange:b}),a.a.createElement(m,{label:"Iterations total",maxValue:1e4,minValue:1,step:1,value:s.iterations,onChangeComplete:f,onChange:x}),a.a.createElement("div",null,a.a.createElement(g.SliderPicker,{onChange:I,onChangeComplete:f,color:(t=s.cellRGBA,{r:t[0],g:t[1],b:t[2],a:t[3]/255})})),a.a.createElement("button",{className:u?"start":"stop",onClick:u?f:h},u?"Start":"Stop"),a.a.createElement("button",{className:"re start",onClick:d},"Restart"))})),I=n(32),A=function e(){var t=this;Object(I.a)(this,e),this.size=100,this.unit=10,this.cellRGBA=[0,0,0,255],this.iterations=10,this.intervalMs=100,this.initialAliveCells=[],this.initialAliveCellsIndexes=[],this.fillInitialAliveCellsMap=function(){t.initialAliveCellsIndexes=t.initialAliveCells.reduce((function(e,n){return e.concat([n.y*t.size+n.x])}),[])},this.setUnit=function(e){return t.unit=e,t},this.setCellRGBA=function(e){return e.find((function(e){return!function(e){return e>=0&&e<=255}(e)}))?console.warn("RGBA is not properly specified, e.g.: [0,0,0,255]"):t.cellRGBA=e,t},this.setSize=function(e){return t.size=e,t},this.setIterations=function(e){return t.iterations=e,t},this.setIntervalMs=function(e){return t.intervalMs=e,t},this.addInitialAliveCell=function(e,n){if(!t.isXYInRange(e,n))throw Error("X / Y is not in specified range");return t.initialAliveCells.push({x:e,y:n}),t},this.isXYInRange=function(e,n){return e>=0&&e<t.size&&n>=0&&n<t.size}},k=function e(t){var n=this;Object(I.a)(this,e),this.config=new A,this.iteration=0,this.paused=!0,this.grid=[],this.interval=void 0,this.update=void 0,this.initGame=function(){n.paused=!0,n.iteration=0,n.grid=[],n.config.fillInitialAliveCellsMap();for(var e=n.config.size,t=0,i=e*e;t<i;t++)n.initXYCell(t)},this.start=function(e){return e&&n.initGame(),n.paused=!1,n.interval=setInterval(n.tick,n.config.intervalMs),n.tick(),n},this.onUpdate=function(e){return n.update=e,n},this.stop=function(){n.paused=!0,clearInterval(n.interval),n.doUpdate()},this.restart=function(){n.stop(),n.start(!0)},this.tick=function(){if(n.iteration>=n.config.iterations)n.stop();else{n.iteration++;for(var e=[],t=0,i=n.grid.length;t<i;t++){var a=n.getTotalAliveNeighbours(t);e[t]=2!==a?3===a?1:0:n.grid[t]}n.grid=e,n.doUpdate()}},this.doUpdate=function(){n.update&&n.update(n.getGameState())},this.getGameState=function(){return{paused:n.paused,grid:n.grid,iteration:n.iteration,config:n.config,start:n.start,stop:n.stop,restart:n.restart}},this.getTotalAliveNeighbours=function(e){var t=n.config.size;return n.grid[e-1-t]+n.grid[e-t]+n.grid[e+1-t]+n.grid[e-1]+n.grid[e+1]+n.grid[e-1+t]+n.grid[e+t]+n.grid[e+1+t]},this.initXYCell=function(e){var t=n.config.initialAliveCellsIndexes.indexOf(e)>=0;n.grid[e]=t?1:0},this.config=t,this.initGame()},E=(n(288),n(289),n(290),(new A).setSize(160).setUnit(5).setIntervalMs(1e3).setCellRGBA([245,55,136,255]).setIterations(4e3).addInitialAliveCell(52,26).addInitialAliveCell(52,26).addInitialAliveCell(52,27).addInitialAliveCell(51,27).addInitialAliveCell(52,28).addInitialAliveCell(53,28)),O=function(){var e=function(e){var t=Object(i.useMemo)((function(){return new k(e)}),[e]),n=Object(i.useState)(t.getGameState()),a=Object(o.a)(n,2),r=a[0],l=a[1],s=Object(i.useCallback)((function(e){return l(e)}),[]);return Object(i.useEffect)((function(){return t.onUpdate(s),function(){t.stop()}}),[t,s]),r}(E);return a.a.createElement(a.a.Fragment,null,a.a.createElement(x,{game:e}),a.a.createElement(f,{game:e}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[100,1,2]]]);
//# sourceMappingURL=main.60e94061.chunk.js.map