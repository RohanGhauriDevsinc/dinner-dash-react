import * as React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";

function OrderTable() {
  const [OrdersList, setOrdersList] = useState([]);
  const ordersUrl = "http://localhost:3000/api/v1/orders";
  const fetchOrdersList = () => {
    fetch(ordersUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrdersList(data);
      });
  };
  useEffect(() => {
    fetchOrdersList();
  }, []);
  return (
    <>
      {OrdersList.map((order) => (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <strong>Order Number: #{order.id}</strong> : {order.status}
            </Accordion.Header>
            <Accordion.Body>
              <strong>Order placed at :</strong> {order.created_at} by{" "}
              {order.user.email}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Items Purchased</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items.map((item) => (
                    <tr>
                      <td>{item.item.name}<br></br> { item.item.description}</td>
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
  );
}

export default OrderTable;
