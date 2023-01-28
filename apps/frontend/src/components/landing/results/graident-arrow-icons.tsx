interface UpArrowIconsProps {}

export const UpArrowIcon: React.FC<UpArrowIconsProps> = ({}) => {
  return (
    <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.17589 11.8236L11.1425 1.85697M11.1425 1.85697L21.1092 11.8236M11.1425 1.85697L11.1432 37.1426"
        stroke="url(#paint0_linear_3812_1898)"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3812_1898"
          x1="-11.9808"
          y1="12.0557"
          x2="5.83408"
          y2="-4.90572"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#70FCEB" />
          <stop offset="0.483161" stopColor="#9BB8FF" />
          <stop offset="0.901042" stopColor="#B794FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const DownArrowIcon = () => {
  return (
    <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.17589 26.1759L11.1425 36.1425M11.1425 36.1425L21.1092 26.1759M11.1425 36.1425L11.1432 0.856959"
        stroke="url(#paint0_linear_3812_1904)"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3812_1904"
          x1="-11.9808"
          y1="25.9438"
          x2="5.83408"
          y2="42.9052"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#70FCEB" />
          <stop offset="0.483161" stopColor="#9BB8FF" />
          <stop offset="0.901042" stopColor="#B794FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
