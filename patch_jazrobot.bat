@echo off
title JazroBot Patcher

REM Check if already elevated
if "%~1"=="ELEVATED" (
    cd /d "%~2"
    goto :continue
)

REM Check for admin privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrator privileges...
    powershell -Command "Start-Process -FilePath '%~f0' -ArgumentList 'ELEVATED','%CD%' -Verb RunAs"
    exit /b
)

:continue
REM Check if running in ArduBlock directory
if not exist "www" (
    echo Error: This patcher must be run from the ArduBlock directory!
    echo Please place this file in your ArduBlock installation folder.
    echo.
    echo Current location: %CD%
    pause
    exit /b 1
)

echo JazroBot Patcher for ArduBlock
echo ============================
echo.

REM Set GitHub repository URL
set "GITHUB_RAW=https://raw.githubusercontent.com/UntaDotMy/Jazrobotblock/main"

REM Check version
set "LOCAL_VERSION=0.0.0"
if exist "version.txt" (
    set /p LOCAL_VERSION=<version.txt
)

powershell -Command "& { $version = Invoke-WebRequest '%GITHUB_RAW%/version.txt' -UseBasicParsing | Select-Object -ExpandProperty Content; if ($version -gt '%LOCAL_VERSION%') { exit 1 } }"
if %errorlevel% equ 1 (
    echo Updating patcher...
    powershell -Command "& { Invoke-WebRequest '%GITHUB_RAW%/patch_jazrobot.bat' -OutFile 'patch_jazrobot_new.bat' }"
    if exist "patch_jazrobot_new.bat" (
        move /Y "patch_jazrobot_new.bat" "%~f0"
        echo Patcher has been updated. Restarting...
        start "" "%~f0" ELEVATED
        exit /b
    )
)

REM Download and install files
echo Installing JazroBot files...
echo.

set "serverFilePath=%GITHUB_RAW%/jazrobot_blocs.js"
set "localFilePath=www\blocs&generateurs\jazrobot_blocs.js"
powershell -Command "& { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' }"
if exist "%localFilePath%" (
    echo 1. jazrobot_blocs.js OK
) else (
    echo Error: Failed to download jazrobot_blocs.js
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/jazrobot_generateurs_cpp.js"
set "localFilePath=www\blocs&generateurs\jazrobot_generateurs_cpp.js"
powershell -Command "& { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' }"
if exist "%localFilePath%" (
    echo 2. jazrobot_generateurs_cpp.js OK
) else (
    echo Error: Failed to download jazrobot_generateurs_cpp.js
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/toolbox_jazrobot.xml"
set "localFilePath=www\toolbox\toolbox_jazrobot.xml"
powershell -Command "& { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' }"
if exist "%localFilePath%" (
    echo 3. toolbox_jazrobot.xml OK
) else (
    echo Error: Failed to download toolbox_jazrobot.xml
    pause
    exit /b 1
)

REM Update configuration files
echo.
echo Updating configuration files...

REM Update index.html
powershell -Command "& { 
    $content = Get-Content 'www\index.html' -Raw
    if (-not ($content -match 'jazrobot_blocs.js')) {
        $content = $content -replace '(.*)</head>', '    <script type=\"text/javascript\" src=\"blocs&generateurs/jazrobot_blocs.js\"></script>`n    <script type=\"text/javascript\" src=\"blocs&generateurs/jazrobot_generateurs_cpp.js\"></script>`n$1</head>'
        Set-Content 'www\index.html' $content
    }
    echo '4. index.html updated OK'
}"

REM Update boards.js
powershell -Command "& { 
    $content = Get-Content 'www\js\boards.js' -Raw
    if (-not ($content -match 'profile\[\"jazrobot\"\]')) {
        $content = $content -replace '}\s*$', 'profile[\"jazrobot\"] = {
    description: \"JazroBot ESP32\",
    digital: [\"0\",\"2\",\"4\",\"5\",\"12\",\"13\",\"14\",\"15\",\"25\",\"26\",\"27\"],
    BUILTIN_LED: \"2\",
    dropdownPWM: [[\"0\", \"0\"], [\"2\", \"2\"], [\"4\", \"4\"], [\"5\", \"5\"], [\"12\", \"12\"], [\"13\", \"13\"], [\"14\", \"14\"], [\"15\", \"15\"], [\"25\", \"25\"], [\"26\", \"26\"], [\"27\", \"27\"]],
    dropdownAnalog: [[\"A0\", \"A0\"]],
    interrupt: [\"0\", \"2\", \"4\", \"5\", \"12\", \"13\", \"14\", \"15\", \"25\", \"26\", \"27\"],
    picture : \"media/esp32.jpg\",
    serial : [\"300\", \"600\", \"1200\", \"2400\", \"4800\", \"9600\", \"14400\", \"19200\", \"28800\", \"31250\", \"38400\", \"57600\", \"115200\"],
    serialPin: [[\"Rx/Tx\",\"0\"]],
    upload_arg: \"esp32:esp32:esp32\",
    cpu: \"jazrobot\",
    speed: \"115200\",
    prog: \"arduino\",
    usb: \"micro USB\",
    voltage: \"3,3V\",
    inout: \"20\"
};\n}'
        Set-Content 'www\js\boards.js' $content
    }
    echo '5. boards.js updated OK'
}"

REM Update blocklino.js
powershell -Command "& { 
    $content = Get-Content 'www\js\blocklino.js' -Raw
    if (-not ($content -match 'cpu == \"jazrobot\"')) {
        $content = $content -replace '(new_toolbox = \"toolbox_arduino_all\";)', '$1`n    } else if (cpu == \"jazrobot\") {`n        new_toolbox = \"toolbox_jazrobot\";'
        Set-Content 'www\js\blocklino.js' $content
    }
    echo '6. blocklino.js updated OK'
}"

REM Update version
powershell -Command "& { Invoke-WebRequest '%GITHUB_RAW%/version.txt' -OutFile 'version.txt' }"
echo 7. version.txt updated OK

echo.
echo Installation completed successfully!
echo Please restart ArduBlock for changes to take effect.
timeout /t 2 /nobreak >nul
exit 