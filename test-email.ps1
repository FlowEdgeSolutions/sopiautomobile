# E-Mail Test Script für Sopi Automobile
# Testet die Lead-API mit ayubkhaled5@gmail.com

Write-Host "Starte E-Mail-Test für Sopi Automobile..." -ForegroundColor Green
Write-Host ""

# Test-Daten
$testData = @{
    vehicle = @{
        brand = "BMW"
        model = "3er"
        firstRegistrationYear = 2018
        mileageKm = 85000
        condition = "gut"
    }
    contact = @{
        name = "Khaled Test"
        email = "ayubkhaled5@gmail.com"
        phone = "+49157569909498"
    }
    meta = @{
        source = "powershell-test"
        consent = $true
    }
}

# In JSON konvertieren
$jsonData = $testData | ConvertTo-Json -Depth 10

Write-Host "Test-Daten:" -ForegroundColor Yellow
Write-Host $jsonData
Write-Host ""

try {
    Write-Host "Sende Lead-Anfrage an API..." -ForegroundColor Blue
    
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/leads" `
                                  -Method POST `
                                  -ContentType "application/json" `
                                  -Body $jsonData
    
    Write-Host "ERFOLG! E-Mail-Test abgeschlossen" -ForegroundColor Green
    Write-Host ""
    Write-Host "Antwort der API:" -ForegroundColor Yellow
    Write-Host "Lead ID: $($response.leadId)"
    Write-Host "Nachricht: $($response.message)"
    Write-Host "Antwortzeit: $($response.estimatedResponseTime)"
    Write-Host ""
    Write-Host "E-Mails wurden gesendet an:" -ForegroundColor Cyan
    Write-Host "  Kunde: ayubkhaled5@gmail.com"
    Write-Host "  Unternehmen: info@sopiautomobile.de"
    Write-Host "  Unternehmen: julianmazreku4@outlook.de"
    Write-Host ""
    Write-Host "Überprüfe jetzt deine E-Mail-Postfächer (auch Spam-Ordner)!" -ForegroundColor Magenta
    
} catch {
    Write-Host "FEHLER beim E-Mail-Test:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Write-Host ""
    Write-Host "Details:" -ForegroundColor Yellow
    Write-Host $_.Exception
}