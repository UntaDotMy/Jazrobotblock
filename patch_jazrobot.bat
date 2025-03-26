@echo off
setlocal EnableDelayedExpansion
title JazroBot Patcher

REM Get the current directory and full path
set "CURRENT_DIR=%~dp0"
set "SCRIPT_PATH=%~f0"
cd /d "%CURRENT_DIR%"

REM Check if already tried to elevate
if "%~1"=="ELEVATED" goto :continue

REM Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process -FilePath '%SCRIPT_PATH%' -ArgumentList 'ELEVATED' -WorkingDirectory '%CURRENT_DIR%' -Verb RunAs -Wait"
    exit /b
)

:continue
REM Check for required directories
set "MISSING_DIRS="
if not exist "www" set "MISSING_DIRS=www"
if not exist "www\blocs&generateurs" set "MISSING_DIRS=!MISSING_DIRS! www\blocs&generateurs"
if not exist "www\toolbox" set "MISSING_DIRS=!MISSING_DIRS! www\toolbox"
if not exist "www\js" set "MISSING_DIRS=!MISSING_DIRS! www\js"

if not "!MISSING_DIRS!"=="" (
    echo Error: Required directories not found!
    echo Please place this file in your ArduBlock installation folder.
    echo.
    echo Missing directories:
    echo !MISSING_DIRS!
    echo.
    echo Current location: %CD%
    echo.
    echo Make sure you have extracted the ArduBlock archive completely.
    pause
    exit /b 1
)

REM Set GitHub repository information
set GITHUB_RAW=https://raw.githubusercontent.com/UntaDotMy/Jazrobotblock/main

echo JazroBot Patcher for ArduBlock
echo ============================
echo.

REM Check version directly from GitHub
echo Checking for updates...
echo.
set "LOCAL_VERSION=0.0.0"
if exist "version.txt" (
    set /p LOCAL_VERSION=<version.txt
)

REM Get GitHub version using PowerShell
for /f "tokens=*" %%a in ('powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/version.txt' -UseBasicParsing | Select-Object -ExpandProperty Content"') do (
    set "GITHUB_VERSION=%%a"
)

REM Compare versions (simple string comparison works for semantic versioning)
if "%GITHUB_VERSION%" gtr "%LOCAL_VERSION%" (
    echo New patcher version available!
    echo Current version: %LOCAL_VERSION%
    echo Latest version: %GITHUB_VERSION%
    echo.
    echo Updating patcher...
    
    REM Download new patcher
    powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/patch_jazrobot.bat' -OutFile 'patch_jazrobot_new.bat'"
    
    if exist "patch_jazrobot_new.bat" (
        echo Patcher updated successfully.
        echo Starting new version...
        echo.
        REM Replace current patcher with new one
        move /Y "patch_jazrobot_new.bat" "%~f0"
        start "" "%~f0"
        exit /b 0
    ) else (
        echo Error: Failed to download new patcher.
        pause
        exit /b 1
    )
)

if "%LOCAL_VERSION%"=="%GITHUB_VERSION%" (
    echo You are already on the latest version: %LOCAL_VERSION%
    pause
    exit /b 0
)

echo Current version: %LOCAL_VERSION%
echo Latest version: %GITHUB_VERSION%
echo.

REM Get changelog directly from GitHub
echo Changelog:
echo ----------
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/changelog.txt' -UseBasicParsing | Select-Object -ExpandProperty Content"
echo ----------
echo.

set /p CONTINUE="Do you want to update? (Y/N): "
if /i not "%CONTINUE%"=="Y" (
    exit /b 0
)

echo.
echo Downloading JazroBot files...
echo.

REM Download files to temporary location first
echo Updating files...
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/jazrobot_blocs.js' -OutFile 'jazrobot_blocs_new.js'"
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/jazrobot_generateurs_cpp.js' -OutFile 'jazrobot_generateurs_cpp_new.js'"
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/toolbox_jazrobot.xml' -OutFile 'toolbox_jazrobot_new.xml'"
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/version.txt' -OutFile 'version_new.txt'"

