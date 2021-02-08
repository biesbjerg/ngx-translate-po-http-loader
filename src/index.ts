import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import * as gettext from 'gettext-parser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TranslatePoHttpLoader implements TranslateLoader {

	/**
	 * Translation domain
	 */
	public domain = '';

	constructor(
		protected _http: HttpClient,
		protected _prefix: string = 'i18n',
		protected _suffix: string = '.po'
	) {
	}

	/**
	 * Gets the translations from file
	 * @param lang
	 * @returns {any}
	 */
	public getTranslation(lang: string): Observable<any> {
		return this._http
			.get(`${this._prefix}/${lang}${this._suffix}`, { responseType: 'text' })
			.pipe(map((contents: string) => this.parse(contents)));
	}

	/**
	 * Parse po file
	 * @param contents
	 * @returns {any}
	 */
	public parse(contents: string): any {
		let translations: { [key: string]: string } = {};

		const po = gettext.po.parse(contents, 'utf-8');
		if (!po.translations.hasOwnProperty(this.domain)) {
			return translations;
		}

		Object.keys(po.translations[this.domain])
			.forEach(key => {
				const translation: string = po.translations[this.domain][key].msgstr.pop() || "";
				if (key.length > 0 && translation.length > 0) {
					translations[key] = translation;
				}
			});

		return translations;
	}

}
