import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

//console.log(results);  // Testing line to see actual output

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});


test("parseCSV handles empty files", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/empty.csv"))
  expect(results).toHaveLength(0);
});

test("parseCSV handles different delimiters", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/semicolon.csv"))
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name;age"]);
  expect(results[1]).toEqual(["Alice;23"]);
  expect(results[2]).toEqual(["Bob;thirty"]);
  // Would rather it be ["name", "age"], ["Alice", "23"], ["Bob", "30"]
  // But parser only supports commas for now
});

test("parseCSV handles quoted fields", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/quoted.csv"))
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name", "age", "note"]);
  expect(results[1]).toEqual(["Alice", "23", "'Says", '"Hello"\'']);
  // Would rather it be ["Alice", "23", 'Says "Hello"']
  expect(results[2]).toEqual(["Bob", "30", "\"Enjoys", "hiking\""]);
  // Would rather it be ["Bob", "30", "Enjoys, hiking"]
});

test("parseCSV handles missing columns", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/inconsistent.csv"))
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob"]); // missing age
  expect(results[3]).toEqual(["Charlie", "25", "ExtraField"]); // extra field
  // Not sure what to do with ExtraField
});


test("parseCSV handles whitespace", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/whitespace.csv"))
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "30"]);
  expect(results[3]).toEqual(["Greg Frank", "80"]);
  // successfully trims leading/trailing whitespaces
});

//Test for other special characters
test("parseCSV handles special characters", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/special-characters.csv"))
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name", "age", "note"]);
  expect(results[1]).toEqual(["Alice", "23", "\"Loves \\\"coding\\\"\""]);
  expect(results[2]).toEqual(["Bob", "30", "\".Hiking!?\"\""]);
});

// Test for schema validation

