export default {
  /* --- player --- */
  openPlayer: {
    method: "get",
    url: "/player/openPlayer"
  },
  getPlayerStatus: {
    method: "get",
    url: "/player/getPlayerStatus"
  },
  /* --- playerApply --- */
  /**
   *  playerDetailsStatus: 是否是陪玩
   *  playerStatus: 陪玩申请状态
   *  playerDetailsStatus { 0 = '通过', 1 = '驳回', 2 = '审核中', 3 = '初次申请'}
   *  playerStatus { 0 = '通过', 1 = '驳回', 2 = '审核中', 3 = '初次申请'}
   */
  playerStatus: {
    method: "get",
    url: "/playerApply/playerStatus"
  },
  playerInformationAdd: {
    method: "post",
    url: "/playerApply/playerInformationAdd"
  },
  playerInfoStatus: {
    method: "get",
    url: "/playerApply/playerApplyInfoShow"
  },
  playerGameApply: {
    method: "get",
    url: "/playerGame/playerGameApply"
  }
};
