import {
  For,
  JSX,
  JSXElement,
  Show,
  onCleanup,
  onMount,
  createUniqueId,
} from "solid-js";
import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  A11y,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "./index.css";
import type { SwiperOptions } from "swiper/types/swiper-options";
import { twMerge } from "tailwind-merge";

interface ICarouselItem {
  children: JSXElement;
  lazy?: boolean;
  class?: string;
}
function CarouselItem({ children, lazy, class: className }: ICarouselItem) {
  return (
    <>
      <div class={twMerge("swiper-slide ", className)}>{children}</div>
      <Show when={lazy}>
        <div class="swiper-lazy-preloader"></div>
      </Show>
    </>
  );
}

interface Props {
  children: JSXElement;
  swiper_options?: SwiperOptions;
}
function Carousel({ children, swiper_options }: Props) {
  const id = createUniqueId();
  let swiper: Swiper;

  // Lifecycle hook for mounting
  onMount(() => {
    // Initialize Swiper
    swiper = new Swiper(`#${id}`, {
      modules: [Navigation, Pagination, Autoplay, A11y, Keyboard],
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
      },
      a11y: {
        containerMessage: "Slideshow",
        containerRoleDescriptionMessage: "Slideshow",
        firstSlideMessage: "Este é o primeiro slide",
        lastSlideMessage: "Este é o último slide",
        itemRoleDescriptionMessage: "Slide",
        prevSlideMessage: "slide anterior",
        nextSlideMessage: "próximo slide",
        paginationBulletMessage: "Vá para o slide {{index}}",
        slideLabelMessage: "Slide {{index}}",
      },
      centeredSlides: true,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      lazyPreloadPrevNext: 0,
      loop: true,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        clickable: true,
        el: ".swiper-pagination",
      },
      ...swiper_options,
    });
  });

  // Lifecycle hook for cleanup
  onCleanup(() => {
    if (!swiper) return;
    swiper.destroy();
  });

  return (
    <>
      <div class="swiper" id={id}>
        <div class="swiper-wrapper align-middle items-center">{children}</div>
        <Show
          when={() => {
            if (swiper_options != undefined) {
              const pagination = swiper_options["pagination"];
              if (pagination == undefined) return true;
              if (pagination == true) return true;
              if (pagination == false) return false;
              if (pagination["enabled"] == undefined) return true;
              if (pagination["enabled"] == true) return true;
              if (pagination["enabled"] == false) return false;
            }
            return true;
          }}
        >
          <div class="swiper-pagination"></div>
        </Show>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </>
  );
}

Carousel.Item = CarouselItem;

export { Carousel, Carousel as default };
