import { createContext } from "react";

export const callsContext = createContext({
  callsNumber: null,
  updateCallsContext: feeds => {}
});

export default callsContext;
