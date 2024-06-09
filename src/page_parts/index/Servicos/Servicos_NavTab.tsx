import { For, createResource } from "solid-js";
import Carousel from "../../../components/Carousel";
import type { ImageJsonInterface, ImageData } from "./imageJsonInterface";
import {
  NavTab,
  NavTabContent,
  NavTabHeader,
  NavTabHeaderGroup,
} from "../../../components/NavTab";
import axios from "axios";

interface ImagesInsertProps {
  images: () => ImageData[];
}
const ImagesInsert = ({ images }: ImagesInsertProps) => {
  return (
    <Carousel
      swiper_options={{
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: false,
        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },
        breakpoints: {
          1920: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
        loop: true,
      }}
    >
      <For each={images()}>
        {(image) => {
          return (
            <Carousel.Item class=" h-full w-auto">
              <picture class="flex justify-center align-middle items-center h-full w-auto">
                {image.variants.map((variant) => {
                  return (
                    <source
                      type={`image/${variant.format}`}
                      sizes={
                        "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      }
                      srcset={variant.sizes
                        .map(
                          (size) =>
                            `https://d2adkxirtoi09w.cloudfront.net/${size.path} ${size.size}w`
                        )
                        .join(", ")}
                    />
                  );
                })}
                <img
                  src={`https://d2adkxirtoi09w.cloudfront.net/${
                    image.variants
                      .filter((v) => v.format === "jpg")[0]
                      .sizes.filter((s) => s.size === 1280)[0].path
                  }`}
                  alt={image.description}
                  loading="lazy"
                  decoding="async"
                  class="block h-full w-auto"
                />
              </picture>
            </Carousel.Item>
          );
        }}
      </For>
    </Carousel>
  );
};

const fetchImages = async () => {
  return axios
    .get<ImageJsonInterface>(
      "https://d2adkxirtoi09w.cloudfront.net/images.json"
    )
    .then((res) => res.data);
};

const Servicos_NavTab = () => {
  const [images, {}] = createResource(fetchImages);
  const imagesArray = () => {
    const obj = images();
    if (obj) {
      return Object.keys(obj)
        .map((key) => obj[key])
        .map((image) => ({ ...image, group: image.id.split("_")[0] }));
    }
    return [];
  };
  const imagesSorted = () => {
    const order = ["avif", "webp", "jpg"];
    return imagesArray().map((image) => {
      return {
        ...image,
        variants: image.variants
          .sort((a, b) => order.indexOf(a.format) - order.indexOf(b.format))
          .map((variant) => {
            return {
              ...variant,
              sizes: variant.sizes.sort((a, b) => b.size - a.size),
            };
          }),
      };
    });
  };
  const imagesIndustriais = () => {
    return imagesSorted().filter((image) => image.group === "industrial");
  };
  const imagesComerciais = () => {
    return imagesSorted().filter((image) => image.group === "comercial");
  };
  const imagesResidenciais = () => {
    return imagesSorted().filter((image) => image.group === "residencial");
  };

  return (
    <NavTab class="">
      <NavTabHeaderGroup class="">
        <NavTabHeader id="Industriais">Industriais</NavTabHeader>
        <NavTabHeader id="Comerciais">Comerciais</NavTabHeader>
        <NavTabHeader id="Residenciais">Residenciais</NavTabHeader>
      </NavTabHeaderGroup>
      <div>
        <NavTabContent id="Industriais" class="w-full h-auto overflow-y-auto">
          <ImagesInsert images={imagesIndustriais} />
        </NavTabContent>
        <NavTabContent id="Comerciais" class="w-full h-auto overflow-y-auto">
          <ImagesInsert images={imagesComerciais} />
        </NavTabContent>
        <NavTabContent id="Residenciais">
          <ImagesInsert images={imagesResidenciais} />
        </NavTabContent>
      </div>
    </NavTab>
  );
};

export default Servicos_NavTab;
