'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

export function EcoTravelLanding() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    region: ''
  })
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isLolMode, setIsLolMode] = useState(false)

  const regions = [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire",
    "Corse", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandie",
    "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegionSelect = (region: string) => {
    setFormData(prev => ({ ...prev, region }))
    setIsRegionOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const toggleLolMode = () => {
    setIsLolMode(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!isLolMode ? (
          <motion.div
            key="main-content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <header className="p-6 flex justify-between items-center relative z-10">
              <h1 className="text-4xl font-bold text-white">Eco Travel</h1>
              <Button 
                className="bg-red-500 text-white hover:bg-red-600 transition-colors text-lg px-6 py-2 rounded-full shadow-lg"
                onClick={toggleLolMode}
              >
                Réserver
              </Button>
            </header>
            
            <main className="container mx-auto mt-10 p-4 relative z-10">
              <div className="relative mb-20">
                <h2 className="text-6xl font-bold text-center mb-6 relative z-10 tracking-tight">
                  VOYAGE PLUS<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
                    ECO RESPONSABLE
                  </span>
                </h2>
              </div>
              
              <form 
                onSubmit={handleSubmit} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-6">
                  {['name', 'surname', 'email'].map((field) => (
                    <div key={field}>
                      <label className="block mb-2 text-white text-lg">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <Input 
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full bg-white/20 text-white placeholder-white/60 border-none" 
                        value={formData[field as keyof typeof formData]}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                  <div className="relative">
                    <label className="block mb-2 text-white text-lg">Région souhaitée</label>
                    <div 
                      className="w-full bg-white/20 rounded-md p-2 flex justify-between items-center cursor-pointer text-white"
                      onClick={() => setIsRegionOpen(!isRegionOpen)}
                    >
                      <span>{formData.region || "Choisir une région"}</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    {isRegionOpen && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {regions.map((region) => (
                          <div 
                            key={region} 
                            className="p-2 hover:bg-emerald-100 cursor-pointer text-emerald-800"
                            onClick={() => handleRegionSelect(region)}
                          >
                            {region}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-8">
                  {['globe', 'leaf', 'home', 'sun'].map((icon) => (
                    <Button 
                      key={icon}
                      type="button" 
                      className="bg-white/20 text-white rounded-full p-3 hover:bg-white/30 transition-colors"
                    >
                      <Image src={`/${icon}-icon.svg`} alt={icon} width={24} height={24} />
                    </Button>
                  ))}
                </div>
                <Button 
                  type="submit" 
                  className="mt-8 bg-gradient-to-r from-yellow-400 to-pink-500 text-white hover:from-yellow-500 hover:to-pink-600 mx-auto block text-lg px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl"
                >
                  Chercher itinéraire
                </Button>
              </form>
            </main>

            <div className="flex justify-between items-end absolute bottom-4 left-4 right-4">
              {['car', 'train', 'bike'].map((vehicle) => (
                <Image 
                  key={vehicle}
                  src={`/${vehicle}-icon.svg`} 
                  alt={vehicle} 
                  width={48} 
                  height={48} 
                  className="text-white"
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="lol-mode"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Confetti />
            <h1 className="text-9xl font-bold text-white mb-8">LOL</h1>
            <Button
              className="bg-white text-emerald-600 hover:bg-emerald-100 text-lg px-6 py-3 rounded-full shadow-lg"
              onClick={toggleLolMode}
            >
              Retour
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}