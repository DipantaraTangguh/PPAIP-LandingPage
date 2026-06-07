import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const limits = {
    js: 130 * 1024,
    css: 20 * 1024,
    image: 1.5 * 1024 * 1024,
};

const buildDirectory = 'public/build/assets';
const publicAssetDirectory = 'public/assets';
const failures = [];

function filesIn(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);

        return entry.isDirectory() ? filesIn(path) : [path];
    });
}

for (const path of filesIn(buildDirectory)) {
    const extension = extname(path).slice(1);

    if (!['js', 'css'].includes(extension)) continue;

    const gzipBytes = gzipSync(readFileSync(path)).length;

    if (gzipBytes > limits[extension]) {
        failures.push(
            `${relative(buildDirectory, path)}: ${(gzipBytes / 1024).toFixed(1)} KiB gzip, limit ${(limits[extension] / 1024).toFixed(0)} KiB`,
        );
    }
}

for (const path of filesIn(publicAssetDirectory)) {
    if (!/\.(avif|gif|ico|jpe?g|png|webp)$/i.test(path)) continue;

    const bytes = statSync(path).size;

    if (bytes > limits.image) {
        failures.push(
            `${relative(publicAssetDirectory, path)}: ${(bytes / 1024 / 1024).toFixed(2)} MiB, image limit ${(limits.image / 1024 / 1024).toFixed(1)} MiB`,
        );
    }
}

if (failures.length > 0) {
    console.error(`Performance budget gagal:\n- ${failures.join('\n- ')}`);
    process.exit(1);
}

console.log('Performance budget aman.');
