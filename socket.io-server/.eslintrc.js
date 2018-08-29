module.exports = {
  "extends": "airbnb-base",
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "settings": {
    "import/resolver": {
      "node": true,
      "eslint-import-resolver-typescript": true
    }
  },
  "rules": {
    "no-underscore-dangle": 0,
    "no-use-before-define": [
      2,
      {
        "functions": false,
        "classes": false
      }
    ],
    "no-param-reassign": 0,
    "consistent-return": 0,
    "class-methods-use-this": 0,
    "arrow-body-style": 0
  }
}
