const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main';

function fixEncoding(dirPath) {
    const files = fs.readdirSync(dirPath);
    let count = 0;
    
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (!fullPath.includes('scratch') && !fullPath.includes('.system_generated')) {
                count += fixEncoding(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const orig = content;
            
            // Reversing the remaining corrupted characters using explicit string characters
            
            // right double quote: \u00e2 \u20ac \u009d
            content = content.replace(/\u00e2\u20ac\u009d/g, '”');
            
            // non-breaking hyphen: \u00e2 \u20ac \u2018
            content = content.replace(/\u00e2\u20ac\u2018/g, '‐');
            
            // zero width space: \u00e2 \u20ac \u2039
            content = content.replace(/\u00e2\u20ac\u2039/g, '');

            // zero width joiner: \u00e2 \u20ac \u008d
            content = content.replace(/\u00e2\u20ac\u008d/g, '');

            if (content !== orig) {
                fs.writeFileSync(fullPath, content, 'utf8');
                count++;
            }
        }
    }
    return count;
}

const c = fixEncoding(dir);
console.log(`Fixed ${c} files`);
