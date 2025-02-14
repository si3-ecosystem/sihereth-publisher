import React from "react";

const languages = [
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Armenian",
  "Assamese",
  "Aymara",
  "Azerbaijani",
  "Bambara",
  "Basque",
  "Belarussian",
  "Bengali",
  "Bhojpuri",
  "Bosnian",
  "Chinese (Simplified)",
  "Bulgarian",
  "Catalan",
  "Cebuano",
  "Chichewa",

  "Corsican",
  "Croatian",
  "Czech",
  "Danish",
  "Dhivehi",
  "Dogri",
  "Dutch",
  "Esperanto",
  "Estonian",
  "Ewe",
  "Filipino",
  "Chinese (Traditional)",
  "Finnish",
  "French",
  "Frisian",
  "Galician",
  "Georgian",
  "German",
  "Greek",
  "Gujarati",

  "Hausa",
  "Hawaiian",
  "Hebrew",
  "Hindi",
  "Hmong",
  "Hungarian",
  "Icelandic",
  "Meiteilon (Manipuri)",
  "Igbo",
  "Ilocano",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Javanese",
  "Kanna",
  "Kazakh",
  "Khmer",
  "Kinyarwanda",
  "Konkani",
  "Korean",
  "Krio",

  "Kyrgyz",
  "Kurdish (Kurmanji)",
  "Lao",
  "Latin",
  "Latvian",
  "Lingala",
  "Lithuanian",

  "Macedonian",
  "Maithili",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Maori",
  "Marathi",

  "Mizo",
  "Mongolian",

  "Kurdish (Sorani)",
  "Nepali",
  "Norwegian",

  "Oromo",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Quechua",
  "Romanian",
  "Russian",
  "Samoan",
  "Sanskrit",

  "Sepedi",
  "Serbian",
  "Haitian Creole",
  "Sesotho",
  "Shona",
  "Sindhi",
  "Sinhala",
  "Slovak",
  "Slovenian",
  "Somali",
  "Spanish",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tajik",
  "Tamil",
  "Tatar",
  "Telugu",
  "Luxembourgish",
  "Thai",
  "Tigrinya",
  "Tsonga",
  "Turkish",
  "Turkmen",
  "Twi",
  "Ukranian",
  "Urdu",
  "Uyghur",
  "Uzbek",
  "Vietnamese",
  "Welsh",
  "Xhosa",
  "Yiddish",
  "Yoruba",

  "Odia (Oriya)",
  "Scots Gaelic",
];

const Languages = () => {
  return (
    <div className="grid md:grid-cols-6 lg:grid-cols-16 pr-3 hidden lg:grid">
      <h2 className="font-mono  whitespace-nowrap xxl:text-[10px] text-[8px] xxl:font-normal text-white">
        SELECT LANGUAGE
      </h2>
      {languages.map((language, index) => (
        <span
          key={index}
          className="font-mono text-[9px] xxl:text-xs xxl:font-normal xxl:leading-[13.2px] text-[#8674F7] hover:text-white cursor-pointer whitespace-nowrap"
        >
          {language}
        </span>
      ))}
    </div>
  );
};

export default Languages;
