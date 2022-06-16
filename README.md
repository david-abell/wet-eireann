# A React.js Weather App for the Met Éireann weather api

## Why I built it this way

-

## Technology used

- Create React App
- react-bootstrap
- fast-xml-parser
- luxon dates library
- Chart.js
- react-chartjs-2
- chartjs-plugin-zoom

## Lessons learned/ problems encountered

- Attempts to add a scrollbar tied to chart pan percentage failed. Successfully added slider control to pan chart at base zoom levels but as chart-plugin-zoom does not expose pan level, there was no way to tie current pan position back to the slider when panning directly from the chart via touch or drag actions. [See the enhancement request: How to get the pan distance/level #627](https://github.com/chartjs/chartjs-plugin-zoom/issues/627).

## Installation

## Available scripts

## Credits
