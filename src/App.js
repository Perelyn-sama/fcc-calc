import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [display, setDisplay] = useState(0);
  const [solution, setSolution] = useState(0);

  const show = (e) => {
    const digit = e.target.innerText.toString();
    if (display === 0) {
      setDisplay(digit);
      setSolution(digit);
    } else if (
      display === "x" ||
      display === "+" ||
      display === "-" ||
      display === "÷"
    ) {
      setDisplay(digit);
      setSolution(solution + digit);
    } else if (
      solution.includes("x") ||
      solution.includes("+") ||
      solution.includes("-") ||
      solution.includes("÷")
    ) {
      setSolution(solution + digit);
      setDisplay(display + digit);
    } else {
      setDisplay(display + digit);
      if (
        solution.includes("x") ||
        solution.includes("+") ||
        solution.includes("-") ||
        solution.includes("÷")
      ) {
        setSolution(solution + display);
      } else {
        setSolution(display + digit);
      }
    }
  };

  const showZero = (e) => {
    const digit = e.target.innerText.toString();
    if (display === 0) {
      setDisplay(0);
      setSolution(0);
    } else {
      setSolution(solution + digit);
      setDisplay(display + digit);
    }
  };

  const showDecimal = (e) => {
    const digit = e.target.innerText.toString();
    if (display === 0) {
      console.log("Works in 1");
      setDisplay(0);
      setSolution(0);
    } else {
      const decArr = solution.split("");
      const decMap = decArr
        .map((e, i, a) => {
          if (e === ".") {
            return a[i] === a[i + 1] ? (a.splice(a.indexOf(e), 1), null) : e;
          } else {
            return e;
          }
        })
        .filter((e) => e);

      console.log("Works in 3");
      console.log(decMap);
      // setSolution(decMap);
      setDisplay(display + digit);
    }
  };

  const clear = () => {
    setDisplay(0);
    setSolution(0);
  };

  const multiply = () => {
    setSolution(solution + "x");
    setDisplay("x");
  };

  const add = () => {
    setSolution(solution + "+");
    setDisplay("+");
  };

  const subtract = () => {
    setSolution(solution + "-");
    setDisplay("-");
  };

  const divide = () => {
    setSolution(solution + "÷");
    setDisplay("÷");
  };

  const equals = () => {
    const arr = solution.split("").map((i) => (/\d/g.test(i) ? Number(i) : i));

    const func = (arr) => {
      if (arr.length > 2) {
        switch (arr[1]) {
          case "x":
            arr[2] = arr[0] * arr[2];
            arr.splice(0, 2);
            break;
          case "÷":
            arr[2] = arr[0] / arr[2];
            arr.splice(0, 2);
            break;
          case "-":
            arr[2] = arr[0] - arr[2];
            arr.splice(0, 2);
            break;
          case "+":
            arr[2] = arr[0] + arr[2];
            arr.splice(0, 2);
            break;
          default:
        }
        func(arr);
        return arr;
      } else {
        return arr[0];
      }
    };
    setDisplay(func(arr));
  };

  // useEffect(() => {
  //   console.log(display, "display");
  //   console.log(solution, 'solution')
  // }, [display, solution]);

  // 3 + 5 * 6 - 2 / 4 = 32.5 or 11.5
  //
  return (
    <div id="calc">
      <div id="displayDiv">
        <h4 style={{ color: solution < 1 ? "slategrey" : "white" }}>
          {solution}
        </h4>
        <p id="display">{display}</p>
      </div>
      <div id="buttons">
        <button onClick={show} id="seven" className="btn">
          7
        </button>
        <button onClick={show} id="eight" className="btn">
          8
        </button>
        <button onClick={show} id="nine" className="btn">
          9
        </button>
        <button onClick={multiply} id="multiply" className="btn">
          x
        </button>
        <button onClick={add} id="add" className="btn">
          +
        </button>
        <button onClick={show} id="four" className="btn">
          4
        </button>
        <button onClick={show} id="five" className="btn">
          5
        </button>
        <button onClick={show} id="six" className="btn">
          6
        </button>
        <button onClick={subtract} id="subtract" className="btn">
          -
        </button>
        <button onClick={divide} id="divide" className="btn">
          ÷
        </button>
        <button onClick={show} id="one" className="btn">
          1
        </button>
        <button onClick={show} id="two" className="btn">
          2
        </button>
        <button onClick={show} id="three" className="btn">
          3
        </button>
        <button onClick={showZero} id="zero" className="btn">
          0
        </button>
        <button onClick={showDecimal} id="decimal" className="btn">
          .
        </button>
        <button onClick={clear} id="clear" className="btn">
          clear
        </button>
        <button onClick={equals} id="equals" className="btn">
          =
        </button>
      </div>
    </div>
  );
};

export default App;
