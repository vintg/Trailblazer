module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  "env": {
        "browser": true,
        "node": true
  },
  'rules': {
    'class-methods-use-this': ['error', { 'exceptMethods': ['getCurrentItem', 'getTentData', 'getShirtData'] }],
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-underscore-dangle': 'off',

  }
};