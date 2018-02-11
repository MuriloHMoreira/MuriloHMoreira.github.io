@echo off
pelican content -s publishconf.py
cd output
python -m pelican.server
pause