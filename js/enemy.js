/* Musuh: spawn, AI (melee / pouncer), gambar. Data ada di data/enemies.js. */
var Enemy={
  spawn:function(cam){
    var kind=WAVES.pattern[S.sp%WAVES.pattern.length],T=ENEMY_TYPES[kind];
    var hp=T.hp+(S.wv-1)*WAVES.hpPerWave;
    var left=cam>60&&S.sp%2===1;
    S.en.push({ty:kind,type:T,hp:hp,max:hp,cd:1,fl:0,st:0,at:-1,hit:false,w:0,face:-1,
               x:left?cam-24:Math.min(WW-14,cam+VW+24)});
    S.sp++;
  },
  reaches:function(e,T){
    var h=S.h,f=(h.x-e.x)*e.face;
    return f>T.reach[0]&&f<T.reach[1]&&h.z<30&&h.inv<=0;
  },
  hurtHero:function(dmg){
    var h=S.h;h.hp-=dmg;h.inv=HERO.hitInv;txt(h.x,GY-80,'-'+dmg,'#ff7b6e');S.sk=4;UI.hud();
  },
  update:function(e,dt){
    var h=S.h,T=e.type,dx=h.x-e.x,dist=Math.abs(dx);
    e.fl=Math.max(0,e.fl-dt);e.st=Math.max(0,e.st-dt);e.cd-=dt;
    if(e.st>0)return;                                   // sedang kena hit
    if(e.at>=0){
      e.at+=dt;
      if(T.kind==='pouncer'){
        if(e.at>=T.windup&&e.at<T.pounceEnd){
          e.x+=e.face*T.pounceSpeed*dt;
          if(!e.hit&&Enemy.reaches(e,T)){e.hit=true;Enemy.hurtHero(T.dmg)}
        }
      }else if(!e.hit&&e.at>=T.windup){
        e.hit=true;if(Enemy.reaches(e,T))Enemy.hurtHero(T.dmg);
      }
      if(e.at>=T.end){e.at=-1;e.cd=T.cd}
    }else{
      e.face=dx>0?1:-1;
      if(dist>T.engage){e.x+=e.face*T.speed*dt;e.w+=dt*T.walkRate}
      else if(e.cd<=0){e.at=0;e.hit=false}
      else if(T.retreat)e.x-=e.face*T.retreat*dt;
    }
  },
  frame:function(e){
    var T=e.type,F=T.frames;
    if(e.st>0)return F.hit;
    if(e.at>=0){
      if(e.at<T.windup)return F.windup;
      if(T.kind==='pouncer')return e.at<T.pounceEnd?F.strike:F.idle;
      return F.strike;
    }
    if(Math.abs(S.h.x-e.x)>T.engage)return F.walk[Math.floor(e.w)%F.walk.length];
    return F.idle;
  },
  draw:function(e,cam){
    var T=e.type,k=Enemy.frame(e),x=e.x-cam;
    ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(x,GY,T.shadow[0],T.shadow[1],0,0,7);ctx.fill();
    var ly=(T.lift&&k===T.frames.strike&&T.kind==='pouncer')?T.lift:0;
    spr(k,x,GY-ly,e.face,1);
    if(e.fl>0)sprWhite(k,x,GY-ly,e.face,.85);
    var hy=GY-T.hpBarY;
    ctx.fillStyle='#322d40';ctx.fillRect(x-14,hy,28,3);
    ctx.fillStyle='#c2453a';ctx.fillRect(x-14,hy,28*Math.max(0,e.hp/e.max),3);
  }
};
