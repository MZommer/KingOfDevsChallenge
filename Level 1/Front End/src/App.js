import "./styles.css";
import { useThemeContext } from "./contexts/ThemeContext";
export default function App() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    // not sure if this is the right way to handle the styles
    <div className={`App ${theme}-theme`}>
      <h1>Current theme: {theme}</h1>
      <p>
        Light themes have lighter backgrounds and darker font colors. Meanwhile,
        dark themes have darker backgrounds and lighter font colors. Dark themes
        prevent <strong>Eyes Strain </strong>
        and reduce device energy consumption
      </p>
      <h3>What we expect?</h3>
      <p>The button below should toggle between light and dark mode</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}
