#!/bin/bash

clear

echo "This will run a TMForum API CTK"
echo "In order to be able to run it, you need to have"
echo "NodeJS, NPM and Newman installed."
echo

# Copy the config file
cp ./CHANGE_ME.json ./DO_NOT_CHANGE/cypress/fixtures/config.json

# Go to the CTK code directory
cd ./DO_NOT_CHANGE || exit

# Install dependencies
npm install

# Run CTK tests
npm start

# Generate report (if report step is separate)
npm run report

# Check if report exists before copying
if [ -f "./cypress/reports/index.html" ]; then
  cp ./cypress/reports/index.html ../REPORT.HTML
  echo "✅ Report copied to REPORT.HTML"
else
  echo "❌ Report was not generated. Check test results above."
fi
