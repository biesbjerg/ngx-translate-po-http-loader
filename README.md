# NgX Translate ResX Http Loader [![Build Status](https://travis-ci.org/kneefer/ngx-translate-resx-http-loader.svg?branch=master)](https://travis-ci.org/kneefer/ngx-translate-resx-http-loader) [![npm version](https://img.shields.io/npm/v/@kneefer/ngx-translate-resx-http-loader.svg)](https://www.npmjs.com/package/@kneefer/ngx-translate-resx-http-loader)
Load resx files for use with [ngx-translate](https://github.com/ngx-translate/core) Angular translation library.   
Forked from [ngx-translate-po-http-loader](https://github.com/biesbjerg/ngx-translate-po-http-loader)

This library uses [ltx](https://github.com/node-xmpp/ltx) XML parser library in order to parse ResX files (XML-based).

To modify ResX files in friendly way I recommend [ResX Resource Manager](https://github.com/tom-englert/ResXResourceManager) GUI. Available both as standalone Windows application and Visual Studio extension.

## Installation
Using NPM
```
npm install @kneefer/ngx-translate-resx-http-loader
```

## Usage
```ts
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateResxHttpLoader } from '@kneefer/ngx-translate-resx-http-loader';

export function createTranslateLoader(http: HttpClient) {
  // Only first constructor parameter is required
  return new TranslateResxHttpLoader(http, 'trans.', 'assets/i18n', '.resx');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Old HttpModule
If you want to use deprecated HttpModule (Angular < 4.3.0) please use following version:
```
@kneefer/ngx-translate-resx-http-loader@0.3.5
```

## Development
#### Clone
```
git clone https://github.com/kneefer/ngx-translate-resx-http-loader.git
```
#### Install dependencies
```
npm install
```  
#### Build
```
npm run build
```
