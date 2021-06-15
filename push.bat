@echo off

pelican content -s publishconf.py
set /p message="Commit Message: "
ghp-import output -b master -m %message%
git push origin master
