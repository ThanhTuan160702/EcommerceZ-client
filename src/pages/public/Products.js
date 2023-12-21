import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { BreadCrumbs,Product, SearchItem} from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {

  const { category } = useParams()
  const [product, setProduct] = useState(null)
  const [activeClick, setActiveClick] = useState(null)

  const fetch = async(category) =>{
    const response = await apiGetProducts({category})
    setProduct(response?.mes)
  }

  useEffect(()=>{
    fetch(category)
  },[])

  const changeActiveClick = useCallback((name)=>{
    if(activeClick === name){
      setActiveClick(null)
    }else{
      setActiveClick(name)
    }
  },[activeClick])

  return (
    <div className='w-full mt-[-1px]'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
          <BreadCrumbs category={category}/>
        </div>
      </div>
      <div className='w-main flex m-auto border p-4 mt-8'>
        <div className='w-4/5 flex flex-col gap-2'>
            <span>Filter by</span>
            <div className='flex gap-2'>
              <SearchItem name='price' activeClick={activeClick} type='input' changeActiveClick={changeActiveClick}/>
              <SearchItem name='color' activeClick={activeClick} changeActiveClick={changeActiveClick}/>
            </div>
        </div>
        <div className='w-1/5'>
            <h1>Sort by</h1>
        </div>
      </div>
      <div className='w-main m-auto mt-4 h-[1500px]'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex gap-4"
        columnClassName="my-masonry-grid_column"
      >
        {product?.map((el)=>(
          <div className='border mb-4'>
            <Product isImage={true} productData={el} />
          </div>
        ))}
      </Masonry>
      </div>
    </div>
  )
}

export default Products