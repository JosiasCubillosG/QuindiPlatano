const express = require('express');
const router = express.Router();
const AccountingTablesService = require('../../services/accountingTables');

router.get('/', AccountingTablesService.getAccountingTables);
router.post('/', AccountingTablesService.createAccountingTable);
router.get('/:accountingTableId', AccountingTablesService.getAccountingTable);
router.put('/:accountingTableId', AccountingTablesService.updateAccountingTable);
router.delete('/:accountingTableId', AccountingTablesService.deleteAccountingTable);

module.exports = router;