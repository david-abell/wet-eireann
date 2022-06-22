import * as React from "react";

const SvgSun = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 96 96"
    {...props}
  >
    <defs>
      <linearGradient
        id="Sun_svg__a"
        x2={1}
        gradientTransform="scale(40.91009 -40.91009) rotate(-45 -.164 -31.228)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#fdb727" />
        <stop offset={1} stopColor="#ffce22" />
      </linearGradient>
      <linearGradient
        id="Sun_svg__c"
        x2={1}
        gradientTransform="scale(40.91009 -40.91009) rotate(-45 -.164 -31.228)"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#Sun_svg__a"
      />
      <clipPath id="Sun_svg__b">
        <path d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456" />
      </clipPath>
    </defs>
    <g
      clipPath="url(#Sun_svg__b)"
      transform="matrix(1.33333 0 0 -1.33333 -1173.141 572.54)"
    >
      <path
        fill="url(#Sun_svg__c)"
        d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456"
      />
    </g>
    <path
      fill="none"
      d="M.004.001h96v96h-96z"
      paintOrder="stroke fill markers"
    />
  </svg>
);

export default SvgSun;
