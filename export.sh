#!/bin/bash
cp -r version ../version && cp -r web.app ../web.app && cp -r manifest.json ../manifest.json
rm -rf ../../../../../public/app && mkdir ../../../../../public/app && cp -a dist/symbiose/* ../../../../../public/app/
