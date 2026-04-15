const AMOUNTS = [5, 10, 20, 50, 100];

export function QuickDonateButtons() {
  return (
    <div>
      <p
        style={{
          fontSize: "0.8rem",
          color: "rgba(0,0,0,0.6)",
          marginBottom: "1rem",
          letterSpacing: "0.03em",
        }}
      >
        Du wirst zu PayPal weitergeleitet
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        {AMOUNTS.map((amount) => (
          <a
            key={amount}
            href={`https://www.paypal.me/julisbw/${amount}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-black"
            style={{ minWidth: "70px", justifyContent: "center" }}
          >
            {amount} €
          </a>
        ))}
      </div>
      <a
        href="https://www.paypal.me/julisbw/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        style={{ borderColor: "var(--black)", color: "var(--black)" }}
      >
        Wunschbetrag spenden
      </a>
    </div>
  );
}
