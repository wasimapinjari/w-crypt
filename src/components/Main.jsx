import Card from "./Card";

function Main({ navOpenState }) {
  return (
    <main className="cointainer">
      <Card navOpenState={navOpenState} />
      <div className="invisible-bottom-space" />
    </main>
  );
}

export default Main;
