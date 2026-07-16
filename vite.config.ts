import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'        //Vite'a React desteği veriyor.
import tailwindcss from '@tailwindcss/vite'     //Tailwind class'larını build sürecine dahil ettik.

export default defineConfig({
  plugins: [react(), tailwindcss()],
  fontFamily: { montserrat: ['Montserrat', 'sans-serif'] }
})

//Vite artık Tailwind'i tanıyor.