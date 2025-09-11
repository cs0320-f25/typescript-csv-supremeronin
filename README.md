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
    The LLM did propose ideas on accepting different encodings and exposing multiple entry points, both of which I don't know much about yet. But I think with ideas like those is where the LLM thought almost too advanced compared to what I need to worry about for now.
- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    1. Functionality: Properly Handle Quoted Fields
        Source: Me
        User Story:
        “As a user, I want CSV fields surrounded by quotes to be parsed as a single value, even if they contain commas, escaped quotes, or line breaks, so that my data is accurately represented.”
        Acceptance Criteria:
         - Fields like "Enjoys, Hiking" are parsed as one value: Enjoys, Hiking.
         - Escaped quotes within fields (e.g., "He said ""Hello"" to everyone") are handled correctly.
         - No extra array slots are created due to commas inside quotes.
    
    2. Extensibility: Output as Array of Zod Objects
        Source: Both
        User Story:
        “As a developer, I want the parser to optionally output data as an array of objects validated by a Zod schema, so that I can ensure my data matches expected types and structure.”
        Acceptance Criteria:
         - User can set the delimiter when calling the parser.
         - All fields are split according to the chosen delimiter.
         - Quoted fields are still handled correctly regardless of delimiter.

    3. Functionality: Distinguish and Use Header Row
        Source: Me
        User Story:
        “As a developer, I want the parser to recognize and use the header row for labeling columns, so that I can easily reference data by column name and avoid confusion between headers and data rows.”
        Acceptance Criteria:
         - The first row, once checked, is treated as the header and not as data.
         - All subsequent rows use header keys for mapping.
         - Option to skip or include header row in output.     

    4. Functionality: Handle Empty Cells and Inconsistent Rows
        Source: Me
        User Story:
        “As a user, I want empty cells and rows with missing or extra columns to be handled correctly, so that my data remains usable and errors are minimized.”
        Acceptance Criteria:
         - Empty cells are parsed as empty strings or null.
         - Rows with missing columns fill missing values with null or empty string.
         - Extra columns are either ignored or included with a generic key.



    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    My initial ideas focused on quoted fields, array-of-arrays output/schema validation, and header handling. The LLM suggested handling line breaks in quoted fields and the handling of empty/inconsistent rows. I resonated most with improving quoted field handling and outputting objects validated by schema for easier data manipulation. The LLM’s suggestions about integration and validation made me consider edge cases I hadn’t thought of, like streaming very large files or supporting multiple encodings. But I didn’t prioritize these advanced ideas for this sprint, but I see its value for future work.

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
