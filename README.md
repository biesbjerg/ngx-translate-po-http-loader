# Description
Load resx files for use with `ngx-translate`  
Forked from [ngx-translate-po-http-loader](https://github.com/biesbjerg/ngx-translate-po-http-loader)

To parse ResX file (XML based) I use [ltx](https://github.com/node-xmpp/ltx) XML parser library

## Usage:
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

## Development:
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