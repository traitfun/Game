/* Suara: semua dibuat langsung oleh browser (WebAudio), tanpa file audio.
   Browser HP baru boleh bunyi setelah layar disentuh, jadi unlock() dipanggil dari sentuhan pertama. */
var Sfx={
  ctx:null,out:null,nb:null,on:true,
  unlock:function(){
    try{
      if(!Sfx.ctx){
        var C=window.AudioContext||window.webkitAudioContext;if(!C)return;
        var c=Sfx.ctx=new C();
        Sfx.out=c.createGain();Sfx.out.gain.value=.55;Sfx.out.connect(c.destination);
        var len=c.sampleRate,b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);
        for(var i=0;i<len;i++)d[i]=Math.random()*2-1;
        Sfx.nb=b;
      }
      if(Sfx.ctx.state==='suspended')Sfx.ctx.resume();
    }catch(e){}
  },
  tone:function(f1,f2,dur,type,vol,delay){            // nada: frekuensi awal -> akhir
    var c=Sfx.ctx;if(!c||!Sfx.on)return;
    var t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();
    o.type=type||'square';o.frequency.setValueAtTime(f1,t);
    if(f2)o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+dur);
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(g);g.connect(Sfx.out);o.start(t);o.stop(t+dur+.02);
  },
  noise:function(dur,vol,type,f1,f2,delay){           // desis/ledakan: noise lewat filter
    var c=Sfx.ctx;if(!c||!Sfx.on)return;
    var t=c.currentTime+(delay||0),s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();
    s.buffer=Sfx.nb;fl.type=type;fl.frequency.setValueAtTime(f1,t);
    if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+dur);
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    s.connect(fl);fl.connect(g);g.connect(Sfx.out);s.start(t,Math.random()*.5);s.stop(t+dur+.02);
  },
  play:function(n){
    if(!Sfx.ctx||!Sfx.on)return;
    try{
      switch(n){
        case 'swing':Sfx.noise(.14,.28,'bandpass',700,2600);break;                          // tebasan hero
        case 'hit':Sfx.noise(.08,.3,'lowpass',1800,300);Sfx.tone(200,60,.1,'square',.22);break;   // kena musuh
        case 'kill':Sfx.noise(.2,.3,'lowpass',2200,200);Sfx.tone(240,40,.28,'sawtooth',.25);break;
        case 'hurt':Sfx.tone(320,70,.22,'square',.3);Sfx.noise(.15,.25,'lowpass',1500,200);break; // hero kena
        case 'jump':Sfx.tone(260,620,.12,'sine',.25);break;
        case 'land':Sfx.noise(.08,.22,'lowpass',500,150);break;
        case 'dash':Sfx.noise(.18,.25,'highpass',3200,900);break;
        case 'eswing':Sfx.noise(.16,.2,'bandpass',450,1500);Sfx.tone(140,90,.12,'sawtooth',.1);break; // tebasan kerangka
        case 'growl':Sfx.tone(110,70,.3,'sawtooth',.12);break;                              // penerjang jongkok
        case 'pounce':Sfx.noise(.22,.25,'bandpass',900,3000);Sfx.tone(520,180,.22,'triangle',.16);break;
        case 'wave':Sfx.tone(440,0,.1,'triangle',.22);Sfx.tone(554,0,.1,'triangle',.22,.1);Sfx.tone(659,0,.18,'triangle',.22,.2);break;
        case 'lose':Sfx.tone(220,45,.7,'sawtooth',.28);Sfx.noise(.4,.2,'lowpass',900,100);break;
      }
    }catch(e){}
  }
};
