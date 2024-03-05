export interface ImgElement extends HTMLElement {
  dataset: { src: string };
  src: string;
  style: {
    transition: string;
    opacity: string;
    display: string;
  };
}
