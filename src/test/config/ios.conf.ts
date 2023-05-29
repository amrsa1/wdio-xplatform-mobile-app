import { config } from "./shared.conf";
import caps from "../utils/caps";

exports.config = {
    ...config,
    ...{

        specs: ['../specs/01_NativeApp_Suite.ts'],
        capabilities: caps.simulator,
        services: [['appium',{
            command : 'appium',
            args: {
                debugLogSpacing: true,
                sessionOverride: true,
                port: 4724,
            },
        }],
        ],
    }
}
