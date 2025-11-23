import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CaseItem {
  id: number;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Weapon {
  id: string;
  name: string;
  skin: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  price?: number;
}

const cases: CaseItem[] = [
  {
    id: 1,
    name: 'Cyber Case',
    image: '🎁',
    price: 150,
    rarity: 'rare',
  },
  {
    id: 2,
    name: 'Neon Case',
    image: '📦',
    price: 300,
    rarity: 'epic',
  },
  {
    id: 3,
    name: 'Elite Case',
    image: '💎',
    price: 500,
    rarity: 'legendary',
  },
  {
    id: 4,
    name: 'Starter Case',
    image: '🎲',
    price: 50,
    rarity: 'common',
  },
  {
    id: 5,
    name: 'Pro Case',
    image: '⚡',
    price: 250,
    rarity: 'epic',
  },
  {
    id: 6,
    name: 'Ultimate Case',
    image: '👑',
    price: 1000,
    rarity: 'legendary',
  },
];

const weapons: Weapon[] = [
  { id: '1', name: 'AK-47', skin: 'Cyber Dragon', rarity: 'legendary', image: '🔫', price: 800 },
  { id: '2', name: 'M4A1', skin: 'Neon Strike', rarity: 'epic', image: '🔫', price: 400 },
  { id: '3', name: 'AWP', skin: 'Digital Wave', rarity: 'epic', image: '🎯', price: 450 },
  { id: '4', name: 'Desert Eagle', skin: 'Plasma', rarity: 'rare', image: '🔫', price: 200 },
  { id: '5', name: 'Knife', skin: 'Chrome Edge', rarity: 'legendary', image: '🔪', price: 1000 },
  { id: '6', name: 'Glock-18', skin: 'Circuit', rarity: 'common', image: '🔫', price: 80 },
];

const rarityColors = {
  common: 'border-gray-500 bg-gray-500/10',
  rare: 'border-blue-500 bg-blue-500/10',
  epic: 'border-neon-purple bg-neon-purple/10',
  legendary: 'border-neon-pink bg-neon-pink/10',
};

const rarityGlow = {
  common: 'shadow-[0_0_10px_rgba(156,163,175,0.3)]',
  rare: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]',
  epic: 'neon-glow-purple',
  legendary: 'neon-glow-pink',
};

