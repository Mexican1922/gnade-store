import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Spa from "./pages/Spa";
import Delivery from "./pages/Delivery";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import AdminApp from "./admin/AdminApp";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
