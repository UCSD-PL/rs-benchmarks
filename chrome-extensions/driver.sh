#! /bin/bash

olddir=`pwd`
#echo $olddir
for i in *;do 
  if [ -d $i ];then
    cd $i
    /Users/victoralor/ranj/rs-benchmarks/chrome-extensions/portToTS.sh
    cd $olddir
  fi
done
/Users/victoralor/ranj/rs-benchmarks/chrome-extensions/portToTS.sh

