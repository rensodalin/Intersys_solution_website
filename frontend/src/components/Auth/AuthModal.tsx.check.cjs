
const fs = require('fs');
const content = fs.readFileSync('d:\\Testing\\Intersys_solution_website\\frontend\\src\\components\\Auth\\AuthModal.tsx', 'utf8');

function count(char) {
    return content.split(char).length - 1;
}

console.log(' { :', count('{'));
console.log(' } :', count('}'));
console.log(' ( :', count('('));
console.log(' ) :', count(')'));
console.log(' < :', count('<'));
console.log(' > :', count('>'));
