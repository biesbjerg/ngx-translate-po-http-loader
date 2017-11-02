# Description
Load po files for use with `ngx-translate`

## Usage:
```ts
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';

export function createTranslateLoader(http: HttpClient) {
	return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
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
