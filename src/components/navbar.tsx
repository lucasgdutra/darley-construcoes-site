import { For, createMemo, createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { throttle } from "@solid-primitives/scheduled";
import {
  NullableBounds,
  UpdateGuard,
  createElementBounds,
} from "@solid-primitives/bounds";
import { createWindowSize } from "@solid-primitives/resize-observer";
import { createScrollPosition } from "@solid-primitives/scroll";
import { FiMenu, FiX } from "solid-icons/fi";

interface NavItemProps {
  section: string;
  activeLink: () => any;
  onClick: (event: Event) => void;
}
const NavItem = ({ section, activeLink, onClick }: NavItemProps) => (
  <li>
    <a
      href={`#${section}`}
      class={`hover:font-bold ${
        activeLink() === section && "border-b-2 border-b-green-500 "
      }`}
      onclick={onClick}
    >
      {section}
    </a>
  </li>
);

interface Props {
  sections: string[];
}
const Navbar = ({ sections }: Props) => {
  const [showNav, setShowNav] = createSignal(false);

  const size = isServer ? { width: 1920, height: 1080 } : createWindowSize();
  const windowScroll = isServer
    ? { x: 0, y: 0 }
    : createScrollPosition(() => document.querySelector("main")!);

  let navbarColor = () => {
    if (size.width < 1024) {
      return "white";
    } else {
      if (windowScroll.y > size.height - 50) {
        return "white";
      } else {
        return "transparent";
      }
    }
  };
  const throttleUpdate: UpdateGuard = (fn) => throttle(fn, 500);

  let bounds: (Readonly<NullableBounds> | null)[];
  if (!isServer) {
    bounds = sections.map((section) => {
      const element = document.querySelector(`#${section}`);
      if (!element) return null;
      return createElementBounds(element, {
        trackMutation: throttleUpdate,
        trackScroll: throttleUpdate,
        trackResize: throttleUpdate,
      });
    });
  }

  const activeLink = createMemo(() => {
    if (!bounds) return "";
    for (let i = 0; i < bounds.length; i++) {
      const bound_top = bounds[i]?.top;
      const bound_top_next = bounds[i + 1]?.top;
      if (bound_top != null && bound_top <= 0) {
        if (bound_top_next != null && bound_top_next > 0) {
          return sections[i];
        } else if (bound_top_next == null) {
          return sections[i];
        }
      }
    }
    return "";
  });

  const handleClick = (event: Event, id: string) => {
    if (!isServer) {
      event.preventDefault();
      const element = document.querySelector(id);
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth" });
      setShowNav(false);
    }
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="main navigation"
        class={`fixed top-0 left-0 right-0 z-50 flex flex-col  ${
          navbarColor() === "white"
            ? "bg-white text-black"
            : "bg-black bg-opacity-20 text-white"
        }`}
      >
        <div class="container max-w-6xl   mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div class="flex justify-between w-full">
            <a
              href={`#${sections[0]}`}
              class="flex items-center h-14 p-4"
              onClick={(event) => handleClick(event, `#${sections[0]}`)}
            >
              <img
                class="max-h-full w-auto"
                src={`img/${
                  navbarColor() === "white"
                    ? "LogoMarca.svg"
                    : "LogoMarca_verdebranco.svg"
                }`}
                alt="Logo"
              />
            </a>

            <button
              type="button"
              title="Menu"
              class="lg:hidden px-3 py-2 rounded text-black  hover:text-white hover:bg-zinc-400"
              onClick={() => setShowNav(!showNav())}
            >
              <span class="sr-only">Menu</span>
              {showNav() ? <FiX /> : <FiMenu />}
            </button>
          </div>
          <div
            class={`${
              showNav() ? "block" : "hidden"
            } lg:block self-start duration-500`}
          >
            <ul class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 p-4 ">
              <For each={sections}>
                {(section) => (
                  <>
                    <NavItem
                      section={section}
                      activeLink={activeLink}
                      onClick={(event) => handleClick(event, `#${section}`)}
                    />
                  </>
                )}
              </For>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar, Navbar as default };
