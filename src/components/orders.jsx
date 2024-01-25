import * as React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import LoadingSpinner from "./spinner";
import "./orders.css";


function OrderTable() {
  const [OrdersList, setOrdersList] = useState([]);
  const ordersUrl = "http://localhost:3000/api/v1/orders";
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("default");
  const statusList = ["ordered", "paid", "completed", "cancelled"];

  const fetchOrdersList = () => {
    fetch(ordersUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrdersList(data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchOrdersList();
  }, []);

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
    console.log(filter, filteredOrders());
  };

  const filteredOrders = () => {
    if (filter === "default") {
      return OrdersList;
    } else {
      return OrdersList.filter((order) => order.status === filter);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <select
            value={filter}
            onChange={handleSelectChange}
            className="cust_input"
            data-bs-theme="dark"
          >
            <option value={"default"}> Show All</option>
            {statusList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {filteredOrders().map((order, index) => (
            <Accordion
              defaultActiveKey="0"
              data-bs-theme="dark"
              className="order-body"
              key={index}
            >
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <strong>Order Number: #{order.id}</strong> : {order.status}
                </Accordion.Header>
                <Accordion.Body className="order-body">
                  <div className="row d-flex flex-nowrap pb-3">
                    <div className="col-6">
                      {" "}
                      <strong>Order placed at :</strong> {order.created_at}
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      {" "}
                      by: {order.user.email}{" "}
                    </div>
                  </div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Items Purchased</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.order_items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{item.item.name}</strong>
                            <br></br> {item.item.description}
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.line_total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </>
      )}
    </>
  );
}

export default OrderTable;
