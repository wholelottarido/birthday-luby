import { useEffect, useMemo, useRef, useState } from 'react';

const musicSrc = '/music/Sleep%20Walk.mp3';

const photos = [
  {
    src: '/photos/midnight-wall.jpg',
    title: 'foto mesra',
    caption: 'salting w ngeliat tatapan lu begitu ke gw',
  },
  {
    src: '/photos/quiet-laugh.jpg',
    title: 'pose centil',
    caption: 'centil banget godain siapa sih lu?',
  },
  {
    src: '/photos/late-table.jpg',
    title: 'pelor',
    caption: 'gw ngantuk jujur disini, tapi lu tetep cakep',
  },
  {
    src: '/photos/side-eye.jpg',
    title: 'ini juga cakep matanya',
    caption: 'selalu bilang dari awal kalo mata kamu emang yang bikin aku tertarik gaddeeymmm',
  },
  {
    src: '/photos/small-table.jpg',
    title: 'foto melet',
    caption: 'melet tapi ga jamet',
  },
  {
    src: '/photos/black-lip.jpg',
    title: 'NAH INI FAVORIT',
    caption: 'Hot, baddie, sext, intimidating, divine, pretty, mysterious, mommy',
  },
];

function FloatingCharacters() {
  return (
    <div className="floating-characters" aria-hidden="true">
      <img className="mavis-float" src="/character/mavis-full.png" alt="" />
      <img className="kuromi-float" src="/character/kuromi-wink.png" alt="" />
      <img className="pair-float" src="/character/mavis-johnny-cutout.png" alt="" />
    </div>
  );
}

function PageDecor() {
  return (
    <>
      <img
        className="page-decor decor-intro-kuromi"
        src="/character/kuromi-umbrella.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="page-decor decor-gallery-pair"
        src="/character/mavis-johnny-smile.jpg"
        alt=""
        aria-hidden="true"
      />
      <img
        className="page-decor decor-wish-kuromi"
        src="/character/kuromi-wink.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="page-decor decor-note-pair"
        src="/character/mavis-johnny-hug.webp"
        alt=""
        aria-hidden="true"
      />
    </>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const audioRef = useRef(null);
  const year = useMemo(() => new Date().getFullYear(), []);
  const currentPhoto = photos[activePhoto];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    audio.volume = 0.52;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePhoto((index) => (index + 1) % photos.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <main className="site-shell">
      <audio
        ref={audioRef}
        src={musicSrc}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <section className="hero" aria-label="Ucapan ulang tahun untuk Luby">
        <img className="hero-photo" src="/photos/black-lip.jpg" alt="Luby dengan nuansa goth" />
        <div className="hero-shade" />
        <FloatingCharacters />
        <nav className="topbar" aria-label="Navigasi halaman">
          <a href="#gallery">Galeri</a>
          <a href="#note">Catatan</a>
          <button type="button" className="music-button" onClick={toggleMusic}>
            {isPlaying ? '"berisikk, kecilin sih"' : 'musikk'}
          </button>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">A little dark birthday page</p>
          <h1>Happy 21st Birthday, Lubyaska.</h1>
          <p className="hero-copy">
            Yahahah udah bukan remaja lagi. But, you're still the same little kid in my eyes with keabsurdan dan freakyan luh itu.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#note">Baca catatan</a>
            <a className="ghost-link" href="#gallery">Lihat foto</a>
          </div>
        </div>
      </section>

      <PageDecor />

      <section className="intro-band">
        <div>
          <p className="section-kicker">Sorry kalo w gabisa bikin kata-kata yang romantis</p>
          <h2>But im so proud kamuu bisa sampe di titik ini. Sidang KP. Next? sempro gilakkk</h2>
        </div>
        <p>
          
        </p>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-heading">
          <p className="section-kicker"></p>
          <h2>foto-fotonya dikit banget seball. tapi ini ak pilihin yang paling cakep-cakep di mata akuh</h2>
        </div>

        <div className="carousel-shell" aria-live="polite">
          <div className="carousel-stage">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activePhoto * 100}%)` }}
            >
              {photos.map((photo) => (
                <article className="carousel-slide" key={photo.src}>
                  <img src={photo.src} alt={`${photo.title} bersama Luby`} />
                </article>
              ))}
            </div>
          </div>

          <div className="carousel-panel">
            <span>{String(activePhoto + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
            <h3>{currentPhoto.title}</h3>
            <p>{currentPhoto.caption}</p>
            <div className="carousel-controls" aria-label="Kontrol carousel foto">
              <button
                type="button"
                onClick={() => setActivePhoto((activePhoto - 1 + photos.length) % photos.length)}
                aria-label="Foto sebelumnya"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => setActivePhoto((activePhoto + 1) % photos.length)}
                aria-label="Foto berikutnya"
              >
                Next
              </button>
            </div>
            <div className="carousel-dots" aria-label="Pilih foto">
              {photos.map((photo, index) => (
                <button
                  type="button"
                  key={photo.src}
                  className={index === activePhoto ? 'active' : ''}
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Tampilkan ${photo.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wish-band" aria-label="Harapan singkat">
        <div className="wish">
          <span>01</span>
          <p>Lets make a wish, semoga kamu sukses, banyak duit, biar bisa piercing sebadan-badan</p>
        </div>
        <div className="wish">
          <span>02</span>
          <p>you are the perfect sweet creature yang pernah aku kenal. gada wish sih kalo ini</p>
        </div>
        <div className="wish">
          <span>03</span>
          <p>Keep surviving buat kedepannya. I KNOOO u can do it. aku selalu berdoa buat kamu.</p>
        </div>
      </section>

      <section className="note-section" id="note">
        <div className="note-copy">
          <p className="section-kicker">what else?</p>
          <h2>very little notes</h2>
          <p>
            I won’t try to make this sound overly poetic. You’re just cool in your own way. A little moody, a little random, sometimes too aware of the camera, but honestly, I’m glad you’re around.
          </p>
          <button type="button" onClick={() => setIsLetterOpen((value) => !value)}>
            {isLetterOpen ? 'Tutup catatan' : 'Buka bagian terakhir'}
          </button>
        </div>

        <div className={`letter ${isLetterOpen ? 'open' : ''}`}>
          <p>
            Happy birthday, Luby. I hope you have a wonderful day filled with love, laughter, and all the things that make you happy. You deserve the best on your special day and always. I’m grateful to have you in my life, and i hope we can still celebrates our birthday in the future. 
          </p>
          <strong>{year}</strong>
        </div>
      </section>
    </main>
  );
}

export default App;
