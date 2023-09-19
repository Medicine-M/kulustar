class rainingParticles{
    #timer;
    constructor(args){
      this.src = args.src;
      this.width_min = args.width_min || 20;
      this.width_max = args.width_max || 100;
      this.interval = args.interval || 100; 
      this.speed_fall_min = args.speed_fall_min || 200;
      this.speed_fall_max = args.speed_fall_max || 600;
      this.times_rotate_min = args.times_rotate_min || .1;
      this.times_rotate_max = args.times_rotate_max || 1;
      this.rotate_direction = args.rotate_direction || 'random';
    }
    start(){
      if(this.src===undefined) return;
      this.stop();
      this.#timer = setInterval(()=>{
        const part = document.createElement('img');
        const width = this.#randomMN(this.width_min,this.width_max);
        const dirction = (()=>{
          if(this.rotate_direction=='right'){
            return 1;
          }else if(this.rotate_direction=='left'){
            return -1
          }else{
            if(Math.random()<.5){
              return 1;
            }else{
              return -1;
            }
          }
        })();
        const speed = this.#randomMN(this.speed_fall_min,this.speed_fall_max);
        const degree = this.#randomMN(this.times_rotate_min,this.times_rotate_max) * dirction;
        part.style.width = width+'px';
        part.style.position = 'fixed';
        part.style.zIndex= '10';
        part.style.left = this.#randomMN(-width,window.innerWidth) + 'px';
        part.style.bottom = '100%';
        part.style.userSelect = 'none';
        part.setAttribute('draggable', false);
        part.src = this.src;
        part.onload = ()=>{
          document.body.appendChild(part);
          const times = Math.ceil( (window.innerHeight+part.clientHeight) / speed);
          requestAnimationFrame(()=>{
            step(part,0,0,speed,degree,times);
          });
        };
      },this.interval);
  
      function step(part,y_old,deg_old,speed,degree,times){
        const y_new = y_old + speed*times;
        const deg_new = deg_old + degree*times;
        const anime = part.animate([
          {
            transform: `translateY(${y_old}px) rotate(${deg_old}deg)`
          },
          {
            transform: `translateY(${y_new}px) rotate(${deg_new}deg)`
          }
        ],{
          duration: 1000*times,
          fill: 'forwards'
        });
        anime.onfinish = ()=>{
          if(y_new>=window.innerHeight+part.clientHeight){
            part.remove();
          }else{
            requestAnimationFrame(()=>{
              step(part,y_new,deg_new,speed,degree,times);
            });
          }
        }
      }
    }
    stop(){
      clearInterval(this.#timer);
    }
  
    #randomMN(m,n){
      const d = Math.max(m,n)-Math.min(m,n);
      return Math.floor(Math.random()*(d+1)+Math.min(m,n));
    }
  }

const img_src = 'img/image0.png';
const particles = new rainingParticles({
  src: img_src,  //str 画像のパス - Image Path
  width_min: 20,  //int[px] パーティクルの幅の最小値 - Minimum particle width
  width_max: 100,  //int[px] パーティクルの幅の最大値 - Maximum particle width
  interval: 100,  //int[ms] パーティクルが降る間隔 - Interval at which particles fall
  speed_fall_min: 200,  //int[px/s] 落ちる速度の最小値 - Minimum speed of fall
  speed_fall_max: 600,  //int[px/s] 落ちる速度の最大値 - Maximum speed of fall
  times_rotate_min: 36,  //int[deg] 1秒間当たりの回転数の最小値 - Minimum number of rotations per second
  times_rotate_max: 360,  //int[deg] 1秒間当たりの回転数の最大値 - Maximum number of rotations per second
  rotate_direction: 'random'  //str(random or right or left) 回転方向 - Direction of rotation
});

document.getElementById('bt-start').addEventListener('click',()=>{
  particles.start();
});
document.getElementById('bt-stop').addEventListener('click',()=>{
  particles.stop();
});

/*!
 * raining-particles.js v1.0
 *
 * Copyright (c) 2022 motsu
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */
