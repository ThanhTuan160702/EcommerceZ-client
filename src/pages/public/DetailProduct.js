import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../apis'
import { BreadCrumbs, Button, SelectQuantity, MoreInformation, ProductInformation, CustomSlider } from '../../components'
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatPrice, renderStar} from '../../utils/helper';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};


const DetailProduct = () => {
  const {pid , title, category} = useParams()
  const [product, setProduct] = useState(null)
  const [productSlider, setProductSlider] = useState(null)
  const [currentImg, setCurrentImg] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const fetchData = async() => {
    const response = await apiGetProduct(pid)
    if(response?.success){
      setProduct(response?.mes)
      setCurrentImg(response?.mes.images[0])
    }
  }

  const fetchCustom = async() => {
    const response = await apiGetProducts({category})
    setProductSlider(response?.mes)
  }

  useEffect(()=>{
    if(pid){
      fetchData()
      fetchCustom() 
    }
  },[pid])
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantity = useCallback((number)=>{
    if(!Number(number) || Number(number) < 0 || Number(number) > 99){ 
      return
    }else{
      setQuantity(number)
    }
  },[quantity])

  const handleChangeQuantity = useCallback((text)=>{
    if(text==='-' && +quantity > 1){
      setQuantity(+quantity-1)
    }
    if(text==='+' && +quantity < 99){
      setQuantity(+quantity+1)
    }
  },[quantity])

  return (
    <div className='w-full'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold'>{title}</h3>
          <BreadCrumbs title={title} category={category}/>
        </div>
      </div>
      <div className='bg-white w-main m-auto mt-4 flex'>
        <div className='w-[40%] gap-4 flex flex-col'>
          <img src={currentImg} alt='' className='w-[458px] h-[458px] border border-black object-cover' />
          <div className='w-[458px] h-[143px]'>
            <Slider className='image-slider mx-[-8px]' {...settings} >
              {product?.images.map((el, index)=>(
                <div className='px-2' key={index}>
                  <img onClick={()=> setCurrentImg(el)} src={el} alt='' className='h-[143px] w-[153px] border border-black object-cover p-2 cursor-pointer'/>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-[40%] flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[30px] font-semibold'>{`${formatPrice(product?.price)}₫`}</h2>
          </div>
          <div className='flex items-center gap-2 italic'>
            <span className='flex'>{renderStar(product?.totalRatings)}</span>
            <span >1 review</span>
          </div>
          <ul className='text-sm list-disc pl-4 text-gray-500 leading-6'>
            {product?.description.map((el, index)=>(
              <li key={index}>{el}</li>
            ))}
          </ul>
          <div className='flex flex-col gap-8'>
            <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity}/>
            <Button fw>
              Add to cart
            </Button>
          </div>
        </div>
        <div className='w-[20%] pl-6 flex flex-col gap-3'>
          <MoreInformation />
        </div>
      </div>
      <div className='w-main m-auto mt-8'>
          <ProductInformation product={product}/>
      </div>
      <div className='w-main m-auto mt-4'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main mb-2'>OTHER CUSTOMERS ALSO BUY:</h3>
          <CustomSlider products={productSlider}/>
      </div>
      <div className='h-[500px] w-main m-auto mt-8 border'>
            <h1>{}</h1>
      </div>
    </div>
  )
}

export default DetailProduct