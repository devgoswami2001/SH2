
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      screens: {
        '3xl': '1920px',
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'hover-glow-effect': {
          '0%': { boxShadow: '0 0 15px 5px hsl(var(--primary)/0.2)', opacity: '0.5', transform: 'scale(1)' },
          '100%': { boxShadow: '0 0 30px 10px hsl(var(--primary)/0.4)', opacity: '0.85', transform: 'scale(1.03)' },
        },
        'card-enter': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'swipe-left': {
          '0%': { opacity: '1', transform: 'translateX(0) rotate(0)' },
          '100%': { opacity: '0', transform: 'translateX(-150%) rotate(-15deg)' },
        },
        'swipe-right': {
          '0%': { opacity: '1', transform: 'translateX(0) rotate(0)' },
          '100%': { opacity: '0', transform: 'translateX(150%) rotate(15deg)' },
        },
        'feedback-fade': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '20%': { opacity: '1', transform: 'scale(1.1)' },
          '80%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
         pulse_slow: { /* Renamed from just 'pulse' to be more specific */
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        pulse_fast: { /* Added for faster pulse effect */
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'hover-glow-effect': 'hover-glow-effect 0.4s ease-out forwards',
        'card-enter': 'card-enter 0.5s ease-out forwards',
        'swipe-left': 'swipe-left 0.5s ease-in forwards',
        'swipe-right': 'swipe-right 0.5s ease-in forwards',
        'feedback-fade': 'feedback-fade 0.5s ease-in-out forwards',
        'pulse_slow': 'pulse_slow 3s infinite ease-in-out',
        'pulse_fast': 'pulse_fast 1.5s infinite ease-in-out',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
