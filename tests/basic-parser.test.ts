import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import {z} from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");


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
  // Want it to read as ["Alice", "23", "Loves \"coding\""]
  // and ["Bob", "30", ".Hiking!?""] --> Should error since unmatched quotes
});

// Test for schema validation

// Person schema (name and age)
const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
  .transform(tup => ({ name: tup[0], age: tup[1] }));

// Product schema: (name, price, and inStock)
const ProductRowSchema = z.tuple([z.string(), z.coerce.number(), z.coerce.string()])
  .transform(tup => ({name: tup[0], price: tup[1], inStock: tup[2]}));
// inStock was originally a boolean but changed it to a string since z.coerce.boolean()
// was interpreting "false" as true

test("parseCSV returns objects when schema is provided", async () => {
  const results = await parseCSV(
    path.join(__dirname, "../data/peopleValid.csv"), PersonRowSchema, true);
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({ name: "Alice", age: 23 });
  expect(results[1]).toEqual({ name: "Bob", age: 30 });
  expect(results[2]).toEqual({ name: "Charlie", age: 25 });
  expect(results[3]).toEqual({ name: "Nim", age: 22 });
});


test("parseCSV throws error when schema is provided but data is invalid", async () => {
  await expect(
    parseCSV(PEOPLE_CSV_PATH, PersonRowSchema, true))
    .rejects.toThrow("Validation Failed for row(s)");
    // fails because of the "thirty" in the people.csv file
});

test("parseCSV handles objects with different schema", async () => {
  const results = await parseCSV(
    path.join(__dirname, "../data/products.csv"), ProductRowSchema, false
  );
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual({ name: "Computer", price: 1500, inStock: "yes" });
  expect(results[1]).toEqual({ name: "PS5", price: 599.99, inStock: "no" });
  expect(results[2]).toEqual({ name: "IPhone 15", price: 999.99, inStock: "yes" });
});

test("parseCSV returns array of arrays when no schema is provided", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/products.csv"));
  expect(Array.isArray(results)).toBe(true);
  expect(Array.isArray(results[0])).toBe(true);
  expect(results[0]).toEqual(["Computer", "1500", "yes"]);
});

/** Test cases for quoted fields and commas within quotes
test("parseCSV works with quotes in fields", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/quotes.csv"), undefined, true);
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Alice", "This is a quote from Alice."]);
  expect(results[1]).toEqual(["Bob", "Bob's philosophical quote resides here."]);
});
*/