let canvas = document.getElementById("canvas")
export let ctx = canvas.getContext("2d")

import player from "./characters/player"
import monster from './characters/monster'
import {projectile,projectile2,projectile3} from "./characters/projectile"
import {addMoney,BallStrikeBuy,HonorOfSenseiBuy,LuckyHitBuy, WaterPressureBuy} from "./economy/money"

const MoneyText = document.getElementById("MoneyText")
const Flash = document.createElement('img')
Flash.src = "/gameassets/black.png"
document.body.appendChild(Flash)
Flash.style.width = '100vw'
Flash.style.height = '100vh'
Flash.style.display = 'none'
Flash.style.position = 'absolute'
Flash.style.top = 0
const BallStrike = document.getElementById("BallStrike")
const WaterPressure = document.getElementById('WaterPressure')
const LuckyHit = document.getElementById('LuckyHit')
const HonorOfSensei = document.getElementById('HonorOfSensei')
const _BallStrikeLevel = document.getElementById("_BallStrikeLevel")
const _WaterPressureLevel = document.getElementById("_WaterPressureLevel")
const _LuckyHitLevel = document.getElementById('_LuckyHitLevel')

canvas.width = 300
canvas.height = 500
let playerImage = document.createElement('img')
playerImage.src = '/gameassets/ninja.png'
let monsterImage = document.createElement('img')
monsterImage.src = '/gameassets/monster.png'

window.onload = function(){
  let Money = 2500000
  let BallStrikePrice = 10
  let BallStrikeLevel = 0
  let WaterPressurePrice = 250
  let WaterPressureLevel = 0
  let WaterPressureMultiplier = 1
  let WaterPressureCooldown = 10
  let WaterPressureInterval;
  let LuckyHitPrice = 25000
  let LuckyHitLevel = 0
  let LuckyHitMultiplier = 1
  let LuckyHitCooldown = 5
  let LuckyHitRange = 100
  let LuckyHitInterval;
  let HonorOfSenseiPrice = 1000000 
  let Multiplier = 1
  let RebirthPrice = 500
  let Player = new player(playerImage,150-32,400)
  let Monster = new monster(monsterImage,150-32,50)
  let Projectiles = []

  console.log(WaterPressure)

  // Satın alma Tetiklendiğinde
  BallStrike.onclick = ()=>{
    const result = BallStrikeBuy(BallStrikePrice,Money,Multiplier,BallStrikeLevel)
    Money = result.Money
    Multiplier = result.Multiplier
    BallStrikePrice = result.BallStrikePrice
    BallStrikeLevel = result.BallStrikeLevel
    MoneyText.textContent = `Cash: $${result.Money}`
    BallStrike.textContent = `Price: $${result.BallStrikePrice}`
    _BallStrikeLevel.textContent = `Level: ${result.BallStrikeLevel}`
  }
  WaterPressure.onclick = ()=>{
    const result = WaterPressureBuy(WaterPressurePrice,Money,WaterPressureMultiplier,WaterPressureCooldown,WaterPressureLevel)
    Money = result.Money
    WaterPressureMultiplier = result.WaterPressureMultiplier
    WaterPressurePrice = result.WaterPressurePrice
    WaterPressureLevel = result.WaterPressureLevel
    WaterPressureCooldown = result.WaterPressureCooldown
    MoneyText.textContent = `Cash: $${result.Money}`
    WaterPressure.textContent = `Price: $${result.WaterPressurePrice}`
    _WaterPressureLevel.textContent = `Level: ${result.WaterPressureLevel}`

    if(WaterPressureInterval) clearInterval(WaterPressureInterval)
    if(WaterPressureLevel >= 1){
      WaterPressureInterval = setInterval(() => {
        let Projectile = new projectile2(Player.x, Player.y)  
        Projectiles.push(Projectile)
      }, WaterPressureCooldown * 1000)
    }
  }
  LuckyHit.onclick = ()=>{
    const result = LuckyHitBuy(LuckyHitPrice,Money,LuckyHitMultiplier,LuckyHitCooldown,LuckyHitRange,LuckyHitLevel)
    Money = result.Money
    LuckyHitMultiplier = result.LuckyHitMultiplier
    LuckyHitPrice = result.LuckyHitPrice
    LuckyHitLevel = result.LuckyHitLevel
    LuckyHitRange = result.LuckyHitRange
    LuckyHitCooldown = result.LuckyHitCooldown
    MoneyText.textContent = `Cash: $${result.Money}`
    LuckyHit.textContent = `Price: $${result.LuckyHitPrice}`
    _LuckyHitLevel.textContent = `Level: ${result.LuckyHitLevel}`
    if(LuckyHitInterval) clearInterval(LuckyHitInterval)
    if(LuckyHitLevel >= 1){
      LuckyHitInterval = setInterval(() => {
        let Projectile = new projectile3(Player.x, Player.y)  
        Projectiles.push(Projectile)
      }, LuckyHitCooldown * 1000)
    }
  }
  HonorOfSensei.onclick = ()=>{
    const result = HonorOfSenseiBuy(HonorOfSenseiPrice,Money,Flash)
  }
  function animate(){
    ctx.fillStyle = 'rgba(0,255,0,0.05)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    Monster.update()
    
    for(let i = Projectiles.length - 1; i >= 0; i--){
      Projectiles[i].update()
      if(Projectiles[i].y <= Monster.y + Monster.height){
        if(Projectiles[i].type === 'Water'){
          Money = addMoney(Money, Math.floor(Multiplier * WaterPressureMultiplier))
        }else if(Projectiles[i].type === 'Dice'){
          let LuckyHitRangeMath = Math.floor(Math.random() * (LuckyHitRange - LuckyHitRange/4 + 1)) + LuckyHitRange/4;
          Money = addMoney(Money, Math.floor(LuckyHitRangeMath * LuckyHitMultiplier))
          console.log(LuckyHitRangeMath * LuckyHitMultiplier)
        } else {
          Money = addMoney(Money, Multiplier)
        }
        Projectiles.splice(i, 1) // Mermiyi sil
        MoneyText.textContent = `Cash: $${Money.toString()}`
      }
    }
    Player.update()
    requestAnimationFrame(animate)
  }

  setInterval(() => {
      let Projectile = new projectile(Player.x + 32,Player.y)  
      Projectiles.push(Projectile)
    }, 3000);
  
  animate()

}