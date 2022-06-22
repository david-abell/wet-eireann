import * as React from "react";

const SvgLightCloud = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 96 96"
    {...props}
  >
    <defs>
      <linearGradient
        id="LightCloud_svg__a"
        x2={1}
        gradientTransform="scale(40.91009 -40.91009) rotate(-45 -.164 -31.228)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#fdb727" />
        <stop offset={1} stopColor="#ffce22" />
      </linearGradient>
      <linearGradient
        id="LightCloud_svg__c"
        x2={1}
        gradientTransform="scale(40.91009 -40.91009) rotate(-45 -.164 -31.228)"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#LightCloud_svg__a"
      />
      <clipPath id="LightCloud_svg__b">
        <path d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456" />
      </clipPath>
      <clipPath id="LightCloud_svg__d">
        <path d="M770.609 244.823c-.052.001-.105.004-.159.004a8.288 8.288 0 0 1 0-16.575h20.6a6.696 6.696 0 1 1 0 13.393c-.023 0-.045-.004-.069-.004-.596 5.34-5.122 9.492-10.621 9.492-4.343 0-8.078-2.591-9.751-6.31" />
      </clipPath>
    </defs>
    <g
      clipPath="url(#LightCloud_svg__b)"
      transform="matrix(1.33333 0 0 -1.33333 -1173.141 572.54)"
    >
      <path
        fill="url(#LightCloud_svg__c)"
        d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456"
      />
    </g>
    <path fill="none" d="M0-.003h96v96H0z" paintOrder="stroke fill markers" />
    <g
      fill="#fff"
      clipPath="url(#LightCloud_svg__d)"
      transform="matrix(1.33333 0 0 -1.33333 -975.939 376.59)"
    >
      <path d="M770.609 244.823c-.052.001-.105.004-.159.004a8.288 8.288 0 0 1 0-16.575h20.6a6.696 6.696 0 1 1 0 13.393c-.023 0-.045-.004-.069-.004-.596 5.34-5.122 9.492-10.621 9.492-4.343 0-8.078-2.591-9.751-6.31" />
    </g>
  </svg>
);

export default SvgLightCloud;
