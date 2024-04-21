export default function ParkCard({ park }) {
    return (
      <div className="card">
        <h3>{park.place_name}</h3>
        <div><strong>Адрес:</strong> {park.address}</div>
        <div><strong>Время работы:</strong> {park.working_time}</div>
        <div><strong>Время проведения:</strong> {park.spending_time}</div>
        <div><strong>Важность:</strong> {park.cult_significance}</div>
        <div><strong>Информация:</strong> {park.information}</div>
        <div><strong>Цена билета:</strong> {park.ticket_price}</div>
        <a href={park.off_link}>Ссылка на TripAdvisor</a>
      </div>
    );
  }