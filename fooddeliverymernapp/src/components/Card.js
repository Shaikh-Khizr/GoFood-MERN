import React from 'react'

export default function Card() {
  return (
    <div>
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "360px"}}>
            <img src="https://media.istockphoto.com/photos/chilli-paneer-tikka-or-paneer-kabab-picture-id629423010" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is some Important text.</p>
              <div className="container w-100">
                <select name="" id="" className="m-2 h-100 text-white bg-success rounded">
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    )
                  })}
                </select>

                <select name="" id="" className="m-2 h-100 text-white bg-success rounded">
                  <option key={1} value="half">Half</option>
                  <option key={2} value="Full">Full</option>
                </select>

                <div className="d-inline h-100 fs-5">
                  Total Price
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
