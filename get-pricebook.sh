#!/bin/bash

# Array of country codes available on Tesla's design studio
declare -a LANG=(en_CA fr_CA es_MX fr_BE nl_BE da_DK de_DE fr_FR en_GB it_IT nl_NL no_NO de_AT de_CH fr_CH it_CH sv_SE fi_FI en_EU en_AU zh_CN en_HK zh_HK ja_JP en_MO zh_MO)

# Loop through the array, download the website source,
# extract the correct line, cut away some stuff,
# substitue and remove a lot of characters to make the JSON valid,
# run it through jsonlint to make it prettier,
# substitue and remove some more and finally put it all in a
# JSON-file with a fitting name.
for language in ${LANG[@]}
do
  curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36" -s "https://my.teslamotors.com/$language/models/design" | \
  grep basePath | \
  cut -c 32- | \
  sed 's/..$//' | \
  sed 's#\\\\\\"#”#g' | \
  sed 's/\\\\u/\\u/g' | \
  sed 's/\\"/"/g' | \
  sed 's#\\\\\/#\/#g' | \
  sed 's#"{#{#g' | \
  sed 's#}"#}#g' | \
  sed 's/17\"/17\\\"/g' | \
  sed 's#="#=\\"#g' | \
  sed 's#">#\\">#g' | \
  sed 's#"21"#"21\\"#g' | \
  sed 's#21" #21\\" #g' | \
  sed 's# 8" sub#8\\" sub#g' | \
  sed 's#19" #19\\" #g' | \
  sed 's#19"Mi#19\\"Mi#g' | \
  sed 's#"19"#"19\\"#g' | \
  sed 's#disclaimer":{{\#disclaimer#disclaimer":"{{\#disclaimer#g' | \
  jsonlint | \
  sed 's/\\\\u/\\u/g' | \
  sed 's/\\"/"/g' | \
  sed 's#\\\\\/#\/#g' > \
  pricebook-3.5_MS_$language.json
done
