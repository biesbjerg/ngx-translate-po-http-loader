import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import * as gettext from 'gettext-parser';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class AbstractPoHttpLoader implements TranslateLoader {

  /**
	 * Translation domain
	 */
  public domain = '';

  public abstract getTranslation(lang: string): Observable<any>;
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
        const translation: string = po.translations[this.domain][key].msgstr.pop();
        if (key.length > 0 && translation.length > 0) {
          translations[key] = translation;
        }
      });

    return translations;
  }

}

export interface ITranslationResource {
  prefix: string;
  suffix: string;
}

export class TranslatePoHttpLoader extends AbstractPoHttpLoader {

  constructor(
    protected _http: HttpClient,
    protected _prefix: string = 'i18n',
    protected _suffix: string = '.po'
  ) {
    super();
  }

	/**
	 * Gets the translations from file
	 * @param lang
	 * @returns {any}
	 */
  public getTranslation(lang: string): Observable<any> {
    return this._http
      .get(`${this._prefix}/${lang}${this._suffix}`, { responseType: 'text' })
      .pipe(
        map(contents => this.parse(contents))
      );
  }

}

export class MultiTranslatePoHttpLoader extends AbstractPoHttpLoader {

  constructor(
    protected _http: HttpClient,
    protected resources: ITranslationResource[]
  ) {
    super();
  }

	/**
	 * Gets the translations from file/s
	 * @param lang
	 * @returns {any}
	 */
  public getTranslation(lang: string): Observable<any> {
    const requests = this.resources.map(resource => {
      return this._http.get(`${resource.prefix}/${lang}${resource.suffix}`, { responseType: 'text' });
    });
    return forkJoin(requests).pipe(
      map(translationList => translationList.reduce((translationsAcc, currentTranslation) => translationsAcc + currentTranslation, '')),
      map(contents => this.parse(contents))
    );
  }

}

