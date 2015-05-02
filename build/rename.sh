#!/bin/bash
FILES=`find src -name '*.js'`
for f in $FILES
do
	mv $f ${f/\.js/\.ts}
done