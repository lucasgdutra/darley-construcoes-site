import { createSignal, JSX } from "solid-js";
import { twMerge } from "tailwind-merge";

const [activeTab, setActiveTab] = createSignal<string>();

interface NavTabProps {
  children: JSX.Element;
  defaultActive?: string;
  class?: JSX.HTMLAttributes<HTMLDivElement>["class"];
}
export const NavTab = ({
  children,
  defaultActive,
  class: className,
}: NavTabProps) => {
  if (defaultActive) {
    setActiveTab(defaultActive);
  }
  return <div class={className}>{children}</div>;
};

interface NavTabHeaderProps {
  id: string;
  children: JSX.Element;
  class?: JSX.HTMLAttributes<HTMLDivElement>["class"];
}
export const NavTabHeader = ({
  id,
  children,
  class: className,
}: NavTabHeaderProps) => {
  if (activeTab() === null || activeTab() === undefined) {
    setActiveTab(id);
  }
  const isActive = () => activeTab() === id;
  function handleClick(e: Event) {
    e.preventDefault();
    if (isActive()) return;
    setActiveTab(id);
  }
  return (
    <button
      class={twMerge(
        (isActive()
          ? "border-green-500 text-green-600"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700") +
          " w-1/4 border-b-2 py-4 px-1 text-center text-sm font-semibold flex-grow",
        className
      )}
      onclick={handleClick}
    >
      {children}
    </button>
  );
};

interface NavTabHeaderGroupProps {
  children: JSX.Element;
  class?: JSX.HTMLAttributes<HTMLDivElement>["class"];
}
export const NavTabHeaderGroup = ({
  children,
  class: className,
}: NavTabHeaderGroupProps) => {
  return (
    <div class={twMerge("border-b border-gray-200 -mb-px flex", className)}>
      {children}
    </div>
  );
};

interface NavTabContentProps {
  id: string;
  children: JSX.Element;
  class?: JSX.HTMLAttributes<HTMLDivElement>["class"];
}
export const NavTabContent = ({
  id,
  children,
  class: className,
}: NavTabContentProps) => {
  const isActive = () => activeTab() === id;
  return (
    <div
      id={id}
      class={`${twMerge(isActive() ? "block" : "hidden", className)}`}
    >
      {children}
    </div>
  );
};
