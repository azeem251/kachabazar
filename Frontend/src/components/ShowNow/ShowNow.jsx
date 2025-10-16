import React from 'react'

const ShowNow = () => {
  return (
    <div className='showNow_wrapper  mb-3'>
      <div className='container bg-amber-100 p-4 rounded'>
        <div className='row gy-4 items-center '>
            <div className='col-lg-6'>
                <div> 
                    <h3 className='text-green-700'>100% Natural Quality Organic Product</h3>
                    <p className='text-sm'>See Our latest discounted products from here and get a special discount product</p>
                </div>
            </div>
             <div className='col-lg-6 text-end'>
                <div> 
                   <button className='bg-green-600 text-white w-[102px] h-[40px] rounded-2xl'>Shop now</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ShowNow
