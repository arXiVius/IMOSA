const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main';

const replacements = [
    { pattern: /\u00e2\u20ac\u201c/g, replacement: '—' }, // em dash
    { pattern: /\u00e2\u20ac\u201d/g, replacement: '—' }, // em dash variant
    { pattern: /\u00e2\u20ac\u2014/g, replacement: '—' }, // em dash
    { pattern: /\u00e2\u20ac\u2013/g, replacement: '–' }, // en dash
    { pattern: /\u00e2\u20ac\u2122/g, replacement: '’' }, // right single quote
    { pattern: /\u00e2\u20ac\u02dc/g, replacement: '‘' }, // left single quote
    { pattern: /\u00e2\u20ac\u0153/g, replacement: '“' }, // left double quote
    { pattern: /\u00e2\u20ac\u009d/g, replacement: '”' }, // right double quote
    { pattern: /\u00e2\u20ac\u009c/g, replacement: '“' }, // left double quote variant
    { pattern: /\u00e2\u20ac\u2039/g, replacement: '' },    // zero width space
    { pattern: /\u00e2\u20ac\u008d/g, replacement: '' },    // zero width joiner
    { pattern: /\u00e2\u20ac\u00a6/g, replacement: '…' }, // ellipsis
    { pattern: /\u00e2\u20ac\u00a2/g, replacement: '•' }, // bullet
    { pattern: /\u00e2\u20ac\u02c6/g, replacement: '-' }, // hyphen variant
    { pattern: /\u00e2\u20ac\u2018/g, replacement: '-' }, // non-breaking hyphen variant
    { pattern: /\u00e2\u20ac\u00b9/g, replacement: '' },    // another artifact
    { pattern: /\u00e2\u20ac\u00a2/g, replacement: '•' },
    { pattern: /\u00e2\u20ac\u009d/g, replacement: '”' },
    { pattern: /\u00e2\u20ac\u00a0/g, replacement: ' ' },
    { pattern: /\u20ac\u00a6/g, replacement: '…' },
    { pattern: /\u00e2\u20ac/g, replacement: '' }, // Catch-all for stray Euro/quote lead-ins
    { pattern: /\u00e2\u20ac/g, replacement: '' }, 
    { pattern: /\u00e2\u20ac[^\w\s<]/g, replacement: '' },
    { pattern: /â† /g, replacement: '←' },
    { pattern: /â€œ/g, replacement: '“' },
    { pattern: /â€”/g, replacement: '—' },
    { pattern: /â€™/g, replacement: '’' },
    { pattern: /â€“/g, replacement: '–' },
    { pattern: /â€¢/g, replacement: '•' },
    { pattern: /â€¦/g, replacement: '…' },
    { pattern: /â€/g, replacement: '' }, // Last ditch
    { pattern: /Â/g, replacement: '' },
    { pattern: /â€‹/g, replacement: '' },
    { pattern: /latlatest/g, replacement: 'latest' } // Fix typo detected in news/index.html
];

function cleanFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    let count = 0;
    
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (!fullPath.includes('scratch') && !fullPath.includes('.system_generated')) {
                count += cleanFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let matched = false;
            
            for (const r of replacements) {
                if (r.pattern.test(content)) {
                    content = content.replace(r.pattern, r.replacement);
                    matched = true;
                }
            }
            
            if (matched) {
                fs.writeFileSync(fullPath, content, 'utf8');
                count++;
            }
        }
    }
    return count;
}

const total = cleanFiles(dir);
console.log(`Cleaned ${total} files.`);
