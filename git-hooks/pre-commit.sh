#!/usr/bin/env sh

command()
{
  $@
  code=$?
  if [ $code -gt 0]
  then
    exit $code
  fi
}

changed=`git diff --cached --name-only | grep angular-auto-value.js`

command npm test

if [$changed]
then
  command npm run prepublish
  git add angular-auto-value.min.js
fi

