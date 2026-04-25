$dir = 'c:\Users\user\Downloads\projectsishere\barchart\IMOSA\main'
$htmlFiles = Get-ChildItem -Path $dir -Filter '*.html' -Recurse

$Encoding1252 = [System.Text.Encoding]::GetEncoding(1252)
$EncodingUTF8 = [System.Text.Encoding]::UTF8

$count = 0
foreach ($file in $htmlFiles) {
    if ($file.FullName -match 'scratch' -or $file.FullName -match '\.system_generated') { continue }
    
    $content = [IO.File]::ReadAllText($file.FullName, $EncodingUTF8)
    $originalContent = $content

    $charsToFix = @(
        '—', '–', '‘', '’', '“', '”', '•', '‐', '©', '®', ' ', '…'
    )

    foreach ($char in $charsToFix) {
        $utf8Bytes = $EncodingUTF8.GetBytes($char)
        $corruptedString = $Encoding1252.GetString($utf8Bytes)
        
        if ($content.Contains($corruptedString)) {
            $content = $content.Replace($corruptedString, $char)
        }
    }

    if ($content -cne $originalContent) {
        [IO.File]::WriteAllText($file.FullName, $content, $EncodingUTF8)
        $count++
    }
}
Write-Host "Fixed encoding artifacts in $count files."
