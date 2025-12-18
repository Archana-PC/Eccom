export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          light: "var(--brand-light)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        bg: {
          page: "var(--bg-page)",
          section: "var(--bg-section)",
        },
        border: {
          DEFAULT: "var(--border-default)",
        },
      },
    },
  },
};