export default function Index() {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonItem, setWonItem] = useState<Weapon | null>(null);
  const [balance, setBalance] = useState(5000);
  const [inventory, setInventory] = useState<Weapon[]>([]);
  const [showInventory, setShowInventory] = useState(false);

  const openCase = () => {
    if (!selectedCase || balance < selectedCase.price) return;
    
    setBalance(prev => prev - selectedCase.price);
    setIsOpening(true);
    setWonItem(null);

    setTimeout(() => {
      const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
      const newItem = { ...randomWeapon, id: `${randomWeapon.id}-${Date.now()}`, price: randomWeapon.price };
      setWonItem(newItem);
      setInventory(prev => [...prev, newItem]);
      setIsOpening(false);
    }, 3000);
  };

  const closeDialog = () => {
    setSelectedCase(null);
    setWonItem(null);
    setIsOpening(false);
  };

  const sellItem = (itemId: string, price: number) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
    setBalance(prev => prev + price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0d1221] to-[#0a0e1a] text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-sm bg-card/30">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-spin-slow">⚡</div>
              <h1 className="text-3xl font-bold text-neon-cyan tracking-wider">
                STANDOFF CASES
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple neon-glow-purple text-lg px-4 py-2">
                <Icon name="Coins" size={20} className="mr-2" />
                {balance} ₽
              </Badge>
              <Button 
                variant="outline" 
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background neon-glow relative"
                onClick={() => setShowInventory(true)}
              >
                <Icon name="Package" size={20} />
                {inventory.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white border-0 h-6 w-6 flex items-center justify-center p-0 text-xs">
                    {inventory.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-6xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
              ОТКРЫВАЙ КЕЙСЫ
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Получай легендарные скины для Standoff 2
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {cases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className={`group relative overflow-hidden border-2 ${rarityColors[caseItem.rarity]} ${rarityGlow[caseItem.rarity]} 
                  hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur`}
                onClick={() => setSelectedCase(caseItem)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-6 relative z-10">
                  <div className="text-center space-y-4">
                    <div className="text-8xl animate-float">{caseItem.image}</div>
                    
                    <h3 className="text-2xl font-bold text-foreground">
                      {caseItem.name}
                    </h3>
                    
                    <Badge 
                      className={`${rarityColors[caseItem.rarity]} border text-lg px-3 py-1`}
                    >
                      {caseItem.rarity.toUpperCase()}
                    </Badge>
                    
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-neon-cyan">
                      <Icon name="Coins" size={24} />
                      {caseItem.price} ₽
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 
                        text-background font-bold text-lg py-6 neon-glow group-hover:neon-glow-purple transition-all"
                    >
                      ОТКРЫТЬ
                      <Icon name="Sparkles" size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-8 text-neon-purple">
              Возможные предметы
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {weapons.map((weapon, idx) => (
                <Card
                  key={idx}
                  className={`border-2 ${rarityColors[weapon.rarity]} ${rarityGlow[weapon.rarity]} 
                    p-4 text-center bg-card/30 backdrop-blur hover:scale-105 transition-all`}
                >
                  <div className="text-5xl mb-2">{weapon.image}</div>
                  <p className="font-semibold text-foreground">{weapon.name}</p>
                  <p className="text-sm text-muted-foreground">{weapon.skin}</p>
                  <Badge className={`mt-2 ${rarityColors[weapon.rarity]} border`}>
                    {weapon.rarity}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Dialog open={showInventory} onOpenChange={setShowInventory}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-2 border-primary max-w-4xl neon-glow max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-neon-cyan flex items-center justify-center gap-2">
              <Icon name="Package" size={32} />
              МОЙ ИНВЕНТАРЬ
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            {inventory.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl opacity-50">📦</div>
                <p className="text-xl text-muted-foreground">Ваш инвентарь пуст</p>
                <p className="text-sm text-muted-foreground">Открывайте кейсы, чтобы получить предметы</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg text-muted-foreground">
                    Предметов: <span className="text-neon-cyan font-bold">{inventory.length}</span>
                  </p>
                  <div className="flex gap-2">
                    {['legendary', 'epic', 'rare', 'common'].map(rarity => {
                      const count = inventory.filter(item => item.rarity === rarity).length;
                      if (count === 0) return null;
                      return (
                        <Badge key={rarity} className={`${rarityColors[rarity as keyof typeof rarityColors]} border`}>
                          {rarity}: {count}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {inventory.map((item, idx) => (
                    <Card
                      key={idx}
                      className={`border-2 ${rarityColors[item.rarity]} ${rarityGlow[item.rarity]} 
                        p-4 text-center bg-card/30 backdrop-blur transition-all group relative overflow-hidden`}
                    >
                      <div className="text-5xl mb-2">{item.image}</div>
                      <p className="font-semibold text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground mb-1">{item.skin}</p>
                      <Badge className={`mt-2 mb-2 ${rarityColors[item.rarity]} border text-xs`}>
                        {item.rarity}
                      </Badge>
                      <div className="flex items-center justify-center gap-1 text-neon-cyan font-bold text-sm mb-2">
                        <Icon name="Coins" size={14} />
                        {item.price} ₽
                      </div>
                      <Button
                        size="sm"
                        onClick={() => sellItem(item.id, item.price || 0)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 
                          text-white font-semibold text-xs py-2 shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                      >
                        <Icon name="DollarSign" size={14} className="mr-1" />
                        ПРОДАТЬ
                      </Button>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedCase !== null} onOpenChange={closeDialog}>
        <DialogContent className="bg-card/95 backdrop-blur-xl border-2 border-primary max-w-2xl neon-glow">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-neon-cyan">
              {selectedCase?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-6">
            <div className="text-center">
              <div className="text-9xl mb-4 animate-float inline-block">
                {selectedCase?.image}
              </div>
              <Badge className={`${rarityColors[selectedCase?.rarity || 'common']} border text-xl px-4 py-2`}>
                {selectedCase?.rarity.toUpperCase()}
              </Badge>
            </div>

            {isOpening && (
              <div className="text-center space-y-4">
                <div className="text-6xl animate-spin-slow">⚡</div>
                <p className="text-xl text-neon-cyan animate-pulse font-bold">
                  Открываем кейс...
                </p>
                <div className="flex gap-2 justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {wonItem && (
              <div className={`text-center space-y-4 p-6 rounded-lg border-2 ${rarityColors[wonItem.rarity]} ${rarityGlow[wonItem.rarity]}`}>
                <p className="text-2xl font-bold text-neon-pink">🎉 ВЫ ВЫИГРАЛИ! 🎉</p>
                <div className="text-8xl animate-float">{wonItem.image}</div>
                <h4 className="text-3xl font-bold text-foreground">{wonItem.name}</h4>
                <p className="text-xl text-neon-purple">{wonItem.skin}</p>
                <Badge className={`${rarityColors[wonItem.rarity]} border text-xl px-4 py-2`}>
                  {wonItem.rarity.toUpperCase()}
                </Badge>
              </div>
            )}

            {!isOpening && !wonItem && (
              <Button
                onClick={openCase}
                disabled={balance < (selectedCase?.price || 0)}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 
                  text-background font-bold text-2xl py-8 neon-glow-pink"
              >
                {balance < (selectedCase?.price || 0) ? (
                  <>
                    <Icon name="AlertCircle" size={24} className="mr-2" />
                    Недостаточно средств
                  </>
                ) : (
                  <>
                    ОТКРЫТЬ ЗА {selectedCase?.price} ₽
                    <Icon name="Sparkles" size={24} className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}