import * as React from "react";
import * as lottie from "lottie-web";

const Loader = (props) => {
  let loaderWrapper = null;
  let anim;

  React.useEffect(() => {
    let animData = {
      wrapper: loaderWrapper,
      animType: "svg",
      loop: typeof props.loop != "undefined" ? props.loop : true,
      prerender: true,
      autoplay: typeof props.autoplay != "undefined" ? props.autoplay : true,
      animationData: props.animationData
    };
    // @ts-ignore
    anim = lottie.loadAnimation(animData);
    anim.setSpeed(props.speed || 1);

    anim.goToAndPlay(props.startIndex ? props.startIndex : 0);
    return function cleanup() {
      anim.destroy();
    };
  }, [props.animationData]);

  return (
    <div style={{width: '100px' }} ref={image => (loaderWrapper = image)} id="loader" />
  );
};

export default Loader;
