# Description
Use po files with `ng2-translate`

## Usage:
```ts
import { Http } from '@angular/http';

import { TranslatePoLoader } from '@biesbjerg/ng2-translate-po-loader';

export function createTranslateLoader(http: Http) {
	return new TranslatePoLoader(http, 'assets/i18n', '.po');
}

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [Http]
		})
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
```
