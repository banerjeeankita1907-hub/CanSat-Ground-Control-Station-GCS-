const test = require("node:test");
const assert = require("node:assert/strict");
const { parseCSV, validatePacket } = require("../cansat_telemetry.js");

const VALID = "850,91.6,18.5,9.2,7.4,22.67,88.40,853,1,9,0,0,1.5,-2.5,45";

test("parses the 15-field telemetry wire format", () => {
  const packet = parseCSV(VALID);
  assert.equal(packet.altitude, 850);
  assert.equal(packet.gpsAvailable, true);
  assert.equal(packet.sats, 9);
  assert.equal(packet.separated, false);
  assert.equal(packet.chuteActive, false);
});

test("rejects missing, extra, blank and non-finite fields", () => {
  assert.throws(() => parseCSV("1,2,3"), /exactly 15/);
  assert.throws(() => parseCSV(VALID + ",99"), /exactly 15/);
  assert.throws(() => parseCSV(VALID.replace("91.6", "")), /empty/);
  assert.throws(() => parseCSV(VALID.replace("91.6", "NaN")), /finite number/);
  assert.throws(() => parseCSV("x".repeat(513)), /512 characters/);
});

test("rejects invalid flags and out-of-range coordinates", () => {
  assert.throws(() => parseCSV(VALID.replace(",1,9,", ",2,9,")), /must be 0 or 1/);
  assert.throws(() => parseCSV(VALID.replace("22.67", "190.0")), /lat is outside/);
  assert.throws(() => parseCSV(VALID.replace("88.40", "181.0")), /lng is outside/);
});

test("rejects impossible numeric telemetry and fractional satellite count", () => {
  assert.throws(() => parseCSV(VALID.replace("7.4", "99")), /battery is outside/);
  assert.throws(() => parseCSV(VALID.replace(",9,0,0,", ",9.5,0,0,")), /sats must be an integer/);
});

test("validates a constructed packet", () => {
  const packet = parseCSV(VALID);
  assert.equal(validatePacket(packet), packet);
});

test("does not permit malformed or missing packet properties", () => {
  assert.throws(() => validatePacket(null), /object/);
  assert.throws(() => validatePacket({ altitude: 10 }), /finite number/);
});

