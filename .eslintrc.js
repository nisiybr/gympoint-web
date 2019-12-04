module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks',
  ],
  rules: {
    'prettier/prettier':'error',
    'react/jsx-filename-extension':[
      'warn',
      {extensions: ['.jsx', '.js']}
    ],
    'import/prefer-default-export':'off',
    'react-hooks/rules-of-hooks': 'error',//vai avisar de qualquer erro
    'react-hooks/exhaustive-deps': 'warn',//avisa se estiver faltando alguma dependencia
    'no-console': ['error', {allow: ['tron']}],
    'no-param-reassign': 'off',
    'jsx-a11y/label-has-associated-control': 0,
    'camelcase': 'off',
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src",
      }
    }
  }
};
