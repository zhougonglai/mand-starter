const PLAYER_API = {
  /**
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
  }
};

export default PLAYER_API;
