import React from 'react'

function Forecast({title,items,icon}) {
    console.log(items);
  return (
    <div>
      <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>
            {title}
        </p>
      </div>

      <hr className='my-2' />

      <div className='flex flex-row items-center justify-between text-white'>
        {items?.map((item)=>(
        <div className='flex flex-col items-center
        justify-center'>
            <p className='font-light text-sm'>
                {item.title}
            </p>
            <img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} className='w-12 my-1' alt="" />
            <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
        </div>
        ))}

      </div>
    </div>
  )
}

export default Forecast
