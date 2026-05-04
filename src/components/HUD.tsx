import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRingConfigurator, PearlColor, Material, TextureType, RingModel, FontFamily } from '../store/useRingConfigurator';

const steps = [
  { id: 1, name: "The Architecture", description: "Define the foundation of your ring" },
  { id: 2, name: "The Core", description: "Select the celestial centerpiece" },
  { id: 3, name: "The Band", description: "Forge the metal structure" },
  { id: 4, name: "The Mark", description: "Engrave your legacy" },
];

const HUD: React.FC = () => {
  const { step, setStep, config, setConfig, setTextConfig } = useRingConfigurator();

  const handleCapture = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "velvet_void_ring.png";
    link.click();
  };

  return (
    <div className="w-full h-full pointer-events-none flex flex-col justify-between p-4 md:p-12 text-white font-sans overflow-hidden touch-auto">

      {/* Top Header */}
      <header className="flex justify-between items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
          <h1 className="font-sans text-2xl md:text-3xl tracking-widest text-gold drop-shadow-md">AURA</h1>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 mt-1">High Jewellery</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleCapture}
          className="pointer-events-auto glass-button p-3 md:p-4 rounded-full flex items-center justify-center text-white/80 hover:text-white group"
        >
          <Camera size={18} className="group-hover:scale-110 transition-transform duration-300 md:w-5 md:h-5" />
        </motion.button>
      </header>

      {/* Main Content Area - Split Left/Right depending on step */}
      <div className="flex-1 flex md:items-center relative w-full my-4 md:my-8 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 pointer-events-auto w-full md:max-w-sm max-h-[40vh] md:max-h-[60vh] overflow-y-auto no-scrollbar overscroll-contain touch-auto pb-4 md:pb-0"
          >
            <div className="mb-2 md:mb-4">
              <span className="text-gold text-[10px] md:text-sm tracking-[0.2em] uppercase mb-1 md:mb-2 block">Phase {step}</span>
              <h2 className="font-sans text-3xl md:text-4xl font-light leading-tight mb-1 md:mb-2">{steps[step - 1].name}</h2>
              <p className="text-white/60 font-light text-xs md:text-sm tracking-wide leading-relaxed">
                {steps[step - 1].description}
              </p>
            </div>

            {/* Step 1: Model Selection */}
            {step === 1 && (
              <div className="space-y-3 md:space-y-4 mt-6 md:mt-12">
                {[
                  { id: 'plain', label: 'Monolith', desc: 'A seamless, continuous band' },
                  { id: 'withPearl', label: 'Crown', desc: 'Elevated centerpiece setting' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConfig({ model: item.id as RingModel })}
                    className={`w-full text-left p-4 md:p-6 rounded-2xl glass-button transition-all duration-500 relative overflow-hidden ${config.model === item.id ? 'border-gold/50 bg-white/5' : ''
                      }`}
                  >
                    {config.model === item.id && (
                      <motion.div layoutId="activeModel" className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent z-0" />
                    )}
                    <div className="relative z-10 flex justify-between items-center">
                      <div>
                        <h3 className="font-sans text-lg md:text-xl mb-1">{item.label}</h3>
                        <p className="text-[10px] md:text-xs text-white/50">{item.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${config.model === item.id ? 'border-gold' : 'border-white/20'}`}>
                        {config.model === item.id && <div className="w-2 h-2 rounded-full bg-gold" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Pearl Configuration (If Model is Crown) */}
            {step === 2 && (
              <div className="space-y-6 md:space-y-8 mt-6 md:mt-12">
                {config.model !== 'withPearl' ? (
                  <div className="p-4 md:p-6 glass-panel rounded-2xl border-white/5 text-white/50 text-xs md:text-sm italic">
                    The Monolith band does not feature a centerpiece. Proceed to the next phase.
                  </div>
                ) : (
                  <div>
                    <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 mb-4 md:mb-6">Select Gemstone</h3>
                    <div className="flex gap-3 md:gap-4">
                      {[
                        { id: 'white', color: '#f5f5f5', name: 'Akoya Pearl' },
                        { id: 'pink', color: '#ffb6c1', name: 'Rose Quartz' },
                        { id: 'blue', color: '#add8e6', name: 'Sapphire Drop' }
                      ].map((pearl) => (
                        <button
                          key={pearl.id}
                          onClick={() => setConfig({ pearlColor: pearl.id as PearlColor })}
                          className="flex flex-col items-center gap-2 md:gap-3 group"
                        >
                          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 ${config.pearlColor === pearl.id ? 'border border-gold p-1' : 'border border-transparent p-0'}`}>
                            <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: pearl.color, boxShadow: 'inset 0 -5px 15px rgba(0,0,0,0.2)' }} />
                          </div>
                          <span className={`text-[9px] md:text-[10px] uppercase tracking-wider transition-colors text-center ${config.pearlColor === pearl.id ? 'text-gold' : 'text-white/40 group-hover:text-white/80'}`}>{pearl.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Material & Texture */}
            {step === 3 && (
              <div className="space-y-8 md:space-y-10 mt-6 md:mt-12">
                {/* Material */}
                <div>
                  <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 mb-4 md:mb-6">Alloy Selection</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      { id: 'gold', name: 'Yellow Gold', hex: '#E5C07B' },
                      { id: 'whiteGold', name: 'White Gold', hex: '#E8E9EB' },
                      { id: 'roseGold', name: 'Rose Gold', hex: '#B76E79' }
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => setConfig({ material: mat.id as Material })}
                        className={`px-4 md:px-5 py-2 md:py-3 rounded-full glass-button text-[10px] md:text-xs tracking-wider flex items-center gap-2 md:gap-3 ${config.material === mat.id ? 'border-gold/50 text-white' : 'text-white/60'}`}
                      >
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: mat.hex }} />
                        {mat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Texture */}
                <div>
                  <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 mb-4 md:mb-6">Surface Finish</h3>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {[
                      { id: 'polished', label: 'Polished' },
                      { id: 'brushed', label: 'Brushed' },
                      { id: 'hammered', label: 'Hammered' }
                    ].map((tex) => (
                      <button
                        key={tex.id}
                        onClick={() => setConfig({ textureType: tex.id as TextureType })}
                        className={`py-3 md:py-4 glass-button rounded-xl text-[10px] md:text-xs tracking-wider uppercase transition-all ${config.textureType === tex.id ? 'border-gold text-gold bg-gold/5' : 'text-white/50'}`}
                      >
                        {tex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Engraving */}
            {step === 4 && (
              <div className="space-y-6 md:space-y-8 mt-6 md:mt-12">
                <div className="relative">
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="Enter your legacy..."
                    value={config.textConfig.text}
                    onChange={(e) => setTextConfig({ text: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 pb-3 md:pb-4 text-xl md:text-2xl font-sans text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20"
                  />
                  <span className="absolute right-0 bottom-3 md:bottom-4 text-[10px] md:text-xs text-white/40">{config.textConfig.text.length}/15</span>
                </div>

                <div>
                  <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 mb-3 md:mb-4">Typography</h3>
                  <div className="flex gap-2 md:gap-3">
                    {['serif', 'sans-sans', 'cursive'].map((font) => (
                      <button
                        key={font}
                        onClick={() => setTextConfig({ fontFamily: font as FontFamily })}
                        className={`flex-1 py-2 md:py-3 glass-button rounded-lg capitalize text-sm md:text-base ${config.textConfig.fontFamily === font ? 'border-gold text-gold' : 'text-white/50'}`}
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Dock / Navigation */}
      <footer className="w-full flex justify-between items-end relative z-10 pt-4">
        <div className="flex gap-1 md:gap-2 pointer-events-auto">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className="group relative py-4 px-1"
            >
              <div className="w-6 md:w-8 h-[2px] bg-white/20 overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-gold"
                  initial={false}
                  animate={{
                    width: step === s.id ? '100%' : step > s.id ? '100%' : '0%',
                    opacity: step === s.id ? 1 : step > s.id ? 0.3 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="absolute -top-6 left-0 text-[8px] md:text-[10px] uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                {s.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 md:gap-4 pointer-events-auto">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-button flex items-center justify-center disabled:opacity-30 disabled:hover:border-white/10 shrink-0"
          >
            <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
          </button>

          <button
            onClick={() => {
              if (step < 4) setStep(step + 1)
              // If step 4, trigger finish or cart logic
            }}
            className="px-6 md:px-8 h-10 md:h-12 rounded-full bg-gold text-obsidian font-medium tracking-wider flex items-center gap-2 hover:bg-white transition-colors uppercase text-[10px] md:text-xs whitespace-nowrap"
          >
            {step === 4 ? 'Complete' : 'Next Phase'}
            {step === 4 ? <Check size={14} className="md:w-[16px] md:h-[16px]" /> : <ChevronRight size={14} className="md:w-[16px] md:h-[16px]" />}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default HUD;
