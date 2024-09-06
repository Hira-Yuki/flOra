module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Prettier와 연동하여 코드 스타일을 자동으로 맞춤
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙을 ESLint 오류로 표시
    'react/react-in-jsx-scope': 'off', // React 17 이상에서는 필요 없음
    'react/prop-types': 'off', // TypeScript를 사용할 때 PropTypes를 비활성화
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 사용되지 않는 변수 경고 (언더스코어로 시작하는 변수는 무시)
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc', // 알파벳 순서로 정렬
          caseInsensitive: true, // 대소문자 구분 없이 정렬
        },
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 외부 의존성 규칙
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 규칙 비활성화
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect', // React 버전을 자동으로 감지
    },
  },
};
