#!/bin/bash

#check if dir provided as pram if not use current directory
stuff=`pwd`
if [ "$#" -eq 1 ];then
  stuff=$1

fi

#get all js files
contents=`ls $stuff|grep .js$`

#mkdir for js source files
if [ ! -d "js-source" ];then
mkdir js-source
fi
#copy js to ts and seperate js from ts
for js in $contents; do
 
 cp $stuff/$js $stuff/${js:0:${#js}-2}ts
 mv  $stuff/$js  $stuff/js-source/$js

done


