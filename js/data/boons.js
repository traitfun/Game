/* Boon / upgrade. Belum dipakai di mode endless; disiapkan untuk sistem roguelite nanti. */
var BOONS=[
{n:'Bilah Tajam',d:'Serangan +6 damage',f:function(h){h.dmg+=6}},
{n:'Jantung Batu',d:'Nyawa maks +30 dan pulih 30',f:function(h){h.max+=30;h.hp=Math.min(h.max,h.hp+30)}},
{n:'Kaki Angin',d:'Kecepatan gerak +25%',f:function(h){h.spd*=1.25}},
{n:'Haus Darah',d:'Pulih 6 nyawa tiap musuh kalah',f:function(h){h.ls+=6}}
];
