// download-images.mjs
// Lance avec : node download-images.mjs
// Les images seront téléchargées dans ./public/images/

import fs from "fs";
import path from "path";
import https from "https";

const OUTPUT_DIR = "./public/images";

// Picsum Photos : images libres de droits, fiables, par ID
// https://picsum.photos/800/600?image=ID
const words = [
  { file: "ancre.jpg",         url: "https://picsum.photos/seed/ancre/800/600" },
  { file: "armure.jpg",        url: "https://picsum.photos/seed/armure/800/600" },
  { file: "balancier.jpg",     url: "https://picsum.photos/seed/balancier/800/600" },
  { file: "boussole.jpg",      url: "https://picsum.photos/seed/boussole/800/600" },
  { file: "cadran.jpg",        url: "https://picsum.photos/seed/cadran/800/600" },
  { file: "cameleon.jpg",      url: "https://picsum.photos/seed/cameleon/800/600" },
  { file: "caravane.jpg",      url: "https://picsum.photos/seed/caravane/800/600" },
  { file: "catapulte.jpg",     url: "https://picsum.photos/seed/catapulte/800/600" },
  { file: "corsaire.jpg",      url: "https://picsum.photos/seed/corsaire/800/600" },
  { file: "dromadaire.jpg",    url: "https://picsum.photos/seed/dromadaire/800/600" },
  { file: "echiquier.jpg",     url: "https://picsum.photos/seed/echiquier/800/600" },
  { file: "fossile.jpg",       url: "https://picsum.photos/seed/fossile/800/600" },
  { file: "funambule.jpg",     url: "https://picsum.photos/seed/funambule/800/600" },
  { file: "gargouille.jpg",    url: "https://picsum.photos/seed/gargouille/800/600" },
  { file: "geyser.jpg",        url: "https://picsum.photos/seed/geyser/800/600" },
  { file: "girouette.jpg",     url: "https://picsum.photos/seed/girouette/800/600" },
  { file: "grimoire.jpg",      url: "https://picsum.photos/seed/grimoire/800/600" },
  { file: "igloo.jpg",         url: "https://picsum.photos/seed/igloo/800/600" },
  { file: "kiosque.jpg",       url: "https://picsum.photos/seed/kiosque/800/600" },
  { file: "labyrinthe.jpg",    url: "https://picsum.photos/seed/labyrinthe/800/600" },
  { file: "manoir.jpg",        url: "https://picsum.photos/seed/manoir/800/600" },
  { file: "meduse.jpg",        url: "https://picsum.photos/seed/meduse/800/600" },
  { file: "montgolfiere.jpg",  url: "https://picsum.photos/seed/montgolfiere/800/600" },
  { file: "moulin.jpg",        url: "https://picsum.photos/seed/moulin/800/600" },
  { file: "observatoire.jpg",  url: "https://picsum.photos/seed/observatoire/800/600" },
  { file: "pagode.jpg",        url: "https://picsum.photos/seed/pagode/800/600" },
  { file: "parapluie.jpg",     url: "https://picsum.photos/seed/parapluie/800/600" },
  { file: "parchemin.jpg",     url: "https://picsum.photos/seed/parchemin/800/600" },
  { file: "phare.jpg",         url: "https://picsum.photos/seed/phare/800/600" },
  { file: "sablier.jpg",       url: "https://picsum.photos/seed/sablier/800/600" },
  { file: "sarcophage.jpg",    url: "https://picsum.photos/seed/sarcophage/800/600" },
  { file: "telescope.jpg",     url: "https://picsum.photos/seed/telescope/800/600" },
  { file: "totem.jpg",         url: "https://picsum.photos/seed/totem/800/600" },
  { file: "tramway.jpg",       url: "https://picsum.photos/seed/tramway/800/600" },
  { file: "volcan.jpg",        url: "https://picsum.photos/seed/volcan/800/600" },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  console.log(`📁 Dossier de sortie : ${OUTPUT_DIR}\n`);

  for (const { file, url } of words) {
    const dest = path.join(OUTPUT_DIR, file);

    // Supprimer les fichiers corrompus (< 5ko)
    if (fs.existsSync(dest)) {
      const size = fs.statSync(dest).size;
      if (size > 5000) {
        console.log(`⏭️  ${file} déjà présent (${Math.round(size/1024)}ko), ignoré.`);
        continue;
      } else {
        console.log(`🗑️  ${file} corrompu (${size} octets), re-téléchargement...`);
        fs.unlinkSync(dest);
      }
    }

    try {
      process.stdout.write(`⬇️  Téléchargement de ${file}...`);
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(` ✅ (${Math.round(size/1024)}ko)`);
    } catch (err) {
      console.log(` ❌ Erreur : ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log("\n🎉 Terminé ! Toutes les images sont dans", OUTPUT_DIR);
}

main();
