!function(t){var e={};function a(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(s,i,function(e){return t[e]}.bind(null,i));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=1)}([,function(t,e,a){"use strict";a.r(e);var s={getPointer:function(t,e){return parseInt(e.toString(16)+t.toString(16),16)%16384}};class i{constructor(t){this.rawData=t}extractMaps(){let t=this.getMapHeaders(this.getMapHeaderAddresses());return this.getMapData(t),this.getMapObjectData(t),t}getMapHeaderAddresses(){const t=Array.from(this.rawData.slice(49725,49973)).map(t=>16384*t),e=this.rawData.slice(430,926);let a=[],i=[];for(let t=0;t<e.length;t+=2)a.push(s.getPointer(e[t],e[t+1]));for(let e=0;e<a.length;e++)i.push(t[e]+a[e]);return i}getMapHeaders(t){let e=[];for(let a of t){let t={memoryBank:Math.floor(a/16384),tilesetId:this.rawData[a],height:this.rawData[a+1],width:this.rawData[a+2],connection:null,connections:{},pointers:{mapData:s.getPointer(this.rawData[a+3],this.rawData[a+4]),textPointers:s.getPointer(this.rawData[a+5],this.rawData[a+6]),script:s.getPointer(this.rawData[a+7],this.rawData[a+8])}},i=9;t.connection=this.rawData[a+i++];for(let e=3;e>=0;e--){let r="";switch(e){case 3:r="north";break;case 2:r="south";break;case 1:r="west";break;case 0:r="east"}t.connection&1<<e&&(t.connections[r]={mapId:this.rawData[a+i++],pointers:{connectBlock:s.getPointer(this.rawData[a+i++],this.rawData[a+i++]),currentBlock:s.getPointer(this.rawData[a+i++],this.rawData[a+i++])},biggness:this.rawData[a+i++],mapWidth:this.rawData[a+i++],yPos:this.rawData[a+i++],xPos:this.rawData[a+i++],window:256*this.rawData[a+i++]+this.rawData[a+i++]})}t.pointers.objectData=s.getPointer(this.rawData[a+i++],this.rawData[a+i++]),e.push(t)}return e}getMapData(t){for(let e of t){const t=e.pointers.mapData,a=16384*e.memoryBank+t,s=e.width,i=e.height;let r=[];for(let t=0;t<i;t++){r[t]=[];for(let e=0;e<s;e++){const i=t*s+e;r[t][e]=this.rawData[a+i]}}e.tiles=r}}getMapObjectData(t){for(let e of t){const t=e.pointers.objectData,a=16384*e.memoryBank+t;let i=0,r={};r.borderBlock=this.rawData[a+i++],r.numWarps=this.rawData[a+i++],r.warps=[];for(let t=0;t<r.numWarps;t++)r.warps.push({xPos:this.rawData[a+i++],yPos:this.rawData[a+i++],warpInId:this.rawData[a+i++],destMap:this.rawData[a+i++]});r.numSigns=this.rawData[a+i++],r.signs=[];for(let t=0;t<r.numSigns;t++)r.signs.push({xPos:this.rawData[a+i++],yPos:this.rawData[a+i++],textId:this.rawData[a+i++]});r.numNPCs=this.rawData[a+i++],r.npcs=[];for(let t=0;t<r.numNPCs;t++){let t={picId:this.rawData[a+i++],xPos:this.rawData[a+i++],yPos:this.rawData[a+i++],mov1:this.rawData[a+i++],mov2:this.rawData[a+i++],textId:this.rawData[a+i++]};if(128&t.textId)t.type="item",t.itemId=this.rawData[a+i++];else if(64&t.textId){let e=this.rawData[a+i++],s=this.rawData[a+i++];e<200?(t.type="pkmnStatic",t.trainerClass=e,t.rosterId=s):(t.type="trainer",t.trainerClass=e,t.rosterId=s)}r.npcs.push(t)}r.warpIns=[];for(let t=0;t<r.numWarps;t++)r.warpIns.push({windowPointer:s.getPointer(this.rawData[a+i++],this.rawData[a+i++]),yPos:this.rawData[a+i++],xPos:this.rawData[a+i++]});e.objectData=r}}}let r=new class{constructor(t,e,a){this.backdrop=document.getElementById(t),this.frontLayer=document.getElementById(e),this.menuButton=document.getElementById(a)}register(){this.registerButtonEvent(),this.registerFrontLayerEvent()}registerButtonEvent(){this.menuButton.addEventListener("click",()=>{this.backdrop.classList.contains("hidden")?this.backdrop.classList.remove("hidden"):this.backdrop.classList.add("hidden"),this.menuButton.classList.contains("open")?this.menuButton.classList.remove("open"):this.menuButton.classList.add("open")})}registerFrontLayerEvent(){this.frontLayer.addEventListener("click",()=>{this.backdrop.classList.add("hidden"),this.menuButton.classList.remove("open")})}}("menu","front-layer","show-menu"),n=new class{constructor(t){this.multiSelects=document.getElementsByClassName(t)}register(){for(let t of this.multiSelects)this.selected||(this.selected=t.id),t.addEventListener("click",t=>{if(!t.target.disabled){for(let t of this.multiSelects)t.classList.remove("selected");t.target.classList.add("selected"),this.selected=t.target.id}})}getSelection(){return this.selected}}("multi-item"),o=new class{constructor(t,e,a){this.banner=document.getElementById(t),this.bannerText=document.getElementById(e),this.dismissBtn=document.getElementById(a),this.banner.style.removeProperty("display")}register(){this.dismissBtn.addEventListener("click",()=>{this.banner.classList.add("hidden")})}show(t){this.banner.classList.remove("hidden"),this.bannerText.innerText=t}hide(){this.banner.classList.add("hidden")}}("notifications","banner-info","dismiss-banner"),l=new class{constructor(...t){this.uiElements=[];for(let e of t)"string"==typeof e&&this.uiElements.push(...document.getElementsByClassName(e))}disable(){for(let t of this.uiElements)t.classList.add("disabled"),t.disabled=!0}enable(){for(let t of this.uiElements)t.classList.remove("disabled"),t.disabled=!1}}("multi-item","file-input","file-options","submit-btn","upload-text");r.register(),n.register(),o.register();let d=new class{constructor(t,e){this.dataLoaded=!1;let a=new XMLHttpRequest;a.addEventListener("load",t=>{this.data=t.target.response,this.dataLoaded=!0,console.log("Data for decoder loaded.")}),a.open("GET",t),a.responseType="json",a.send(),this.game=e}setGame(t){this.game=t}decodeText(t,e=0){if(!this.dataLoaded){let a=e*e*20;return console.log("Decoder not ready, retrying in:",a.toString()+"ms"),window.setTimeout(this.decodeText.bind(this,t,e+1),a),-1}let a=this.data[this.game]["text-encoding"],s="";for(let e of t)s+=a[e];return s}}("./ressources/encoding.json","redBlue");new class{constructor(t,e,a,s,i){this.fileInput=document.getElementById(t),this.submitBtn=document.getElementById(e),this.btnLabel=document.getElementById(a),this.notifications=s,this.uiManager=i}extractData(t){this.uiManager.disable();let e=this.fileInput.files;if(e.length<1)return this.notifications.show("No file received."),this.uiManager.enable(),1;let a=e[0];if(a.size>104857600)return this.notifications.show("File size cannot exceed 100MB."),this.uiManager.enable(),2;let s=new FileReader;return s.readAsArrayBuffer(a),s.addEventListener("load",()=>{let e=new Uint8Array(s.result);t(e)}),this.notifications.hide(),s}register(t=function(){}){let e,a=this.fileInput.files;e=a.length>0?a[0].name:"Upload ROM-File",this.btnLabel.innerText=e,this.fileInput.addEventListener("change",()=>{let t,e=this.fileInput.files;t=e.length>0?e[0].name:"Upload ROM-File",this.btnLabel.innerText=t}),this.submitBtn.addEventListener("click",()=>{this.extractData(t)})}}("rom-select","submit-btn","upload-label",o,l).register(t=>{let e,a=n.getSelection();switch(d.setGame(a),a){case"redBlue":e=new class{constructor(t,e){this.rawData=t,this.decoder=e,this.processedData={},this.mapReader=new i(t)}extract(){this.getRomName(),this.processedData.map=this.mapReader.extractMaps(),this.debug()}debug(){console.log(this.processedData)}getRomName(){this.processedData.romName=String.fromCharCode(...this.rawData.slice(308,324)).replace(/\0/g,"")}}(t,d);break;default:return 1}e.extract(),l.enable()})}]);