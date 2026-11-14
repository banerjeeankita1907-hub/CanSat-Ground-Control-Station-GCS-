# CanSat telemetry protocol and safety notes

## CSV frame

Each line contains 15 comma-separated numeric fields in this order:

| Index | Field | Unit / encoding | Validation |
|---:|---|---|---|
| 1 | altitude | m | -1,000 to 50,000 |
| 2 | pressure | kPa | 0 to 120 |
| 3 | temperature | °C | -120 to 100 |
| 4 | descent rate | m/s | -100 to 100 |
| 5 | battery voltage | V | 0 to 20 |
| 6 | latitude | degrees | -90 to 90 |
| 7 | longitude | degrees | -180 to 180 |
| 8 | GPS altitude | m | -1,000 to 50,000 |
| 9 | GPS fix | 0 or 1 | exact flag |
| 10 | satellite count | integer | 0 to 64 |
| 11 | separated | 0 or 1 | exact flag |
| 12 | chute active | 0 or 1 | exact flag |
| 13 | roll | degrees | -180 to 180 |
| 14 | pitch | degrees | -180 to 180 |
| 15 | yaw | degrees | -360 to 360 |

Input lines longer than 512 characters, missing or additional fields, blank
fields, non-finite values, invalid flags and out-of-range values are rejected.
The bounds are deliberately broad parser guards only; the vehicle's own
engineering requirements must define valid operational ranges.

## Safety separation

The serial path is telemetry-only. The mission-control panel is a local
simulation demonstration and its actions only modify the current in-memory
simulation packet. It never writes to the Web Serial port. Selecting the serial
source disables those controls.

Do not add actuator output to this dashboard without a separately reviewed
command protocol, independent hardware interlocks, authentication, command
acknowledgements, fault analysis, test fixtures and a safety case. A browser
UI is not a safety-rated command system.
