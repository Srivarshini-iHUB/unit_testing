/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		backgroundImage: {
  			'gradient-custom': 'linear-gradient(95.43deg, #173773 -9.13%, #2b68d9 99.32%)'
  		},
  		boxShadow: {
  			'custom-subtle': 'rgba(47, 107, 230, 0.08) 0px 7px 29px 0px'
  		},
  		colors: {
  			primary: '#2F6BE6',
  			color1: '#122A59',
  			color2: '#173773',
  			color3: '#1F4799',
  			color4: '#2558C0',
  			color5: '#2A5FCC',
  			color6: '#2F6BE6',
  			color7: '#3377FF',
  			color8: '#CDD6FF',
  			color9: '#E0EAFF',
  			color10: '#EBF1FF',
  			color11: '#F8FAFF',
  			backgroundFill: '#EEF0F3',
  			white: '#FFFFFF',
  			inputColor: '#E4E6E9',
  			inProgress: '#FFD200',
  			pending: '#F56421',
  			completed: '#00A659',
  			pendingBg: '#FFEDEA',
  			completedBg: '#E6F8F1',
  			inProgressBg: '#FFF8DC',
  			disabledBtn: '#96A1B5',
  			btnOutline: '#9EB4DF',
  			viewBtn: '#C0D6FF',
  			editBtn: '#E0EAFF',
  			dark: {
  				primary: '#3A8DFF',
  				color1: '#D0DCFF',
  				color2: '#A1C1FF',
  				color3: '#78A5F2',
  				color4: '#5588EB',
  				color5: '#3A78D0',
  				color6: '#2F6BE6',
  				color7: '#579BFF',
  				color8: '#2B3A58',
  				color9: '#37445B',
  				color10: '#48566F',
  				color11: '#5F688C',
  				backgroundFill: '#1C1F26',
  				white: '#F5F7FA',
  				inputColor: '#2C313C',
  				inProgress: '#FFD200',
  				pending: '#FF7847',
  				completed: '#008A7C'
  			},
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
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
