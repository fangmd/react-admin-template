import { action, makeObservable, observable } from 'mobx'

/**
 * TemplateStore
 */
class TemplateStore {
  datas: any[] = []

  constructor() {
    makeObservable(this, {
      datas: observable,
      init: action,
    })
  }

  async init() {
    console.log('init');
  }
}

function createTemplateStore() {
  return new TemplateStore()
}

export { createTemplateStore }
