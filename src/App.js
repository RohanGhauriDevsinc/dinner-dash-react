import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Item from "./pages/item_page/item_page";
import Order from "./pages/order_page/order_page";
import TopNavBar from "./components/navbar";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <TopNavBar />
        <Routes>
          <Route index element={<Item />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/items" element={<Item />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
