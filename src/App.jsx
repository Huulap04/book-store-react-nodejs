import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./page/Navbar";
import Footer from "./page/Footer";
import AddBook from "./page/AddBook";

const Home = lazy(() => import("./page/Home"));
const Books = lazy(() => import("./page/Books"));
const BookDetail = lazy(() => import("./page/BookDetail"));
const Contact = lazy(() => import("./page/Contact"));

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <Suspense
          fallback={
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className="container flex-grow-1 mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
