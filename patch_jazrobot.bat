@echo off
setlocal EnableDelayedExpansion
title JazroBot Patcher

REM Check if running in ArduBlock directory
if not exist "www" (
    echo Error: This patcher must be run from the ArduBlock directory!
    echo Please place this file in your ArduBlock installation folder.
    echo.
    echo Current location: %CD%
    echo.
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

REM Download files directly to their target locations
echo Updating files...
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/jazrobot_blocs.js' -OutFile 'www\blocs&generateurs\jazrobot_blocs.js'"
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/jazrobot_generateurs_cpp.js' -OutFile 'www\blocs&generateurs\jazrobot_generateurs_cpp.js'"
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/toolbox_jazrobot.xml' -OutFile 'www\toolbox\toolbox_jazrobot.xml'"
powershell -Command "Invoke-WebRequest '%GITHUB_RAW%/version.txt' -OutFile 'version.txt'"

echo Updating ArduBlock configuration...
echo.

REM Update index.html to include JazroBot scripts
echo Updating index.html...
powershell -Command "$content = Get-Content 'www\index.html' -Raw; if (-not ($content -match 'jazrobot_blocs.js')) { $content = $content -replace '(.*)<\/head>', '    <script type=\"text/javascript\" src=\"blocs\&generateurs/jazrobot_blocs.js\"></script>`n    <script type=\"text/javascript\" src=\"blocs\&generateurs/jazrobot_generateurs_cpp.js\"></script>`n$1</head>'; Set-Content 'www\index.html' $content }"

REM Update boards.js to include JazroBot board
echo Updating boards.js...
powershell -Command "$content = Get-Content 'www\js\boards.js' -Raw; if (-not ($content -match 'profile\[\"jazrobot\"\]')) { $content = $content -replace '}\s*$', 'profile[\"jazrobot\"] = {\n    description: \"JazroBot ESP32\",\n    digital: [\"0\",\"2\",\"4\",\"5\",\"12\",\"13\",\"14\",\"15\",\"25\",\"26\",\"27\"],\n    BUILTIN_LED: \"2\",\n    dropdownPWM: [[\"0\", \"0\"], [\"2\", \"2\"], [\"4\", \"4\"], [\"5\", \"5\"], [\"12\", \"12\"], [\"13\", \"13\"], [\"14\", \"14\"], [\"15\", \"15\"], [\"25\", \"25\"], [\"26\", \"26\"], [\"27\", \"27\"]],\n    dropdownAnalog: [[\"A0\", \"A0\"]],\n    interrupt: [\"0\", \"2\", \"4\", \"5\", \"12\", \"13\", \"14\", \"15\", \"25\", \"26\", \"27\"],\n    picture : \"media/esp32.jpg\",\n    serial : [\"300\", \"600\", \"1200\", \"2400\", \"4800\", \"9600\", \"14400\", \"19200\", \"28800\", \"31250\", \"38400\", \"57600\", \"115200\"],\n    serialPin: [[\"Rx/Tx\",\"0\"]],\n    upload_arg: \"esp32:esp32:esp32\",\n    cpu: \"jazrobot\",\n    speed: \"115200\",\n    prog: \"arduino\",\n    usb: \"micro USB\",\n    voltage: \"3,3V\",\n    inout: \"20\"\n};\n}'; Set-Content 'www\js\boards.js' $content }"

REM Update blocklino.js to include JazroBot toolbox
echo Updating blocklino.js...
powershell -Command "$content = Get-Content 'www\js\blocklino.js' -Raw; if (-not ($content -match 'cpu == \"jazrobot\"')) { $content = $content -replace '(new_toolbox = \"toolbox_arduino_all\";)', '$1\n    } else if (cpu == \"jazrobot\") {\n        new_toolbox = \"toolbox_jazrobot\";'; Set-Content 'www\js\blocklino.js' $content }"

echo.
echo Patch completed successfully!
echo Updated to version %GITHUB_VERSION%
echo.
echo Please restart ArduBlock for changes to take effect.
pause 