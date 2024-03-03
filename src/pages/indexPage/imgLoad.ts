import { h, defineAsyncComponent, defineComponent, onMounted } from "vue";
import type { AsyncComponentLoader, Component } from "vue";

type ComponentResolver = (component: Component) => void;

export const lazyLoadComponentIfVisible = ({
  componentLoader,
  loadingComponent,
  goodRef,
  errorComponent,
  delay,
  timeout,
}: {
  componentLoader: AsyncComponentLoader;
  loadingComponent: Component;
  goodref: Component;
  errorComponent?: Component;
  delay?: number;
  timeout?: number;
}) => {
  let resolveComponent: ComponentResolver;

  return defineAsyncComponent({
    // the loader function
    loader: () => {
      return new Promise((resolve) => {
        // if (!("IntersectionObserver" in window)) {
        // 	console.log("不支持observer");
        // 	await loadComponent();
        // 	return;
        // }
        const observer = new IntersectionObserver(async (entries) => {
          if (!entries[0].isIntersecting) {
            console.log("没有出现在视口中一次");
            console.log(entries[0].isIntersecting);
            return;
          }
          console.log("出现在视口中一次");
          await loadComponent();
        });

        goodRef.value.forEach((good) => {
          observer.observe(good);
        });

        async function loadComponent() {
          const component = await componentLoader();
          console.log("imgresolve", component);
          resolve(component);
        }
      });
    },
    // A component to use while the async component is loading
    loadingComponent: defineComponent({
      setup() {
        onMounted(async () => {});
        return () => {
          return h("div", loadingComponent);
        };
      },
    }),
    // Delay before showing the loading component. Default: 200ms.
    delay: 200,
    // A component to use if the load fails
    errorComponent,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout,
  });
};
