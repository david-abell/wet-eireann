import * as React from "react";

const SvgSun = (props) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="url(#Sun_svg__c)"
      d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456"
      style={{
        fill: "#fdb727",
        fillOpacity: 1,
      }}
      transform="matrix(1.33333 0 0 -1.33333 -1173.141 572.54)"
      clipPath="url(#Sun_svg__a)"
    />
    <path
      fill="none"
      d="M0 0h96v96H0z"
      opacity={0.997}
      paintOrder="stroke fill markers"
    />
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse" id="Sun_svg__a">
        <path
          d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456"
          style={{
            strokeWidth: 1,
          }}
        />
      </clipPath>
    </defs>
  </svg>
);

export default SvgSun;
