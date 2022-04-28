import constants from '../constants/constants'
import LogService from '../../services/LogService'

export default class LogHelper {
  static LogError (ctx, trxId, log) {
    ctx.request = {
      Type: constants.logType.ERROR,
      TransactionId: trxId,
      Log: log,
      User: ctx.$store.getters.currentUser.UserName
    }
    LogService.WriteLog(ctx).then(response => {})
  };

  static LogWarning (ctx, trxId, log) {
    ctx.request = {
      Type: constants.logType.WARNING,
      TransactionId: trxId,
      Log: log,
      User: ctx.$store.getters.currentUser.UserName
    }
    LogService.WriteLog(ctx).then(response => {})
  };

  static LogInfo (ctx, trxId, log) {
    ctx.request = {
      Type: constants.logType.INFO,
      TransactionId: trxId,
      Log: log,
      User: ctx.$store.getters.currentUser.UserName
    }
    LogService.WriteLog(ctx).then(response => {})
  };
}
