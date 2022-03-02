module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin")],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#b9b9bc",
          200: "#4f526c",
          400: "#181922",
          500: "#21222d",
        },
        green: {
          100: "#10d589",
        },
      },
    },
  },
  plugins: [],
};
