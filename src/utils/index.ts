import {Slide, ISlideDocument} from '../models'
export async function createSlides(){
  const slides = await Slide.find()
  if (!slides.length) {
    const slides: Pick<ISlideDocument, 'url'>[]= [
      { url: 'http://img.zhufengpeixun.cn/post_reactnative.png' },
      { url: 'http://img.zhufengpeixun.cn/post_react.png' },
      { url: 'http://img.zhufengpeixun.cn/post_vue.png' },
      { url: 'http://img.zhufengpeixun.cn/post_wechat.png' },
      { url: 'http://img.zhufengpeixun.cn/post_architect.jpg' }
    ]
    await Slide.create(slides)
  }
}

export async function sleep(ms = 1000){
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}