import { getPorts } from "api/port";
import React, { useEffect, useState } from "react";
import TradePrice from "screens/TradePrice/TradePrice";

function App() {
  const [ports, setPorts] = useState([]);
  useEffect(() => {
    getPorts()
      .then((ports) => setPorts(ports))
      .catch((err) => console.error("An error occured", err));
  }, []);

  return <TradePrice ports={ports} />;
}

export default App;
