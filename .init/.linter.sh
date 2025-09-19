#!/bin/bash
cd /home/kavia/workspace/code-generation/fwa-management-platform-54219-54237/rdkb_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

