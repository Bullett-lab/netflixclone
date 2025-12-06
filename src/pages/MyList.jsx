// src/pages/MyList.jsx
export default function MyList({ items, onOpen, onRemove }) {
  return (
    <section className="section">
      <h2>My List</h2>
      <div className="grid-row">
        {items.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No items saved yet.</p>
        ) : (
          items.map((m) => (
            <div key={m.id} className="card">
              <div className="card__clickable" onClick={() => onOpen(m)}>
                <img src={m.poster} alt={m.title} />
                <div className="meta">
                  <strong>{m.title}</strong>
                </div>
              </div>
            
            </div>
          ))
        )}
      </div>
    </section>
  );
}
