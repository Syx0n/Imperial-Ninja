export function addMoney(money,Multiplier){
    return money += 1 * Multiplier
}
export function BallStrikeBuy(price, money, multi,level) {
  if (money >= price) {
    money -= price
    multi += 1
    price *= 1.4
    level += 1
    if(level == 10 || level == 20 || level == 30){
      multi *= 2
    }
  }
  return {
    BallStrikePrice: Math.floor(price),
    BallStrikeLevel: Math.floor(level),
    Money: Math.floor(money),
    Multiplier: Math.floor(multi)
  }
}
export function WaterPressureBuy(price, money, multi, cooldown,level) {
  if (money >= price && level < 25) {
    money -= price
    multi += 1.8
    price *= 1.2
    level += 1
    if(level == 5 || level == 10){
      multi *= 1.4
    }
    cooldown -= 0.3
  }
  return {
    WaterPressurePrice: Math.floor(price),
    WaterPressureLevel: Math.floor(level),
    Money: Math.floor(money),
    WaterPressureMultiplier: multi,
    WaterPressureCooldown: cooldown,
  }
}
export function LuckyHitBuy(price, money, multi, cooldown,range,level) {
  if (money >= price && level < 10) {
    money -= price
    multi += 1.25
    price *= 1.1
    level += 1
    if(level == 5 || level == 10 || level == 30){
      multi *= 1.1
    }
    range *= 1.1
    cooldown -= 0.4
  }
  return {
    LuckyHitPrice: Math.floor(price),
    LuckyHitLevel: Math.floor(level),
    Money: Math.floor(money),
    LuckyHitMultiplier: multi,
    LuckyHitCooldown: cooldown,
    LuckyHitRange:Math.floor(range)
  }
}
export function HonorOfSenseiBuy(price, money, element) {
  if (money >= price) {
    money -= price
    element.style.display = 'block'
    element.style.position = 'absolute'
    element.style.top = '500px' // aşağıdan başlasın
    element.style.left = '0'
    
    let y = window.innerHeight

    function moveUp() {
      y -= 5
      element.style.top = y + 'px'
      if (y > 0) {
        requestAnimationFrame(moveUp)
      }else{
        element.style.top = 0 + 'px'
        console.log("its done")
      }
      
    }
    moveUp()
  }

  return {
    Money: Math.floor(money),
    HonorOfSenseiPrice: Math.floor(price),
    HonorOfSensei: element
  }
}
