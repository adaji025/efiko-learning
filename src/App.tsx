import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

export default function App() {
  return <MantineProvider theme={theme}>
    <div className="underline">App</div>
  </MantineProvider>;
}
