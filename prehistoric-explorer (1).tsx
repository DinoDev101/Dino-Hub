import React, { useState, useMemo } from 'react';

const prehistoricData = {
  dinosaurs: [
    // Land Dinosaurs
    {
      id: 1,
      name: "Tyrannosaurus Rex",
      type: "Theropod",
      category: "Land",
      period: "Late Cretaceous",
      habitat: "North American Forests",
      size: "12-13 meters long",
      diet: "Carnivorous",
      significantFeature: "One of the largest land predators ever, with powerful bone-crushing bite"
    },
    {
      id: 2,
      name: "Triceratops",
      type: "Ceratopsian",
      category: "Land",
      period: "Late Cretaceous",
      habitat: "North American Plains",
      size: "8-9 meters long",
      diet: "Herbivorous",
      significantFeature: "Distinctive three-horned skull used for defense and display"
    },
    {
      id: 3,
      name: "Stegosaurus",
      type: "Thyreophoran",
      category: "Land",
      period: "Late Jurassic",
      habitat: "Western North American Woodlands",
      size: "9 meters long",
      diet: "Herbivorous",
      significantFeature: "Iconic row of plates along spine and spiked tail for defense"
    },
    {
      id: 4,
      name: "Velociraptor",
      type: "Dromaeosaurid",
      category: "Land",
      period: "Late Cretaceous",
      habitat: "Mongolian Deserts",
      size: "2 meters long",
      diet: "Carnivorous",
      significantFeature: "Highly intelligent pack hunter with curved killing claw"
    },
    {
      id: 5,
      name: "Brachiosaurus",
      type: "Sauropod",
      category: "Land",
      period: "Late Jurassic",
      habitat: "North American Plains",
      size: "25 meters long",
      diet: "Herbivorous",
      significantFeature: "Extremely long neck allowing browsing on high tree canopies"
    },
    // Sea Dinosaurs (technically Marine Reptiles)
    {
      id: 6,
      name: "Mosasaurus",
      type: "Marine Reptile",
      category: "Sea",
      period: "Late Cretaceous",
      habitat: "Global Ocean Systems",
      size: "17 meters long",
      diet: "Carnivorous",
      significantFeature: "Apex predator of marine ecosystems with powerful jaws"
    },
    {
      id: 7,
      name: "Plesiosaur",
      type: "Marine Reptile",
      category: "Sea",
      period: "Mesozoic Era",
      habitat: "Worldwide Oceans",
      size: "10-15 meters long",
      diet: "Carnivorous",
      significantFeature: "Long neck and paddle-like limbs for efficient swimming"
    },
    {
      id: 8,
      name: "Ichthyosaurus",
      type: "Marine Reptile",
      category: "Sea",
      period: "Early Jurassic",
      habitat: "Global Marine Environments",
      size: "2-4 meters long",
      diet: "Carnivorous",
      significantFeature: "Dolphin-like body shape, excellent marine adaptation"
    }
  ]
};

const PrehistoricExplorer = () => {
  const [selectedDinosaur, setSelectedDinosaur] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Memoized filtered dinosaurs
  const filteredDinosaurs = useMemo(() => {
    return prehistoricData.dinosaurs.filter(dino => {
      const matchesSearch = dino.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             dino.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All' || dino.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
            Prehistoric Discovery Hub
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore the fascinating world of prehistoric life
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input 
            type="text" 
            placeholder="Search dinosaurs by name or type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-auto p-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Categories</option>
            <option value="Land">Land Dinosaurs</option>
            <option value="Sea">Sea Dinosaurs</option>
          </select>
        </div>

        {/* Dinosaur Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          {filteredDinosaurs.map((dino) => (
            <div 
              key={dino.id}
              className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-all cursor-pointer"
              onClick={() => setSelectedDinosaur(dino)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-emerald-400">{dino.name}</h3>
                <span className="text-2xl">
                  {dino.category === 'Land' ? '🦕' : '🐳'}
                </span>
              </div>
              <p className="text-slate-300">{dino.type} | {dino.period}</p>
              <div className="mt-4 flex items-center">
                <span className="mr-2 text-blue-400">🌍</span>
                <span className="text-sm text-slate-400">{dino.habitat}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Detailed Dinosaur Modal */}
        {selectedDinosaur && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl max-w-2xl w-full p-8 relative">
              <button 
                onClick={() => setSelectedDinosaur(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-4xl font-bold text-emerald-400 mb-4">{selectedDinosaur.name}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="mr-2 text-blue-500">🦖</span>
                      <span>{selectedDinosaur.type}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-green-500">🌍</span>
                      <span>{selectedDinosaur.habitat}</span>
                    </div>
                  </div>
                  <p className="mt-6 text-slate-300">{selectedDinosaur.significantFeature}</p>
                </div>
                <div className="bg-slate-700 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Facts</h3>
                  <ul className="space-y-2">
                    <li><strong>Period:</strong> {selectedDinosaur.period}</li>
                    <li><strong>Size:</strong> {selectedDinosaur.size}</li>
                    <li><strong>Diet:</strong> {selectedDinosaur.diet}</li>
                    <li><strong>Category:</strong> {selectedDinosaur.category}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrehistoricExplorer;
