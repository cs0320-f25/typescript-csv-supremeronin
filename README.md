# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    Issue 1: Quotes are read as ""/" and "/""
    Issue 2: Quotes also don't stop commas from creating a new item in the array
        e.g. "Enjoys, Hiking" is parsed as "\"Enjoys", "hiking\""
    Issue 3: The csv being parsed into an array of arrays makes it hard to organize data
        especially when the data needs to be organized by things like name, age, or date
    Issue 4: All numbers and items are ultimately parsed as strings. Could also make
        it harder to categorize different types of data.
    Issue 5: Headers are taken in as row 0 so there's no way to tell if a row is a
        header row or not at the moment.
- #### Step 2: Use an LLM to help expand your perspective.
    Missing features brought up: Type Inference/Schema Detection, supporting custom delimiters, properly handling quoted fields, it also brought up allowing line breaks within quoted fields.
    Edge Cases brought up: interpreting empty cells and supporting different line endings.
    Improvements brought up: Allowing user-defined validation per row or cell, Integration-ready output/export to JSON, objects, or rows easily, and throwing descriptive errors were mentioned.

    The LLM thought of similar things to me when talking about items/rows being parsed to objects/schema, properly handling quoted fields to not separate commas between quotes, and talking about header rows and organizing those.
    The LLM made me think about handling csv files that have different delimiters. Also, I hadn't thought about user defined validation per row/cell.
- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. Functionality: Properly Handle Quoted Fields
        Source: Me
        User Story:
        “As a user, I want CSV fields surrounded by quotes to be parsed as a single value, even if they contain commas or escaped quotes, so that my data is accurately represented.”
        Acceptance Criteria:
         - Fields like "Enjoys, Hiking" are parsed as one value: Enjoys, Hiking.
         - Escaped quotes within fields (e.g., "He said ""Hello"" to everyone") are handled correctly.
         - No extra array slots are created due to commas inside quotes.
    
    2. Functionality: Support Custom Delimiters
        Source: LLM
        User Story:
        “As a developer, I want to specify the delimiter used in parsing (such as semicolon or something else), so that I can work with CSV files that use different formats.”
        Acceptance Criteria:
         - User can set the delimiter when calling the parser.
         - All fields are split according to the chosen delimiter.
         - Quoted fields are still handled correctly regardless of delimiter.

    3. Extensibility: Output as Array of Objects with Type Inference
        Source: Both
        User Story:
        “As a developer, I want the parser to optionally output data as an array of objects using header row keys and infer basic types, so that I can easily work with structured data.”
        Acceptance Criteria:
         - The first row is used as keys for each object.
         - Numbers and booleans are parsed as their respective types when possible.
         - The output format can be toggled between array of arrays and array of objects.

    4. Functionality: Handle Empty Cells and Inconsistent Rows
        Source: Me
        User Story:
        “As a user, I want empty cells and rows with missing or extra columns to be handled correctly, so that my data remains usable and errors are minimized.”
        Acceptance Criteria:
         - Empty cells are parsed as empty strings or null.
         - Rows with missing columns fill missing values with null or empty string.
         - Extra columns are either ignored or included with a generic key.



    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
