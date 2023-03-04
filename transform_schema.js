import * as fs from "fs";

const data = JSON.parse(fs.readFileSync("schema.json"));

const output = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {},
};

data.forEach((schema) => {
  output.definitions[schema.name] = schema.event_schema;
});

fs.writeFileSync("schema2.json", JSON.stringify(output));
