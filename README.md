# A React.js Weather App for the Met Éireann weather api

## Why I built it this way

-

## Technology used

- Met Éireann XML weather API
- Create React App
- react-bootstrap
- fast-xml-parser
- luxon dates library
- Chart.js
- react-chartjs-2
- chartjs-plugin-zoom
- Inkscape for SVG creation
- SVGR CLI for SVG web prep and React component conversion
- Google places API

## Lessons learned/ problems encountered

- Attempts to add a scrollbar tied to chart pan percentage failed. Successfully added slider control to pan chart at base zoom levels but as chart-plugin-zoom does not expose pan level, there was no way to tie current pan position back to the slider when panning directly from the chart via touch or drag actions. [See the enhancement request: How to get the pan distance/level #627](https://github.com/chartjs/chartjs-plugin-zoom/issues/627).
- Png sprite sheets didn't scale nicely. After some attempts at svg sprite sheets with symbols not rendering, found SVGR CLI to batch transform invidividual icons into React components.
- Ran into ID collision caused by the icon set I built off of using linear gradients. Accordians would hide parts of svgs in later components when collapsed...Changed all linear gradients to flat solved the render issues.

CLI script:

```
npx @svgr/cli --out-dir ./icons2optimized --no-dimensions ./icons2 --svg-props viewBox="0 0 96 96"
```

## Installation

## Available scripts

## Credits

Weather icons built off of the [Free-Weather-Icons design file](https://dribbble.com/shots/3761552-Free-Weather-Icons) by Alexey Onufriev
