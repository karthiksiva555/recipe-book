import { Injectable } from '@angular/core';

// 1. Line 5-7 here makes the same service instance available to the whole app
// 2. if you Add LoggingService to providers:[] of app.module, same service instance is available to the whole app
// 3. if you add LoggingService to providers:[] of a component, a new insnce is injected to the component and its children
// 4. if you add LoggingService to providers:[] of a lazy-loaded module, a new instance is generated for the module itself  

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logMessage: string;

  constructor() { }

  printLog(message: string){
    this.logMessage = message;
  }
}
