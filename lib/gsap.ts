'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { Draggable } from 'gsap/Draggable'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, Draggable, MotionPathPlugin)

export const motionAllowedQuery = '(prefers-reduced-motion: no-preference)'
export const finePointerQuery = '(hover: hover) and (pointer: fine)'
export const motionAndFinePointerQuery = `${motionAllowedQuery} and ${finePointerQuery}`

export { gsap, useGSAP, ScrollTrigger, Flip, Draggable, MotionPathPlugin }
