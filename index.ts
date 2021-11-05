import archiver from 'archiver';
import fs from 'fs';

async function zip(from: string, to: string,): Promise<void> {
    const ZIP_LEVEL = 9;
    const archive = archiver('zip', { zlib: { level: ZIP_LEVEL } });
    const stream = fs.createWriteStream(to);
    archive
        .directory(from, false)
        .on('error', err => {
            throw err;
        })
        .pipe(stream);

    await archive.finalize();
}

async function main(){
    await zip('./test','out.zip');
    process.exit();
}

main();
