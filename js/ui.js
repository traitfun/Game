/* Tampilan di luar canvas: bar nyawa, teks boon, overlay (loading / game over). */
var UI={
  ov:null,
  init:function(){UI.ov=document.getElementById('ov')},
  hud:function(){
    var h=S.h;
    document.getElementById('hpb').style.width=Math.max(0,h.hp/h.max*100)+'%';
    document.getElementById('hpt').textContent=Math.max(0,Math.ceil(h.hp))+'/'+h.max;
    document.getElementById('bn').textContent=S.picked?'Boon aktif: '+S.picked:'';
  },
  hide:function(){UI.ov.style.display='none'},
  message:function(t){UI.ov.innerHTML='<h2>'+t+'</h2>';UI.ov.style.display='flex'},
  end:function(t,p){
    UI.ov.innerHTML='<h2>'+t+'</h2><p>'+p+'</p><div class="opts"><button class="opt" id="rs"><b>Main lagi</b></button></div>';
    UI.ov.style.display='flex';
    document.getElementById('rs').onclick=init;
  }
};
