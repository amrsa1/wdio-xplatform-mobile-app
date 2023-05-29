#!/bin/bash


function check_current_focus() {
  printf "==> Checking emulator running activity \n"
  start_time=$(date +%s)
  i=0
  timeout=20
  target="com.google.android.apps.nexuslauncher.NexusLauncherActivity"

  while true; do
    result=$(adb shell dumpsys window 2>/dev/null | grep -i mCurrentFocus)

    if [[ $result == *"$target"* ]]; then
      printf "==>  Activity is okay: \n"
      printf "$result\n"
      break
    else
      adb shell input keyevent KEYCODE_HOME
      printf "==> Menu button is pressed \n"
      i=$(( (i+1) % 8 ))
    fi

    current_time=$(date +%s)
    elapsed_time=$((current_time - start_time))
    if [ $elapsed_time -gt $timeout ]; then
      printf "==> Timeout after ${timeout} seconds elapsed 🕛.. \n"
      return 1
    fi
    sleep 4
  done
}

check_current_focus
