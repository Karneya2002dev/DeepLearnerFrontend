// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Merriweather', 'serif'],
      },

       colors: {
        darkBlack: "#141414",
        vividPurple: "#885EFE",
        softPurple: "#875EFD",
        bluePurple: "#835AF4",
        mediumPurple: "#865DFB",
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      },
    },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
  },
  plugins: [],
};
