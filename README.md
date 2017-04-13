# NgX Translate ResX Http Loader
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
import { Http } from '@angular/http';
import { TranslateResxHttpLoader } from '@kneefer/ngx-translate-resx-http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateResxHttpLoader(http, 'assets/i18n', '.resx');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
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