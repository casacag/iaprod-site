# Sito IAPROD &amp; IABOX

Sito statico (HTML/CSS/JS, nessun framework, nessuna build) per l'attività di Alessio Cocco:
produzione video AI (**IAPROD**) + infrastrutture IA on-premise (**IABOX**).

## File
```
iaprod-site/
├── index.html      → struttura e contenuti
├── styles.css      → tutto il design
├── script.js       → nav, animazioni, portfolio + lightbox
├── favicon.svg     → icona
└── README.md       → questo file
```

## Anteprima in locale
Apri `index.html` con doppio click, oppure avvia un server:
```bash
python -m http.server 5510 --directory iaprod-site
# poi apri http://localhost:5510
```

## Pubblicazione su IONOS
1. Accedi al pannello IONOS → spazio web / Deploy Now (o FTP).
2. Carica il **contenuto** della cartella `iaprod-site/` nella root del dominio
   (`index.html` deve stare nella cartella pubblica, es. `/`).
3. Fatto: nessuna configurazione server necessaria.

## Video
- Il video di presentazione **IABOX** è già locale in `iaprod-site/video/iabox.mp4`.
- I video del **portfolio IAPROD** sono caricati dal repository GitHub già online
  (`https://casacag.github.io/showreel_IAPROD/video/...`), così il sito resta leggero.

Per renderlo **100% autonomo** (consigliato in produzione):
1. Scarica gli 8 file `.mp4` dal repo `showreel_IAPROD/public/video`.
2. Crea una cartella `iaprod-site/video/` e copiali dentro.
3. In `script.js` cambia:
   ```js
   var VIDEO_BASE = "https://casacag.github.io/showreel_IAPROD/video/";
   // in:
   var VIDEO_BASE = "video/";
   ```

## Da personalizzare (cerca questi punti)
- **P.IVA** → in `index.html`, footer: `P.IVA __________` (inserisci quando attiva).
- **Email** → attualmente `alessio.cocco1995@gmail.com` (presente in nav, prezzi, contatti).
- **Social** → non inseriti: appena hai gli URL di Instagram / TikTok / LinkedIn / YouTube
  posso aggiungere le icone nel footer e nella sezione contatti.

## Note
- Design responsive (desktop / tablet / mobile), accessibile, rispetta `prefers-reduced-motion`.
- SEO di base inclusa: meta description, Open Graph, dati strutturati JSON-LD (LocalBusiness).
