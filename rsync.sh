#!/usr/bin/env zsh

src=.
dest=vultr:/home/mlgill/project_fletcher

rsync --recursive --update --delete --verbose --append \
--exclude .ipynb_checkpoints --exclude .DS_Store \
${src} ${dest}
