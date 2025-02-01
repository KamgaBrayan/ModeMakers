const fs = require('fs');
const path = require('path');

// Chemin vers votre dossier services
const servicesPath = './src/app/services';

// Expressions régulières pour trouver les endpoints
const httpMethodRegex = /(get|post|put|delete|patch)<.*?>\(`(.*?)`/gi;

// Parcourir les fichiers
function scanServices(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        
        if (fs.statSync(filePath).isDirectory()) {
            scanServices(filePath);
        } else if (file.endsWith('.service.ts')) {
            const content = fs.readFileSync(filePath, 'utf8');
            console.log(`\n=== ${file} ===`);
            
            let match;
            while ((match = httpMethodRegex.exec(content)) !== null) {
                console.log(`${match[1].toUpperCase()}: ${match[2]}`);
            }
        }
    });
}

console.log('Liste des endpoints de l\'application :');
scanServices(servicesPath);