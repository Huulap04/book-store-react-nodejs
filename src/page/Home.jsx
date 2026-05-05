import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [home, setHome] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/home")
      .then((res) => {
        setHome(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4" style={{ borderRadius: "15px" }}>
        
        <h1 className="text-primary fw-bold mb-3">
          {home.title}
        </h1>

        <div
          className="text-muted"
          dangerouslySetInnerHTML={{ __html: home.content }}
        />
        
      </div>
    </div>
  );
}

export default Home;