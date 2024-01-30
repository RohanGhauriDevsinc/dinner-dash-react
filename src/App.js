import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Item from "./pages/item_page/item_page";
import Order from "./pages/order_page/order_page";
import AddItems from "./components/additems";
import TopNavBar from "./components/navbar";
import CartContextProvider from "./store/cartContextProvider";
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="container">
      <CartContextProvider>
      <ToastContainer/>
        <BrowserRouter>
          <TopNavBar />
          <Routes>
            <Route index element={<Item />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/items" element={<Item />} />
            <Route path="/addItems" element={<AddItems />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
