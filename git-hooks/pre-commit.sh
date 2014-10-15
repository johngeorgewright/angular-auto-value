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

changed_testable_files=`git diff --cached --name-only | grep test`
changed_minifiable_file=`git diff --cached --name-only | grep angular-auto-value.js`

if [$changed_testable_files || $changed_minifiable_file]
then
  command npm test
fi

if [$changed_minifiable_file]
then
  command npm run prepublish
  git add angular-auto-value.min.js
fi

