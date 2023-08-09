import Svg, { Path, SvgProps } from 'react-native-svg';
const SvgEtherscan = (props: SvgProps) => (
  <Svg viewBox="0 0 17 17" fill="none" {...props}>
    <Path
      fill={props.fill || '#fff'}
      d="M4.253 7.004a.633.633 0 0 0-.63.63v3.97a.526.526 0 0 1-.47.533 13.85 13.85 0 0 1-.753.074.93.93 0 0 1-.903-.47 6.968 6.968 0 0 1-.58-1.273c-1.36-3.91.717-8.189 4.622-9.55 3.906-1.36 8.181.718 9.541 4.627.124.346.062.717-.16 1.002-.742.965-1.682 1.769-2.597 2.436v-4.54a.636.636 0 0 0-.63-.643H10.63a.644.644 0 0 0-.63.644v5.504a.528.528 0 0 1-.322.495c-.26.11-.519.222-.519.222V6.051a.646.646 0 0 0-.643-.643H7.454a.647.647 0 0 0-.643.643v4.972a.542.542 0 0 1-.408.52 5.808 5.808 0 0 0-.445.112V7.647a.646.646 0 0 0-.643-.643H4.253Zm9.812 5.406a7.488 7.488 0 0 1-10.467 1.657c4.09-.582 9.145-2.499 11.876-6.593l.002.025c.011.165.023.33.023.495a7.564 7.564 0 0 1-1.434 4.415Z"
    />
  </Svg>
);
export default SvgEtherscan;
