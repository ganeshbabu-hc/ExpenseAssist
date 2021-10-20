SELECT 
ex.EXPENSE_ID as expenseId,
ex.PAYMENT_ID as paymentId,
ex.TITLE as title,
ex.DESCRIPTION as description,
ex.EXPENSE_CATEGORY_ID as expenseCategoryId,
ex.AMOUNT as amount,
ex.CURRENCY_ID as currencyId,
ex.DATE_ADDED_TLM as dateAddedTlm,
ex.DATE_UPDATED_TLM as dateUpdatedTlm,
ec.TITLE as expenseCategoryTitle,
ec.CATEGORY_ICON as expenseCategoryIcon,
pt.TITLE as paymentTitle,
ct.SYMBOL as currencySumbol
FROM ${TNAME_EXPENSE} ex 
LEFT JOIN ${TNAME_PAYMENT_TYPES} pt ON ex.PAYMENT_ID = pt.PAYMENT_ID 
LEFT JOIN ${TNAME_EXPENSE_CATEGORIES} ec ON ex.EXPENSE_CATEGORY_ID = ec.EXPENSE_CATEGORY_ID 
LEFT JOIN ${TNAME_CURRENCY_TYPES} ct ON ct.CURRENCY_ID = ex.CURRENCY_ID 
ORDER BY ex.DATE_ADDED_TLM DESC
LIMIT ${dataLimit}