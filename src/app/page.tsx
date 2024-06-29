"use client";
import Image from "next/image";
import Model3d from "./Components/Model3d";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Model3d />
      <Leva
        // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        collapsed // default = false, when true the GUI is collpased
        // hidden // default = false, when true the GUI is hidden
      />
    </>
  );
}
