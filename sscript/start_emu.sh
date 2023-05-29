#!/bin/bash

BL='\033[0;34m'
G='\033[0;32m'
RED='\033[0;31m'
YE='\033[1;33m'
NC='\033[0m' # No Color

emulator_name=${EMULATOR_NAME}

function check_hardware_acceleration() {
    if [[ "$HW_ACCEL_OVERRIDE" != "" ]]; then
        hw_accel_flag="$HW_ACCEL_OVERRIDE"
    else
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS-specific hardware acceleration check
            HW_ACCEL_SUPPORT=$(sysctl -a | grep -E -c '(vmx|svm)')
        else
            # generic Linux hardware acceleration check
            HW_ACCEL_SUPPORT=$(grep -E -c '(vmx|svm)' /proc/cpuinfo)
        fi

        if [[ $HW_ACCEL_SUPPORT == 0 ]]; then
            hw_accel_flag="-accel off"
        else
            hw_accel_flag="-accel on"
        fi
    fi

    echo "$hw_accel_flag"
}

hw_accel_flag=$(check_hardware_acceleration)

function launch_emulator () {
  adb devices | grep emulator | cut -f1 | xargs -I {} adb -s "{}" emu kill
  options="@${emulator_name} -no-window -no-snapshot -screen no-touch -noaudio -wipe-data -memory 2048 -cache-size 1024 -no-boot-anim ${hw_accel_flag} -camera-back none"
  if [[ "$OSTYPE" == *linux* ]]; then
    echo "${OSTYPE}: emulator ${options} -gpu off"
    emulator $options -gpu off
  fi
  if [[ "$OSTYPE" == *darwin* ]] || [[ "$OSTYPE" == *macos* ]]; then
    echo "${OSTYPE}: emulator ${options} -gpu swiftshader_indirect"
    nohup emulator $options -gpu swiftshader_indirect &
  fi

  if [ $? -ne 0 ]; then
    echo "Error launching emulator"
    return 1
  fi
}

launch_emulator
