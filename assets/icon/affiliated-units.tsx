import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2a4 4 0 0 0-4 4H6.648a3 3 0 0 0-2.976 2.628l-1.25 10A3 3 0 0 0 5.398 22h13.204a3 3 0 0 0 2.976-3.372l-1.25-10A3 3 0 0 0 17.352 6H16a4 4 0 0 0-4-4Zm2 4a2 2 0 1 0-4 0h4Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
