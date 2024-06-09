import Swiper from "swiper";
import {
    Navigation,
    Pagination,
    Autoplay,
    A11y,
    Keyboard,
} from "swiper/modules";

// Define your default props in the frontmatter

function initSwiper() {
    const swiper = new Swiper(".swiper", {
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
    });

    // Cleanup Swiper instance when component is unmounted
    return () => {
        if (swiper) {
            swiper.destroy();
        }
    };
}
initSwiper();