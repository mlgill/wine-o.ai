#!/usr/bin/env zsh

src=.
dest=vultr:/home/mlgill/wineo_ai

rsync --recursive --update --delete --verbose --append \
--exclude .ipynb_checkpoints --exclude .DS_Store \
${src} ${dest}
