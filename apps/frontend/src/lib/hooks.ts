import { ForwardedRef, useRef } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useState } from "react";

type Cleanup = void | (() => void);
export type Size = { width: number; height: number };
export type Position = { x: number; y: number };
export type Intersection = {
  intersectionRatio: number;
  isIntersecting: boolean;
  offsetBoundingRect: DOMRectReadOnly;
};
type IntersectionOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};
type VisibleScroll = {
  offsetBoundingRect: DOMRectReadOnly;
  x: number;
  y: number;
};

export function runCleanup(cleanup: Cleanup) {
  if (cleanup instanceof Function) {
    cleanup();
  }
}

export function windowSizeEffect(
  effect: (width: number, height: number) => Cleanup
): () => void {
  let cleanup: Cleanup;
  const onResize = () => {
    runCleanup(cleanup);
    cleanup = effect(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);
  onResize();
  return () => {
    runCleanup(cleanup);
    window.removeEventListener("resize", onResize);
  };
}

// Always pass in a callback made with useCallback!
export function useWindowSizeEffect(
  effect: (width: number, height: number) => Cleanup,
  deps: any[]
) {
  useEffect(() => windowSizeEffect(effect), deps);
}

export function useWindowSize(): Size | undefined {
  const [windowSize, setWindowSize] = useState<Size>();
  useWindowSizeEffect((width, height) => setWindowSize({ width, height }), []);
  return windowSize;
}

export function windowScrollEffect(
  effect: (x: number, y: number) => Cleanup
): () => void {
  let cleanup: Cleanup;
  const onScroll = () => {
    runCleanup(cleanup);
    cleanup = effect(window.scrollX, window.scrollY);
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
  return () => {
    runCleanup(cleanup);
    document.removeEventListener("scroll", onScroll);
  };
}

// Always pass in a callback made with usecallback!
export function useWindowScrollEffect(
  effect: (x: number, y: number) => Cleanup,
  deps: any[]
) {
  useEffect(() => windowScrollEffect(effect), deps);
}

export function useWindowScroll(): Position | undefined {
  const [scroll, setScroll] = useState<Position>();
  useWindowScrollEffect((x, y) => setScroll({ x, y }), []);
  return scroll;
}

export function animationFrameEffect(effect: () => Cleanup): () => void {
  let cleanup: Cleanup;
  const frameId = window.requestAnimationFrame(() => {
    runCleanup(cleanup);
    cleanup = effect();
  });
  return () => {
    runCleanup(cleanup);
    window.cancelAnimationFrame(frameId);
  };
}

// cb should be created with useCallback
export function useAnimationFrameEffect(effect: () => Cleanup, deps: any[]) {
  useEffect(() => animationFrameEffect(effect), deps);
}

export function intersectionObserverEffect(
  element: RefObject<Element>,
  effect: (intersection: Intersection) => Cleanup,
  options?: IntersectionOptions
): () => void {
  let cleanup: Cleanup;
  const observer = new IntersectionObserver(
    (entries) => {
      runCleanup(cleanup);
      const boundingRect = entries[0].boundingClientRect;
      const top = boundingRect.top + window.scrollY;
      const left = boundingRect.left + window.scrollX;

      cleanup = effect({
        intersectionRatio: entries[0].intersectionRatio,
        isIntersecting: entries[0].isIntersecting,
        offsetBoundingRect: new DOMRectReadOnly(
          left,
          top,
          boundingRect.width,
          boundingRect.height
        ),
      });
    },
    {
      root: null,
      rootMargin: options?.rootMargin,
      threshold: options?.threshold,
    }
  );
  if (element?.current) {
    observer.observe(element.current);
  }
  return () => {
    runCleanup(cleanup);
    observer.disconnect();
  };
}

// ensure that usecallback is passed in!
export function useIntersectionEffect(
  element: RefObject<Element>,
  effect: (intersection: Intersection) => void,
  deps: any[],
  options?: IntersectionOptions
) {
  const { rootMargin, threshold } = options ?? {
    rootMargin: undefined,
    threshold: undefined,
  };
  useEffect(
    () =>
      intersectionObserverEffect(element, effect, { rootMargin, threshold }),
    [element, rootMargin, threshold, ...deps]
  );
}

export function useIntersection(
  element: RefObject<Element>,
  options?: IntersectionOptions
): Intersection | undefined {
  const [intersection, setIntersection] = useState<Intersection>();
  useIntersectionEffect(element, setIntersection, [], options);
  return intersection;
}

export function useVisibleScrollEffect(
  element: RefObject<Element>,
  effect: (offsetBoundingRect: DOMRectReadOnly, x: number, y: number) => void,
  deps: any[],
  options?: IntersectionOptions
) {
  useIntersectionEffect(
    element,
    (intersection) => {
      if (intersection.isIntersecting) {
        return windowScrollEffect(() =>
          effect(
            intersection.offsetBoundingRect,
            window.scrollX,
            window.scrollY
          )
        );
      }
    },
    deps,
    options
  );
}

export function useVisibleScroll(
  element: RefObject<Element>,
  options?: IntersectionOptions
) {
  const [visibleScroll, setVisibleScroll] = useState<VisibleScroll>();
  useVisibleScrollEffect(
    element,
    (offsetBoundingRect, x, y) =>
      setVisibleScroll({ offsetBoundingRect, x, y }),
    [],
    options
  );
  return visibleScroll;
}

export const useScroll = () => {
  const elRef = useRef<null | HTMLDivElement>(null);
  const executeScroll: any = () => elRef?.current?.scrollIntoView();

  return [executeScroll, elRef];
};

export const useForwardRef = <T>(
  ref: ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

export const useScrollDirection = (): "up" | "down" => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollPosition = 0;

    const handleScroll = (): void => {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollDirection;
};

export const useScrollBlock = () => {
  const scroll = useRef(false);

  const blockScroll = () => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style || scroll.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    html.style.position = "relative"; /* [1] */
    body.style.position = "relative"; /* [1] */
    html.style.overflow = "hidden"; /* [2] */
    body.style.overflow = "hidden"; /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scroll.current = true;
  };

  const allowScroll = () => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style || !scroll.current) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    scroll.current = false;
  };

  return [blockScroll, allowScroll];
};
