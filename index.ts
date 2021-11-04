import archiver from 'archiver';
import fs from 'fs';

async function zip(from: string, to: string,): Promise<void> {
    const ZIP_LEVEL = 9;
    const archive = archiver('zip', { zlib: { level: ZIP_LEVEL } });
    const stream = fs.createWriteStream(to);

    // 将刚刚append的文件从中filter掉，否则zip文件格式中会有两个一样的entry
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
