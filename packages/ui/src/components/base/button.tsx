"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-light leading-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-black/5 hover:text-accent-foreground",
        glass:
          "bg-white/10 text-primary-foreground shadow-lg backdrop-blur-sm",
        white: "bg-white text-black shadow-lg",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-4 py-2 text-xs has-[>svg]:px-3",
        default: "px-6 py-3 has-[>svg]:px-5",
        lg: "px-8 py-4 text-base has-[>svg]:px-7",
        icon: "size-9",
      },
      shadow: {
        none: "shadow-none",
        xs: "shadow-xs",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface Ripple {
  id: number
  x: number
  y: number
}

function Button({
  className,
  variant,
  size,
  shadow = "none",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const rippleIdRef = React.useRef(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = rippleIdRef.current++

    // Replace previous ripple to prevent overlap
    setRipples([{ id, x, y }])

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 400)

    // Call original onMouseDown if provided
    if (props.onMouseDown) {
      props.onMouseDown(e)
    }
  }

  return (
    <>
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(5);
            opacity: 0;
          }
        }
        
        .ripple {
          animation: ripple 0.4s ease-in forwards;
        }
      `}</style>
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, shadow, className }))}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple pointer-events-none absolute rounded-full z-0"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "40px",
              height: "40px",
              transform: "translate(-50%, -50%)",
              backgroundColor: "currentColor",
              opacity: 0.18,
            }}
          />
        ))}
      </Comp>
    </>
  )
}

export { Button, buttonVariants }
