$dir = 'c:\Users\user\Downloads\projectsishere\barchart\IMOSA\main'
$htmlFiles = Get-ChildItem -Path $dir -Filter '*.html' -Recurse

$count = 0
foreach ($file in $htmlFiles) {
    if ($file.FullName -match 'scratch' -or $file.FullName -match '\.system_generated') { continue }
    
    $content = [IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $originalContent = $content

    $content = $content.Replace('â€”', '—')
    $content = $content.Replace('â€“', '–')
    $content = $content.Replace('â€˜', '‘')
    $content = $content.Replace('â€™', '’')
    $content = $content.Replace('â€œ', '“')
    $content = $content.Replace('â€', '”')
    $content = $content.Replace('â€¢', '•')
    $content = $content.Replace('â€', '‐')
    $content = $content.Replace('Â©', '©')
    $content = $content.Replace('Â®', '®')
    $content = $content.Replace('Â ', ' ')

    if ($content -cne $originalContent) {
        [IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $count++
    }
}
Write-Host "Fixed encoding artifacts in $count files."
