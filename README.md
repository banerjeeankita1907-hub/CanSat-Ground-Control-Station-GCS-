# CanSat-Ground-Control-Station-GCS-
A **standalone, browser-based** Ground Control Station for CanSat missions. No installation, no dependencies—just open the HTML file and start monitoring telemetry in real-time.

Built as a full-system integration project, this GCS bridges embedded hardware (microcontroller → serial) with a polished, mission-critical visualization dashboard.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| **📊 Real-Time Telemetry** | Live updates for Altitude, Pressure, Temperature, Descent Rate, Battery Voltage, and GPS (Lat/Lng/Sats). |
| **🗺️ Live Tracking Map** | Leaflet.js integration displaying the CanSat's current position and complete trajectory history. |
| **🧭 3D Orientation** | Three.js-powered 3D model visualizing Roll, Pitch, and Yaw in real-time. |
| **⚠️ 4-Digit Error Code System** | Instant fault detection (Descent Rate, GPS Loss, Separation Failure, Chute Status) with visual masking. |
| **📈 Dynamic Graphs** | Chart.js plots for all telemetry channels (Altitude, Pressure, Temp, Descent, Battery) with CSV/PNG exports. |
| **🔌 Hardware Integration** | Web Serial API support for reading live CSV packets directly from an onboard microcontroller. |
| **📹 Live Video** | WebRTC camera streaming from the CanSat (or any connected webcam) with start/stop controls. |
| **🚨 Mission Control** | "Hold-to-arm" critical command buttons for Manual Separation, Emergency Parachute Deploy, and Redundant Activation. |
| **📂 Data Logging** | Real-time mission log with timestamped events and one-click export of all telemetry to CSV. |
