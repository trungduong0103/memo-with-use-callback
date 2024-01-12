import React from "react";
import "./styles.css";

function Child() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <li style={{ backgroundColor: randomColor }}>
      I change color when my parent is tickled
    </li>
  );
}

const MemoizedChild = React.memo(({ handleTickleChild }) => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <li style={{ backgroundColor: randomColor }}>
      I change color when my parent is tickled, even though I'm memoized
    </li>
  );
});

function Parent() {
  const [count, setCount] = React.useState(0);

  const handleTickleChild = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const memoizedHandleTickleChild = React.useCallback(handleTickleChild, []);

  return (
    <div className="parentWrapper">
      <p>
        These are my kids, you can{" "}
        <button onClick={memoizedHandleTickleChild}>tickle me</button>{" "}
      </p>
      <p>Im tickled {count} times </p>

      <Child />
      <MemoizedChild handleTickleChild={memoizedHandleTickleChild} />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Parent />
    </div>
  );
}
