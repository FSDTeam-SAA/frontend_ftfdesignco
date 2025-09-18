import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Banner2 = () => {
  return (
    <section className='bg-[#FBF7EF]'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px] items-center py-8 md:py-[72px] px-4 sm:px-6'>
            <div>
                <h2 className='text-2xl sm:text-3xl md:text-[40px] font-bold text-[#424242] mb-4 md:mb-6'>Minimum Swag Boxes</h2>
                <div className='flex items-center gap-4 mb-4'>
                    <div>
                        <Image 
                            src="/assets/check-circle-broken.png" 
                            alt="Check Icon" 
                            width={40} 
                            height={40} 
                            className="w-8 h-8 sm:w-8 sm:h-8 md:max-w-12 md:max-h-12" 
                        />
                    </div>
                    <div>
                        <p className='text-sm sm:text-base md:text-lg text-[#424242]'>
                            Awesome Job
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div>
                        <Image 
                            src="/assets/check-circle-broken.png" 
                            alt="Check Icon" 
                            width={40} 
                            height={40} 
                            className="w-8 h-8 sm:w-8 sm:h-8 md:max-w-12 md:max-h-12" 
                        />
                    </div>
                    <div>
                        <p className='text-sm sm:text-base md:text-lg text-[#424242]'>
                            Great for Corporate Events and for Marketing Gifts
                        </p>
                    </div>
                </div>
                <div className='mt-6 md:mt-10'>
                    <Link href='/swagpacks'>
                    
                    <Button className='bg-[#D9AD5E] text-[#131313] text-sm sm:text-base md:text-[18px] h-10 md:h-[48px] px-6 md:px-[42px] rounded-[8px]'>
                        See More
                    </Button>
                    </Link>
                </div>
            </div>
            <div>
                <Image 
                    src="/assets/swagpack.png" 
                    alt="Banner Image" 
                    width={1000} 
                    height={1000} 
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:h-[477px] rounded-[16px] object-cover" 
                />
            </div>
        </div>
    </section>
  )
}

export default Banner2