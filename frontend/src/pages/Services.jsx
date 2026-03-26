export default function Services() {
  const services = [
    {
      name: "Knip",
      price: 25,
      desc: "Een klassieke en verzorgde knipbeurt, afgestemd op jouw stijl en gezichtsvorm."
    },
    {
      name: "Fade",
      desc: "Een scherpe fade met nauwkeurige overgangen voor een strak en modern resultaat.",
      price: 30,
    },
    {
      name: "Baard",
      desc: "Professioneel trimmen en stylen van je baard voor een gepolijkte look.",
      price: 15,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <p className="page-eyebrow">Wat wij aanbieden</p>
        <h1 className="page-title">Onze <em>Services</em></h1>
        <div className="page-divider" />
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.name}>
            <h2 className="service-name">{s.name}</h2>
            <p className="service-desc">{s.desc}</p>
            <div className="service-price">
              €{s.price}<span>per beurt</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}