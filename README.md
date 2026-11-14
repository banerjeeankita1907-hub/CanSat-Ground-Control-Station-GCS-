# CanSat Ground Control Station (GCS)

A standalone browser-based ground-station dashboard for exploring CanSat
telemetry workflows. The interface includes simulated flight data, serial CSV
input, graphs, a trajectory map, orientation visualization and mission logs.

**Safety boundary:** Mission-control buttons are simulation-only state
demonstrations. They do not transmit separation, parachute or actuator
commands. This repository is not certified flight software and must not be
connected to real release mechanisms.

## Features

- Synthetic telemetry stream with altitude, pressure, temperature, descent
  rate, battery and GPS values.
- Web Serial CSV telemetry input for compatible browsers and devices.
- Strict 15-field packet parser with finite-number, flag, range and coordinate
  validation.
- Graph tabs, CSV/PNG export, map trajectory and 3D orientation display.
- Packet age, count and event logging.
- Simulation-only mission-state demonstrations that are disabled when the
  serial source is selected.

## Run locally

Open `cansat_gcs.html` in a modern browser. For Web Serial access, serve the
page from localhost or HTTPS and use a browser that implements the Web Serial
API. External visualization libraries are loaded from CDNs.

```bash
python -m http.server 8000
```

Open [http://localhost:8000/cansat_gcs.html](http://localhost:8000/cansat_gcs.html).

## Serial packet protocol

The current parser expects exactly 15 comma-separated numeric fields:

```text
altitude_m,pressure_kPa,temp_C,descent_mps,battery_V,latitude_deg,longitude_deg,gps_altitude_m,gps_fix,satellites,separated,chute_active,roll_deg,pitch_deg,yaw_deg
```

The three flags must be 0 or 1. Satellite count must be an integer. Coordinates,
attitude, battery and environmental values are checked against broad input
bounds before a sample reaches the dashboard. Invalid packets are rejected and
logged rather than partially applied.

See [docs/telemetry-protocol.md](docs/telemetry-protocol.md) for the field
table, validation policy and hardware-integration cautions.

## Tests

Requires Node.js 20 or newer:

```bash
node --test
```

GitHub Actions runs the parser tests on pushes and pull requests.

## Scope and safety limitations

- The simulator is synthetic and does not represent a specific vehicle.
- The serial input is telemetry-only. This project does not implement an
  actuator command protocol.
- Mission-control controls mutate only the local simulation state and are
  explicitly disabled while the serial source is selected.
- Telemetry limits are software screening bounds, not vehicle operating
  envelopes or flight-safety limits.
- Do not use this interface as the sole source for flight decisions or connect
  it to pyrotechnics, separation systems or parachute actuators.

## License

No separate licence file is currently provided. Ask before reusing or
redistributing this repository's code.
