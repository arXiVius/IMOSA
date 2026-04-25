const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main';

const replacements = [
    { p: /Rangiora/gi, r: 'Timika' },
    { p: /pavlova/gi, r: 'Nasi Kuning' },
    { p: /Chill/gi, r: 'IMOSA' },
    { p: /NZJFT/gi, r: 'IJFT' },
    { p: /New Zealand Junior Expedition Tour/gi, r: 'Indonesian Junior Expedition Tour' },
    { p: /Indonesian style/gi, r: 'Indonesian style' }, // already done but making sure
    { p: /lolly-cake/gi, r: 'traditional' },
    { p: /Dogtuckers/gi, r: 'Summit Seekers' },
    { p: /MOFO/gi, r: 'Puncak Open' },
    { p: /curling/gi, r: 'climbing' },
    { p: /rink/gi, r: 'route' },
    { p: /stones?/gi, r: 'gear' },
    { p: /ice/gi, r: 'glacier' },
    { p: /mulled wine/gi, r: 'warm tea' },
    { p: /South Island/gi, r: 'Papua' },
    { p: /Christchurch/gi, r: 'Jakarta' }
];

function processDir(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(d, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'scratch' && entry.name !== '.system_generated' && entry.name !== '.git') {
                processDir(fullPath);
            }
        } else if (entry.name.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            for (const rep of replacements) {
                if (rep.p.test(content)) {
                    content = content.replace(rep.p, rep.r);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Deep cleaned remnants in: ${fullPath}`);
            }
        }
    }
}

processDir(dir);
console.log('Deep cleaning complete.');
