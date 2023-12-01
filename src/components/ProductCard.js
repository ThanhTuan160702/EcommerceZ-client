import React from 'react'
import { formatPrice, renderStar } from '../utils/helper';

const ProductCard = ({productData}) => {
  return (
    <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
        <div className='flex w-full border'>
            <img src={productData.images[0]} alt='images' className='w-[120px] object-contain p-4'/>
            <div className='flex flex-col mt-[15px] gap-1 text-sm'>
                <span className='line-clamp-1 capitalize'>{productData?.title}</span>
                <span className='flex'>{renderStar(productData?.totalRatings)}</span>
                <span>{`${formatPrice(productData?.price)} VND`}</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard