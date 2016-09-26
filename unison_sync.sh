#!/bin/zsh

/usr/local/bin/unison git -batch -terse -ui text -root ../project_fletcher/ -root ssh://aws3//home/ubuntu/project_fletcher/
/usr/local/bin/unison git -batch -terse -ui text -root ../project_fletcher/ -root ssh://aws2//home/ubuntu/project_fletcher/

