import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgBrowser = (props: SvgProps) => (
  <Svg viewBox="0 0 21 20" fill="none" {...props}>
    <Path
      fill={props.fill || '#fff'}
      fillRule="evenodd"
      d="M3.996 6.407a.996.996 0 0 1-.446.88A6.975 6.975 0 0 0 3.005 10a6.997 6.997 0 0 0 7 7 6.997 6.997 0 0 0 7-7c0-.957-.191-1.869-.539-2.7A1 1 0 0 1 16 6.384 6.996 6.996 0 0 0 10.005 3a6.996 6.996 0 0 0-6.009 3.407Zm-2.008-.5a9 9 0 1 1 16.035 8.185A9 9 0 0 1 1.988 5.908Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.fill || '#fff'}
      fillRule="evenodd"
      d="M6.04 8.629c-1.466-.293-2.722-.752-3.603-1.347l-.023-.016-.142-.108a1 1 0 0 1 1.213-1.59l.095.072c.59.392 1.517.745 2.681.993a14.1 14.1 0 0 1 .679-2.641c.296-.79.672-1.498 1.141-2.027C8.55 1.437 9.194 1 9.997 1c.803 0 1.448.437 1.916.965.47.53.846 1.238 1.142 2.027.288.768.518 1.662.679 2.64 1.179-.25 2.115-.61 2.703-1.007l.254-.171h.487a1 1 0 0 1 .12 1.992c-.86.516-2.015.917-3.343 1.183a22.238 22.238 0 0 1-.032 3.19c1.45.286 2.696.735 3.579 1.316a1 1 0 1 1-1.1 1.67c-.604-.397-1.555-.753-2.746-1a13.523 13.523 0 0 1-.601 2.203c-.296.79-.673 1.498-1.142 2.027-.468.527-1.113.965-1.916.965-.803 0-1.448-.438-1.916-.965-.469-.53-.845-1.238-1.141-2.027a13.531 13.531 0 0 1-.602-2.203c-1.185.245-2.132.599-2.737.995a1 1 0 1 1-1.094-1.675c.882-.576 2.123-1.021 3.565-1.307a22.035 22.035 0 0 1-.033-3.19Zm2.2-1.705c.141-.85.338-1.604.572-2.23.247-.658.517-1.121.766-1.402.25-.282.394-.292.42-.292.025 0 .169.01.419.292.249.28.518.744.765 1.402.235.626.431 1.38.573 2.23A19.96 19.96 0 0 1 9.997 7a20.1 20.1 0 0 1-1.757-.076Zm-.184 4.614a20.1 20.1 0 0 1-.03-2.626 21.95 21.95 0 0 0 3.943 0 20.406 20.406 0 0 1-.03 2.626 21.97 21.97 0 0 0-3.883 0Zm.265 1.985a11.5 11.5 0 0 0 .491 1.783c.247.658.517 1.121.766 1.402.25.282.394.292.42.292.025 0 .169-.01.419-.292.249-.28.518-.744.765-1.402.193-.514.36-1.115.492-1.783a20.027 20.027 0 0 0-3.353 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgBrowser;
