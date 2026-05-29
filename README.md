# Fenotypowanie Cyfrowe

Jednostronicowa aplikacja React + TypeScript + Vite przygotowana do publikacji jako statyczna strona w GitHub Pages.

## Uruchomienie lokalne

```bash
npm ci
npm run dev
```

## Build produkcyjny

```bash
npm run build
```

Domyślnie lokalny build używa relatywnej ścieżki bazowej (`./`), dzięki czemu można go otworzyć również z katalogu `dist`.

## Publikacja na GitHub Pages

Repozytorium zawiera workflow `.github/workflows/deploy.yml`, który po pushu na gałąź `main`:

1. instaluje zależności przez `npm ci`,
2. ustawia `VITE_BASE_PATH` zgodnie z nazwą repozytorium (`/<repo>/` dla stron projektowych lub `/` dla repozytoriów typu `<user>.github.io`),
3. buduje aplikację komendą `npm run build`,
4. publikuje katalog `dist` przez oficjalne GitHub Pages Actions.

W ustawieniach repozytorium wybierz **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Dodatkowo plik `public/.nojekyll` jest kopiowany do `dist`, aby GitHub Pages serwował wszystkie statyczne zasoby wygenerowane przez Vite bez przetwarzania Jekyllem.
