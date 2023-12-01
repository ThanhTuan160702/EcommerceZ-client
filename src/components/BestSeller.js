import React,{ useEffect, useState } from 'react'
import { apiGetProducts } from '../apis/index'
import { Product } from '../components/index'
import Slider from 'react-slick'

const tabs = [
    {
        id:1,
        name: 'best sellers'
    },
    {
        id:2,
        name: 'new arrivals'
    },
    {
        id:3,
        name: 'tablet'
    },
]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const BestSeller = () => {

    const [bestSellers, setBestSellers] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [products, setProducts] = useState([])

    const [activedTab, setActivedTab] = useState(1)
  
    const fetchProducts = async() => {
      const response = await Promise.all([apiGetProducts({sort: '-sold',limit: 5}),apiGetProducts({sort: '-createdAt', limit: 5})])
      if(response[0].success){ 
        setBestSellers(response[0].mes) 
        setProducts(response[0].mes)
      }
      if(response[1].success){
        setNewProducts(response[1].mes) 
      }
    }
  
    useEffect(()=>{
      fetchProducts()
    },[])

    useEffect(()=>{
      if(activedTab === 1){
        setProducts(bestSellers)
      }else if(activedTab === 2){
        setProducts(newProducts)
      }
    },[activedTab])

  return (
    <div>
        <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
            {tabs.map(el=>(
                <span 
                key={el.id} 
                className={`font-semibold uppercase text-gray-400 cursor-pointer ${activedTab === el.id ? 'text-main' : ''}`}
                onClick={()=> setActivedTab(el.id)}
                >{el.name}</span>
            ))}
        </div>
        <div className='mt-4 mx-[-10px]'>
            <Slider {...settings}>
                {products.map(el=>(
                    <Product key={el.id} productData={el} activedTab={activedTab}/>
                ))}
            </Slider>
        </div>
        <div className='w-full flex gap-4 mt-4'>
          <img src='//digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' 
          alt='image1' 
          className='flex-1 object-contain cursor-pointer'
          />
          <img src='//digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657' 
          alt='image2' 
          className='flex-1 object-contain cursor-pointer'
          />
        </div>
    </div>
  )
}

export default BestSeller