REM Move files to their final locations
move /Y "jazrobot_blocs_new.js" "www\blocs&generateurs\jazrobot_blocs.js"
move /Y "jazrobot_generateurs_cpp_new.js" "www\blocs&generateurs\jazrobot_generateurs_cpp.js"
move /Y "toolbox_jazrobot_new.xml" "www\toolbox\toolbox_jazrobot.xml"
move /Y "version_new.txt" "version.txt"

echo Updating ArduBlock configuration...
echo.

REM Update index.html to include JazroBot scripts
echo Updating index.html...
powershell -Command ^"^
$indexPath = Join-Path (Get-Location).Path 'www\index.html';^
$content = Get-Content $indexPath -Raw;^
if (-not ($content -match 'jazrobot_blocs.js')) {^
    $content = $content -replace '(.*)</head>',^
    ('    <script type=^"text/javascript^" src=^"blocs^&generateurs/jazrobot_blocs.js^"></script>'`n +^
     '    <script type=^"text/javascript^" src=^"blocs^&generateurs/jazrobot_generateurs_cpp.js^"></script>'`n +^
     '$1</head>');^
    Set-Content $indexPath $content;^
}^"

REM Update boards.js to include JazroBot board
echo Updating boards.js...
powershell -Command ^"^
$boardsPath = Join-Path (Get-Location).Path 'www\js\boards.js';^
$content = Get-Content $boardsPath -Raw;^
if (-not ($content -match 'profile\[^"jazrobot^"\]')) {^
    $jazrobotProfile = @'
profile[`"jazrobot`"] = {
    description: `"JazroBot ESP32`",
    digital: [`"0`",`"2`",`"4`",`"5`",`"12`",`"13`",`"14`",`"15`",`"25`",`"26`",`"27`"],
    BUILTIN_LED: `"2`",
    dropdownPWM: [[`"0`", `"0`"], [`"2`", `"2`"], [`"4`", `"4`"], [`"5`", `"5`"], [`"12`", `"12`"], [`"13`", `"13`"], [`"14`", `"14`"], [`"15`", `"15`"], [`"25`", `"25`"], [`"26`", `"26`"], [`"27`", `"27`"]],
    dropdownAnalog: [[`"A0`", `"A0`"]],
    interrupt: [`"0`", `"2`", `"4`", `"5`", `"12`", `"13`", `"14`", `"15`", `"25`", `"26`", `"27`"],
    picture : `"media/esp32.jpg`",
    serial : [`"300`", `"600`", `"1200`", `"2400`", `"4800`", `"9600`", `"14400`", `"19200`", `"28800`", `"31250`", `"38400`", `"57600`", `"115200`"],
    serialPin: [[`"Rx/Tx`",`"0`"]],
    upload_arg: `"esp32:esp32:esp32`",
    cpu: `"jazrobot`",
    speed: `"115200`",
    prog: `"arduino`",
    usb: `"micro USB`",
    voltage: `"3,3V`",
    inout: `"20`"
};
'@
    $content = $content -replace '}\s*$', ($jazrobotProfile + "`n}")
    Set-Content $boardsPath $content
}^"

REM Update blocklino.js to include JazroBot toolbox
echo Updating blocklino.js...
powershell -Command ^"^
$blocklinoPath = Join-Path (Get-Location).Path 'www\js\blocklino.js';^
$content = Get-Content $blocklinoPath -Raw;^
if (-not ($content -match 'cpu == ^"jazrobot^"')) {^
    $content = $content -replace '(new_toolbox = ^"toolbox_arduino_all^";)',^
    ('$1'`n + '    } else if (cpu == ^"jazrobot^") {'`n + '        new_toolbox = ^"toolbox_jazrobot^";');^
    Set-Content $blocklinoPath $content^
}^"

echo.
echo Patch completed successfully!
echo Updated to version %GITHUB_VERSION%
echo.
echo Please restart ArduBlock for changes to take effect.
pause 