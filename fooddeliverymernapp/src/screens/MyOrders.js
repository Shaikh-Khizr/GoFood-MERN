import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
  const [ordersData, setOrdersData] = useState({});

  const fetchMyOrders = async () => {
    await fetch("http://localhost:5000/api/myOrdersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrdersData(response);
    });
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
                <div className="row">
                    {ordersData !== {} ? Array(ordersData).map(data => {
                        return (
                            data.ordersData ?
                            data.ordersData.order_data.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData, index) => {
                                        return (
                                                <div key={index}>
                                                    {arrayData.Order_date ? <div className="m-auto mt-5">
                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className="col-12 col-md-6 col-lg-3" >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                                        <span className="m-1">{arrayData.quantity}</span>
                                                                        <span className="m-1">{arrayData.size}</span>
                                                                        <div className=" d-inline ms-2 h-100 w-20 fs-5" >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
