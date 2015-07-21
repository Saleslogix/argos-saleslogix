#!/bin/bash
FILES=`find src -name '*.ts'`
for f in $FILES
do
	mv $f ${f/\.ts/\.js}
done
