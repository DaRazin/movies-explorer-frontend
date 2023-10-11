import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <p className="not-found__status">404</p>
      <h3 className="not-found__title">Страница не найдена</h3>
      <button className="not-found__button" onClick={() => navigate(-1)}>Назад</button>
    </section>
  );
}

export default NotFound;