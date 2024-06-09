import Carousel from "../../../components/Carousel";

// import { getImage } from "astro:assets";
// import LogoArcom from "../../../assets/clientes/arcom.png";

// const optimizedLogoArcom = await getImage({
//   src: LogoArcom.src,
//   width: 200,
//   height: 200,
// });

function Clientes_Carousel() {
  return (
    <Carousel
      swiper_options={{
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: false,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
        loop: true,
      }}
    >
      {/* <Carousel.Item>
        <img
          src={optimizedLogoArcom.src}
          width={optimizedLogoArcom.attributes.width}
          height={optimizedLogoArcom.attributes.height}
          alt="LogoMarca Arcom"
          loading="lazy"
          decoding="async"
          class="max-h-24 max-w-xs w-auto h-auto"
        />
      </Carousel.Item> */}
      <Carousel.Item>
        <img
          src="/img/clientes/auto_escola_mundial.png"
          alt="LogoMarca Auto Escola Mundial"
          loading="lazy"
          class="max-h-24 w-auto"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/img/clientes/logo-magna-protecao.png"
          alt="LogoMarca Magna Proteção"
          loading="lazy"
          class="max-h-24 w-auto"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/img/clientes/start_quimica.jpg"
          alt="LogoMarca Start Quimica"
          loading="lazy"
          class="max-h-24 w-auto"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/img/clientes/magalu-logo.png"
          alt="LogoMarca Magazine Luiza"
          loading="lazy"
          class="max-h-24 w-auto"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/img/clientes/martins.png"
          alt="LogoMarca Martins"
          loading="lazy"
          class="max-h-24 w-auto"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export { Clientes_Carousel, Clientes_Carousel as default };
