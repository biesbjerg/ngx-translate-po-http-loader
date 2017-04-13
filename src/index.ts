import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import * as ltx from 'ltx';

export class TranslateResxHttpLoader implements TranslateLoader {

	constructor(
		protected http: Http,
		protected prefix: string = 'i18n',
		protected suffix: string = '.resx') { }

	/**
	 * Gets the translations from file
	 * @param lang
	 * @returns {any}
	 */
	public getTranslation(lang: string): Observable<any> {
		return this.http
			.get(`${this.prefix}/${lang}${this.suffix}`)
			.map((response: Response) => response.text())
			.map((contents: string) => this.parse(contents, lang));
	}

	/**
	 * Parse resx file
	 * @param contents
	 * @param lang
	 * @returns {any}
	 */
	private parse(contents: string, lang: string): any {
		var xml = ltx.parse(contents);

		const translations = xml.children
			.filter((x: any) => x.name && x.name === 'data')
			.reduce((total: any, current: any) => {
				var name = current.attrs.name;
				var value = current.children.filter((x: any) => x.name && x.name === 'value');
				if (value.length === 1) {
					value = value[0].children[0];
					total[name] = value;
				} else {
					console.error(`Data node of token '${name}' for language '${lang}' should contain exactly ONE value node. Found '${value.length}' values`);
				}
				return total;
			}, {});

		return translations;
	}
}
