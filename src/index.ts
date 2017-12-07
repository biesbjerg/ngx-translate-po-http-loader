import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TranslateLoader } from '@ngx-translate/core';
import * as ltx from 'ltx';

export class TranslateResxHttpLoader implements TranslateLoader {

	constructor(
		protected http: HttpClient,
		protected prefix: string = '',
		protected transLocation: string = 'assets/i18n',
		protected suffix: string = '.resx'
	) { }

	/**
	 * Gets the translations from file
	 * @param lang
	 * @returns {any}
	 */
	public getTranslation(lang: string): Observable<any> {
		const fullUrl = `${this.transLocation}/${this.prefix}${lang}${this.suffix}`;
		return this.http
			.get(fullUrl, { responseType: 'text' })
			.map(content => this.parse(content, lang));
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
