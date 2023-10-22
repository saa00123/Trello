module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    extends: ["plugin:vue/recommended"],
    plugins: ["vue"],
    env: {
      browser: true,
      es6: true,
      node: true,
    },
  },
};
