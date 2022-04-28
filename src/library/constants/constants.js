
const role = {
  Management: 'Site Yönetimi',
  CompanyAdmin: 'Şirket Yönetimi',
  UserManagement: 'Kullanıcı Yönetimi'
}

const language = {
  TR: 'tr',
  EN: 'en'
}

const logType = {
  ERROR: 4,
  WARNING: 2,
  INFO: 1
}

const timeAm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const timePm = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const UserExists = '11001'
const UserNotFoundInAd = '11002'

const GroupExists = '12001'
const GroupHasUser = '12002'

const Failed = '10001'

export default {
  role: role,
  language: language,
  logType: logType,
  timeAm: timeAm,
  timePm: timePm,
  userExists: UserExists,
  userNotFoundInAd: UserNotFoundInAd,
  groupExists: GroupExists,
  groupHasUser: GroupHasUser,
  failed: Failed
}
