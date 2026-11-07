/* Aturan gelombang musuh (mode endless sementara). */
var WAVES={
  first:.8,interval:1.5,max:12,
  pattern:[0,0,1],          // urutan jenis musuh (indeks ke ENEMY_TYPES), diulang
  hpPerWave:6,healPerWave:20,
  count:function(w){return Math.min(this.max,3+w*2)}
};
