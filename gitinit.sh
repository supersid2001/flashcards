#!/bin/bash
git init . && git add . && git commit -m "Initial commit" && git remote add origin $1 && git push -u origin master
