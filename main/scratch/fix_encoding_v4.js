const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main';

const replacements = [
    { p: /\u00e2\u2020/g, r: '←' }, // Arrow
    { p: /\u00e2\u2026/g, r: '…' }, // Ellipsis
    { p: /\u00e2\u20ac\u009d/g, r: '”' },
    { p: /\u00e2\u20ac\u009c/g, r: '“' },
    { p: /\u00e2\u20ac\u2122/g, r: '’' },
    { p: /\u00e2\u20ac\u201c/g, r: '—' },
    { p: /\u00e2\u20ac\u2013/g, r: '–' },
    { p: /\u00e2\u20ac\u2018/g, r: '-' },
    { p: /\u00e2\u20ac\u2039/g, r: '' },
    { p: /\u00e2\u20ac\u00a6/g, r: '…' },
    { p: /\u00e2\u20ac/g, r: '' },
    { p: /â† /g, r: '←' },
    { p: /â€¦/g, r: '…' },
    { p: /â€™/g, r: '’' },
    { p: /â€”/g, r: '—' },
    { p: /â€“/g, r: '–' },
    { p: /â€œ/g, r: '“' },
    { p: /â€ /g, r: '' },
    { p: /â€‹/g, r: '' },
    { p: /Â/g, r: '' }
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
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDir(dir);
console.log('Cleanup complete.');
