import re
import os

def minify_css(css_content):
    """Minify CSS by removing comments, whitespace, and newlines"""
    # Remove comments
    css_content = re.sub(r'/\*[\s\S]*?\*/', '', css_content)
    # Remove excess whitespace
    css_content = re.sub(r'\s+', ' ', css_content)
    # Remove spaces around {, }, :, ;, ,
    css_content = re.sub(r'\s*([{}:;,])\s*', r'\1', css_content)
    return css_content.strip()

def minify_js(js_content):
    """Minify JS by removing comments, whitespace, and newlines"""
    # Remove multi-line comments
    js_content = re.sub(r'/\*[\s\S]*?\*/', '', js_content)
    # Remove single-line comments (but preserve URLs)
    js_content = re.sub(r'([^:]|^)//.*$', r'\1', js_content, flags=re.MULTILINE)
    # Remove excess whitespace
    js_content = re.sub(r'\s+', ' ', js_content)
    # Remove spaces around operators
    js_content = re.sub(r'\s*([{}();,:])\s*', r'\1', js_content)
    return js_content.strip()

files_to_minify = [
    ('assets/css/style.css', 'assets/css/style.min.css', 'css'),
    ('assets/css/chat_style.css', 'assets/css/chat_style.min.css', 'css'),
    ('assets/js/script.js', 'assets/js/script.min.js', 'js'),
    ('assets/js/chat_bot.js', 'assets/js/chat_bot.min.js', 'js'),
]

print('🔧 Minifying files...\n')

for input_file, output_file, file_type in files_to_minify:
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        minified = minify_css(content) if file_type == 'css' else minify_js(content)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(minified)
        
        original_size = len(content.encode('utf-8')) / 1024
        minified_size = len(minified.encode('utf-8')) / 1024
        savings = ((len(content) - len(minified)) / len(content)) * 100
        
        print(f'✅ {input_file}')
        print(f'   → {output_file}')
        print(f'   Size: {original_size:.2f}KB → {minified_size:.2f}KB ({savings:.1f}% smaller)\n')
    except Exception as e:
        print(f'❌ Error: {input_file} - {str(e)}\n')

print('✨ Minification complete!')
