/* Data musuh. Tambah musuh baru = tambah satu objek di sini + sprite di sprites.js.
   kind 'melee'   : jalan dekat, angkat senjata (windup), lalu menebas (end).
   kind 'pouncer' : lari, jongkok (windup), menerjang lurus (sampai pounceEnd), lalu diam (end). */
var ENEMY_TYPES=[
{id:'skeleton',kind:'melee',hp:36,speed:44,engage:46,windup:.35,end:.65,dmg:9,cd:1.1,reach:[-12,66],walkRate:6,
 hpBarY:92,shadow:[18,4.5],
 frames:{idle:'skel_idle',walk:['skel_walk1','skel_walk2','skel_walk3','skel_walk4'],windup:'skel_windup',strike:'skel_strike',hit:'skel_hit'}},
{id:'stalker',kind:'pouncer',hp:28,speed:78,engage:110,windup:.4,pounceEnd:.7,end:1.05,pounceSpeed:270,dmg:10,cd:1.5,reach:[-14,42],retreat:28,walkRate:10,
 hpBarY:66,shadow:[18,4.5],lift:14,
 frames:{idle:'stk_idle',walk:['stk_run1','stk_run2','stk_run3','stk_run4'],windup:'stk_crouch',strike:'stk_pounce',hit:'stk_hit'}}
];
