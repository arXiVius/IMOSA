const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main';

const replacements = [
    { p: /Mt Olympus/gi, r: 'IMOSA' },
    { p: /Mt-O/gi, r: 'IMOSA' },
    { p: /New Zealand/gi, r: 'Indonesia' },
    { p: /Kiwi-style/gi, r: 'Traditional' },
    { p: /Kiwi/gi, r: 'Indonesian' }
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
                console.log(`Rebranded content in: ${fullPath}`);
            }
        }
    }
}

processDir(dir);
console.log('Rebranding complete.');
