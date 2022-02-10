module.exports = {
  content: [
    "./src/pages/**/*.{html,js,ts,jsx,tsx}",
    "./src/components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /^bg-/
    },
    {
      pattern: /^to-/
    },
    {
      pattern: /^from-/
    }
  ]
};
