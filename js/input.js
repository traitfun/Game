/* Kontrol: joystick analog + tombol layar + keyboard. */
var Input={
  x:0,y:0,kx:0,up:false,
  axis:function(){return Input.x||Input.kx},
  stickJump:function(){                       // tarik joystick ke atas = loncat (sekali per tarikan)
    if(Input.y<-.65&&!Input.up){Input.up=true;return true}
    if(Input.y>-.3)Input.up=false;
    return false;
  },
  init:function(){
    window.addEventListener('pointerdown',Sfx.unlock,true);   // buka izin suara di sentuhan pertama
    window.addEventListener('keydown',Sfx.unlock,true);
    var js=document.getElementById('js'),kn=document.getElementById('kn'),R=46,jid=null;
    function set(e){
      var r=js.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
      var dx=e.clientX-cx,dy=e.clientY-cy,l=Math.hypot(dx,dy);
      if(l>R){dx*=R/l;dy*=R/l}
      kn.style.transform='translate('+dx+'px,'+dy+'px)';Input.x=dx/R;Input.y=dy/R;
    }
    function reset(){jid=null;kn.style.transform='';Input.x=0;Input.y=0;Input.up=false}
    js.addEventListener('pointerdown',function(e){e.preventDefault();jid=e.pointerId;js.setPointerCapture(jid);set(e)});
    js.addEventListener('pointermove',function(e){if(e.pointerId===jid)set(e)});
    ['pointerup','pointercancel','lostpointercapture'].forEach(function(n){
      js.addEventListener(n,function(e){if(e.pointerId===jid||n==='lostpointercapture')reset()});
    });
    function btn(id,fn){document.getElementById(id).addEventListener('pointerdown',function(e){e.preventDefault();fn()})}
    btn('ba',function(){Player.attack()});
    btn('bj',function(){Player.jump()});
    btn('bd',function(){Player.dash()});
    window.addEventListener('keydown',function(e){
      var k=e.key.toLowerCase();
      if(k==='a'||k==='arrowleft')Input.kx=-1;
      else if(k==='d'||k==='arrowright')Input.kx=1;
      else if(k==='w'||k==='arrowup')Player.jump();
      else if(k==='j'||k===' ')Player.attack();
      else if(k==='k'||k==='shift')Player.dash();
      else return;
      e.preventDefault();
    });
    window.addEventListener('keyup',function(e){
      var k=e.key.toLowerCase();
      if((k==='a'||k==='arrowleft')&&Input.kx<0)Input.kx=0;
      if((k==='d'||k==='arrowright')&&Input.kx>0)Input.kx=0;
    });
  }
};
