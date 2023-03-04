import * as fs from "fs";

const data = JSON.parse(fs.readFileSync("./types/schema.json"));

const output = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {},
};

data.forEach((schema) => {
  output.definitions[schema.name] = schema.event_schema;
});

fs.writeFileSync("./types/schema_fixed.json", JSON.stringify(output));
