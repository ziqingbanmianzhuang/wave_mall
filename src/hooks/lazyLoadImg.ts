import type { ImgElement } from "../types/imgType";
//创建懒加载监听
// #ifdef H5
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log("entry", entry);
      if (entry.isIntersecting) {
        const imgLoadElement = entry.target as ImgElement;
        const imgLoadElementSibling = imgLoadElement.nextSibling as ImgElement;
        imgLoadElement.src = imgLoadElement.dataset.src;
        // imgLoadElement.src = "https://wwww.a.b/img";
        //等待图片加载完成
        imgLoadElement.onload = () => {
          imgLoadElement.style.transition = "opacity 2s ease-in-out";
          imgLoadElement.style.opacity = "1";

          imgLoadElementSibling.style.transition = "opacity 1s ease-in-out";
          imgLoadElementSibling.style.opacity = "0";

          setTimeout(() => {
            imgLoadElementSibling.style.display = "none";
          }, 1000);
        };

        //如果图片加载出错
        imgLoadElement.onerror = () => {
          imgLoadElement.src = "../../static/images/imgBack.svg";
        };

        observer.unobserve(imgLoadElement);
      }
    });
  },
  { threshold: 0.1 },
);
export const observerImgHook = (
  pageParamsPage: number,
  pageParamsPageSize: number,
  lazyImage: any,
) => {
  const startIndex = (pageParamsPage - 1) * pageParamsPageSize;
  const endIndex = pageParamsPageSize * pageParamsPage;
  console.log(startIndex, endIndex);

  for (let i = startIndex; i < endIndex; i++) {
    console.log(lazyImage.value[i]);
    observer.observe(lazyImage.value[i]);
  }
};
// #endif
