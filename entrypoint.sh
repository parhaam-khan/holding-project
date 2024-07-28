#!/bin/sh

DN=$DOMAIN_NAME
DN1_CHECK=$(cd /app && grep -rl www.mupra.ir . | wc -l)
DN2_CHECK=$(cd /app && grep -rl www.aribaceramic.ir . | wc -l)
DN3_CHECK=$(cd /app && grep -rl mupra.ir . | wc -l)
DN4_CHECK=$(cd /app && grep -rl aribaceramic.ir . | wc -l)

if [ -n ${DN} -a ${DN1_CHECK} -ne 0 ]
then
        cd /app && grep -rl www.mupra.ir . | xargs sed -i "s/www.mupra.ir/$DN/g"
fi

if [ -n ${DN} -a ${DN2_CHECK} -ne 0 ]
then
        cd /app && grep -rl www.aribaceramic.ir . | xargs sed -i "s/www.aribaceramic.ir/$DN/g"
fi

if [ -n ${DN} -a ${DN3_CHECK} -ne 0 ]
then
        cd /app && grep -rl mupra.ir . | xargs sed -i "s/mupra.ir/$DN/g"
fi

if [ -n ${DN} -a ${DN4_CHECK} -ne 0 ]
then
        cd /app && grep -rl aribaceramic.ir . | xargs sed -i "s/aribaceramic.ir/$DN/g"
fi

cd /app/
npm start
