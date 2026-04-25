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
            
            content = content.replace(/â€”/g, '—');
            content = content.replace(/â€“/g, '–');
            content = content.replace(/â€˜/g, '‘');
            content = content.replace(/â€™/g, '’');
            content = content.replace(/â€œ/g, '“');
            content = content.replace(/â€ /g, '”');
            content = content.replace(/â€¢/g, '•');
            content = content.replace(/â€/g, '‐');
            content = content.replace(/â€\|/g, '…');
            content = content.replace(/Â©/g, '©');
            content = content.replace(/Â®/g, '®');
            content = content.replace(/Â /g, ' ');
            
            // For the user screenshot: â€Indonesia's..
            content = content.replace(/â€/g, ''); 
            
            // In case the missing char for ” or ‐ is mangled differently in node
            // we can also replace double encoding correctly:
            
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
