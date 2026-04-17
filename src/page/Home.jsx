import { useEffect, useState } from "react";
import axios from "axios";


function Home() {
  const [home, setHome] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/home")
      .then((res) => {
        setHome(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="text-start mt-4">
      <h1>{home.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: home.content }} />
    </div>
  );
}
export default Home;
