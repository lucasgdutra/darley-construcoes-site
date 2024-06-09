import { attachDevtoolsOverlay } from "@solid-devtools/overlay";

function devtoolsOverlay() {
  attachDevtoolsOverlay({
    defaultOpen: false,
    noPadding: true,
  });
  return <></>;
}

export default devtoolsOverlay;
