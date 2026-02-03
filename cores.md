# 🎨 Design System — Paleta de Cores Oficial

Este documento define **oficialmente** a paleta de cores do projeto. Ele serve como **fonte única de verdade** para design (Figma), frontend, backend e qualquer material visual do produto.

---

## 🎯 Decisão Oficial

> **A cor primária (brand) do projeto é ORANGE 500 — `#EF6820`.**

Todo o sistema visual deve orbitar esse laranja. Nenhuma outra cor pode competir como brand.

---

## 🟠 1. Primary / Brand — Orange

Usado para elementos interativos e identidade da marca.

| Token          | HEX           | Uso                  |
| -------------- | ------------- | -------------------- |
| Orange 25      | `#FEFAF5`     | Backgrounds suaves   |
| Orange 50      | `#FEF6EE`     | Backgrounds / badges |
| Orange 100     | `#FDEAD7`     | Destaques leves      |
| Orange 200     | `#F9DBAF`     | Hover sutil          |
| Orange 300     | `#F7B27A`     | Estados secundários  |
| Orange 400     | `#F38744`     | Destaque médio       |
| **Orange 500** | **`#EF6820`** | **Primary / Brand**  |
| Orange 600     | `#E04F16`     | Hover                |
| Orange 700     | `#B93815`     | Active / Pressed     |
| Orange 800     | `#932F19`     | Estados fortes       |
| Orange 900     | `#772917`     | Dark accents         |

### Regras

* Botões primários → **Orange 500**
* Hover → Orange 600
* Active → Orange 700
* Nunca usar outra cor como botão principal

---

## ⚫ 2. Neutral Base — Gray Modern

Base estrutural do sistema (texto, layout, cards, dark mode).

| Token    | HEX       |
| -------- | --------- |
| Gray 25  | `#FCFCFD` |
| Gray 50  | `#F8FAFC` |
| Gray 100 | `#EEF2F6` |
| Gray 200 | `#E3E8EF` |
| Gray 300 | `#CDD5DF` |
| Gray 400 | `#9AA4B2` |
| Gray 500 | `#697586` |
| Gray 600 | `#4B5565` |
| Gray 700 | `#364152` |
| Gray 800 | `#202939` |
| Gray 900 | `#121926` |
| Gray 950 | `#0D121C` |

---

## 🟢 3. Success

Usado para estados positivos e confirmações.

| Token           | HEX           |
| --------------- | ------------- |
| Success 50      | `#ECFDF3`     |
| Success 100     | `#DCFAE6`     |
| Success 200     | `#ABEFC6`     |
| Success 300     | `#75E0A7`     |
| Success 400     | `#47CD89`     |
| **Success 500** | **`#17B26A`** |
| Success 600     | `#079455`     |
| Success 700     | `#067647`     |

---

## 🔴 4. Error / Destructive

Usado para erros e ações destrutivas.

| Token         | HEX           |
| ------------- | ------------- |
| Error 50      | `#FEF3F2`     |
| Error 100     | `#FEE4E2`     |
| Error 200     | `#FDA29B`     |
| Error 300     | `#F97066`     |
| Error 400     | `#F04438`     |
| **Error 500** | **`#D92D20`** |
| Error 600     | `#B42318`     |

---

## 🟡 5. Warning

Usado para alertas e estados de atenção.

| Token           | HEX           |
| --------------- | ------------- |
| Warning 50      | `#FFFAEB`     |
| Warning 100     | `#FEF0C7`     |
| Warning 200     | `#FEDF89`     |
| Warning 300     | `#FEC84B`     |
| Warning 400     | `#FDB022`     |
| **Warning 500** | **`#F79009`** |
| Warning 600     | `#DC6803`     |

---

## 🔵 6. Accent Secundário (Opcional)

Usado apenas como apoio visual (gráficos, info). Nunca competir com o laranja.

| Token          | HEX           |
| -------------- | ------------- |
| Accent 100     | `#D1E9FF`     |
| Accent 300     | `#84CAFF`     |
| **Accent 500** | **`#2E90FA`** |
| Accent 600     | `#1570EF`     |

---

## 🧩 Tokens de Código (Base)

```css
--color-primary: #EF6820;
--color-primary-hover: #E04F16;
--color-primary-active: #B93815;

--color-bg: #FCFCFD;
--color-bg-dark: #0D121C;

--color-text-primary: #121926;
--color-text-secondary: #697586;

--color-success: #17B26A;
--color-error: #D92D20;
--color-warning: #F79009;
```

---

## 🚫 Proibições

* ❌ Não usar roxo/azul como brand
* ❌ Não criar novos tons fora desta escala
* ❌ Não misturar cores sem token

---

## ✅ Conclusão

Esta paleta está **aprovada, fechada e padronizada**.

Qualquer novo componente, tela ou feature **DEVE** respeitar este documento.
