/* Konfigurasi dasar + stat hero. Ubah angka di sini untuk menyetel rasa permainan. */
var CFG={VW:480,VH:270,WW:810,GY:198,UNIT:3};   // layar 480x270, dunia selebar 810, tanah di y=198, sprite disimpan 3x
var VW=CFG.VW,VH=CFG.VH,WW=CFG.WW,GY=CFG.GY;

var HERO={
  startX:90,hp:100,dmg:12,spd:120,
  jumpV:330,gravity:900,crouchTime:.08,landTime:.12,
  dashTime:.2,dashSpeed:380,dashCd:.9,dashInv:.35,
  hitInv:.55,runRate:11,
  atk:{hitAt:.14,total:.4,cancelAfter:.3,lungeFrom:.09,lungeTo:.27,lungeSpeed:70,reachBack:-14,reachFront:74,maxHeight:45},
  frames:{
    idle:'idle',crouch:'crouch',air:'air',land:'land',dash:'atk5',
    run:['run1','run2','run4','run3','run5','run6'],
    atk:[['atk1',0],['atk2',.09],['atk3',.14],['atk4',.19],['atk5',.27]]   // [sprite, mulai di detik ke-]
  }
};
