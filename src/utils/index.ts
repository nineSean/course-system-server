import {Slide, ISlideDocument, ICourseDocument, Course} from '../models'
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

export async function createCourses(){
  const courses: ICourseDocument[] = await Course.find()
  if (!courses.length) {
    const courses: any[] = [
      {
        order: 1,
        title: "1.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥100.00元",
        category: "react",
      },
      {
        order: 2,
        title: "2.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥200.00元",
        category: "react",
      },
      {
        order: 3,
        title: "3.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥300.00元",
        category: "react",
      },
      {
        order: 4,
        title: "4.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥400.00元",
        category: "react",
      },
      {
        order: 5,
        title: "5.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥500.00元",
        category: "react",
      },
      {
        order: 6,
        title: "6.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥100.00元",
        category: "vue",
      },
      {
        order: 7,
        title: "7.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥200.00元",
        category: "vue",
      },
      {
        order: 8,
        title: "8.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥300.00元",
        category: "vue",
      },
      {
        order: 9,
        title: "9.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥400.00元",
        category: "vue",
      },
      {
        order: 10,
        title: "10.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥500.00元",
        category: "vue",
      },
      {
        order: 11,
        title: "11.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥600.00元",
        category: "react",
      },
      {
        order: 12,
        title: "12.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥700.00元",
        category: "react",
      },
      {
        order: 13,
        title: "13.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥800.00元",
        category: "react",
      },
      {
        order: 14,
        title: "14.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥900.00元",
        category: "react",
      },
      {
        order: 15,
        title: "15.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥1000.00元",
        category: "react",
      },
      {
        order: 16,
        title: "16.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥600.00元",
        category: "vue",
      },
      {
        order: 17,
        title: "17.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥700.00元",
        category: "vue",
      },
      {
        order: 18,
        title: "18.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥800.00元",
        category: "vue",
      },
      {
        order: 19,
        title: "19.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥900.00元",
        category: "vue",
      },
      {
        order: 20,
        title: "20.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥1000.00元",
        category: "vue",
      },
    ]
    await Course.create(courses)
  }
}

export async function sleep(ms = 1000){
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}