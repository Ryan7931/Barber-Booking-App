export default function Services() {
  const services = [
    { name: "Knip", price: 25 },
    { name: "Fade", price: 30 },
    { name: "Baard", price: 15 }
  ];

  return (
    <div style={{ border: "1px solid #38bdf8", padding: "10px", borderRadius: "10px" }}>
      <h2>Services</h2>

      {services.map((s) => (
        <div key={s.name}>
          <p>
            {s.name} - €{s.price}
          </p>
        </div>
      ))}
    </div>
  );
}