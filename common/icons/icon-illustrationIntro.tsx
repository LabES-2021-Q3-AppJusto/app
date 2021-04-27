import * as React from 'react';
import Svg, { Circle, G, Mask, Path, SvgProps } from 'react-native-svg';

export const IconIllustrationIntro = (props: SvgProps) => {
  return (
    <Svg width={200} height={200} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={82.5} cy={105.5} r={66.5} fill="#6CE787" />
      <Path
        d="M152.392 58.807l17.846 34.403c.431.83.16 1.85-.625 2.358l-90.26 58.363-23.887-33.993 95.631-61.476a.907.907 0 011.295.345z"
        fill="#FFE493"
        stroke="#000"
        strokeWidth={1.6}
      />
      <Path
        d="M40.63 97.287l86.065-53.693a1.813 1.813 0 011.909-.006l22.112 13.587a.907.907 0 01.022 1.531l-94.583 61.921-16-20.693a1.813 1.813 0 01.475-2.647z"
        fill="#FFE493"
        stroke="#000"
        strokeWidth={1.6}
      />
      <Path
        d="M45.582 113.259l-5.622-13.118c-.084-.197.181-.352.31-.182l15.656 20.439 22.725 32.85c.111.16-.074.359-.241.259l-6.603-3.92a.187.187 0 01-.055-.05l-26.15-36.243a.195.195 0 01-.02-.035z"
        fill="#FFE493"
        stroke="#000"
        strokeWidth={1.6}
      />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={16} y={39} width={133} height={133}>
        <Circle cx={82.5} cy={105.5} r={66.5} fill="#6CE787" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Mask
          id="prefix__b"
          maskUnits="userSpaceOnUse"
          x={-32.607}
          y={93.605}
          width={147}
          height={121}
          fill="#000"
        >
          <Path fill="#fff" d="M-32.607 93.605h147v121h-147z" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-29.5 162.35c13.945-3.535 49.209-14.097 78.697-28.058 1.213-.955 4.178-4.143 6.335-9.254.66-1.564 1.18-3.089 1.681-4.564 1.55-4.552 2.934-8.62 7.78-11.823 3.068-2.028 6.914-3.833 10.666-5.594 4.096-1.922 8.08-3.791 10.816-5.84 5.243-3.925 7.789.18 6.069 3.16-.368.637-.598 1.2-.815 1.731-.797 1.952-1.413 3.461-8.025 6.543-3.457 1.611-4.202 3.027-3.817 4.122.67 1.907 3.353 1.788 5.35 1.481l7.982-1.225 8.806-1.346a4.373 4.373 0 003.124-2.136l3.251-5.63c1.356-1.204 3.999-2.459 3.72 2.147-.186 3.088-.443 5.421-.646 6.892-2.408 3.656-7.952 10.524-12.465 11.037.967.264 4.063-.211 8.708-4.222 1.957-1.691 3.077-3.097 3.672-4.211l.386 2.545c-1.575 4.333-4.926 11.339-8.832 12.877 1.003.004 3.871-1.256 7.319-6.332.866-1.276 1.472-2.377 1.88-3.319l.242 3.797a4.366 4.366 0 01-.306 1.908l-1.781 4.436a4.405 4.405 0 01-.271.557l-1.016 1.759c-.917 1.184-2.066 2.112-3.587 2.562.61.056 1.787-.537 2.881-1.338l-1.478 2.56a4.379 4.379 0 01-1.375 1.461l-9.64 6.371a4.392 4.392 0 01-1.586.647c-8.49 1.659-25.041 5.33-29.67 8.033-5.986 3.496-66.117 49.225-74.684 57.191L-29.5 162.35z"
          />
        </Mask>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-29.5 162.35c13.945-3.535 49.209-14.097 78.697-28.058 1.213-.955 4.178-4.143 6.335-9.254.66-1.564 1.18-3.089 1.681-4.564 1.55-4.552 2.934-8.62 7.78-11.823 3.068-2.028 6.914-3.833 10.666-5.594 4.096-1.922 8.08-3.791 10.816-5.84 5.243-3.925 7.789.18 6.069 3.16-.368.637-.598 1.2-.815 1.731-.797 1.952-1.413 3.461-8.025 6.543-3.457 1.611-4.202 3.027-3.817 4.122.67 1.907 3.353 1.788 5.35 1.481l7.982-1.225 8.806-1.346a4.373 4.373 0 003.124-2.136l3.251-5.63c1.356-1.204 3.999-2.459 3.72 2.147-.186 3.088-.443 5.421-.646 6.892-2.408 3.656-7.952 10.524-12.465 11.037.967.264 4.063-.211 8.708-4.222 1.957-1.691 3.077-3.097 3.672-4.211l.386 2.545c-1.575 4.333-4.926 11.339-8.832 12.877 1.003.004 3.871-1.256 7.319-6.332.866-1.276 1.472-2.377 1.88-3.319l.242 3.797a4.366 4.366 0 01-.306 1.908l-1.781 4.436a4.405 4.405 0 01-.271.557l-1.016 1.759c-.917 1.184-2.066 2.112-3.587 2.562.61.056 1.787-.537 2.881-1.338l-1.478 2.56a4.379 4.379 0 01-1.375 1.461l-9.64 6.371a4.392 4.392 0 01-1.586.647c-8.49 1.659-25.041 5.33-29.67 8.033-5.986 3.496-66.117 49.225-74.684 57.191L-29.5 162.35z"
          fill="#fff"
        />
        <Path
          d="M49.197 134.292l.99 1.257-.142.112-.163.077-.685-1.446zM-29.5 162.35l-1.487.589-.67-1.693 1.764-.447.393 1.551zm85.033-37.312l-1.474-.622 1.474.622zm1.681-4.564l1.515.515-1.515-.515zm7.78-11.823l-.882-1.335.882 1.335zm10.666-5.594l-.68-1.448.68 1.448zm10.816-5.84l-.959-1.28.96 1.28zm6.069 3.16l1.385.8-1.385-.8zm-.815 1.731l1.481.605-1.481-.605zm-8.025 6.543l.676 1.45-.676-1.45zm-3.817 4.122l1.51-.531-1.51.531zm5.35 1.481l.244 1.582-.243-1.582zm7.982-1.225l-.243-1.582h.001l.242 1.582zm8.806-1.346l-.242-1.582.242 1.582zm3.124-2.136l-1.385-.8 1.385.8zm3.251-5.63l-1.385-.8.129-.225.194-.172 1.062 1.197zm3.72 2.147l1.597.097-1.597-.097zm-.646 6.892l1.584.219-.049.359-.199.302-1.336-.88zM99.01 123.993l-.421 1.544.24-3.134.18 1.59zm8.708-4.222l1.045 1.211-1.045-1.211zm3.672-4.211l-1.412-.753 2.27-4.255.724 4.768-1.582.24zm.386 2.545l1.582-.24.061.403-.139.383-1.504-.546zm-8.832 12.877l-.007 1.6-.578-3.089.585 1.489zm7.319-6.332l1.323.899-1.323-.899zm1.88-3.319l-1.469-.636 3.065.534-1.596.102zm.242 3.797l1.597-.102-1.597.102zm-.306 1.908l-1.484-.596 1.484.596zm-1.781 4.436l1.485.597-1.485-.597zm-.271.557l-1.386-.8 1.386.8zm-1.016 1.759l1.386.8-.055.095-.066.086-1.265-.981zm-3.587 2.562l-.146 1.594-.308-3.128.454 1.534zm2.881-1.338l-.945-1.291 2.331 2.091-1.386-.8zm-1.478 2.56l1.386.8-1.386-.8zm-1.375 1.461l-.882-1.335.882 1.335zm-9.64 6.371l.882 1.335-.882-1.335zm-1.586.647l.307 1.571-.306-1.571zm-29.67 8.033l.807 1.381-.806-1.381zm-74.684 57.191l1.09 1.171-1.716 1.595-.862-2.177 1.488-.589zm60.011-75.537c-29.615 14.021-64.985 24.613-78.99 28.163l-.786-3.102c13.888-3.521 49.044-14.051 78.407-27.953l1.37 2.892zm7.124-10.078c-2.254 5.34-5.377 8.753-6.819 9.889l-1.98-2.514c.984-.775 3.79-3.737 5.851-8.619l2.948 1.244zm1.722-4.671c-.5 1.469-1.036 3.047-1.722 4.671l-2.948-1.244c.634-1.503 1.136-2.976 1.64-4.458l3.03 1.031zm7.148-11.004c-4.349 2.874-5.597 6.446-7.148 11.004l-3.03-1.031c1.548-4.545 3.069-9.11 8.413-12.642l1.765 2.669zm10.463-5.479c-3.78 1.774-7.512 3.529-10.463 5.479l-1.765-2.669c3.184-2.105 7.145-3.96 10.869-5.707l1.36 2.897zm11.095-6.008c-2.896 2.169-7.052 4.111-11.095 6.008l-1.36-2.897c4.15-1.947 7.961-3.744 10.537-5.673l1.918 2.562zm3.724 1.079c.57-.989.277-1.854-.069-2.146-.217-.183-1.26-.727-3.655 1.067l-1.918-2.562c2.847-2.131 5.7-2.585 7.636-.952 1.807 1.525 1.927 4.201.777 6.193l-2.77-1.6zm-.91 1.926c.216-.53.482-1.185.91-1.926l2.771 1.6c-.307.532-.502 1.004-.719 1.536l-2.962-1.21zm-7.22 5.697c3.264-1.521 4.886-2.584 5.778-3.415.814-.759 1.062-1.351 1.442-2.282l2.962 1.21c-.417 1.021-.876 2.159-2.222 3.413-1.268 1.182-3.26 2.414-6.608 3.975l-1.352-2.901zm-4.65 6.104c-.414-1.175-.113-2.378.742-3.416.793-.962 2.095-1.842 3.908-2.688l1.352 2.901c-1.644.766-2.443 1.4-2.79 1.822-.162.196-.19.304-.194.32-.001.004-.002-.007 0-.001l-3.019 1.062zm7.103 2.532c-1.037.159-2.417.3-3.684.085-1.283-.217-2.81-.881-3.42-2.617l3.02-1.062c.06.171.21.401.935.525.741.125 1.702.054 2.663-.094l.486 3.163zm7.98-1.226l-7.98 1.226-.486-3.163 7.981-1.226.486 3.163zm8.805-1.346l-8.805 1.346-.484-3.163 8.806-1.346.483 3.163zm4.269-2.917a5.97 5.97 0 01-4.269 2.917l-.483-3.163a2.772 2.772 0 001.981-1.354l2.771 1.6zm3.251-5.63l-3.251 5.63-2.771-1.6 3.251-5.63 2.771 1.6zm.737 1.251c.064-1.047-.06-1.529-.135-1.696-.029-.064-.027-.029.044.027a.474.474 0 00.219.097c.063.009-.04-.018-.348.135a3.996 3.996 0 00-.841.582l-2.124-2.393a7.19 7.19 0 011.545-1.057c.559-.277 1.354-.556 2.213-.436.998.14 1.78.775 2.211 1.733.384.856.486 1.945.41 3.201l-3.194-.193zm-.634 6.768c.197-1.427.45-3.719.634-6.768l3.194.193c-.189 3.125-.449 5.5-.659 7.014l-3.169-.439zm-11.06 9.667c.786-.089 1.739-.476 2.822-1.179 1.07-.694 2.175-1.635 3.252-2.706 2.155-2.142 4.075-4.682 5.234-6.442l2.673 1.76c-1.248 1.895-3.304 4.618-5.651 6.952-1.174 1.167-2.452 2.268-3.766 3.121-1.301.843-2.734 1.507-4.204 1.674l-.36-3.18zm9.933-1.421c-2.427 2.097-4.513 3.324-6.187 3.99-1.602.637-3.01.831-3.987.565l.842-3.088c-.01-.002.614.086 1.962-.451 1.278-.508 3.062-1.524 5.279-3.438l2.091 2.422zm4.038-4.669c-.717 1.344-1.988 2.899-4.038 4.669l-2.091-2.422c1.866-1.611 2.834-2.869 3.306-3.753l2.823 1.506zm-2.607 2.032l-.386-2.545 3.164-.48.386 2.545-3.164.48zm-7.835 11.148c1.428-.563 3.01-2.287 4.511-4.737 1.45-2.367 2.639-5.097 3.402-7.198l3.008 1.093c-.812 2.233-2.086 5.173-3.681 7.777-1.545 2.521-3.592 5.068-6.069 6.043l-1.171-2.978zm9.227-3.944c-1.802 2.653-3.499 4.378-4.943 5.455-1.383 1.03-2.693 1.582-3.706 1.578l.015-3.2c-.01 0 .615-.076 1.779-.944 1.102-.821 2.563-2.264 4.208-4.687l2.647 1.798zm2.025-3.582c-.456 1.051-1.114 2.24-2.025 3.582l-2.647-1.798c.822-1.211 1.375-2.224 1.735-3.056l2.937 1.272zm-2.822 3.263l-.243-3.797 3.193-.204.243 3.797-3.193.204zm-.194 1.21a2.78 2.78 0 00.194-1.21l3.193-.204a5.969 5.969 0 01-.418 2.606l-2.969-1.192zm-1.782 4.436l1.782-4.436 2.969 1.192-1.781 4.437-2.97-1.193zm-.172.353c.066-.113.123-.231.172-.353l2.97 1.193a6.06 6.06 0 01-.37.76l-2.772-1.6zm-1.015 1.759l1.015-1.759 2.772 1.6-1.016 1.759-2.771-1.6zm2.65 1.781c-1.072 1.381-2.483 2.549-4.398 3.116l-.908-3.069c1.127-.333 2.013-1.023 2.777-2.008l2.529 1.961zm-4.705-.012c-.123-.011-.149.015-.028-.019a2.97 2.97 0 00.452-.18 8.883 8.883 0 001.365-.837l1.89 2.582c-.608.445-1.262.85-1.879 1.144-.534.254-1.324.567-2.093.497l.293-3.187zm-.129 2.015l1.477-2.56 2.772 1.6-1.478 2.56-2.771-1.6zm-.872.926a2.78 2.78 0 00.872-.926l2.771 1.6a5.959 5.959 0 01-1.879 1.995l-1.764-2.669zm-9.64 6.371l9.64-6.371 1.764 2.669-9.64 6.372-1.764-2.67zm-1.01.412a2.813 2.813 0 001.01-.412l1.764 2.67a6.027 6.027 0 01-2.16.883l-.614-3.141zm-30.17 8.221c1.32-.771 3.367-1.55 5.712-2.304 2.379-.764 5.183-1.537 8.089-2.273 5.814-1.472 12.104-2.811 16.369-3.644l.613 3.141c-4.225.825-10.455 2.151-16.197 3.605-2.871.727-5.604 1.482-7.895 2.218-2.326.747-4.083 1.44-5.078 2.02l-1.613-2.763zm-74.968 57.401c4.356-4.05 21.612-17.533 38.429-30.372 8.43-6.435 16.782-12.733 23.402-17.642 6.571-4.872 11.544-8.457 13.137-9.387l1.613 2.763c-1.4.818-6.189 4.26-12.844 9.195-6.605 4.897-14.944 11.186-23.366 17.615-16.887 12.892-33.98 26.256-38.192 30.171l-2.179-2.343zm-16.794-48.342l19.371 48.924-2.975 1.179-19.371-48.925 2.975-1.178z"
          fill="#000"
          mask="url(#prefix__b)"
        />
      </G>
    </Svg>
  );
};
