# World Number – Global Data Pipeline & Static Datasets 🌐📊

Official data repository for **World Number** — providing verified, normalized, and automated global datasets across 20 distinct categories covering 195+ countries.

## 🏛️ Architecture & Data Flow

```
Official Sources (UN DESA, World Bank, WHO, IMF, UNESCO, FAO, SIPRI, etc.)
               │
               ▼
   [Automated Data Collection] (GitHub Actions / Scheduled Python & Node scripts)
               │
               ▼
   [Normalization & Standardization] (ISO-3166-1 alpha-3, Metric Units, UTC Timestamps)
               │
               ▼
   [Schema & Range Validation] (Zero-fabrication checks, SHA-256 integrity checksums)
               │
               ▼
   [Static JSON Datasets & manifest.json]
               │
               ▼
   [Static Hosting] (GitHub Pages / Cloudflare Pages CDN)
               │
               ▼
   [World Number Android App] ──> [Local Room Database & Offline Cache]
```

---

## 📁 Repository Structure

```
world-number-data/
├── .github/workflows/
│   └── data-pipeline.yml       # Scheduled GitHub Actions (runs monthly/quarterly)
├── sources/
│   └── sources_catalog.json    # Official sources metadata, license terms & API URLs
├── scripts/
│   ├── build_datasets.js       # Dataset generation and schema compilation
│   ├── validate_datasets.js    # Integrity validation, anomaly checks & SHA-256
│   └── pipeline.py             # Python collection runner for CI environments
├── data/
│   ├── manifest.json           # Master dataset manifest (file hashes, sizes, versions)
│   ├── countries.json          # Master list of 195+ countries (ISO, names, flags, coords)
│   ├── categories.json         # Master list of 20 categories (matching reference UI)
│   ├── category_indicators.json# Indicator definitions, units, and sorting directions
│   ├── daily_discoveries.json  # 365 verified deterministic daily facts
│   ├── data_stories.json       # Interactive multi-slide visual data narratives
│   └── datasets/               # Individual category JSON payloads
│       ├── 01_population.json
│       ├── 02_economy.json
│       ├── 03_environment.json
│       ├── 04_health.json
│       ├── 05_education.json
│       ├── 06_technology.json
│       ├── 07_military.json
│       ├── 08_global_indices.json
│       ├── 09_geography.json
│       ├── 10_tourism.json
│       ├── 11_energy.json
│       ├── 12_agriculture.json
│       ├── 13_politics.json
│       ├── 14_infrastructure.json
│       ├── 15_climate.json
│       ├── 16_employment.json
│       ├── 17_science.json
│       ├── 18_sports.json
│       ├── 19_city_rankings.json
│       └── 20_un_sdg_goals.json
└── README.md
```

---

## 🏷️ The 20 Global Categories & Authoritative Sources

| # | Category | Key Indicators | Authoritative Primary Source |
|---|---|---|---|
| 01 | **Population** | Total Population, Growth Rate %, Fertility, Median Age | UN DESA World Population Prospects 2024 |
| 02 | **Economy** | Nominal GDP, GDP PPP, GDP per Capita, Inflation | World Bank / IMF World Economic Outlook |
| 03 | **Environment** | CO2 Emissions/Capita, Forest Area %, Renewable Share % | Global Carbon Project / UNEP / World Bank |
| 04 | **Health** | Life Expectancy, Under-5 Mortality, Health Spend % | WHO Global Health Observatory |
| 05 | **Education** | Literacy Rate %, Tertiary Enrollment %, Education % | UNESCO Institute for Statistics |
| 06 | **Technology** | Internet Penetration %, Mobile Subscriptions, Patents | ITU / WIPO |
| 07 | **Military** | Military Spending % of GDP, Defense Budget USD | SIPRI Military Expenditure Database 2024 |
| 08 | **Global Indices**| Human Development Index (HDI), Corruption Index (CPI) | UNDP HDR / Transparency International |
| 09 | **Geography** | Land Area km², Coastline Length, Elevation Bounds | Natural Earth / World Bank |
| 10 | **Tourism** | International Arrivals, Tourism Receipts USD | UN Tourism (UNWTO) |
| 11 | **Energy** | Electricity Generation, Clean Power Share % | Energy Institute / IEA |
| 12 | **Agriculture** | Agricultural Land %, Cereal Yield kg/ha | FAO / FAOSTAT |
| 13 | **Politics** | Women in Parliament %, Voter Turnout % | Inter-Parliamentary Union (IPU) |
| 14 | **Infrastructure**| Rail Network km, Container Port Traffic TEU | World Bank Logistics Performance Index |
| 15 | **Climate** | Mean Surface Temp, Precipitation mm, Temperature Anomaly | NASA GISTEMP / NOAA / Berkeley Earth |
| 16 | **Employment** | Unemployment Rate %, Labor Force Participation % | International Labour Organization (ILOSTAT) |
| 17 | **Science** | R&D Share of GDP %, Scientific Publications/Yr | UNESCO Science Report / Scopus |
| 18 | **Sports** | Olympic Medals All-time, FIFA World Ranking | International Olympic Committee / FIFA |
| 19 | **City Rankings** | Megacity Populations, Urbanization Share % | UN Habitat / Demographia |
| 20 | **UN SDG Goals** | SDG Index Score (0-100), Target Progress | UN Sustainable Development Solutions Network |

---

## 🛡️ Data Quality & Verification Principles

1. **Zero Fabrication Policy:** Missing country data is represented as `null` or excluded; never coerced to `0` or estimated without explicit labeling.
2. **Schema & Checksum Verification:** Every published dataset must pass schema validation and have its SHA-256 hash recorded in `manifest.json`.
3. **Decoupled Application Updates:** The Android application downloads only changed JSON files via manifest diffing, keeping mobile data usage minimal.
