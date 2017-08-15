#!/usr/bin/python

import json
import re
import requests


def fetch_pricebook_data(locale):
    locale_path = ''
    if locale != 'US':
        locale_path = '%s/' %(locale)
    url = 'https://www.tesla.com/%smodels/design' % (locale_path)
    print url
    html = requests.get(url).text
    for line in html.split('\n'):
        # print line
        if re.search('basePath', line):
            # strip out the Drupal part of the beginning and end
            return line[31:-2]

    return ""


def get_pricebook(locale):
    data = fetch_pricebook_data(locale)
    shell = json.loads(data)

    # It looks like configSetPrices is double encoded in json so undo that
    shell['tesla']['configSetPrices'] = json.loads(
        shell['tesla']['configSetPrices'])

    output = json.dumps(shell)
    f = open("pricebook-3.5_MS_%s.json" % (locale), "w")
    f.write(output)
    f.close()


def main():
    locales = [
        'US', 'en_CA', 'fr_CA', 'es_MX', 'fr_BE', 'nl_BE', 'da_DK', 'de_DE',
        'fr_FR', 'en_GB', 'it_IT', 'nl_NL', 'no_NO', 'de_AT', 'de_CH',
        'fr_CH', 'it_CH', 'sv_SE', 'fi_FI', 'en_EU', 'en_AU', 'zh_CN',
        'en_HK', 'zh_HK', 'en_MO', 'zh_MO'
    ]

    for locale in locales:
        get_pricebook(locale)

if __name__ == "__main__":
    main()
