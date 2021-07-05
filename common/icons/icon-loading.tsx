import * as React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

export const IconLoading = (props: SvgProps) => {
  return (
    <Svg width={80} height={80} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={40} cy={40} r={40} fill="#F6F6F6" />
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M51.228 18.246h-6.316V36.49h18.246V18.246h-5.614v5.614h-6.316v-5.614z"
          fill="#FFE493"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.877 61.053l5.263-7.72v-3.508l-2.105-3.158-4.913-.351-3.86 3.158.702 4.21 4.913 7.369zm0-7.018a2.105 2.105 0 100-4.21 2.105 2.105 0 000 4.21z"
          fill="#FFE493"
        />
        <Path
          d="M62.147 17.683H46.002a2.416 2.416 0 00-2.413 2.414V35.57a2.416 2.416 0 002.413 2.414h16.145a2.416 2.416 0 002.414-2.414V20.097a2.416 2.416 0 00-2.414-2.414zm-5.626 1.92v3.252l-.306-.174a.959.959 0 00-.984.019l-1.072.669-.994-.656a.967.967 0 00-1.004-.032l-.309.176v-3.255h4.669zm6.121 15.967a.495.495 0 01-.495.495H46.002a.495.495 0 01-.495-.495V20.097c0-.273.223-.495.495-.495h3.931v4.907c0 .721.806 1.192 1.435.833l1.232-.703 1.016.67c.31.205.721.21 1.036.014l1.109-.692 1.243.71c.629.36 1.436-.11 1.436-.832v-4.907h3.707c.273 0 .495.222.495.495V35.57z"
          fill="#000"
        />
        <Path
          d="M52.7 31.672h-3.613a.96.96 0 000 1.919h3.612a.96.96 0 000-1.92zm-2.18 9.369H23.481a6.131 6.131 0 01-6.124-6.124 6.131 6.131 0 016.125-6.124h12.33a.96.96 0 000-1.919h-12.33c-4.435 0-8.043 3.608-8.043 8.043 0 4.435 3.608 8.043 8.043 8.043H50.52a3.75 3.75 0 013.746 3.746 3.75 3.75 0 01-3.746 3.746h-7.502l.996-.995a.96.96 0 00-1.357-1.357l-2.633 2.633a.97.97 0 000 1.357l2.633 2.633c.37.37.987.37 1.357 0a.96.96 0 000-1.357l-.995-.995h7.501a5.671 5.671 0 005.665-5.665 5.671 5.671 0 00-5.665-5.665z"
          fill="#000"
        />
        <Path
          d="M30.849 45.3a6.606 6.606 0 00-6.599 6.6c0 1.358.423 2.75 1.237 3.846l4.591 6.19a.969.969 0 001.541 0l4.592-6.19c.815-1.095 1.237-2.489 1.237-3.847a6.606 6.606 0 00-6.599-6.599zm3.81 9.316l-.021.03-3.789 5.107-3.789-5.107c-.55-.834-.891-1.735-.891-2.747 0-2.58 2.1-4.68 4.68-4.68 2.58 0 4.68 2.1 4.68 4.68 0 .98-.3 1.92-.87 2.717z"
          fill="#000"
        />
        <Path
          d="M30.849 48.895a3.007 3.007 0 00-3.004 3.004 3.007 3.007 0 003.004 3.004 3.007 3.007 0 003.003-3.004 3.007 3.007 0 00-3.003-3.004zm0 4.09a1.086 1.086 0 010-2.17 1.086 1.086 0 010 2.17zM39.288 28.2a.967.967 0 001.253.52c.483-.2.72-.771.519-1.254a.968.968 0 00-1.253-.519.968.968 0 00-.52 1.253z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(15.438 15.439)" d="M0 0h49.123v49.123H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
