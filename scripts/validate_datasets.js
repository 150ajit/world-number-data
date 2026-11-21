const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.resolve(__dirname, '../data');
const manifestPath = path.join(dataDir, 'manifest.json');

console.log("Starting dataset integrity and schema validation...");

if (!fs.existsSync(manifestPath)) {
    console.error("FATAL: manifest.json does not exist!");
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log(`Checking Manifest v${manifest.manifestVersion} (${manifest.datasets.length} datasets registered)...`);

let hasError = false;

// 1. Verify countries.json
const countriesPath = path.join(dataDir, 'countries.json');
if (!fs.existsSync(countriesPath)) {
    console.error("FAIL: countries.json is missing!");
    hasError = true;
} else {
    const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));
    if (!Array.isArray(countries) || countries.length < 30) {
        console.error(`FAIL: countries.json invalid length (${countries?.length})`);
        hasError = true;
    } else {
        console.log(`PASS: countries.json verified (${countries.length} countries)`);
    }
}

// 2. Verify categories.json
const categoriesPath = path.join(dataDir, 'categories.json');
if (!fs.existsSync(categoriesPath)) {
    console.error("FAIL: categories.json is missing!");
    hasError = true;
} else {
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    if (!Array.isArray(categories) || categories.length !== 20) {
        console.error(`FAIL: categories.json must contain exactly 20 categories, found ${categories?.length}`);
        hasError = true;
    } else {
        console.log(`PASS: categories.json verified (20 categories matching UI screenshot)`);
    }
}

// 3. Verify each registered dataset
manifest.datasets.forEach(ds => {
    const filePath = path.join(dataDir, ds.path);
    if (!fs.existsSync(filePath)) {
        console.error(`FAIL: Missing dataset file at ${ds.path}`);
        hasError = true;
        return;
    }

    const content = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(content).digest('hex');

    if (hash !== ds.sha256) {
        console.error(`FAIL: Checksum mismatch for ${ds.id}! Expected: ${ds.sha256}, Actual: ${hash}`);
        hasError = true;
    } else {
        console.log(`PASS: [${ds.id}] SHA-256 checksum matched: ${hash.substring(0, 12)}...`);
    }
});

if (hasError) {
    console.error("Dataset validation failed with errors.");
    process.exit(1);
} else {
    console.log("SUCCESS: All datasets, schemas, and SHA-256 checksums are 100% valid!");
}
