type AnimatableSVGElement =
  | SVGPathElement
  | SVGLineElement
  | SVGPolygonElement
  | SVGPolylineElement
  | SVGCircleElement
  | SVGEllipseElement
  | SVGRectElement;

export type SVGLineAnimationProps = {
  /* Animatable SVG Element to target */
  element: AnimatableSVGElement;
  /* CSS transition timing function 
  this allows for any string to be passed, but you have to respect the CSS Property syntax for it
  read more here: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#syntax
  */
  easing?:
    | "ease"
    | "linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "step-start"
    | "step-end"
    | CSSStyleDeclaration["transitionTimingFunction"];
  /* transition duration in seconds */
  duration?: number;
};

const animate = ({
  element,
  easing = "ease",
  duration = 2,
}: SVGLineAnimationProps): Promise<void> => {
  const offsetAttrName = "stroke-dashoffset";
  const lineLength = element.getTotalLength();
  element.setAttribute("stroke-dasharray", `${lineLength}`);
  element.setAttribute(offsetAttrName, `${lineLength}`);
  return new Promise((resolve) => {
    const pathLength: number = element.getTotalLength();
    element.setAttribute("stroke-dasharray", `${pathLength}`);
    element.setAttribute(offsetAttrName, `${pathLength}`);
    element.getBoundingClientRect();
    element.style.transition = `${offsetAttrName} ${duration}s ${easing}`;

    const isTransitionEvent = (event: Event): event is TransitionEvent => {
      return "propertyName" in event;
    };

    const handleEvent = (evt: Event): void => {
      if (isTransitionEvent(evt) && evt.propertyName === offsetAttrName) {
        element.removeEventListener("transitionend", handleEvent);
        resolve();
      }
    };

    element.addEventListener("transitionend", handleEvent);
    element.setAttribute(offsetAttrName, `0`);
  });
};

export default animate;
