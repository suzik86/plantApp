import { useRef, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);

  const incrementRefCount = () => {
    refCount.current += 1;
    console.log(`Ref count: ${refCount.current}`);
  };

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button className="ref-counter" onClick={incrementRefCount}>Increment ref</button>
    </div>
  );
}

export default Counter;