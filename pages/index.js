import React, { useState } from "react";
import Head from "next/head";
import PlayerCard from "../components/player-card";

const PLAYER = {
  savings: 0,
  loan: 0,
  installment: 0,
  globalLap: false,
};
const SAVINGS_RATE = 0.1;
const LOAN_RATE = 0.15;

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [savingsRate, setSavingsRate] = useState(SAVINGS_RATE);
  const [loanRate, setLoanRate] = useState(LOAN_RATE);
  const [globalLapCounter, setGlobalLapCounter] = useState(1);

  const changeSavingsRate = ({ target }) => setSavingsRate(target.value);
  const changeLoanRate = ({ target }) => setLoanRate(target.value);

  const invitePlayer = () => {
    setPlayers([...players, { ...PLAYER, name }]);
    setName("");
  };

  const onEnterInvitePlayer = ({ key }) => {
    if (key === "Enter" && name) invitePlayer();
  };

  const onClickInvitePlayer = () => {
    if (name) invitePlayer();
  };

  const setPlayer = (name) => (attrs) =>
    setPlayers(
      players.map((player) =>
        player.name === name
          ? {
              ...player,
              ...attrs,
            }
          : player
      )
    );

  const removePlayer = (name) => () =>
    setPlayers(players.filter((player) => player.name !== name));

  const setGlobalLap = () => {
    if (players.every((player) => !!player.globalLap)) {
      setPlayers(players.map((player) => ({ ...player, globalLap: false })));
      setGlobalLapCounter(globalLapCounter + 1);
    }
  };

  const reset = () => {
    setPlayers(players.map(({ name }) => ({ ...PLAYER, name })));
    setSavingsRate(SAVINGS_RATE);
    setLoanRate(LOAN_RATE);
    setGlobalLapCounter(1);
  };

  return (
    <>
      <Head>
        <title>Monopoly with options</title>
        <link rel="icon" href="/favicon.ico"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=MuseoModerno:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main>
        <aside>
          <h1>Bank</h1>
          <p>Global lap - {globalLapCounter}</p>
          <div>
            <label htmlFor="savingsRate">Savings Rate</label>
            <input
              type="text"
              id="savingsRate"
              value={savingsRate}
              onChange={changeSavingsRate}
            />
          </div>
          <div>
            <label htmlFor="loanRate">Loan Rate</label>
            <input
              type="text"
              id="loanRate"
              value={loanRate}
              onChange={changeLoanRate}
            />
          </div>
          <button className="reset-btn" onClick={reset}>
            Reset Game
          </button>
        </aside>
        <section>
          <h1>Players</h1>
          <div className="input-wrapper">
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              onKeyDown={onEnterInvitePlayer}
            />
            <button onClick={onClickInvitePlayer}>Invite</button>
          </div>
          <hr />
          <div className="grid">
            {players.map((player) => (
              <PlayerCard
                key={player.name}
                player={player}
                setPlayer={setPlayer(player.name)}
                removePlayer={removePlayer(player.name)}
                savingsRate={+savingsRate}
                loanRate={+loanRate}
                setGlobalLap={setGlobalLap}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
