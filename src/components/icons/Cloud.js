import * as React from "react";

const SvgCloud = (props) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse" id="Cloud_svg__b">
        <path d="M922.177 544.87c-.053.001-.105.003-.159.003a8.288 8.288 0 0 1 0-16.575h20.6a6.696 6.696 0 0 1 0 13.393c-.023 0-.045-.004-.069-.004-.596 5.34-5.122 9.493-10.622 9.493-4.341 0-8.077-2.591-9.75-6.31" />
      </clipPath>
      <clipPath clipPathUnits="userSpaceOnUse" id="Cloud_svg__a">
        <path
          d="M-928.4 415.09H900.255V-528.3H-928.4Z"
          style={{
            strokeWidth: 0.999998,
          }}
        />
      </clipPath>
    </defs>
    <g
      transform="matrix(1.33333 0 0 -1.33333 64.726 72.292)"
      clipPath="url(#Cloud_svg__a)"
      style={{
        fill: "#eef0f5",
        fillOpacity: 1,
      }}
    >
      <path
        d="M0 0c5.889 0 10.664 4.774 10.664 10.664 0 5.889-4.775 10.664-10.664 10.664-.037 0-.072-.006-.109-.006-.949 8.504-8.158 15.116-16.915 15.116-6.915 0-12.864-4.125-15.528-10.048-.085.002-.168.006-.253.006-7.289 0-13.198-5.909-13.198-13.198C-46.003 5.909-40.094 0-32.805 0"
        style={{
          fill: "#eef0f5",
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "none",
        }}
      />
    </g>
    <g
      clipPath="url(#Cloud_svg__b)"
      style={{
        fill: "#d0e8f8",
        fillOpacity: 1,
      }}
      transform="matrix(1.33333 0 0 -1.33333 -1173.141 776.69)"
    >
      <g
        style={{
          fill: "#d0e8f8",
          fillOpacity: 1,
        }}
      >
        <path
          d="M922.177 544.87c-.053.001-.105.003-.159.003a8.288 8.288 0 0 1 0-16.575h20.6a6.696 6.696 0 0 1 0 13.393c-.023 0-.045-.004-.069-.004-.596 5.34-5.122 9.493-10.622 9.493-4.341 0-8.077-2.591-9.75-6.31"
          style={{
            fill: "#d0e8f8",
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
      transform="matrix(1.33333 0 0 1.33333 0 969.85)"
      d="M0-727.388h72v72H0z"
    />
    <path
      style={{
        opacity: 0.996721,
        fill: "none",
        stroke: "none",
        strokeWidth: 0.878738,
        strokeLinejoin: "round",
        paintOrder: "stroke fill markers",
      }}
      transform="matrix(1.33333 0 0 1.33333 0 969.85)"
      d="M0-727.388h72v72H0z"
    />
  </svg>
);

export default SvgCloud;
