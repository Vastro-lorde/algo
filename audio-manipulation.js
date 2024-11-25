import { readdirSync, statSync, existsSync, renameSync } from 'fs';
import { resolve, join, extname } from 'path';
import { parseFile } from 'music-metadata';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { update } = require('node-id3');

/**
 * Sets the song artist for all audio files in a folder.
 * @param {string} folderPath the folder containing the audio files to update
 * @param {string} newArtist the new artist name to set; if not provided, the existing artist name will be left unchanged
 * @returns {Promise<void>}
 */
export const setSongArtist = async (folderPath, newArtist) => {
    newArtist = newArtist.trim();
    console.log('Setting song artists to:', newArtist);
    try {
        // Ensure the folderPath is resolved to an absolute path
        folderPath = resolve(folderPath);
        // Get all files in the folder
        const files = readdirSync(folderPath);

        for (const file of files) {
            const filePath = join(folderPath, file);

            // Skip directories and non-audio files
            if (!statSync(filePath).isFile() || !file.match(/\.(mp3|wav|flac|m4a)$/i)) {
                continue;
            }

            // Extract metadata
            const metadata = await parseFile(filePath);

            const tags = {
                contributingartists: newArtist || metadata.common.artist,
                albumartist: newArtist || metadata.common.artist,
                artist: newArtist || metadata.common.artist,
                album: "Set Fire"
            };

            // Write the updated metadata back to the file
            // Update the ID3 metadata for MP3 files (node-id3 only works with MP3 files)
            if (extname(file).toLowerCase() === '.mp3') {
                const success = update(tags, filePath);
                if (success) {
                    console.log(`Updated artist for: ${file} -> ${tags.artist}`);
                } else {
                    console.log(`Failed to update title and artist for: ${file}`);
                }
            } else {
                console.log(`Skipping non-MP3 file: ${file}`);
            }
            console.log(`Updated artist for: ${file} -> ${tags.artist}`);
        }

        console.log('All files have been processed.');
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

/**
 * Renames audio files in a folder using their metadata.
 * @param {string} folderPath the folder containing the audio files to rename
 * @returns {Promise<void>}
 */
export const renameAudioFiles = async (folderPath) => {
    console.log('Music-metadata:', parseFile);
    console.log('parseFile:', typeof parseFile);
    try {
         // Ensure the folderPath is resolved to an absolute path
         folderPath = resolve(folderPath);
        // Get all files in the folder
        const files = readdirSync(folderPath);

        for (const file of files) {
            const filePath = join(folderPath, file);

            // Skip directories and non-audio files
            if (!statSync(filePath).isFile() || !file.match(/\.(mp3|wav|flac|m4a)$/i)) {
                continue;
            }

            // Extract metadata
            const metadata = await parseFile(filePath);
            const title = metadata.common.title || 'Unknown Title';
            const artist = metadata.common.artist || 'Unknown Artist';

            // Construct the new file name
            let newFileName = `${title}-${artist}${extname(file)}`;
            let newFilePath = join(folderPath, newFileName);

            // Handle duplicates
            let counter = 1;
            while (existsSync(newFilePath)) {
                newFileName = `${title}-${artist} (${counter})${extname(file)}`;
                newFilePath = join(folderPath, newFileName);
                counter++;
            }

            // Rename the file
            renameSync(filePath, newFilePath);
            console.log(`Renamed: ${file} -> ${newFileName}`);
        }

        console.log('All files have been processed.');
    } catch (error) {
        console.error('Error processing files:', error);
    }
}
