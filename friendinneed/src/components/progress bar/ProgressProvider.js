//referenced from: https://codesandbox.io/s/react-circular-progressbar-with-initial-animation-0zk372m7l?file=/ProgressProvider.js:180-433
import { useEffect, useState } from 'react';


const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
export default ProgressProvider;