
import React, { useEffect, useRef, useState } from "react";

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "hi", label: "Hindi", flag: "https://flagcdn.com/w40/in.png" },
  { code: "fr", label: "French", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "de", label: "German", flag: "https://flagcdn.com/w40/de.png" },
  { code: "es", label: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
  { code: "ar", label: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "ur", label: "Urdu", flag: "https://flagcdn.com/w40/pk.png" },
  { code: "zh-CN", label: "Chinese", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "ja", label: "Japanese", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "ru", label: "Russian", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "ta", label: "Tamil", flag: "https://flagcdn.com/w40/in.png" },
  { code: "bn", label: "Bengali", flag: "https://flagcdn.com/w40/bd.png" },
];

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(localStorage.getItem("lang") || "en");
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // const changeLanguage = (langCode) => {
    
  //   const tryChange = () => {
  //     const combo = document.querySelector(".goog-te-combo");
  //     if (combo) {
  //       combo.value = langCode;
  //       combo.dispatchEvent(new Event("change"));
  //     } else {
  //       setTimeout(tryChange, 500);
  //     }
  //   };
  //   tryChange();
  // };
const changeLanguage = (langCode) => {
  let attempts = 0;
  const maxAttempts = 10;

  const tryChange = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event("change"));
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryChange, 300); // reduce delay
    }
  };
  tryChange();
};

  // const handleSelect = (code) => {
  //   setSelected(code);
  //   setOpen(false);
  //   localStorage.setItem("lang", code);
  //   changeLanguage(code);
  // };
const handleSelect = (code) => {
  setSelected(code);
  setOpen(false);
  localStorage.setItem("lang", code);
  setTimeout(() => changeLanguage(code), 300); // small delay
};

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const addTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,fr,de,es,ar,ur,zh-CN,ja,ru,ta,bn",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // const tryApplyStoredLang = () => {
      //   const combo = document.querySelector(".goog-te-combo");
      //   if (combo) {
      //     combo.value = selected;
      //     combo.dispatchEvent(new Event("change"));
      //   } else {
      //     setTimeout(tryApplyStoredLang, 500);
      //   }
      // };
  const tryApplyStoredLang = () => {
  let attempts = 0;
  const maxAttempts = 10;

  const attempt = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = selected;
      combo.dispatchEvent(new Event("change"));
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(attempt, 300);
    }
  };

  attempt();
};

      tryApplyStoredLang();
    };

    addTranslateScript();
  }, []);

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>

      {/* Custom Dropdown */}
      <div className="relative inline-block text-left  notranslate" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
        >
          <img
            src={languages.find((l) => l.code === selected)?.flag}
            alt=""
            className="w-5 h-4 rounded-sm object-cover"
          />
          {languages.find((l) => l.code === selected)?.label}
        </button>

        {open && (
          <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  lang.code === selected ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                <img src={lang.flag} alt="" className="w-5 h-4 rounded-sm object-cover" />
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hide Google Translate UI Elements */}
      <style>{`
        .goog-te-banner-frame.skiptranslate,
        .goog-te-menu-frame,
        .goog-te-balloon-frame,
        .goog-logo-link,
        .goog-te-gadget,
        #goog-gt-tt {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .goog-te-combo {
          visibility: hidden !important;
          pointer-events: none !important;
          height: 0;
          position: absolute;
        }
        .skiptranslate {
          display: none !important;
        }
        .notranslate {
          translate: no;
        }
      `}</style>
    </>
  );
};

export default LanguageSelector;

