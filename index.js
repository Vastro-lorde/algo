
import { renameAudioFiles, setSongArtist } from "./audio-manipulation.js";

async function main() {
    const albumPath = "C:\\Users\\seun\\Music\\music\\artists\\adele";
    const artistName = "Adele";
    //await renameAudioFiles(albumPath);
    await setSongArtist(albumPath, artistName);
}

main();