@echo off
title JazroBot Patcher

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

REM Create backup folder with timestamp
set "timestamp=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "timestamp=%timestamp: =0%"
set "backupdir=backup_%timestamp%"
mkdir "%backupdir%"

REM Backup existing files
if exist "www\js\blocklino.js" copy "www\js\blocklino.js" "%backupdir%\"
if exist "www\js\boards.js" copy "www\js\boards.js" "%backupdir%\"
if exist "www\index.html" copy "www\index.html" "%backupdir%\"
if exist "www\blocs&generateurs\jazrobot_blocs.js" copy "www\blocs&generateurs\jazrobot_blocs.js" "%backupdir%\"
if exist "www\blocs&generateurs\jazrobot_generateurs_cpp.js" copy "www\blocs&generateurs\jazrobot_generateurs_cpp.js" "%backupdir%\"
if exist "www\toolbox\toolbox_jazrobot.xml" copy "www\toolbox\toolbox_jazrobot.xml" "%backupdir%\"

echo Creating backup in folder: %backupdir%
echo.

REM Set GitHub repository URL
set "GITHUB_RAW=https://raw.githubusercontent.com/UntaDotMy/Jazrobotblock/refs/heads/main"

REM Download and install files
echo Installing JazroBot files...
echo.

set "serverFilePath=%GITHUB_RAW%/blocklino.js"
set "localFilePath=www\js\blocklino.js"
powershell -Command "& { try { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' } catch { Write-Host 'Error: Failed to download blocklino.js' -ForegroundColor Red; exit 1 } }"
if exist "%localFilePath%" (
    echo 1. blocklino.js OK
) else (
    echo Error: Failed to download blocklino.js
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/boards.js"
set "localFilePath=www\js\boards.js"
powershell -Command "& { try { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' } catch { Write-Host 'Error: Failed to download boards.js' -ForegroundColor Red; exit 1 } }"
if exist "%localFilePath%" (
    echo 2. boards.js OK
) else (
    echo Error: Failed to download boards.js
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/index.html"
set "localFilePath=www\index.html"
powershell -Command "& { try { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' } catch { Write-Host 'Error: Failed to download index.html' -ForegroundColor Red; exit 1 } }"
if exist "%localFilePath%" (
    echo 3. index.html OK
) else (
    echo Error: Failed to download index.html
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/jazrobot_blocs.js"
set "localFilePath=www\blocs&generateurs\jazrobot_blocs.js"
powershell -Command "& { try { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' } catch { Write-Host 'Error: Failed to download jazrobot_blocs.js' -ForegroundColor Red; exit 1 } }"
if exist "%localFilePath%" (
    echo 4. jazrobot_blocs.js OK
) else (
    echo Error: Failed to download jazrobot_blocs.js
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/jazrobot_generateurs_cpp.js"
set "localFilePath=www\blocs&generateurs\jazrobot_generateurs_cpp.js"
powershell -Command "& { try { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' } catch { Write-Host 'Error: Failed to download jazrobot_generateurs_cpp.js' -ForegroundColor Red; exit 1 } }"
if exist "%localFilePath%" (
    echo 5. jazrobot_generateurs_cpp.js OK
) else (
    echo Error: Failed to download jazrobot_generateurs_cpp.js
    pause
    exit /b 1
)

set "serverFilePath=%GITHUB_RAW%/toolbox_jazrobot.xml"
set "localFilePath=www\toolbox\toolbox_jazrobot.xml"
powershell -Command "& { try { Invoke-WebRequest '%serverFilePath%' -OutFile '%localFilePath%' } catch { Write-Host 'Error: Failed to download toolbox_jazrobot.xml' -ForegroundColor Red; exit 1 } }"
if exist "%localFilePath%" (
    echo 6. toolbox_jazrobot.xml OK
) else (
    echo Error: Failed to download toolbox_jazrobot.xml
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo Backup files are stored in: %backupdir%
echo Please restart ArduBlock for changes to take effect.
echo.
echo Press any key to exit...
pause >nul
exit 