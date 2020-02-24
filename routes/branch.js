const router = require('express').Router()
const {
  branchs,
  branch,
  getMe,
  createBranch,
  login,
  updateBranch,
  deleteBranch} = require('../controllers/branch')
const branchAuth = require('../middleware/branchAuth')
const idChecker = require('../middleware/idChecker')


router.get('/',branchs)
router.get('/me',branchAuth,getMe)
router.get('/:id',idChecker,branch)
router.post('/',createBranch)
router.post('/login',login)
router.put('/',branchAuth,updateBranch)
router.delete('/:id',idChecker,deleteBranch)

module.exports = router
