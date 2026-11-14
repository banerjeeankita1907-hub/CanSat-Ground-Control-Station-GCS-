(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CANSATTelemetry = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const FIELD_NAMES = [
    "altitude", "pressure", "temp", "descent", "battery",
    "lat", "lng", "gpsAlt", "gpsFix", "sats",
    "separated", "chuteActive", "roll", "pitch", "yaw"
  ];

  function validatePacket(packet) {
    if (!packet || typeof packet !== "object") {
      throw new TypeError("Telemetry packet must be an object");
    }
    for (const field of ["altitude", "pressure", "temp", "descent", "battery",
      "lat", "lng", "gpsAlt", "sats", "roll", "pitch", "yaw"]) {
      if (!Number.isFinite(packet[field])) {
        throw new TypeError(field + " must be a finite number");
      }
    }
    const ranges = {
      altitude: [-1000, 50000],
      pressure: [0, 120],
      temp: [-120, 100],
      descent: [-100, 100],
      battery: [0, 20],
      lat: [-90, 90],
      lng: [-180, 180],
      gpsAlt: [-1000, 50000],
      sats: [0, 64],
      roll: [-180, 180],
      pitch: [-180, 180],
      yaw: [-360, 360]
    };
    for (const [field, [minimum, maximum]] of Object.entries(ranges)) {
      if (packet[field] < minimum || packet[field] > maximum) {
        throw new RangeError(field + " is outside the accepted telemetry range");
      }
    }
    if (!Number.isInteger(packet.sats)) {
      throw new TypeError("sats must be an integer");
    }
    for (const flag of ["gpsAvailable", "separated", "chuteActive"]) {
      if (typeof packet[flag] !== "boolean") {
        throw new TypeError(flag + " must be boolean");
      }
    }
    return packet;
  }

  function parseCSV(line) {
    if (typeof line !== "string" || line.length > 512) {
      throw new TypeError("Telemetry line must be a string of at most 512 characters");
    }
    const fields = line.trim().split(",");
    if (fields.length !== FIELD_NAMES.length) {
      throw new RangeError("Expected exactly " + FIELD_NAMES.length + " CSV fields");
    }
    const values = fields.map((field, index) => {
      if (field.trim() === "") {
        throw new TypeError(FIELD_NAMES[index] + " is empty");
      }
      const value = Number(field.trim());
      if (!Number.isFinite(value)) {
        throw new TypeError(FIELD_NAMES[index] + " is not a finite number");
      }
      return value;
    });

    for (const flagIndex of [8, 10, 11]) {
      if (values[flagIndex] !== 0 && values[flagIndex] !== 1) {
        throw new RangeError(FIELD_NAMES[flagIndex] + " must be 0 or 1");
      }
    }

    const packet = {
      altitude: values[0],
      pressure: values[1],
      temp: values[2],
      descent: values[3],
      battery: values[4],
      lat: values[5],
      lng: values[6],
      gpsAlt: values[7],
      gpsAvailable: values[8] === 1,
      sats: values[9],
      separated: values[10] === 1,
      chuteActive: values[11] === 1,
      roll: values[12],
      pitch: values[13],
      yaw: values[14]
    };
    return validatePacket(packet);
  }

  return Object.freeze({ FIELD_NAMES: Object.freeze(FIELD_NAMES.slice()), validatePacket, parseCSV });
});
