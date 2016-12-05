import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from 'ng2-translate';
import * as pofile from 'pofile';

export class TranslatePoLoader implements TranslateLoader {

	constructor(
		protected _http: Http,
		protected _prefix: string = 'i18n',
		protected _suffix: string = '.po'
	) {
	}

	/**
	 * Gets the translations from the server
	 * @param lang
	 * @returns {any}
	 */
	public getTranslation(lang: string): Observable<any> {
		return this._http
			.get(`${this._prefix}/${lang}${this._suffix}`)
			.map((response: Response) => response.text())
			.map((contents: string) => this._parse(contents));
	}

	/**
	 * Parse po file
	 * @param contents
	 * @returns {any}
	 */
	protected _parse(contents: string): any {
		let translations = {};

		const data = pofile.parse(contents);
		data.items.forEach(item => {
			const id: string = item.msgid;
			const translation: string = item.msgstr.pop();
			if (id && translation)  {
				translations[id] = translation;
			}
		});

		return translations;
	}

}
