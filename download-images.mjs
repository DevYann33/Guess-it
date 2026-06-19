// download-images.mjs
// Lance avec : node download-images.mjs
// Les images seront téléchargées dans ./public/images/

import fs from "fs";
import path from "path";
import https from "https";

const OUTPUT_DIR = "./public/images";

const words = [
  { file: "catapulte.jpg",    query: "catapult medieval" },
  { file: "grimoire.jpg",     query: "grimoire magic book" },
  { file: "armure.jpg",       query: "medieval armor knight" },
  { file: "moulin.jpg",       query: "windmill countryside" },
  { file: "funambule.jpg",    query: "tightrope walker circus" },
  { file: "observatoire.jpg", query: "observatory telescope stars" },
  { file: "montgolfiere.jpg", query: "hot air balloon sky" },
  { file: "cameleon.jpg",     query: "chameleon reptile" },
  { file: "labyrinthe.jpg",   query: "maze labyrinth" },
  { file: "gargouille.jpg",   query: "gargoyle cathedral gothic" },
  { file: "totem.jpg",        query: "totem pole native" },
  { file: "fossile.jpg",      query: "fossil dinosaur rock" },
  { file: "meduse.jpg",       query: "jellyfish ocean" },
  { file: "geyser.jpg",       query: "geyser iceland water" },
  { file: "pagode.jpg",       query: "pagoda temple asia" },
  { file: "dromadaire.jpg",   query: "dromedary camel desert" },
  { file: "caravane.jpg",     query: "caravan desert nomad" },
  { file: "balancier.jpg",    query: "pendulum clock" },
  { file: "kiosque.jpg",      query: "kiosk newsstand" },
  { file: "manoir.jpg",       query: "manor house estate" },
  { file: "sarcophage.jpg",   query: "sarcophagus egypt mummy" },
  { file: "parchemin.jpg",    query: "parchment scroll ancient" },
  { file: "corsaire.jpg",     query: "pirate ship corsair" },
  { file: "cadran.jpg",       query: "sundial clock face" },
  { file: "tramway.jpg",      query: "tramway tram city" },
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      // Suivre les redirections
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  console.log(`📁 Dossier de sortie : ${OUTPUT_DIR}\n`);

  for (const { file, query } of words) {
    const dest = path.join(OUTPUT_DIR, file);

    if (fs.existsSync(dest)) {
      console.log(`⏭️  ${file} déjà présent, ignoré.`);
      continue;
    }

    // Unsplash Source API — image aléatoire 800x600 pour le mot-clé
    const url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;

    try {
      process.stdout.write(`⬇️  Téléchargement de ${file}...`);
      await download(url, dest);
      console.log(" ✅");
    } catch (err) {
      console.log(` ❌ Erreur : ${err.message}`);
    }

    // Petite pause pour ne pas spammer l'API
    await new Promise(r => setTimeout(r, 500));
  }

  console.log("\n🎉 Terminé ! Toutes les images sont dans", OUTPUT_DIR);
}

main();
