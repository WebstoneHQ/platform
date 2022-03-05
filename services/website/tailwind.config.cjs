const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      animation: {
        marquee: 'marquee 35s linear 3',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },

  plugins: [forms],
};

module.exports = config;
