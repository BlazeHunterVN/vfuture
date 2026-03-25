const fs = require('fs');
const path = require('path');

// Simple JS Minifier (removes comments, whitespace, newlines)
function minifyJS(code) {
    return code
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove single-line comments (but preserve URLs)
        .replace(/([^:]|^)\/\/.*$/gm, '$1')
        // Remove excess whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around operators and punctuation
        .replace(/\s*([{}();,:])\s*/g, '$1')
        // Remove newlines
        .replace(/\n/g, '')
        .trim();
}

// Simple CSS Minifier
function minifyCSS(code) {
    return code
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove excess whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around {, }, :, ;, ,
        .replace(/\s*([{}:;,])\s*/g, '$1')
        // Remove newlines
        .replace(/\n/g, '')
        .trim();
}

// Process files
const files = [
    { input: 'assets/css/style.css', output: 'assets/css/style.min.css', type: 'css' },
    { input: 'assets/css/chat_style.css', output: 'assets/css/chat_style.min.css', type: 'css' },
    { input: 'assets/js/script.js', output: 'assets/js/script.min.js', type: 'js' },
    { input: 'assets/js/chat_bot.js', output: 'assets/js/chat_bot.min.js', type: 'js' }
];

console.log('🔧 Minifying files...\n');

files.forEach(file => {
    try {
        const input = fs.readFileSync(file.input, 'utf8');
        const minified = file.type === 'css' ? minifyCSS(input) : minifyJS(input);

        fs.writeFileSync(file.output, minified);

        const originalSize = (Buffer.byteLength(input) / 1024).toFixed(2);
        const minifiedSize = (Buffer.byteLength(minified) / 1024).toFixed(2);
        const savings = (((Buffer.byteLength(input) - Buffer.byteLength(minified)) / Buffer.byteLength(input)) * 100).toFixed(1);

        console.log(`✅ ${file.input}`);
        console.log(`   → ${file.output}`);
        console.log(`   Size: ${originalSize}KB → ${minifiedSize}KB (${savings}% smaller)\n`);
    } catch (error) {
        console.error(`❌ Error processing ${file.input}:`, error.message);
    }
});

console.log('✨ Minification complete!');
