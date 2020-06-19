import React, { useState, useEffect } from "react";

const PlayerCard = ({
  player,
  setPlayer,
  removePlayer,
  savingsRate,
  loanRate,
  setGlobalLap,
}) => {
  const { name, savings, loan, installment, globalLap } = player;

  const [savingsToChange, setSavingsToChange] = useState("");
  const [loanToBeRequested, setLoanToBeRequested] = useState("");

  useEffect(() => {
    setGlobalLap();
  }, [globalLap]);

  const compoundSavings = () =>
    setPlayer({ savings: Math.ceil(savings + savings * savingsRate) });

  const changeSavingsToChange = ({ target }) =>
    setSavingsToChange(target.value);

  const setSavings = (add = true) => () => {
    setPlayer({
      savings: add ? savings + +savingsToChange : savings - +savingsToChange,
    });
    setSavingsToChange("");
  };

  const withdrawSavings = () => {
    setPlayer({ savings: 0 });
    setSavingsToChange("");
  };

  const payLoan = () => {
    setPlayer({ loan: loan - installment });
  };

  const changeLoanToBeRequested = ({ target }) =>
    setLoanToBeRequested(target.value);

  const requestLoan = () => {
    const taxedLoan = Math.ceil(
      +loanToBeRequested + +loanToBeRequested * loanRate
    );
    setPlayer({
      loan: taxedLoan,
      installment: taxedLoan / 5,
    });
    setLoanToBeRequested("");
  };

  const setPlayerLap = () => setPlayer({ globalLap: true });

  return (
    <div key={name} className="card">
      <div className="card-header">
        <h3>{name}</h3>
        <button className="round" onClick={removePlayer}>
          -
        </button>
      </div>
      <hr />
      <p>Savings - {savings}</p>
      {!!savings && (
        <button className="margin-bottom-10" onClick={compoundSavings}>
          Compound
        </button>
      )}
      <div className="input-wrapper">
        <input
          type="text"
          value={savingsToChange}
          onChange={changeSavingsToChange}
        />
        <button className="round" onClick={setSavings(false)}>
          -
        </button>
        <button className="round" onClick={setSavings()}>
          +
        </button>
        <button onClick={withdrawSavings}>Withdraw all</button>
      </div>
      <hr />
      <p>Loan - {loan}</p>
      {!!loan ? (
        <div className="installment-wrapper">
          <p>Installment - {installment}</p>
          <button onClick={payLoan}>Pay</button>
        </div>
      ) : (
        <div className="input-wrapper">
          <input
            type="text"
            id="loan"
            value={loanToBeRequested}
            onChange={changeLoanToBeRequested}
          />
          <button onClick={requestLoan}>Request loan</button>
        </div>
      )}
      <hr />
      <button disabled={globalLap} onClick={setPlayerLap}>
        Lap
      </button>
    </div>
  );
};

export default PlayerCard;
