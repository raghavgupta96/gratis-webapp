module.exports = {
  // Set parser to babel-eslint to use the newest js features.
  "parser": "babel-eslint",
  // Set parser to extend the airbnb eslint config.
  "extends": "airbnb",
  "rules": {
    // JSX files can have a .js extension.
    // https://stackoverflow.com/questions/43031126/jsx-not-allowed-in-files-with-extension-js-with-eslint-config-airbnb
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // Allow the 'object' PropType
    "react/forbid-prop-types": ['any', 'array'],
    // Allow either "nesting" or "id"
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    "jsx-a11y/label-has-for": {
      "required": {
        "some": ['nesting', 'id'],
      },
    },
    "linebreak-style": 0,
  },
  "env": {
    // Include global variables found in browser such as window and document.
    "browser": true
  },
}