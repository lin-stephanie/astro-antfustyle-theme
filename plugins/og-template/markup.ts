import { html } from 'satori-html'
import backgroundBase64 from './base64'
import type { BgType } from '../../src/types'

export const ogImageMarkup = (
  authorOrBrand: string,
  title: string,
  bgType: BgType
) => {
  if (!['plum', 'dot', 'rose', 'particle'].includes(bgType))
    throw new Error(
      "The value of 'bgType' must be one of the following: 'plum', 'dot', 'rose', 'particle'."
    )

  return html`<div
    tw="relative flex justify-center items-center w-full h-full"
    style="font-family: 'Inter'"
  >
    <img
      tw="absolute inset-0 w-full h-full"
      src=${backgroundBase64[bgType]}
      alt="open graph"
    />

    <div tw="flex items-center justify-start w-full px-18" style="gap: 20px">
      <div tw="self-start flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7.5em"
          height="7.5em"
          viewBox="0 0 32 32"
        >
          <path
            fill="url(#vscodeIconsFileTypeAstro0)"
            d="M11.025 20.499c-.532 1.75-.154 4.184 1.105 5.331v-.042l.042-.112c.154-.741.756-1.203 1.526-1.175c.713.014 1.12.392 1.217 1.217c.042.308.042.616.056.938v.098c0 .7.196 1.371.588 1.959c.35.56.84.993 1.497 1.287l-.028-.056l-.028-.112c-.49-1.469-.14-2.49 1.147-3.358l.392-.266l.868-.573a4.25 4.25 0 0 0 1.791-3.037c.07-.532 0-1.05-.154-1.553l-.21.14c-1.945 1.035-4.17 1.4-6.325.98c-1.301-.197-2.56-.56-3.498-1.652z"
          ></path>
          <path
            fill="#fff"
            d="M4.925 20.191s3.736-1.82 7.486-1.82l2.84-8.759c.098-.42.406-.7.756-.7s.644.28.756.714l2.826 8.746c4.45 0 7.487 1.82 7.487 1.82L20.709 2.84c-.168-.518-.49-.84-.896-.84h-7.612c-.406 0-.7.322-.896.84z"
          ></path>
          <defs>
            <linearGradient
              id="vscodeIconsFileTypeAstro0"
              x1="8.19"
              x2="16.91"
              y1="23"
              y2="18.89"
              gradientTransform="translate(-.673 -2.198)scale(1.3993)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#d83333"></stop>
              <stop offset="1" stop-color="#f041ff"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div tw="flex flex-col" style="gap: 10px">
        <div tw="text-[#858585] text-2.1rem">${authorOrBrand}</div>
        <div tw="text-white text-3.1rem leading-relaxed mr-18">${title}</div>
      </div>
    </div>
  </div>`
}
