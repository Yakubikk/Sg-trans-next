# PM2 Management Script for Windows PowerShell
# Usage: .\pm2.ps1 <command> [args]
# Commands: start, stop, restart, reload, delete, status, logs, monit

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("start", "stop", "restart", "reload", "delete", "status", "logs", "monit")]
    [string]$Command,
    
    [Parameter(Mandatory=$false)]
    [string[]]$ExtraArgs = @()
)

# Color output functions
function Write-ColorOutput {
    param(
        [string]$Message,
        [ConsoleColor]$ForegroundColor = [ConsoleColor]::White,
        [string]$Prefix = ""
    )
    
    if ($Prefix) {
        Write-Host "$Prefix " -ForegroundColor $ForegroundColor -NoNewline
    }
    Write-Host $Message -ForegroundColor $ForegroundColor
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput -Message $Message -ForegroundColor Green -Prefix "✅"
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput -Message $Message -ForegroundColor Red -Prefix "❌"
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput -Message $Message -ForegroundColor Blue -Prefix "ℹ️ "
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput -Message $Message -ForegroundColor Yellow -Prefix "⚠️ "
}

# Check if PM2 is installed
function Test-PM2Installation {
    try {
        $null = & pm2 --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

# Find PM2 config file
function Find-ConfigFile {
    $configFiles = @(
        "ecosystem.config.js",
        "ecosystem.config.json", 
        "pm2.config.js",
        "pm2.config.json"
    )
    
    foreach ($configFile in $configFiles) {
        if (Test-Path $configFile) {
            return $configFile
        }
    }
    return $null
}

# Execute PM2 command
function Invoke-PM2Command {
    param(
        [string]$PM2Command,
        [string[]]$Arguments = @()
    )
    
    $fullCommand = "pm2 $PM2Command"
    if ($Arguments.Count -gt 0) {
        $fullCommand += " " + ($Arguments -join " ")
    }
    
    Write-Info "Executing: $fullCommand"
    
    try {
        $process = Start-Process -FilePath "pm2" -ArgumentList ($PM2Command + $Arguments) -NoNewWindow -Wait -PassThru
        
        if ($process.ExitCode -eq 0) {
            return $true
        } else {
            Write-Error "PM2 command failed with exit code $($process.ExitCode)"
            return $false
        }
    }
    catch {
        Write-Error "Failed to execute PM2 command: $($_.Exception.Message)"
        return $false
    }
}

# Main execution
function Main {
    Write-ColorOutput -Message "🚀 PM2 Windows PowerShell Manager" -ForegroundColor Magenta
    Write-Info "Platform: Windows PowerShell"
    Write-Info "Command: $Command"
    
    # Check PM2 installation
    if (-not (Test-PM2Installation)) {
        Write-Error "PM2 is not installed or not found in PATH"
        Write-Info "Install PM2 globally: npm install -g pm2"
        exit 1
    }
    
    Write-Success "PM2 is installed"
    
    $success = $false
    
    switch ($Command) {
        "start" {
            $configFile = Find-ConfigFile
            if ($configFile) {
                Write-Info "Using config file: $configFile"
                $success = Invoke-PM2Command -PM2Command "start" -Arguments ($configFile + $ExtraArgs)
            } else {
                Write-Warning "No PM2 config file found, starting with package.json"
                $success = Invoke-PM2Command -PM2Command "start" -Arguments ("package.json" + $ExtraArgs)
            }
            if ($success) { Write-Success "Application started successfully" }
        }
        
        "stop" {
            $success = Invoke-PM2Command -PM2Command "stop" -Arguments ("all" + $ExtraArgs)
            if ($success) { Write-Success "Application stopped successfully" }
        }
        
        "restart" {
            $success = Invoke-PM2Command -PM2Command "restart" -Arguments ("all" + $ExtraArgs)
            if ($success) { Write-Success "Application restarted successfully" }
        }
        
        "reload" {
            $success = Invoke-PM2Command -PM2Command "reload" -Arguments ("all" + $ExtraArgs)
            if ($success) { Write-Success "Application reloaded successfully" }
        }
        
        "delete" {
            $success = Invoke-PM2Command -PM2Command "delete" -Arguments ("all" + $ExtraArgs)
            if ($success) { Write-Success "Application deleted from PM2" }
        }
        
        "status" {
            $success = Invoke-PM2Command -PM2Command "status" -Arguments $ExtraArgs
        }
        
        "logs" {
            $success = Invoke-PM2Command -PM2Command "logs" -Arguments $ExtraArgs
        }
        
        "monit" {
            $success = Invoke-PM2Command -PM2Command "monit" -Arguments $ExtraArgs
        }
        
        default {
            Write-Error "Command $Command not implemented"
            exit 1
        }
    }
    
    if (-not $success) {
        exit 1
    }
}

# Error handling
trap {
    Write-Error "Unhandled error: $($_.Exception.Message)"
    exit 1
}

# Run main function
Main
