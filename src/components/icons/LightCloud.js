import * as React from "react";

const SvgLightCloud = (props) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse" id="LightCloud_svg__a">
        <path d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456" />
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse" id="LightCloud_svg__b">
        <path d="M770.609 244.823c-.052.001-.105.004-.159.004a8.288 8.288 0 0 1 0-16.575h20.6a6.696 6.696 0 0 1 0 13.393c-.023 0-.045-.004-.069-.004-.596 5.34-5.122 9.492-10.621 9.492-4.343 0-8.078-2.591-9.751-6.31" />
      </clipPath>
    </defs>
    <g
      clipPath="url(#LightCloud_svg__a)"
      style={{
        fill: "#fec225",
        fillOpacity: 1,
      }}
      transform="matrix(1.33333 0 0 -1.33333 -1173.141 572.54)"
    >
      <g
        style={{
          fill: "#fec225",
          fillOpacity: 1,
        }}
      >
        <path
          d="M895.401 393.404c0-11.296 9.157-20.454 20.455-20.454 11.297 0 20.455 9.158 20.455 20.454 0 11.298-9.158 20.456-20.455 20.456-11.298 0-20.455-9.158-20.455-20.456"
          style={{
            fill: "#fec225",
            stroke: "none",
            fillOpacity: 1,
          }}
        />
      </g>
    </g>
    <path
      style={{
        opacity: 0.996721,
        fill: "none",
        stroke: "none",
        strokeWidth: 0.878738,
        strokeLinejoin: "round",
        paintOrder: "stroke fill markers",
      }}
      transform="matrix(1.33333 0 0 1.33333 -96 1257.85)"
      d="M72-943.388h72v72H72z"
    />
    <g
      clipPath="url(#LightCloud_svg__b)"
      transform="matrix(1.33333 0 0 -1.33333 -975.939 376.59)"
      style={{
        fill: "#dcecf9",
        fillOpacity: 1,
      }}
    >
      <g
        style={{
          fill: "#dcecf9",
          fillOpacity: 1,
        }}
      >
        <path
          d="M770.609 244.823c-.052.001-.105.004-.159.004a8.288 8.288 0 0 1 0-16.575h20.6a6.696 6.696 0 0 1 0 13.393c-.023 0-.045-.004-.069-.004-.596 5.34-5.122 9.492-10.621 9.492-4.343 0-8.078-2.591-9.751-6.31"
          style={{
            fill: "#dcecf9",
            fillOpacity: 1,
            stroke: "none",
          }}
        />
      </g>
    </g>
  </svg>
);

export default SvgLightCloud;
