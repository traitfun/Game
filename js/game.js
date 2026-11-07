/* Mesin utama: state, gelombang, loop, kamera, muat aset. */
var cv,ctx,S,last=0,ready=false;

function txt(x,y,s,c){S.fx.push({x:x,y:y,s:s,c:c,t:.7})}

function genWave(){
  var n=WAVES.count(S.wv);S.spawns=[];
  for(var i=0;i<n;i++)S.spawns.push(WAVES.first+i*WAVES.interval);
  S.t=-1;S.sp=0;
}
function init(){
  S={st:'fight',wv:1,t:0,sp:0,spawns:[],en:[],fx:[],ghost:[],picked:null,hs:0,sk:0,h:Player.create()};
  UI.hide();UI.hud();genWave();
}
function update(dt){
  if(S.hs>0){S.hs-=dt;return}                 // hit-stop
  S.t+=dt;var h=S.h,i;
  S.sk=Math.max(0,S.sk-dt*14);
  for(i=S.fx.length-1;i>=0;i--){S.fx[i].t-=dt;S.fx[i].y-=20*dt;if(S.fx[i].t<=0)S.fx.splice(i,1)}
  for(i=S.ghost.length-1;i>=0;i--){S.ghost[i].t-=dt;if(S.ghost[i].t<=0)S.ghost.splice(i,1)}
  if(S.st!=='fight')return;
  Player.update(dt);
  while(S.sp<S.spawns.length&&S.t>=S.spawns[S.sp])Enemy.spawn(Math.max(0,Math.min(WW-VW,h.x-VW/2)));
  for(i=0;i<S.en.length;i++)Enemy.update(S.en[i],dt);
  if(h.hp<=0){S.st='dead';Sfx.play('lose');UI.hud();UI.end('Kamu tumbang','Bertahan sampai gelombang '+S.wv+'.')}
  else if(S.sp>=S.spawns.length&&S.en.length===0){
    S.wv++;h.hp=Math.min(h.max,h.hp+WAVES.healPerWave);
    txt(h.x,GY-90,'Gelombang '+S.wv,'#e8a33d');Sfx.play('wave');UI.hud();genWave();
  }
}
function draw(){
  var h=S.h,t=S.t,i,cam=Math.max(0,Math.min(WW-VW,h.x-VW/2));
  var sx=(Math.random()-.5)*S.sk,sy=(Math.random()-.5)*S.sk;
  ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,VW,VH);
  ctx.save();ctx.translate(sx,sy);
  ctx.drawImage(IM.bg,-cam,0,WW,VH);
  var list=S.en.slice();list.push({hero:1,x:h.x});
  list.sort(function(a,b){return a.x-b.x});
  for(i=0;i<list.length;i++){if(list[i].hero)Player.draw(cam,t);else Enemy.draw(list[i],cam)}
  ctx.font='bold 11px system-ui';ctx.textAlign='center';
  S.fx.forEach(function(f){ctx.globalAlpha=Math.min(1,f.t*2);ctx.fillStyle=f.c;ctx.fillText(f.s,f.x-cam,f.y);ctx.globalAlpha=1});
  ctx.restore();
  ctx.fillStyle='rgba(14,12,20,.6)';ctx.fillRect(6,6,150,18);
  ctx.fillStyle='#e9e2d0';ctx.textAlign='left';ctx.font='11px system-ui';
  ctx.fillText('Gelombang '+S.wv+'  Musuh: '+(S.en.length+S.spawns.length-S.sp),12,19);
}
function loop(ts){
  var dt=Math.min(.05,(ts-last)/1000||0);last=ts;
  if(ready){update(dt);draw()}
  requestAnimationFrame(loop);
}
function loadAssets(done){
  var keys=Object.keys(SPRITES),n=0,failed=false;
  keys.forEach(function(k){
    var i=new Image();
    i.onload=function(){IM[k]=i;if(++n===keys.length)done()};
    i.onerror=function(){
      if(failed)return;failed=true;
      UI.message('Gagal memuat gambar: '+SPRITES[k].file+'<br><small>Pastikan folder assets/ ada di samping index.html</small>');
    };
    i.src=SPRITES[k].file;
  });
}
function start(){
  cv=document.getElementById('c');ctx=cv.getContext('2d');
  UI.init();Input.init();init();
  UI.message('Memuat aset');
  loadAssets(function(){ready=true;UI.hide()});
  requestAnimationFrame(loop);
}
start();
