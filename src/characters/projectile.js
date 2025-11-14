import { ctx } from '../main'  // Import et

export class projectile {
    constructor(x,y,radius){
      this.x = x
      this.y = y
      this.radius = 5
      this.active = true
    }
    draw(){
      ctx.beginPath()
      ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
      ctx.fillStyle = "red"
      ctx.fill()
      ctx.closePath()
    }
    update(){
      if(this.active == true){
        this.y -= 1
        this.draw()
      }
    }
  }

export class projectile2 {
    constructor(x,y,radius){
      this.x = x
      this.y = y
      this.radius = 5
      this.active = true
      this.image = new Image()
      this.image.src = '/gameassets/waterball.png'
      this.type = "Water"
    }
    draw(){
      ctx.beginPath()
      ctx.drawImage(this.image,this.x - this.radius,this.y - this.radius)
      ctx.closePath()
    }
    update(){
      if(this.active == true){
        this.y -= 1
        this.draw()
      }
    }
  }

export class projectile3 {
    constructor(x,y,radius){
      this.x = x
      this.y = y
      this.radius = 5
      this.active = true
      this.image = new Image()
      this.image.src = '/gameassets/dice.png'
      this.type = "Dice"
    }
    draw(){
      ctx.beginPath()
      ctx.drawImage(this.image,this.x - this.radius,this.y - this.radius)
      ctx.closePath()
    }
    update(){
      if(this.active == true){
        this.y -= 2
        this.draw()
      }
    }
  }