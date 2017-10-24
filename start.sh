
source /usr/local/rvm/scripts/rvm
rvm use ruby-2.4.1
tokenizer-server -p 8002 &
rvm use jruby-9.1.13.0 
language-identifier-server -p 8001 &
pos-tagger-server -p 8003 &
constituent-parser-server -p 8004 &
ner-server -p 8005 &
kaf2json-server -p 8006 &
forever index.js


