const fs = require('fs');
const content = fs.readFileSync('c:/Users/user/Downloads/projectsishere/barchart/IMOSA/main/terms-conditions.html', 'utf8');
const match = content.match(/â.*?(?=\))/g);
if (match) {
    for (const m of match) {
        console.log(m.substring(0, 10));
        console.log(Array.from(m.substring(0, 5)).map(c => c.charCodeAt(0).toString(16)));
        break; // just 1
    }
}
const m2 = content.match(/â.{1,3}/g);
if (m2) {
    const set = new Set();
    for (const m of m2) {
        set.add(m);
    }
    for (const s of set) {
        console.log(s, Array.from(s).map(c => c.charCodeAt(0).toString(16)));
    }
}
