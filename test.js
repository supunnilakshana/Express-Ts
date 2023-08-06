const { parse } = require('graphql-parse');

// Example GraphQL query (you will get this from the request)
const query = `
  query {
    user(id: 123) {
      id
      name
      email
    }
  }
`;

// Parse the GraphQL query
const parsedQuery = parse(query);

// Function to recursively process the query and extract information
function processSelectionSet(selectionSet) {
  const fields = {};

  for (const selection of selectionSet.selections) {
    if (selection.kind === 'Field') {
      fields[selection.name.value] = true;
    } else if (selection.kind === 'InlineFragment') {
      const fragmentFields = processSelectionSet(selection.selectionSet);
      Object.assign(fields, fragmentFields);
    } else if (selection.kind === 'FragmentSpread') {
      // If you have fragments, you can handle them here
    }
  }

  return fields;
}

// Extract fields from the root level of the query
const fields = processSelectionSet(parsedQuery.definitions[0].selectionSet);

console.log(fields);
