#!/bin/zsh

function wait_for_boot() {
  printf "${G}==> ${BL}Waiting for the simulator to boot...${NC}\n"
  start_time=$(date +%s)
  spinner=( "⠹" "⠺" "⠼" "⠶" "⠦" "⠧" "⠇" "⠏" )
  i=0
  # Get the timeout value from the environment variable or use the default value of 60 seconds
  timeout=${BOOT_TIMEOUT:-60}

  while true; do
    output=$(xcrun simctl bootstatus "$SIMULATOR_UDID")
    echo "${output}"
    if [[ $output == *"Device already booted, nothing to do."* ]]; then
      printf "\e[K${G}==> \u2713 Simulator booted successfully${NC}\n"
      exit 0
    else
      printf "${YE}==> Please wait ${spinner[$i]} ${NC}\r"
      i=$(( (i+1) % 8 ))
    fi

    elapsed_time=$(( $(date +%s) - $start_time ))
    if [[ $elapsed_time -ge $timeout ]]; then
      printf "${RED}==> Timeout waiting for simulator to boot 🕛${NC}\n"
      exit 1
    fi

    sleep 1
  done
}

# Call the wait_for_boot function
wait_for_boot
