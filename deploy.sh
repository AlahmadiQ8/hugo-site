#!/bin/bash

BUILD_DIR=public

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

if [ -d $BUILD_DIR ]; then 
    cd $BUILD_DIR
    git rm -rf ./
    cd ..
fi

echo "Generating site"
hugo

echo "Tiying html"
find $BUILD_DIR -type f -name "*.html" -exec tidy -config tidy.config -m -i -w 0 {} \;
    q
echo "Updating gh-pages branch"
cd $BUILD_DIR && git add . && git commit -m "Publishing to alahmadiq8.github.io"

echo "push gh-pages branch"
git push origin master

cd ..
