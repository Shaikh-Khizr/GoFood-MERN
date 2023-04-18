import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  
  let options = props.options;
  let priceOptions = Object.keys(options);
  let priceRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity })
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size, img: props.foodItem.img });
        return;
      }
      return;
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size, img: props.foodItem.img });
  };

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  
  
  return (
    <div>
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "360px"}}>
            <img src={props.foodItem.img || "https://media.istockphoto.com/photos/chilli-paneer-tikka-or-paneer-kabab-picture-id629423010"} style={{ height: "150px", objectFit: "cover" }} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{props.foodItem.name}</h5>
              <div className="container w-100">
                <select className="m-2 h-100 text-white bg-success rounded" onChange={(e) => setQuantity(e.target.value)}>
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    )
                  })}
                </select>

                <select className="m-2 h-100 text-white bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                  {priceOptions.map((data) => {
                    return (
                        <option key={data} value={data}>{data}</option>
                      );
                  })}
                </select>

                <div className="d-inline h-100 fs-5">
                ₹{finalPrice}/-
                </div>
              </div>
              <hr />
              <button className="btn btn-success justify-center mx-2" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
  )
}
