import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "p3r-pause-menu": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}