const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main';

const fixes = [
    { p: /lglaciernsed/g, r: 'licensed' },
    { p: /nglacier/g, r: 'nice' },
    { p: /droutes/g, r: 'drinks' },
    { p: /New Zealand/g, r: 'Indonesia' }, // Catch-all
    { p: /NZ's/g, r: "Indonesia's" },
    { p: /Indonesian style/g, r: 'Indonesian style' }
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
            for (const f of fixes) {
                if (f.p.test(content)) {
                    content = content.replace(f.p, f.r);
                    changed = true;
                }
            }
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed over-replacements in: ${fullPath}`);
            }
        }
    }
}

processDir(dir);
console.log('Fixes complete.');
