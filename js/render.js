/* Helper gambar: sprite dengan titik tumpu + versi putih (efek kena hit). */
var IM={},WH={};
function spr(k,x,y,f,al){
  var a=SPRITES[k],u=CFG.UNIT;
  ctx.save();ctx.translate(x,y);ctx.scale(f,1);ctx.globalAlpha=al;
  ctx.drawImage(IM[k],-a.px*a.w/u,-a.h/u,a.w/u,a.h/u);ctx.restore();
}
function white(k){
  if(!WH[k]){
    var a=SPRITES[k],c=document.createElement('canvas');c.width=a.w;c.height=a.h;
    var g=c.getContext('2d');g.drawImage(IM[k],0,0);
    g.globalCompositeOperation='source-in';g.fillStyle='#fff';g.fillRect(0,0,a.w,a.h);WH[k]=c;
  }
  return WH[k];
}
function sprWhite(k,x,y,f,al){
  var a=SPRITES[k],u=CFG.UNIT;
  ctx.save();ctx.translate(x,y);ctx.scale(f,1);ctx.globalAlpha=al;
  ctx.drawImage(white(k),-a.px*a.w/u,-a.h/u,a.w/u,a.h/u);ctx.restore();
}
