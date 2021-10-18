CREATE TABLE CURRENCY_TYPES (
	CURRENCY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	NAME text NOT NULL,
	CODE text NOT NULL,
	SYMBOL text NOT NULL,
	DATE_ADDED_TLM DATE NOT NULL
);

CREATE TABLE EXPENSE (
	EXPENSE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	AMOUNT UNSIGNED BIG INT NOT NULL,
	PAYMENT_ID INTEGER NOT NULL,
	EXPENSE_CATEGORY_ID INTEGER NOT NULL,
	DESCRIPTION text,
  	CURRENCY_ID INTEGER NOT NULL,
	DATE_ADDED_TLM DATE NOT NULL,
	DATE_UPDATED_TLM DATE NOT NULL,
	FOREIGN KEY(EXPENSE_CATEGORY_ID) REFERENCES EXPENSE_CATEGORIES(EXPENSE_CATEGORY_ID),
	FOREIGN KEY(PAYMENT_ID) REFERENCES PAYMENT_TYPES(PAYMENT_ID),
	FOREIGN KEY(CURRENCY_ID) REFERENCES CURRENCY_TYPES(CURRENCY_ID)
);

CREATE TABLE EXPENSE_CATEGORIES (
	EXPENSE_CATEGORY_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	DESCRIPTION text,
	DATE_ADDED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	DATE_UPDATED_TLM DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CATEGORY_ICON TEXT DEFAULT 'payments'
);

CREATE TABLE PAYMENT_TYPES (
	PAYMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	TITLE text NOT NULL,
	DESCRIPTION text,
	DATE_ADDED_TLM DATE NOT NULL,
	DATE_UPDATED_TLM DATE NOT NULL,
    PAYMENT_ICON TEXT NOT NULL DEFAULT 'payment'
);

INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON) VALUES ("Cash", "Cash payment, like GooglePay.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"cash");
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON) VALUES ("Account", "Pais by bank account.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"account-balance");
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON) VALUES ("UPI", "UPI payments, like Google Pay.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"touch-app");
INSERT INTO PAYMENT_TYPES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, PAYMENT_ICON) VALUES ("Card", "Credit/Debit card payment.",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"credit-card");

INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Food", "Food related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"fastfood");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Shopping", "Shopping expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"shopping-bag");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Transport", "Transport related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"emoji-transportation");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Social", "Social related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"groups");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Household", "Household expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"store");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Health", "Health expenses like, medical insurance, health checkup",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"local-hospital");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Gift", "Transport related expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"gift");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Education", "Education expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"school");
INSERT INTO EXPENSE_CATEGORIES(TITLE, DESCRIPTION, DATE_ADDED_TLM, DATE_UPDATED_TLM, CATEGORY_ICON) VALUES ("Beauty", "Beauty/fashion expenses",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,"person");

INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Leke', 'ALL', 'Lek', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'USD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Afghanis', 'AFN', '؋', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'ARS', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guilders', 'AWG', 'ƒ', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'AUD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Manats', 'AZN', 'ман', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BSD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BBD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rubles', 'BYR', 'p.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Euro', 'EUR', '€', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BZD', 'BZ$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BMD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bolivianos', 'BOB', '$b', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Convertible Marka', 'BAM', 'KM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pula', 'BWP', 'P', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Leva', 'BGN', 'лв', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Reais', 'BRL', 'R$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'GBP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'BND', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Riels', 'KHR', '៛', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'CAD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'KYD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'CLP', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Yuan Renminbi', 'CNY', '¥', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'COP', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Colón', 'CRC', '₡', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kuna', 'HRK', 'kn', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'CUP', '₱', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Koruny', 'CZK', 'Kč', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kroner', 'DKK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'DOP ', 'RD$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'XCD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'EGP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Colones', 'SVC', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'FKP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'FJD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Cedis', 'GHC', '¢', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'GIP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Quetzales', 'GTQ', 'Q', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'GGP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'GYD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Lempiras', 'HNL', 'L', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'HKD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Forint', 'HUF', 'Ft', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kronur', 'ISK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'INR', '₹', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupiahs', 'IDR', 'Rp', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'IRR', '﷼', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'IMP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Shekels', 'ILS', '₪', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'JMD', 'J$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Yen', 'JPY', '¥', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'JEP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tenge', 'KZT', 'лв', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Won', 'KPW', '₩', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Won', 'KRW', '₩', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Soms', 'KGS', 'лв', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kips', 'LAK', '₭', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Lati', 'LVL', 'Ls', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'LBP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'LRD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Switzerland Francs', 'CHF', 'CHF', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Litai', 'LTL', 'Lt', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Denars', 'MKD', 'ден', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ringgits', 'MYR', 'RM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'MUR', '₨', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'MXN', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tugriks', 'MNT', '₮', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Meticais', 'MZN', 'MT', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'NAD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'NPR', '₨', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guilders', 'ANG', 'ƒ', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'NZD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Cordobas', 'NIO', 'C$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Nairas', 'NGN', '₦', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Krone', 'NOK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'OMR', '﷼', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'PKR', '₨', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Balboa', 'PAB', 'B/.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guarani', 'PYG', 'Gs', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Nuevos Soles', 'PEN', 'S/.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'PHP', 'Php', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zlotych', 'PLN', 'zł', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'QAR', '﷼', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Lei', 'RON', 'lei', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rubles', 'RUB', 'руб', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'SHP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Riyals', 'SAR', '﷼', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dinars', 'RSD', 'Дин.', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'SCR', '₨', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'SGD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'SBD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Shillings', 'SOS', 'S', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rand', 'ZAR', 'R', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rupees', 'LKR', '₨', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kronor', 'SEK', 'kr', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'SRD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pounds', 'SYP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('New Dollars', 'TWD', 'NT$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Baht', 'THB', '฿', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'TTD', 'TT$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Lira', 'TRY', '₺', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Liras', 'TRL', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dollars', 'TVD', '$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Hryvnia', 'UAH', '₴', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Pesos', 'UYU', '$U', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Sums', 'UZS', 'лв', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bolivares Fuertes', 'VEF', 'Bs', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dong', 'VND', '₫', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rials', 'YER', '﷼', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zimbabwe Dollars', 'ZWD', 'Z$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Algerian dinar', 'DZD', 'DA', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Angolan kwanza', 'AOA', 'Kz', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Armenian dram', 'AMD', '֏', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bahraini dinar', 'BHD', 'BD', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Bangladeshi taka', 'BDT', '৳', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('West African CFA franc', 'XOF', 'CFA', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Burundian franc', 'BIF', 'FBu', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Central African CFA franc', 'XAF', 'FCFA', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Cape Verdean escudo', 'CVE', 'Esc', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Comorian franc', 'KMF', 'CF', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Djiboutian franc', 'DJF', 'Fdj', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Dominican peso', 'DOP', 'RD$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Eritrean nakfa', 'ERN', 'Nkf', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ethiopian birr', 'ETB', 'Br', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('CFP franc', 'XPF', '₣', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Gambian dalasi', 'GMD', 'D', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Georgian lari', 'GEL', 'ლ', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ghanaian cedi', 'GHS', 'GH₵', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Guinean franc', 'GNF', 'FG', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Iraqi dinar', 'IQD', 'ع.د', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Jordanian dinar', 'JOD', 'د.ا', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kenyan shilling', 'KES', 'Ksh', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Kuwaiti dinar', 'KWD', 'د.ك', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Libyan dinar', 'LYD', 'ل.د', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Macanese pataca', 'MOP', 'MOP$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Malagasy ariary', 'MGA', 'Ar', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Malawian kwacha', 'MWK', 'MK', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Maldivian rufiyaa', 'MVR', 'Rf', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Mauritanian ouguiya', 'MRO', 'UM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Moldovan leu', 'MDL', 'L', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Moroccan dirham', 'MAD', 'MAD', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Myanmar kyat', 'MMK', 'K', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Papua New Guinean kina', 'PGK', 'K', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Rwandan franc', 'RWF', 'R₣', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Samoan tālā', 'WST', 'WS$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('São Tomé and Príncipe dobra', 'STD', 'Db', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Sierra Leonean leone', 'SLL', 'Le', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('South Sudanese pound', 'SSP', '£', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Sudanese pound', 'SDG', 'ج.س', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Swazi lilangeni', 'SZL', 'L', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tajikistani somoni', 'TJS', 'ЅM', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tanzanian shilling', 'TZS', 'TSh', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tongan paʻanga', 'TOP', 'T$', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Tunisian dinar', 'TND', 'DT', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Turkmenistani manat', 'TMT', 'T', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Ugandan shilling', 'UGX', 'USh', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('United Arab Emirates dirham', 'AED', 'د.إ', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Vanuatu vatu', 'VUV', 'VT', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zambian kwacha', 'ZMW', 'ZK', CURRENT_TIMESTAMP);
INSERT INTO CURRENCY_TYPES (NAME, CODE, SYMBOL, DATE_ADDED_TLM) VALUES ('Zimbabwean dollar', 'ZWL', '$', CURRENT_TIMESTAMP);

