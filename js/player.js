/* Hero: gerak, loncat, dash, serang, animasi, gambar. */
var Player={
  create:function(){
    return {x:HERO.startX,z:0,vz:0,hp:HERO.hp,max:HERO.hp,dmg:HERO.dmg,spd:HERO.spd,face:1,
            at:-1,hit:false,dash:0,dcd:0,inv:0,cr:0,ld:0,ls:0,rt:0};
  },
  attack:function(){
    var h=S.h;if(!ready||S.st!=='fight'||h.cr>0)return;
    if(h.at<0||h.at>HERO.atk.cancelAfter){h.at=0;h.hit=false;Sfx.play('swing')}
  },
  jump:function(){var h=S.h;if(!ready||S.st!=='fight'||h.z>0||h.cr>0||h.at>=0)return;h.cr=HERO.crouchTime},
  dash:function(){var h=S.h;if(!ready||S.st!=='fight'||h.dcd>0)return;h.dash=HERO.dashTime;h.dcd=HERO.dashCd;h.inv=HERO.dashInv;h.at=-1;S.ghost=[];Sfx.play('dash')},
  doHit:function(){
    var h=S.h,A=HERO.atk;h.hit=true;
    for(var i=S.en.length-1;i>=0;i--){
      var e=S.en[i],dx=(e.x-h.x)*h.face;
      if(dx>A.reachBack&&dx<A.reachFront&&h.z<A.maxHeight){
        e.hp-=h.dmg;e.fl=.12;e.st=.3;e.at=-1;e.cd=Math.max(e.cd,.6);e.x+=h.face*14;
        txt(e.x,GY-52,h.dmg,'#ffd37a');S.hs=.05;S.sk=3;Sfx.play(e.hp<=0?'kill':'hit');
        if(e.hp<=0){
          S.en.splice(i,1);
          if(h.ls){h.hp=Math.min(h.max,h.hp+h.ls);txt(h.x,GY-70,'+'+h.ls,'#7fd18a');UI.hud()}
        }
      }
    }
  },
  update:function(dt){
    var h=S.h,A=HERO.atk,mv=Input.axis();
    if(Math.abs(mv)<.18)mv=0;
    if(mv)h.face=mv>0?1:-1;
    if(Input.stickJump())Player.jump();
    h.dcd=Math.max(0,h.dcd-dt);h.inv=Math.max(0,h.inv-dt);
    if(h.cr>0){h.cr-=dt;if(h.cr<=0){h.vz=HERO.jumpV;h.z=.01;Sfx.play('jump')}}
    if(h.z>0){h.vz-=HERO.gravity*dt;h.z+=h.vz*dt;if(h.z<=0){h.z=0;h.vz=0;h.ld=HERO.landTime;Sfx.play('land')}}
    h.ld=Math.max(0,h.ld-dt);
    var mag=Math.min(1,Math.abs(mv)*1.15),sp=h.spd*mag*(mv<0?-1:1);
    if(h.z<=0&&mv&&h.at<0&&h.dash<=0&&h.cr<=0)h.rt+=dt*mag*HERO.runRate;
    if(h.dash>0){
      h.x+=h.face*HERO.dashSpeed*dt;h.dash-=dt;
      if(S.ghost.length<6&&Math.random()<.6)S.ghost.push({x:h.x,z:h.z,f:h.face,t:.22});
    }else if(h.at>=0){
      h.at+=dt;
      if(!h.hit&&h.at>=A.hitAt)Player.doHit();
      var lunge=(h.at>A.lungeFrom&&h.at<A.lungeTo)?h.face*A.lungeSpeed:0;
      h.x+=lunge*dt+sp*.3*dt;
      if(h.at>=A.total)h.at=-1;
    }else if(h.cr<=0)h.x+=sp*dt;
    h.x=Math.max(24,Math.min(WW-24,h.x));
  },
  frame:function(){
    var h=S.h,F=HERO.frames;
    if(h.at>=0){var k=F.atk[0][0];for(var i=0;i<F.atk.length;i++)if(h.at>=F.atk[i][1])k=F.atk[i][0];return k}
    if(h.dash>0)return F.dash;
    if(h.cr>0)return F.crouch;
    if(h.z>0)return F.air;
    if(h.ld>0)return F.land;
    if(Math.abs(Input.axis())>=.18)return F.run[Math.floor(h.rt)%F.run.length];
    return F.idle;
  },
  draw:function(cam,t){
    var h=S.h,moving=Math.abs(Input.axis())>=.18;
    ctx.fillStyle='rgba(0,0,0,'+(.4-Math.min(.25,h.z/200))+')';
    ctx.beginPath();ctx.ellipse(h.x-cam,GY,22-h.z/10,5,0,0,7);ctx.fill();
    for(var g=0;g<S.ghost.length;g++){var q=S.ghost[g];spr(HERO.frames.dash,q.x-cam,GY-q.z,q.f,q.t*1.4)}
    var still=(h.z<=0&&h.at<0&&h.dash<=0&&h.cr<=0);
    var bob=still?Math.abs(Math.sin(t*(moving?14:2.5)))*(moving?0:.8):0;
    var al=(h.inv>0&&h.dash<=0&&Math.floor(t*22)%2===0)?.45:1;
    spr(Player.frame(),h.x-cam,GY-h.z-bob,h.face,al);
  }
};
