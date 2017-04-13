# Description
Load resx files for use with `ngx-translate`

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
