import { ctx } from '../main'

export default class monster {
    constructor(image,x,y){
      this.x = x
      this.y = y
      this.width = 64
      this.height = 64
      this.image = image
    }
    draw(){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    update(){
      this.draw()
    }
  }