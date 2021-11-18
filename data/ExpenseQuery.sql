SELECT 
ex.EXPENSE_ID as expenseId,
ex.PAYMENT_ID as paymentId,
ex.TITLE as title,
ex.DESCRIPTION as description,
ex.TRANSACTION_CATEGORY_ID as transactionCategoryId,
ex.AMOUNT as amount,
ex.CURRENCY_ID as currencyId,
ex.DATE_ADDED_TLM as dateAddedTlm,
ex.DATE_UPDATED_TLM as dateUpdatedTlm,
ec.TITLE as transactionCategoryTitle,
ec.CATEGORY_ICON as transactionCategoryIcon,
pt.TITLE as paymentTitle,
ct.SYMBOL as currencySumbol
FROM ${TNAME_EXPENSE} ex 
LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID 
LEFT JOIN ${TNAME_TRANSACTION_CATEGORIES} ec ON ex.TRANSACTION_CATEGORY_ID = ec.TRANSACTION_CATEGORY_ID 
LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID 
ORDER BY ex.DATE_ADDED_TLM DESC
LIMIT ${dataLimit}


SELECT * from 
(SELECT SUM(AMOUNT) as totalExpense from ${TNAME_EXPENSE}) e 
LEFT JOIN (SELECT SUM(AMOUNT) as totalIncome from ${TNAME_INCOME}) i 
LEFT JOIN (SELECT SUM(AMOUNT) as totalMonthlyExpense from ${TNAME_EXPENSE} where strftime('%Y-%m-', DATE_ADDED_TLM) = strftime('%Y-%m','now')) em
LEFT JOIN (SELECT SUM(AMOUNT) as totalMontlyIncome from ${TNAME_INCOME} where strftime('%Y-%m-', DATE_ADDED_TLM) = strftime('%Y-%m','now')) im 