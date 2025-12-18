import useTheme from "../Hooks/UseTheme";


const ThemeProvider = ({ children }) => {
  useTheme(); 
  return children;
};

export default ThemeProvider;