import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';

export default function InfiniteSliderLogos() {
  return (
    <section className='w-full bg-marrone-scuro/70 py-5'>
        <h1 className='text-5xl md:text-7xl text-center text-crema font-semibold underline mb-10 decoration-3 underline-offset-4'>
            I nostri marchi
        </h1>
         <InfiniteSlider speedOnHover={20} gap={36} className='md:w-2/3 mx-auto '>
            <img
                src='/farabellaLogo.png'
                alt='farabellaLogo'
                className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            <img
                src='/liberarireLogo.webp'
                alt='liberaireLogo'
                className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            <img
                src='/logoProbios.png'
                alt='logoProbios'
                className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            <img
                src='/lurisiaLogo.png'
                alt='lurisiaLogo'
                className='aspect-squareh h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            <img
                src='/maramarconLogo.png'
                alt='maramarcoLogo'
                className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            <img
                src='/marioLogo.jpeg'
                alt='marioLogo'
                className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            <img
                src='/scharLogo.jpg'
                alt='scharLogo'
                className='aspect-square h-[100px] w-[140px] rounded-[4px] grayscale'
            />
            </InfiniteSlider>
    </section>
   
  );
}
