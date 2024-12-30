import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {
    const[AllProducts,setAllProducts]=useState([])
    const fetchInfo=async()=>{
      // try{await fetch(`http://localhost:4000/allproducts`)
      //   .then((res)=>res.json()) 
      //   .then((data)=>{setAllProducts(data)});
      // }catch(error){
      //   console.error('error fetching',error);
      // }}
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        const data = await response.json();
        setAllProducts(data);
        console.log('data fetched');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
      
//     useEffect(()=>{
//       fetchInfo();
//     },[])




//     return (
//     <div className='list-product'>
      
//       <h1> All Products List </h1>
//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Category</p>
//         <p>New Price</p>
//         <p>Old Price</p>
//         <p>Remove</p>
//       </div>
//       <div className="listproduct-allproducts">
//         <hr/>
//       {AllProducts.map((product,index)=>{
//             return
//              <div key={index} className="listproduct-format-main listproduct-format">
//               <img src={product.image} alt="" className="listproduct-product-icon" />
//               <p>{product.name}</p>
//               <p>{product.old_price}</p>
//               <p>{product.new_price}</p>
//               <p>{product.category}</p>
//               <img src={cross_icon} alt="" className="listproduct-remove-icon" />
//               </div>
//       })}

//       </div>

//     </div>
//   )
// }


const remove_product=async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'content-type':"application/json",
        },
        body:JSON.stringify({id:id})
    })
    await fetchInfo(); 
}






useEffect(() => {
  fetchInfo();
}, []);

return (
  <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Category</p>
          <p>New Price</p>
          <p>Old Price</p>
          <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
          <hr />
          {AllProducts.map((product, index) => {
            return <> 
             <div key={index} className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-product-icon" />
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>{product.new_price}</p>
                  <p>{product.old_price}</p>
                  <img  onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </div>
              <hr/></>
            })}
      </div>
  </div>
);
};

export default ListProduct;

