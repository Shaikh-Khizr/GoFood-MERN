import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "applicatoin/json"
      }
    });

    response = await response.json();
    setFoodItems(response[0]);
    setFoodCategories(response[1]);
  };

  useEffect(() => {
    loadData();
  }, [])
  
  
  return (
    <div>
        <div> <Navbar /> </div>
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner" id="carousel">
                  <div className="carousel-caption" style={{ zIndex: "10"}}>
                      <div className="d-flex justify-content-center">
                          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                      </div>
                  </div>
                  <div className="carousel-item active">
                      <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)", height: "700px", objectFit: "cover" }} alt="..." />
                  </div>
                  <div className="carousel-item">
                      <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)", height: "700px", objectFit: "cover" }} alt="..." />
                  </div>
                  <div className="carousel-item">
                      <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)", height: "700px", objectFit: "cover" }} alt="..." />
                  </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div>
        </div>
        <div className="container">
          {
            foodCategories !== []
            ? foodCategories.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                {
                  foodItems !== []
                  ? foodItems.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card 
                          foodName={filterItems.name} 
                          options={filterItems.options[0]} 
                          imgSrc={filterItems.img}
                        />
                      </div>
                    );
                  })
                  : <div>No Such Data Found</div>

                }
                </div>
              );
            })
            : ""
          }
        </div>
        <div> <Footer /> </div>
    </div>
  )
}
