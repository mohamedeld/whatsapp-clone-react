import React from 'react'
import { AttachmentIcon } from '../../../../svgandicons/svg'

export default function Attachement() {
  return (
    <li className="relative">
      <button type='button' className='btn'>
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
    </li>
  )
}
