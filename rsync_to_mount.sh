#!/usr/bin/env zsh

dest=/home/ubuntu/projects2/project_fletcher/
src=/home/ubuntu/projects/project_fletcher/

rsync --recursive --update --verbose --append \
--exclude .ipynb_checkpoints --exclude .DS_Store \
${src} ${dest}
