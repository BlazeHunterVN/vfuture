# Minify CSS and JS Files
Write-Host "Minifying files..." -ForegroundColor Cyan
Write-Host ""

function Compress-CssContent {
    param([string]$Content)
    # Remove comments
    $Content = $Content -replace '/\*[\s\S]*?\*/', ''
    # Remove excess whitespace
    $Content = $Content -replace '\s+', ' '
    # Remove spaces around {, }, :, ;, ,
    $Content = $Content -replace '\s*([{}:;,])\s*', '$1'
    return $Content.Trim()
}

function Compress-JsContent {
    param([string]$Content)
    # Remove multi-line comments
    $Content = $Content -replace '/\*[\s\S]*?\*/', ''
    # Remove single-line comments (preserve URLs)
    $Content = $Content -replace '([^:]|^)//.*$', '$1'
    # Remove excess whitespace
    $Content = $Content -replace '\s+', ' '
    # Remove spaces around punctuation
    $Content = $Content -replace '\s*([{}();,:])\s*', '$1'
    return $Content.Trim()
}

$Files = @(
    @{Input = 'assets\css\style.css'; Output = 'assets\css\style.min.css'; Type = 'css' },
    @{Input = 'assets\css\chat_style.css'; Output = 'assets\css\chat_style.min.css'; Type = 'css' },
    @{Input = 'assets\js\script.js'; Output = 'assets\js\script.min.js'; Type = 'js' },
    @{Input = 'assets\js\chat_bot.js'; Output = 'assets\js\chat_bot.min.js'; Type = 'js' }
)

foreach ($File in $Files) {
    try {
        $Content = Get-Content -Path $File.Input -Raw -Encoding UTF8
        
        if ($File.Type -eq 'css') {
            $Minified = Compress-CssContent -Content $Content
        }
        else {
            $Minified = Compress-JsContent -Content $Content
        }
        
        [System.IO.File]::WriteAllText($File.Output, $Minified, [System.Text.Encoding]::UTF8)
        
        $OriginalSize = ($Content.Length / 1024).ToString("F2")
        $MinifiedSize = ($Minified.Length / 1024).ToString("F2")
        $Savings = ((($Content.Length - $Minified.Length) / $Content.Length) * 100).ToString("F1")
        
        Write-Host "[OK] $($File.Input)" -ForegroundColor Green
        Write-Host "  -> $($File.Output)" -ForegroundColor Gray
        Write-Host "  Size: $($OriginalSize)KB -> $($MinifiedSize)KB ($($Savings)% smaller)" -ForegroundColor Yellow
        Write-Host ""
    }
    catch {
        Write-Host "[ERROR] $($File.Input) - $_" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "Minification complete!" -ForegroundColor Green
