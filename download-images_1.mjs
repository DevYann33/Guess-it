// download-images.mjs
// Lance avec : node download-images.mjs
// Les images seront téléchargées dans ./public/images/

import fs from "fs";
import path from "path";
import https from "https";

const OUTPUT_DIR = "./public/images";

const words = [
  { file: "phare.jpg",      query: "lighthouse sea coast" },
  { file: "boussole.jpg",   query: "compass navigation" },
  { file: "telescope.jpg",  query: "telescope astronomy" },
  { file: "sablier.jpg",    query: "hourglass sand timer" },
  { file: "parapluie.jpg",  query: "umbrella rain" },
  { file: "echiquier.jpg",  query: "chess board game" },
  { file: "volcan.jpg",     query: "volcano eruption lava" },
  { file: "igloo.jpg",      query: "igloo snow arctic" },
  { file: "girouette.jpg",  query: "weather vane wind roof" },
  { file: "ancre.jpg",      query: "anchor boat sea" },
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

    const url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;

    try {
      process.stdout.write(`⬇️  Téléchargement de ${file}...`);
      await download(url, dest);
      console.log(" ✅");
    } catch (err) {
      console.log(` ❌ Erreur : ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 500));
  }

  console.log("\n🎉 Terminé ! Toutes les images sont dans", OUTPUT_DIR);
}

main();
