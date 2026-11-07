MYTHRAID - Roguelite Action (prototype)

CARA MAIN
Buka index.html di browser (HP atau komputer). Tidak perlu server atau internet.
Pastikan folder assets/ tetap berada di samping index.html.

STRUKTUR
index.html            struktur halaman + memanggil semua file JS
style.css             tampilan
js/game.js            mesin utama: state, gelombang, loop, kamera, muat aset
js/player.js          hero: gerak, loncat, dash, serang, animasi
js/enemy.js           musuh: spawn dan AI (melee / pouncer)
js/input.js           joystick analog, tombol layar, keyboard
js/ui.js              bar nyawa, overlay (loading, game over)
js/render.js          helper menggambar sprite
js/audio.js           suara (dibuat oleh browser, tanpa file audio); tombol bisu di pojok kanan atas bar nyawa
js/data/config.js     ukuran layar + stat dan animasi hero (setel rasa permainan di sini)
js/data/enemies.js    data musuh (nyawa, kecepatan, jangkauan, frame)
js/data/waves.js      aturan gelombang musuh
js/data/boons.js      daftar boon (belum dipakai)
js/data/sprites.js    daftar sprite: file, ukuran, titik tumpu badan
assets/heroes         gambar hero
assets/enemies        gambar musuh
assets/maps           background

KONTROL
Joystick: geser kiri/kanan = jalan, tarik ke atas = loncat
Tombol: Serang, Loncat, Dash
Keyboard: A/D gerak, W loncat, J serang, K dash

TAMBAH MUSUH BARU
1. Taruh gambar di assets/enemies/ (format webp, hadap kanan, background transparan)
2. Daftarkan di js/data/sprites.js (file, w, h, px = titik tengah badan sebagai fraksi lebar)
3. Tambah satu objek di js/data/enemies.js (kind: 'melee' atau 'pouncer', frames: idle, walk, windup, strike, hit)
4. Masukkan indeksnya ke WAVES.pattern di js/data/waves.js

CATATAN
Semua file dimuat dengan <script> biasa (tanpa import/fetch), jadi aman dibuka langsung dari file di HP.
Data ditulis sebagai file .js, bukan .json, karena fetch tidak jalan kalau dibuka tanpa server.
