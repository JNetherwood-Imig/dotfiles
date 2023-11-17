#!/bin/bash
if [ "$pgrep picom" ] > /dev/null; then
    killall picom
    picom --backend glx --config /home/jackson/.config/picom/picom.conf &
elif [ "$pgrep picom" ] = /dev/null; then
    picom --backend glx &
fi
