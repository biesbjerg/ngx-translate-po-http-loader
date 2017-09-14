# Description
Load po files for use with `ngx-translate`

## Installation:

```
npm i @ngx-translate/core --save
npm i @biesbjerg/ngx-translate-po-http-loader --save
```

## Usage:
```ts
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';

export function createTranslateLoader(http: Http) {
	return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
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
