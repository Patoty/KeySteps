import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#ee7900",
        "primary-ripple": "#ffa84e",
        "primary-hover": "#ca6700",
        "primary-hover-ripple": "#f87e00",
        "primary-light": "#ffb161",
        secondary: "#579eb0",
        "secondary-ripple": "#92c0cc",
        "secondary-hover": "#478898",
        "secondary-hover-ripple": "#599fb1",
        "secondary-light": "#9ec7d1",
        tertiary: "#8bc44a",
        "tertiary-ripple": "#b4d989",
        "tertiary-hover": "#77ad38",
        "tertiary-hover-ripple": "#8cc44b",
        "tertiary-light": "#bcdd96",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("flowbite/plugin"),
  ],
} satisfies Config;
