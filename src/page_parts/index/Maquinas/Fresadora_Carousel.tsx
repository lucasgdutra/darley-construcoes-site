import Carousel from "../../../components/Carousel";

interface Props {}
function FresadoraCarousel({}: Props) {
  return (
    <Carousel>
      <Carousel.Item lazy>
        <img
          src="img/maquinas/fresadora-finiti-gd.jpg"
          alt="fresadora-finiti-gd"
          loading="lazy"
        />
      </Carousel.Item>
      <Carousel.Item lazy>
        <img
          src="img/maquinas/fresadora-finiti-gd.jpg"
          alt="fresadora-finiti-gd"
          loading="lazy"
          class="mx-auto"
        />
      </Carousel.Item>
      <Carousel.Item lazy>
        <img
          src="img/maquinas/fresadora-finiti-gd.jpg"
          alt="fresadora-finiti-gd"
          loading="lazy"
        />
      </Carousel.Item>

      <Carousel.Item lazy>
        <img
          src="img/maquinas/Maquina04-A-400x400.png"
          alt="Maquina04 – A"
          loading="lazy"
        />
      </Carousel.Item>
      <Carousel.Item lazy>
        <img
          src="img/maquinas/Maquina04-B-400x400.png"
          alt="Maquina04 – B"
          loading="lazy"
        />
      </Carousel.Item>
      <Carousel.Item lazy>
        <img
          src="img/maquinas/Maquina04-C-400x400.png"
          alt="Maquina04 – C"
          loading="lazy"
        />
      </Carousel.Item>
      <Carousel.Item lazy>
        <img
          src="img/maquinas/Maquina04-D-400x400.png"
          alt="Maquina04 – D"
          loading="lazy"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export { FresadoraCarousel, FresadoraCarousel as default };
