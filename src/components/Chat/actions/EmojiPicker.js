import React from 'react'
import { CloseIcon, EmojiIcon } from '../../../svgandicons/svg'

export default function EmojiPicker() {
  return (
    <li>
      <button
        className="btn"
        type="button">
          <EmojiIcon className="dark:fill-dark_svg_1"/>
          {/* <CloseIcon className="dark:fill-dark_svg_1"/> */}
        </button>
    </li>
  )
}
